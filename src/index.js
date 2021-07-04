/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 18:58:21
 * @LastEditors: lax
 * @LastEditTime: 2021-07-04 13:10:05
 * @FilePath: \wod_plugin_base\src\index.js
 */

const pojo = require.context("./pojo", false, /.js$/);
const WOD = {};
pojo.keys().map(filename => {
	const name = filename.split(".js")[0].split("/")[1];
	WOD[name] = pojo(filename);
});
window.WOD = WOD;

let url = location.href;

if (url.includes("world-of-dungeons") && url.includes("skills.php"))
	WOD.SkillMap.getOnt().save();
module.exports = WOD;
