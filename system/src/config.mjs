// Namespace Configuration Values
const SHADOWDARK = {};

SHADOWDARK.ABILITIES_LONG = {
	str: "SHADOWDARK.ability_strength",
	int: "SHADOWDARK.ability_intelligence",
	wis: "SHADOWDARK.ability_wisdom",
	con: "SHADOWDARK.ability_constitution",
	cha: "SHADOWDARK.ability_charisma",
	dex: "SHADOWDARK.ability_dexterity",
};

SHADOWDARK.ABILITY_KEYS = [
	"str",
	"int",
	"dex",
	"wis",
	"con",
	"cha",
];

SHADOWDARK.ALIGNMENTS = {
	lawful: "SHADOWDARK.alignment.lawful",
	neutral: "SHADOWDARK.alignment.neutral",
	chaotic: "SHADOWDARK.alignment.chaotic",
};

SHADOWDARK.ALIGNMENTS_SHORT = {
	lawful: "SHADOWDARK.alignment.lawful_short",
	neutral: "SHADOWDARK.alignment.neutral_short",
	chaotic: "SHADOWDARK.alignment.chaotic_short",
};

SHADOWDARK.ARMOR_BASE_ARMOR = {
	chainmail: "SHADOWDARK.item.armor.base_armor.chainmail",
	"leather-armor": "SHADOWDARK.item.armor.base_armor.leather_armor",
	"plate-mail": "SHADOWDARK.item.armor.base_armor.plate_mail",
	shield: "SHADOWDARK.item.armor.base_armor.shield",
};

SHADOWDARK.ARMOR_BONUS_ATTRIBUTES = {
	dex: "SHADOWDARK.ability_dex",
};

SHADOWDARK.ARMOR_PROPERTIES = {
	shield: "SHADOWDARK.armor.properties.shield",
	disadvStealth: "SHADOWDARK.armor.properties.disadvantage_stealth",
	oneHanded: "SHADOWDARK.armor.properties.one_handed",
	disadvSwim: "SHADOWDARK.armor.properties.disadvantage_swimming",
	noSwim: "SHADOWDARK.armor.properties.no_swimming",
};

SHADOWDARK.BACKSTAB_CLASSES = ["thief"];

SHADOWDARK.CLASS_HD = {
	fighter: "1d8",
	priest: "1d6",
	thief: "1d4",
	wizard: "1d4",
};

SHADOWDARK.CLASSES = {
	fighter: "SHADOWDARK.class.fighter",
	priest: "SHADOWDARK.class.priest",
	thief: "SHADOWDARK.class.thief",
	wizard: "SHADOWDARK.class.wizard",
};

SHADOWDARK.DEFAULTS = {
	BASE_ARMOR_CLASS: 10,
	GEAR_SLOTS: 10,
	FREE_COIN_CARRY: 100,
	LEARN_SPELL_DC: 15,
	LIGHT_TRACKER_UPDATE_INTERVAL_SECS: 30,
	ITEM_IMAGES: {
		Armor: "icons/equipment/chest/breastplate-banded-steel-gold.webp",
		Basic: "icons/containers/bags/pouch-simple-brown.webp",
		Effect: "icons/commodities/tech/cog-brass.webp",
		Gem: "icons/commodities/gems/gem-faceted-navette-red.webp",
		"NPC Attack": "icons/skills/melee/weapons-crossed-swords-yellow.webp",
		"NPC Feature": "icons/creatures/abilities/dragon-breath-purple.webp",
		Potion: "icons/consumables/potions/bottle-corked-red.webp",
		Scroll: "icons/sundries/scrolls/scroll-runed-brown-purple.webp",
		Spell: "icons/magic/symbols/runes-star-blue.webp",
		Talent: "icons/sundries/books/book-worn-brown-grey.webp",
		Wand: "icons/weapons/wands/wand-gem-violet.webp",
		Weapon: "icons/weapons/swords/swords-short.webp",
	},
};

SHADOWDARK.INVENTORY = {
	GEMS_PER_SLOT: 10,
};

SHADOWDARK.LANGUAGES = {
	celestial: "SHADOWDARK.language.celestial",
	common: "SHADOWDARK.language.common",
	diabolic: "SHADOWDARK.language.diabolic",
	draconic: "SHADOWDARK.language.draconic",
	dwarvish: "SHADOWDARK.language.dwarvish",
	elvish: "SHADOWDARK.language.elvish",
	giant: "SHADOWDARK.language.giant",
	goblin: "SHADOWDARK.language.goblin",
	merran: "SHADOWDARK.language.merran",
	orcish: "SHADOWDARK.language.orcish",
	primordial: "SHADOWDARK.language.primordial",
	reptilian: "SHADOWDARK.language.reptilian",
	sylvan: "SHADOWDARK.language.sylvan",
	thanian: "SHADOWDARK.language.thanian",
};

