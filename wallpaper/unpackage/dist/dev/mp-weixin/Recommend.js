"use strict";
const common_vendor = require("./common/vendor.js");
const RecJs = {
  ToclassifyItem({
    type,
    text
  }) {
    common_vendor.index.navigateTo({
      url: `/pages/Classify-item/Classify-item?type=${type}&text=${text}`
    });
  },
  Toclassify() {
    common_vendor.index.switchTab({
      url: "/components/Classify/Classify"
    });
  },
  Totoptic() {
    common_vendor.index.switchTab({
      url: "/components/Toptic/Toptic"
    });
  },
  toRanking() {
    common_vendor.index.navigateTo({
      url: "/pages/Ranking/Ranking"
    });
  },
  img_8: common_vendor.reactive([]),
  get_img_8() {
    common_vendor.index.request({
      url: "http://127.0.0.1:8080/get_img_8",
      method: "GET",
      success: (res) => {
        if (this.img_8) {
          this.img_8.splice(0, this.img_8.length);
          this.img_8.push(...res.data);
        }
      },
      fail: (err) => {
        common_vendor.index.__f__("log", "at components/Recommend/Recommend.js:42", err);
      }
    });
  },
  toShowImages({ type, imgs, index }) {
    common_vendor.index.navigateTo({
      url: `/pages/ImagePreview/ImagePreview?imgs=${imgs}&index=${index}`
    });
  }
};
exports.RecJs = RecJs;
//# sourceMappingURL=../.sourcemap/mp-weixin/Recommend.js.map
