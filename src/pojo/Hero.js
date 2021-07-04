/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-04 11:58:25
 * @LastEditors: lax
 * @LastEditTime: 2021-07-04 12:10:46
 * @FilePath: \wod_plugin_base\src\pojo\Hero.js
 */
let ont;
class Hero {
	constructor() {
		this._ = $(".hero_full");
		this.name = this._.find(".font_Hero_Name").text();
		this.title = this._.find(".font_Hero_Title").text();
		this.class = this._.find(".font_Hero_Class").text();
		this.race = this._.find(".font_Hero_Race").text();
		this.level = this._.find(".font_Hero_Level").text();
	}

	getName() {
		return this.name;
	}

	getTitle() {
		return this.title;
	}

	getClass() {
		return this.class;
	}

	getRace() {
		return this.race;
	}

	getLevel() {
		return this.level;
	}
}

Hero.getOnt = () => {
	if (!ont) ont = new Hero();
	return ont;
};

module.exports = Hero;
