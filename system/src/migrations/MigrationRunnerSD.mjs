import * as migrations from "./updates/_module.mjs";

export default class MigrationRunnerSD {
	allMigrations;

	currentMigrationTask;

	latestVersion = 0;

	async buildMigrations() {
		const unsortedMigrations = [];

		for (const migration in migrations) {
			const migrationVersion = migrations[migration].version;

			this.latestVersion = migrationVersion > this.latestVersion
				? migrationVersion
				: this.latestVersion;

			if (migrationVersion > this.currentVersion) {
				unsortedMigrations.push(new migrations[migration]());
			}
		}

		this.allMigrations = unsortedMigrations.sort((a, b) => {
			return a.version - b.version;
		});
	}

	get currentVersion() {
		return game.settings.get("shadowdark", "schemaVersion");
	}

	async migrateCompendium(pack) {
		const documentName = pack.documentName;

		if (!["Actor", "Item"].includes(documentName)) return;

		// Unlock the pack for editing
		const wasLocked = pack.locked;
		await pack.configure({locked: false});

		// Begin by requesting service-side migration
		await pack.migrate();
		const documents = pack.getDocuments();

		// Iterate over compendium entries - apply migration functions
		for (let doc of documents) {
			let updateData = {};
			try {
				const objectData = doc.toObject();
				switch (documentName) {
					case "Actor":
						updateData = await this.currentMigrationTask.updateActor(objectData);
						break;
					case "Item":
						updateData = await this.currentMigrationTask.updateItem(objectData);
						break;
				}

				// Save the entry if data was updated
				if (foundry.utils.isEmpty(updateData)) continue;
				await doc.update(updateData);
				shadowdark.log(`Migrated ${documentName} document '${doc.name}' in Compendium '${pack.collection}'`);
			}
			catch(err) {
				err.message = `Failed Shadowdark system migration for document '${doc.name}' in pack '${pack.collection}': ${err.message}`;
				console.error(err);
			}
		}

		// Apply the original locked status for the pack
		await pack.configure({locked: wasLocked});

		shadowdark.log(`Migrated all '${documentName}' documents from Compendium '${pack.collection}'`);
	}

	async migrateSettings() {
		await this.currentMigrationTask.updateSettings();
	}

	async migrateWorldCompendiums() {
		for (let pack of game.packs) {
			// don't migrate system packs
			if (pack.metadata.packageType !== "world") continue;

			if (!["Actor", "Item"].includes(pack.documentName)) continue;

			await migrateCompendium(pack);
		}
	}

	async migrateWorldActors() {
		// World actors
		const actors = game.actors.map(a => [a, true])
			.concat(Array.from(game.actors.invalidDocumentIds).map(
				id => [game.actors.getInvalid(id), false]
			));

		for (const [actor, valid] of actors) {
			try {
				const actorSource = valid
					? actor.toObject()
					: game.actors.find(a => a._id === actor.id);

				const updateData = await this.currentMigrationTask.updateActor(actorSource);

				if (!foundry.utils.isEmpty(updateData)) {
					shadowdark.log(`Migrating Actor document '${actor.name}'`);
					await actor.update(updateData);
				}

				const items = actor.items.map(a => [a, true])
					.concat(Array.from(actor.items.invalidDocumentIds).map(
						id => [actor.items.getInvalid(id), false]
					));

				for (const [item, validItem] of items) {
					const itemSource = validItem
						? item.toObject()
						: actor.items.find(a => a._id === item.id);

					const updateData = await this.currentMigrationTask.updateItem(
						itemSource,
						actorSource
					);

					if (!foundry.utils.isEmpty(updateData)) {
						shadowdark.log(`Migrating Actor Item document '${item.name}'`);
						await item.update(updateData);
					}
				}
			}
			catch(err) {
				err.message = `Failed Shadowdark system migration for Actor '${actor.name}': ${err.message}`;
				console.error(err);
			}
		}
	}

	async migrateWorldItems() {
		// World actors
		const items = game.items.map(a => [a, true])
			.concat(Array.from(game.items.invalidDocumentIds).map(
				id => [game.items.getInvalid(id), false]
			));

		for (const [item, valid] of items) {
			try {
				const source = valid
					? item.toObject()
					: game.items.find(a => a._id === item.id);

				const updateData = await this.currentMigrationTask.updateItem(source);

				if (!foundry.utils.isEmpty(updateData)) {
					shadowdark.log(`Migrating Item document '${item.name}'`);
					item.update(updateData);
				}
			}
			catch(err) {
				err.message = `Failed Shadowdark system migration for Item '${item.name}': ${err.message}`;
				console.error(err);
			}
		}
	}

	async migrateWorld() {
		const version = this.currentMigrationTask.version;

		ui.notifications.info(
			game.i18n.format("SHADOWDARK.migration.begin_schema", {version}),
			{permanent: false}
		);

		await this.migrateSettings();
		await this.migrateWorldActors();
		await this.migrateWorldItems();
		await this.migrateWorldCompendiums();

		ui.notifications.info(
			game.i18n.format("SHADOWDARK.migration.completed_schema", {version}),
			{permanent: false}
		);
	}

	needsMigration() {
		return this.latestVersion > this.currentVersion;
	}

	async run() {
		shadowdark.log(`Current schema version ${this.currentVersion}`);

		// Unless you actually set the value, the default is not stored in the db
		// which causes issues with old schema updates being run unecessarily on
		// brand new worlds.  So here we set the schemaVersion to the current
		// system value if it has not already been set by a previous data migration
		// running.
		//
		// We have to special case the 230417.2 schema version as this is where
		// the migration fix was applied, and we need to make sure this particular
		// schema update is run.
		//
		const systemSchemaVersion = game.system.flags.schemaVersion;

		if (this.currentVersion === 0 && systemSchemaVersion > 230417.2) {
			await game.settings.set(
				"shadowdark", "schemaVersion",
				Number(game.system.flags.schemaVersion)
			);
		}

		await this.buildMigrations();

		if (!this.needsMigration()) return;

		ui.notifications.info(
			game.i18n.localize("SHADOWDARK.migration.begin_migration"),
			{permanent: false}
		);

		for (const migration of this.allMigrations) {
			if (this.currentVersion < migration.version) {
				this.currentMigrationTask = migration;

				await this.migrateWorld();

				game.settings.set("shadowdark", "schemaVersion", migration.version);
			}
		}

		ui.notifications.info(
			game.i18n.localize("SHADOWDARK.migration.completed_migration"),
			{permanent: false}
		);
	}
}
