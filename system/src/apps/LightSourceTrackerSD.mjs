const DEFAULT_UPDATE_INTERVAL_MS = 60 * 1000; // 10 seconds in milliseconds

export default class LightSourceTrackerSD extends Application {

	constructor(object, options) {
		super(object, options);

		this.monitoredLightSources = {};
		this.updateInterval = DEFAULT_UPDATE_INTERVAL_MS;
		this.updateIntervalId = null;

		this.pauseWithGame = true;
	}

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["shadowdark", "light-tracker"],
			height: "auto",
			resizable: false,
			width: "auto",
		});
	}

	/** @inheritdoc */
	get template() {
		return "systems/shadowdark/templates/apps/light-tracker.hbs";
	}

	/** @override */
	async getData(options) {
		const context = {
			monitoredLightSources: this.monitoredLightSources,
			paused: this._isPaused(),
		};

		return context;
	}

	async render(force, options) {
		// Don't allow non-GM users to view the UI
		if (!game.user.isGM) return;

		super.render(force, options);
	}

	async start() {
		this.pauseWithGame = game.settings.get(
			"shadowdark", "pauseLightTrackingWithGame"
		);

		// Make sure we're actualled enable and are supposed to be running.
		//
		if (this._isDisabled()) {
			console.log("Shadowdark RPG::LightSourceTrackerSD | Disabled in Settings");
			return;
		}

		// we only run the timer on the GM instance
		if (!game.user.isGM) return;

		// Now we can actually start properly
		//
		console.log("Shadowdark RPG::LightSourceTrackerSD | Starting");

		// First get a list of all active light sources in the world
		//
		await this._gatherLightSources();

		// Now set up the timer interval used to update all light sources
		//
		const updateSecs = game.settings.get(
			"shadowdark", "trackLightSourcesInterval"
		);

		this.updateInterval = updateSecs * 1000 || DEFAULT_UPDATE_INTERVAL_MS;
		this.updateIntervalId = setInterval(
			this._performTick.bind(this),
			this.updateInterval
		);

		console.log(`Shadowdark RPG::LightSourceTrackerSD | Updating every ${updateSecs} secs.`);

		if (game.settings.get("shadowdark", "trackLightSourcesOpen")) {
			this.render(true);
		}
	}

	async toggleInterface() {
		if (!game.user.isGM) {
			ui.notifications.error(
				game.i18n.localize("SHADOWDARK.error.general.gm_required")
			);
			return;
		}

		if (this.rendered) {
			this.close();
		}
		else {
			this.render(true);
		}
	}

	async toggleLightSource(actor, item) {
		if (this._isDisabled()) return;

		if (!game.user.isGM) {
			game.socket.emit(
				"system.shadowdark",
				{
					type: "toggleLightSource",
					data: {
						actor,
						item,
					},
				}
			);
			return;
		}

		this._onToggleLightSource(actor, item);
	}

	async _gatherLightSources() {
		this.monitoredLightSources = {};

		for (const user of game.users) {
			if (user.isGM) continue;
			if (!(user.active || this._monitorInactiveUsers())) continue;

			const actor = user.character;
			if (!actor) continue;

			const activeLightSources = await actor.getActiveLightSources();
			this.monitoredLightSources[actor.id] = {
				actorId: actor.id,
				actorName: actor.name,
				lightSources: {},
			};

			for (const lightSource of activeLightSources) {
				const newLightSource = {
					itemId: lightSource.id,
					name: lightSource.name,
					light: lightSource.system.light,
				};

				this.monitoredLightSources[actor.id]
					.lightSources[lightSource.id] = newLightSource;
			}
		}
	}

	_isDisabled() {
		return !this._isEnabled();
	}

	_isEnabled() {
		return game.settings.get("shadowdark", "trackLightSources");
	}

	_isPaused() {
		return game.paused && this.pauseWithGame;
	}

	_monitorInactiveUsers() {
		return game.settings.get("shadowdark", "trackInactiveUserLightSources");
	}

	async _onToggleLightSource(actor, item) {
		if (!(this._isEnabled() && game.user.isGM)) return;

		this._updateLightSources();
	}

	async _settingsChanged() {
		if (!game.user.isGM) return;

		this.pauseWithGame = game.settings.get(
			"shadowdark", "pauseLightTrackingWithGame"
		);

		if (this._isEnabled()) {
			this._gatherLightSources();
			this.render();
		}
		else {
			this.close();
			this.monitoredLightSources = {};
		}
		this.render(false);
	}

	async _performTick() {
		console.log("Shadowdark RPG::LightSourceTrackerSD | Performing Tick.");

		if (!(this._isEnabled() && game.user.isGM)) return;

		if (this._isPaused()) return;

		for (const actorId in this.monitoredLightSources) {
			const actorData = this.monitoredLightSources[actorId];
			console.log(`Updating Light Sources for ${actorData.actorName}`);

			for (const lightId in actorData.lightSources) {
				const itemData = actorData.lightSources[lightId];

				const actor = await game.actors.get(actorId);

				itemData.light.remainingSecs -= (this.updateInterval / 1000);

				if (itemData.light.remainingSecs <= 0) {
					await actor.deleteEmbeddedDocuments("Item", [lightId]);
					await this._gatherLightSources();
				}
				else {
					const item = await actor.getEmbeddedDocument(
						"Item", lightId
					);

					item.update({
						"system.light.remainingSecs": itemData.light.remainingSecs,
					});
				}

				this.render(false);
			}
		}
	}

	async _updateLightSources() {
		if (!(this._isEnabled() && game.user.isGM)) return;

		console.log("Shadowdark RPG::LightSourceTrackerSD | Updating light sources");

		await this._gatherLightSources();
		this.render(false);
	}
}