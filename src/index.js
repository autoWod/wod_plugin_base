/*
 * @Description: awesome_warehouse
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-15 10:50:14
 * @LastEditors: lax
 * @LastEditTime: 2021-06-21 14:54:28
 * @FilePath: \wod_plugin_base\src\index.js
 */

"use strict";

const SELECT_ITEM = {
	// 职业
	CLASSES: 0,
	// 种族
	RACE: 1,
	// 位置
	POSITION: 2,
	// 唯一性
	UNIQUE: 3,
	// 属性
	ATTRIBUTE: 4,
	// 物品类型
	ITEM_TYPE: 5,
	// 技能
	SKILL: 6,
	// 可用技能
	USE_SKILL: 7,
	// 技能类型
	SKILL_TYPE: 8,
	// 套装
	COORDINATE: 9,
	// 镶嵌
	INLAY: 10,
	// 要求属性
	REQUIRE_ATTRIBUTE: 11
};

const CLASSES = {
	// 冒险者
	ADVENTURER: 22,
	// 冒险学徒
	MAGES_APPRENTICE: 23,
	// 射手
	ARCHER: 21,
	// 野蛮人
	BARBARIAN: 2,
	// 法师
	MAGE: 59,
	// 炼金
	ALCHEMIST: 30,
	// 诗人
	BARD: 7,
	// 飘泊客
	DRIFTER: 17,
	// 角斗士
	GLADIATOR: 1,
	// 猎人
	HUNTER: 4,
	// 杂耍艺人
	JUGGLER: 71,
	// 骑士
	KNIGHT: 68,
	// 圣武士
	PALADIN: 67,
	// 祭司
	PRIEST: 69,
	// 学者
	SCHOLAR: 3,
	// 萨满
	SHAMAN: 11,
	// 死灵
	NECROMANCER: 26,
	// 舞者
	DANCER: 18,
	// 全部
	ALL: 0
};

const RACE = {
	// 边塞人
	BORDER_LANDER: 6,
	// 侏儒
	GNOME: 14,
	// 半身人
	HALFING: 13,
	// 丘陵矮人
	HILL_DWARF: 15,
	// 卡拉希人
	KERASI: 20,
	// 玛格莫精灵
	MAG_MOR_ELF: 12,
	// 提伦埃精灵
	TIRAM_AG_ELF: 8,
	// 林地人
	WOODLANDE: 10,
	// 丁图安蛮族
	DINTURAN: 5,
	// 高山矮人
	MOUNTAIN_DWARF: 16,
	// 拉沙尼人
	RASHANI: 19,
	// 全部
	ALL: 0
};

class SelectBox {
	constructor() {
		this.search = document.querySelector("a.button");
		this.consumable = document.querySelectorAll("input[name=item_3usage_item]");
		this.group = document.querySelectorAll("input[name=item_3group_item]");
		this.selects = this.__select2Init();
		this.attrRequire = document.querySelector(
			"input[name=item_3attribute_value]"
		);
		this.level = document.querySelector("input[name=item_3hero_level]");
		this.levelSelect = document.querySelector(
			"input[name=item_3hero_level_enabled]"
		);
		this.minCondition = document.querySelectorAll(
			"input[name=item_3item_condition]"
		);
		this.maxCondition = document.querySelectorAll(
			"input[name=item_3item_conditionMax]"
		);
	}

	__select2Init() {
		return Array.from($(".search_container select")).map(each => {
			const select = $(each);
			const backgroundColor = select.css("background-color");
			const fontColor = select.css("color");
			const border = select.css("border");
			const borderRadius = select.css("border-radius");
			select.select2();
			return select;
		});
	}

	clear(commit) {
		Object.keys(SELECT_ITEM).map(key => {
			this.__setSelect(key, 0);
		});
		this.setConsumable();
		this.setGroup();
		this.setRequireAttribute();
		this.setLevel();
		this.setMaxCondition();
		this.setMinCondition();
		if (commit) this.search();
	}

	search() {
		this.search.click();
	}

	setClasses(num) {
		return this.__setSelect(SELECT_ITEM.CLASSES, num);
	}

	setRace(num) {
		return this.__setSelect(SELECT_ITEM.RACE, num);
	}

	setPosition(num) {
		return this.__setSelect(SELECT_ITEM.POSITION, num);
	}

	setUnique(num) {
		return this.__setSelect(SELECT_ITEM.UNIQUE, num);
	}

	setAttribute(num) {
		return this.__setSelect(SELECT_ITEM.ATTRIBUTE, num);
	}

	setItemType(num) {
		return this.__setSelect(SELECT_ITEM.ITEM_TYPE, num);
	}

	setSkill(num) {
		return this.__setSelect(SELECT_ITEM.SKILL, num);
	}

	setUseSkill(num) {
		return this.__setSelect(SELECT_ITEM.USE_SKILL, num);
	}

	setSkillType(num) {
		return this.__setSelect(SELECT_ITEM.SKILL_TYPE, num);
	}

	setCoordinate(num) {
		return this.__setSelect(SELECT_ITEM.COORDINATE, num);
	}

	setInlay(num) {
		return this.__setSelect(SELECT_ITEM.INLAY, num);
	}

	setRequireAttribute(index, num) {
		this.attrRequire.value = num || "eff_at_st";
		return this.__setSelect(SELECT_ITEM.REQUIRE_ATTRIBUTE, index);
	}

	__setSelect(ITEM, NUM) {
		const select = this.selects[ITEM];
		const option = select.querySelector(`option[value=${NUM}]`);
		option.selected = true;
		const event = this.__createEvent("HTMLEvents", "change", false, true);
		select.dispatchEvent(event);
		return select;
	}

	__createEvent(type, eventType, canBubble, cancelable) {
		return document
			.createEvent(type)
			.initEvent(eventType, canBubble, cancelable);
	}

	setLevel(use, level) {
		if (use) this.levelSelect.click();
		this.level.value = level;
	}

	setMinCondition(num = 0) {
		this.minCondition[num].click();
	}

	setMaxCondition(num = 7) {
		this.maxCondition[num].click();
	}

	setConsumable(num = 0) {
		this.consumable[num].click();
	}

	setGroup(num = 0) {
		this.group[num].click();
	}
}
