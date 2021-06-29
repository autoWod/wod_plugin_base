/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-06-26 16:08:19
 * @LastEditors: lax
 * @LastEditTime: 2021-06-29 22:16:43
 * @FilePath: \wod_plugin_base\src\pojo\Tactics.JS
 */
class Tactics {
	constructor() {
		this.type = $("#wod-orders > div");
		this.saveButton = $("input[value=保存]");
		this.form = $("form[action='/wod/spiel/hero/skillconfig.php']");
		this.tactics = this.getTactics();
		this.levels = $("#wod-orders div .wod-tabs li");
	}

	getTactics() {
		const WOD_CFG = window.WOD_CFG;
		console.log(window);
		console.log(window.WOD_CFG);
		const xs = new XmlSerializer();
		// WOD_CFG.serialize(xs);
		return WOD_CFG;
	}

	getProfileId() {
		const WOD_CFG = window.WOD_CFG;
		return WOD_CFG.ui_orders.profileDropdown.getSelectedProfile().id;
	}

	post(data) {
		this.form.find("input[name=data]").val(base64_encode(data));
		this.form.find("input[name=action]").val("save");
		this.form.find("input[name=profile]").val(this.getProfileId());
		this.form.find("input[name=SELECTED_TAB]").val("wod-orders-tab-dungeon");
		this.form.find("input[name=SELECTED_LVL]").val(level);
		this.form.find("input[name=SELECTED_DUEL]").val("hero");

		this.form.submit();
	}
}

module.exports = Tactics;
