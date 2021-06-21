/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-21 16:26:12
 * @LastEditors: lax
 * @LastEditTime: 2021-06-21 22:30:26
 * @FilePath: \wod_plugin_base\test\script.js
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
// @require      file://D:\project\person\wod\wod_plugin_base\src\index.js
// @require      file://D:\project\person\wod\wod_plugin_base\test\index.js
// @grant         GM_addStyle
// @grant         GM_getResourceText
// ==/UserScript==

(function() {
	// GM_addStyle(GM_getResourceText("select2-css"));
	test();
	// Your code here...

})();
