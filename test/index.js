/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 16:26:12
 * @LastEditors: lax
 * @LastEditTime: 2021-06-22 00:11:41
 * @FilePath: \wod_plugin_base\test\index.js
 */

function test(){
	"use strict";
	const box = new SelectBox();
	console.log(box);
	box.setClasses(CLASSES.ADVENTURER);
	box.setRace(RACE.GNOME);
	box.setConsumable(1);
	box.setMinCondition(6);
	box.setMaxCondition(0);
	// box.clear(true);
	// box.setClasses(CLASSES.MAGE);
	// box.search();
	
};
