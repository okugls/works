"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./components/Recommend/Recommend.js";
  "./components/Classify/Classify.js";
  "./components/Toptic/Toptic.js";
  "./components/Mine/Mine.js";
  "./pages/Toptic-item/Toptic-item.js";
  "./pages/Classify-item/Classify-item.js";
  "./pages/ImagePreview/ImagePreview.js";
  "./pages/Person/Person.js";
  "./pages/Minitem/Minitem.js";
  "./pages/Question/Question.js";
  "./pages/Feedback/Feedback.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