SHADOWDARK.LIGHT_SETTING_NAMES = {
	lantern: "SHADOWDARK.light_source.lantern",
	lightSpellDouble: "SHADOWDARK.light_source.light_spell.double_near",
	lightSpellNear: "SHADOWDARK.light_source.light_spell.near",
	torch: "SHADOWDARK.light_source.torch",
};

SHADOWDARK.LIGHT_SOURCE_ITEM_IDS = [
	"PkQXG3AaHNMVwGTc", // Light Spell
	"rjNBToTJCYLLdVcT", // Light Spell (Double Time)
	"BBDG7QpHOFXG6sKe", // Light Spell (Double Range)
];

SHADOWDARK.NPC_ATTACK_TYPES = {
	physical: "SHADOWDARK.npc_attack.type.physical",
	special: "SHADOWDARK.npc_attack.type.special",
};

SHADOWDARK.NPC_MOVES = {
	near: "SHADOWDARK.npc_move.near",
	doubleNear: "SHADOWDARK.npc_move.double_near",
	tripleNear: "SHADOWDARK.npc_move.triple_near",
	close: "SHADOWDARK.range.close",
};

SHADOWDARK.RANGES = {
	close: "SHADOWDARK.range.close",
	near: "SHADOWDARK.range.near",
	far: "SHADOWDARK.range.far",
	nearLine: "SHADOWDARK.range.nearLine",
};

SHADOWDARK.RANGES_SHORT = {
	close: "SHADOWDARK.range.close_short",
	near: "SHADOWDARK.range.near_short",
	far: "SHADOWDARK.range.far_short",
	self: "SHADOWDARK.range.self_short",
};

SHADOWDARK.SPELLCASTING_ABILITY = {
	priest: "wis",
	wizard: "int",
};

SHADOWDARK.SPELL_CASTER_CLASSES = {
	priest: "SHADOWDARK.spell_caster.priest",
	wizard: "SHADOWDARK.spell_caster.wizard",
};

SHADOWDARK.SPELL_DURATIONS = {
	focus: "SHADOWDARK.spell_duration.focus",
	instant: "SHADOWDARK.spell_duration.instant",
	rounds: "SHADOWDARK.spell_duration.rounds",
	days: "SHADOWDARK.spell_duration.days",
	realTime: "SHADOWDARK.spell_duration.real_time",
	permanent: "SHADOWDARK.spell_duration.permanent",
};

SHADOWDARK.EFFECT_ASK_INPUT = [
	"system.bonuses.weaponMastery",
	"system.bonuses.armorMastery",
	"system.bonuses.advantage",
];

SHADOWDARK.EFFECT_CATEGORIES = {
	effect: "SHADOWDARK.item.effect.category.effect",
	condition: "SHADOWDARK.item.effect.category.condition",
};

SHADOWDARK.EFFECT_DURATIONS = {
	instant: "SHADOWDARK.spell_duration.instant",
	rounds: "SHADOWDARK.spell_duration.rounds",
	seconds: "SHADOWDARK.effect_duration.seconds",
	minutes: "SHADOWDARK.effect_duration.minutes",
	hours: "SHADOWDARK.effect_duration.hours",
	days: "SHADOWDARK.spell_duration.days",
	focus: "SHADOWDARK.spell_duration.focus",
	permanent: "SHADOWDARK.spell_duration.permanent",
	unlimited: "SHADOWDARK.effect_duration.unlimited",
};

