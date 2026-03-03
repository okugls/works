"use strict";
const common_vendor = require("../../common/vendor.js");
const Recommend = require("../../Recommend.js");
const _sfc_main = {
  __name: "Classify-item",
  setup(__props) {
    let typeImgs = common_vendor.reactive([]);
    let type = common_vendor.ref("");
    function getTypeImg(type2) {
      return new Promise((res, rej) => {
        common_vendor.index.request({
          url: "http://127.0.0.1:8080/get_type",
          data: {
            type: type2
          },
          method: "GET",
          success: (resData) => {
            res(resData.data);
          },
          fail: (err) => {
            rej(err);
            common_vendor.index.__f__("log", "at pages/Classify-item/Classify-item.vue:33", err);
          }
        });
      });
    }
    common_vendor.onLoad(async (option) => {
      type.value = option.type;
      common_vendor.index.setNavigationBarTitle({
        title: option.text || option.type
      });
      const imgs = await getTypeImg(option.type);
      typeImgs.push(...imgs);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(typeImgs), (i, index, i0) => {
          return {
            a: i,
            b: index,
            c: common_vendor.o(($event) => common_vendor.unref(Recommend.RecJs).toShowImages({
              imgs: common_vendor.unref(typeImgs),
              index
            }), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32061ff0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Classify-item/Classify-item.js.map
