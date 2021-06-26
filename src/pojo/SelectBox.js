/*
 * @Description: wod_plugin_base
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-15 10:50:14
 * @LastEditors: lax
 * @LastEditTime: 2021-06-26 16:06:08
 * @FilePath: \wod_plugin_base\src\pojo\SelectBox.js
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
	// 祭司x``1
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

// 储存位置
const ITEM_POSITION = {
	// 仓库
	LOCAL: 1,
	// 团队仓库
	PUBLIC: 2,
	// 宝库
	GROUP: 3,
	// 储藏室
	PRIVATE: 4
};

const SEARCH_STATUS = "wod_plugin_base_search_status";

/**
 * @class SelectBox
 * @classdesc 搜索框对象
 */
class SelectBox {
	constructor() {
		this.__init();
		this.lib = this.__getLib();
		this.searchButton = $("a.button");
		this.consumable = $("input[name=item_3usage_item]");
		this.group = $("input[name=item_3group_item]");
		this.selects = this.__select2Init();
		this.attrRequire = $("input[name=item_3attribute_value]");
		this.level = $("input[name=item_3hero_level]");
		this.levelSelect = $("input[name=item_3hero_level_enabled]");
		this.minCondition = $("input[name=item_3item_condition]");
		this.maxCondition = $("input[name=item_3item_conditionMax]");
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 初始化方法
	 * @version 1.0.0
	 */
	__init() {
		this.__checkJquery();
		this.__checkSelect2();
		this.__checkGM();
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 监测jquery库文件
	 * @version 1.0.0
	 */
	__checkJquery() {
		this.__check(() => {
			$;
		}, "无法访问jquery，请引入该库或联系该脚本的开发者！");
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 监测select2库文件
	 * @version 1.0.0
	 */
	__checkSelect2() {
		this.__check(() => {
			$().select2();
		}, "无法访问select2，请引入该库或联系该脚本的开发者！");
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 监测GM功能是否开启
	 * @version 1.0.0
	 */
	__checkGM() {
		this.__check(() => {
			GM_addStyle;
		}, "无法访问GM_addStyle，请打开或联系该脚本的开发者！");

		this.__check(() => {
			GM_getResourceText;
		}, "无法访问GM_getResourceText，请打开或联系该脚本的开发者！");
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 检查功能
	 * @version 1.0.0
	 * @param {function} fun 检查的函数
	 * @param {string} errmsg 问题的消息
	 */
	__check(fun, errmsg) {
		try {
			fun();
		} catch (error) {
			alert(errmsg);
		}
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 获取储存器
	 * @version 1.0.0
	 * @returns 储存对象
	 */
	__getLib() {
		let lib = window.localStorage;
		lib || alert("无法访问浏览器数据库，请更换或升级浏览器！");
		// TODO 兼容无local storage的浏览器
		return lib;
	}

	/**
	 * @private
	 * @method
	 * @memberof SelectBox
	 * @description 选择框升级为select2
	 * @version 1.0.0
	 * @returns 选择框对象
	 */
	__select2Init() {
		const _selects = Array.from($(".search_container select"));

		// 获取原本皮肤的样式
		const one = $(_selects[0]);
		const backgroundColor = one.css("background-color");
		const fontColor = one.css("color");
		const border = one.css("border");
		const borderRadius = one.css("border-radius");

		// 激活select2
		const selects = _selects.map(each => {
			const select = $(each);
			select.select2();
			return select;
		});

		// 设置原皮肤样式
		GM_addStyle(
			`
			.select2-container .select2-selection--single {
				background-color: ${backgroundColor};
				border: ${border};
				borderRadius: ${borderRadius};
			}
			.select2-dropdown {
				background-color: ${backgroundColor};
				color: ${fontColor};
				border: ${border};
			}
			.select2-selection {
				background-color: ${backgroundColor};
			}
			.select2-container--default .select2-selection--single .select2-selection__rendered {
				color: ${fontColor};
			}
			`
		);
		return selects;
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 清除搜索项
	 * @param {boolean} commit 清除完毕后是否直接搜索
	 * @version 1.0.0
	 */
	clear(commit = false) {
		Object.keys(SELECT_ITEM).map(key => {
			this.setSelect(SELECT_ITEM[key]);
		});
		this.setConsumable();
		this.setGroup();
		this.setRequireAttribute();
		this.setLevel();
		this.setMaxCondition();
		this.setMinCondition();
		if (commit) this.search();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 开始搜索
	 * @version 1.0.0
	 */
	search() {
		this.searchButton.click();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置职业
	 * @param {number} NUM 职业
	 * @version 1.0.0
	 */
	setClasses(num) {
		return this.setSelect(SELECT_ITEM.CLASSES, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置种族
	 * @param {number} NUM 种族
	 * @version 1.0.0
	 */
	setRace(num) {
		return this.setSelect(SELECT_ITEM.RACE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置装备位置
	 * @param {number} NUM 装备位置
	 * @version 1.0.0
	 */
	setPosition(num) {
		return this.setSelect(SELECT_ITEM.POSITION, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置唯一性
	 * @param {number} NUM 唯一性
	 * @version 1.0.0
	 */
	setUnique(num) {
		return this.setSelect(SELECT_ITEM.UNIQUE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置属性
	 * @param {number} NUM 属性
	 * @version 1.0.0
	 */
	setAttribute(num) {
		return this.setSelect(SELECT_ITEM.ATTRIBUTE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置物品类型
	 * @param {number} NUM 物品类型
	 * @version 1.0.0
	 */
	setItemType(num) {
		return this.setSelect(SELECT_ITEM.ITEM_TYPE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置技能
	 * @param {number} NUM 技能名称
	 * @version 1.0.0
	 */
	setSkill(num) {
		return this.setSelect(SELECT_ITEM.SKILL, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置可使用的技能
	 * @param {number} NUM 可使用技能名称
	 * @version 1.0.0
	 */
	setUseSkill(num) {
		return this.setSelect(SELECT_ITEM.USE_SKILL, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置技能类型
	 * @param {number} NUM 技能类型名称
	 * @version 1.0.0
	 */
	setSkillType(num) {
		return this.setSelect(SELECT_ITEM.SKILL_TYPE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置套装
	 * @param {number} NUM 套装名称
	 * @version 1.0.0
	 */
	setCoordinate(num) {
		return this.setSelect(SELECT_ITEM.COORDINATE, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置镶嵌
	 * @param {number} NUM 镶嵌选项
	 * @version 1.0.0
	 */
	setInlay(num) {
		return this.setSelect(SELECT_ITEM.INLAY, num);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置属性要求
	 * @param {string} index 要求的选项
	 * @param {number} num 属性值至少为多少
	 * @version 1.0.0
	 * @returns 选择框对象
	 */
	setRequireAttribute(index = "eff_at_st", num = "") {
		this.attrRequire.value = num;
		return this.setSelect(SELECT_ITEM.REQUIRE_ATTRIBUTE, index);
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置适用等级
	 * @param {boolean} use 是否设置
	 * @param {number} level 适用等级
	 * @version 1.0.0
	 */
	setLevel(use = false, level = 1) {
		if (use) this.levelSelect.click();
		this.level.value = level;
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置最小质量
	 * @param {number} NUM 0-6
	 * @version 1.0.0
	 */
	setMinCondition(num = 0) {
		this.minCondition[num].click();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置最大质量
	 * @param {number} NUM 0-6
	 * @version 1.0.0
	 */
	setMaxCondition(num = 6) {
		this.maxCondition[num].click();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置是否为耗材
	 * @param {number} NUM 0不限/1是/2否
	 * @version 1.0.0
	 */
	setConsumable(num = 0) {
		this.consumable[num].click();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 设置是否为团队物品
	 * @param {number} NUM 0不限/1是/2否
	 * @version 1.0.0
	 */
	setGroup(num = 0) {
		this.group[num].click();
	}

	/**
	 * @public
	 * @method
	 * @memberof SelectBox
	 * @description 指定选择框，并选择具体的选项
	 * @param {number} ITEM
	 * @param {number} NUM
	 * @version 1.0.0
	 * @returns 选择框对象
	 */
	setSelect(ITEM = 0, NUM = 0) {
		const select = $(this.selects[ITEM]);
		select.val(NUM).trigger("change");
		return select;
	}
}
SelectBox.SELECT_ITEM = SELECT_ITEM;
SelectBox.CLASSES = CLASSES;
SelectBox.RACE = RACE;
module.exports = SelectBox;
