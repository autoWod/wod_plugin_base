/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 18:58:21
 * @LastEditors: lax
 * @LastEditTime: 2021-06-26 16:01:16
 * @FilePath: \wod_plugin_base\src\index.js
 */

const pojo = require.context("./pojo", false, /.js$/);
const WOD = {};
pojo.keys().map(filename => {
	const name = filename.split(".js")[0].split("/")[1];
	WOD[name] = pojo(filename);
});

module.exports = WOD;
