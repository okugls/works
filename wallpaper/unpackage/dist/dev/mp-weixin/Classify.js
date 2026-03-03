"use strict";
const common_vendor = require("./common/vendor.js");
const components_Classify_classifyData = require("./components/Classify/classifyData.js");
const _sfc_main = {
  __name: "Classify",
  props: {
    showCount: {
      type: Number,
      //默认长度
      default: components_Classify_classifyData.allData.length
    }
  },
  setup(__props) {
    const props = __props;
    const showClassify = common_vendor.computed(() => {
      return components_Classify_classifyData.allData.slice(0, props.showCount);
    });
    function TotypeClassify(item) {
      common_vendor.index.navigateTo({
        url: `/pages/Classify-item/Classify-item?type=${item.type}&text=${item.text}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(showClassify.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.text),
            c: index,
            d: common_vendor.o(($event) => TotypeClassify(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2af44efb"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/Classify.js.map