SHADOWDARK.EFFECT_TRANSLATIONS = {
	"system.abilities.cha.base": "SHADOWDARK.ability_cha",
	"system.abilities.cha.bonus": "SHADOWDARK.ability_cha",
	"system.abilities.con.base": "SHADOWDARK.ability_con",
	"system.abilities.con.bonus": "SHADOWDARK.ability_con",
	"system.abilities.dex.base": "SHADOWDARK.ability_dex",
	"system.abilities.dex.bonus": "SHADOWDARK.ability_dex",
	"system.abilities.int.base": "SHADOWDARK.ability_int",
	"system.abilities.int.bonus": "SHADOWDARK.ability_int",
	"system.abilities.str.base": "SHADOWDARK.ability_str",
	"system.abilities.str.bonus": "SHADOWDARK.ability_str",
	"system.abilities.wis.base": "SHADOWDARK.ability_wis",
	"system.abilities.wis.bonus": "SHADOWDARK.ability_wis",
	"system.bonuses.acBonus": "SHADOWDARK.talent.type.armor_bonus",
	"system.bonuses.advantage": "SHADOWDARK.talent.type.advantage.title",
	"system.bonuses.armorMastery": "SHADOWDARK.item.effect.predefined_effect.armorMastery",
	"system.bonuses.attackBonus": "SHADOWDARK.item.magic_item.type.attackBonus",
	"system.bonuses.backstabDie": "SHADOWDARK.talent.type.backstab_die",
	"system.bonuses.critical.failureThreshold": "SHADOWDARK.item.magic_item.type.criticalFailureThreshold",
	"system.bonuses.critical.multiplier": "SHADOWDARK.item.magic_item.type.critMultiplier",
	"system.bonuses.critical.successThreshold": "SHADOWDARK.item.magic_item.type.criticalSuccessThreshold",
	"system.bonuses.damageBonus": "SHADOWDARK.item.magic_item.type.damageBonus",
	"system.bonuses.gearSlots": "SHADOWDARK.inventory.slots",
	"system.bonuses.meleeAttackBonus": "SHADOWDARK.talent.type.melee_attack_bonus",
	"system.bonuses.meleeDamageBonus": "SHADOWDARK.talent.type.melee_damage_bonus",
	"system.bonuses.rangedAttackBonus": "SHADOWDARK.talent.type.ranged_attack_bonus",
	"system.bonuses.rangedDamageBonus": "SHADOWDARK.talent.type.ranged_damage_bonus",
	"system.bonuses.spellcastingCheckBonus": "SHADOWDARK.talent.type.spell_bonus",
	"system.bonuses.weaponMastery": "SHADOWDARK.talent.type.weapon_mastery",
};

SHADOWDARK.VARIABLE_DURATIONS = [
	"days",
	"rounds",
	"realTime",
	"seconds",
	"minutes",
	"hours",
];

SHADOWDARK.DURATION_UNITS = {
	seconds: 1,
	minutes: 60,
	rounds: 360,
	hours: 3600,
	days: 86400,
};

SHADOWDARK.SPELL_RANGES = {
	self: "SHADOWDARK.range.self",
	close: "SHADOWDARK.range.close",
	near: "SHADOWDARK.range.near",
	far: "SHADOWDARK.range.far",
	touch: "SHADOWDARK.range.touch",
	samePlane: "SHADOWDARK.range.samePlane",
	unlimited: "SHADOWDARK.range.unlimited",
};

SHADOWDARK.TALENT_CLASSES = {
	ancestry: "SHADOWDARK.talent.class.ancestry",
	class: "SHADOWDARK.talent.class.class",
	level: "SHADOWDARK.talent.class.level",
};

SHADOWDARK.WEAPON_BASE_DAMAGE = {
	d4: "1d4",
	d6: "1d6",
	d8: "1d8",
	d10: "1d10",
	d12: "1d12",
};

SHADOWDARK.WEAPON_BASE_DAMAGE_DIE_ONLY = {
	d4: "d4",
	d6: "d6",
	d8: "d8",
	d10: "d10",
	d12: "d12",
};

SHADOWDARK.WEAPON_BASE_WEAPON = {
	"bastard-sword": "SHADOWDARK.item.weapon.base_weapon.bastard_sword",
	club: "SHADOWDARK.item.weapon.base_weapon.club",
	crossbow: "SHADOWDARK.item.weapon.base_weapon.crossbow",
	dagger: "SHADOWDARK.item.weapon.base_weapon.dagger",
	greataxe: "SHADOWDARK.item.weapon.base_weapon.greataxe",
	greatsword: "SHADOWDARK.item.weapon.base_weapon.greatsword",
	javelin: "SHADOWDARK.item.weapon.base_weapon.javelin",
	longbow: "SHADOWDARK.item.weapon.base_weapon.longbow",
	longsword: "SHADOWDARK.item.weapon.base_weapon.longsword",
	mace: "SHADOWDARK.item.weapon.base_weapon.mace",
	shortbow: "SHADOWDARK.item.weapon.base_weapon.shortbow",
	shortsword: "SHADOWDARK.item.weapon.base_weapon.shortsword",
	spear: "SHADOWDARK.item.weapon.base_weapon.spear",
	staff: "SHADOWDARK.item.weapon.base_weapon.staff",
	wand: "SHADOWDARK.item.weapon.base_weapon.wand",
	warhammer: "SHADOWDARK.item.weapon.base_weapon.warhammer",
};

SHADOWDARK.WEAPON_PROPERTIES = {
	finesse: "SHADOWDARK.weapon.properties.finesse",
	loading: "SHADOWDARK.weapon.properties.loading",
	thrown: "SHADOWDARK.weapon.properties.thrown",
	twoHanded: "SHADOWDARK.weapon.properties.two_handed",
	versatile: "SHADOWDARK.weapon.properties.versatile",
};

SHADOWDARK.WEAPON_TYPES = {
	melee: "SHADOWDARK.weapon.type.melee",
	ranged: "SHADOWDARK.weapon.type.ranged",
};

export default SHADOWDARK;
