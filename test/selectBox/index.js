/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 16:26:12
 * @LastEditors: lax
 * @LastEditTime: 2021-06-29 21:50:41
 * @FilePath: \wod_plugin_base\test\selectBox\index.js
 */

function selectBoxTest() {
	"use strict";

	const SelectBox = WOD.SelectBox;

	const box = new SelectBox();
	box.setClasses(SelectBox.CLASSES.ADVENTURER);
	box.setRace(SelectBox.RACE.GNOME);
	box.setConsumable(1);
	box.setMinCondition(6);
	box.setMaxCondition(0);
	// box.clear(true);
	// box.setClasses(CLASSES.MAGE);
	// box.search();
}
