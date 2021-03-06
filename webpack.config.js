/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-12 16:44:57
 * @LastEditors: lax
 * @LastEditTime: 2021-06-29 22:16:02
 * @FilePath: \wod_plugin_base\webpack.config.js
 */
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
const env = process.env.NODE_ENV === "production";
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	devtool: env ? false : "inline-cheap-source-map",
	entry: ["./src/index.js"],
	output: {
		path: resolve("dist"),
		filename: "wodBase.js",
		library: {
			type: "var",
			name: "WOD"
		}
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						// drop_console: true
					}
				}
			})
		]
	},
	resolve: {
		// 设置别名
		alias: {
			"@": resolve("src"),
			"@test": resolve("test")
		}
	},
	mode: process.env.NODE_ENV || "development"
};
