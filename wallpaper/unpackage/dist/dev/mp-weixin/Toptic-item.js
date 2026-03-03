"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
const _sfc_main = {
  __name: "Toptic-item",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        imgs: [],
        title: "",
        likeCount: 0,
        picCount: 0
      })
    }
  },
  setup(__props) {
    const getClipPath = (index) => {
      const paths = [
        "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
        "polygon(20% 0, 100% 0, 80% 100%, 0 100%)",
        "polygon(20% 0, 100% 0, 80% 100%, 0 100%)",
        "polygon(20% 0, 100% 0, 100% 100%, 0 100%)"
      ];
      return paths[index] || "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    };
    const toClassifyItem = (type) => {
      common_vendor.index.navigateTo({
        url: `/pages/Classify-item/Classify-item?type=${type}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.item.imgs, (img, index, i0) => {
          return {
            a: index,
            b: img,
            c: getClipPath(index)
          };
        }),
        b: common_vendor.t(__props.item.title),
        c: common_vendor.t(__props.item.likeCount),
        d: common_assets._imports_0$3,
        e: common_vendor.t(__props.item.picCount),
        f: common_vendor.o(($event) => toClassifyItem(__props.item.type))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8316b547"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/Toptic-item.js.map
