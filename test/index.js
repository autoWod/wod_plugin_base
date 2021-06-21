/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 16:26:12
 * @LastEditors: lax
 * @LastEditTime: 2021-06-21 16:53:15
 * @FilePath: \wod_plugin_base\test\index.js
 */
// ==UserScript==
// @name         wod_plugin_base_test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  wod_plugin_base_test
// @author       lax
// @match        http://delta.world-of-dungeons.org/*
// @require       https://code.jquery.com/jquery-3.6.0.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js
// @resource      select2-css https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css
// @require      file://D:\project\lax\autoWod\wod_plugin_base\src\index.js
// @grant         GM_addStyle
// @grant         GM_getResourceText
// ==/UserScript==

(function() {
	"use strict";

	GM_addStyle(GM_getResourceText("select2-css"));
	const box = new SelectBox();

	// Your code here...
})();
