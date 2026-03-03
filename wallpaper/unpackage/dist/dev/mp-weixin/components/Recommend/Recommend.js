"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Recommend = require("../../Recommend.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_notice_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_notice_bar + Classify + _easycom_uni_icons + Toptic)();
}
const Classify = () => "../Classify/Classify2.js";
const Toptic = () => "../Toptic/Toptic2.js";
const _sfc_main = {
  __name: "Recommend",
  setup(__props) {
    Recommend.RecJs.get_img_8();
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).ToclassifyItem({
          type: "Art",
          text: "色彩艺术"
        })),
        c: common_assets._imports_1,
        d: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).ToclassifyItem({
          type: "Pets",
          text: "可爱萌宠"
        })),
        e: common_assets._imports_2,
        f: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).ToclassifyItem({
          type: "AI",
          text: "AI绘画"
        })),
        g: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          ["background-color"]: "whitesmoke",
          color: "",
          moreColor: "",
          text: "欢迎关注白了白壁纸分享"
        }),
        h: common_assets._imports_3,
        i: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).get_img_8()),
        j: common_vendor.f(common_vendor.unref(Recommend.RecJs).img_8, (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).toShowImages({
              imgs: common_vendor.unref(Recommend.RecJs).img_8,
              index
            }), index)
          };
        }),
        k: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).Toclassify()),
        l: common_vendor.p({
          showCount: 9
        }),
        m: common_vendor.p({
          type: "more-filled",
          size: "25",
          color: "white"
        }),
        n: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).Toclassify()),
        o: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).Totoptic())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24b3061d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Recommend/Recommend.js.map
