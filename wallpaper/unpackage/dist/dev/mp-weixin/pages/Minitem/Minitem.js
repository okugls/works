"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Minitem",
  setup(__props) {
    var _a;
    let imgs = common_vendor.reactive([]);
    let text = common_vendor.ref("");
    const uid = (_a = common_vendor.index.getStorageSync("userInfo")) == null ? void 0 : _a.uid;
    common_vendor.onLoad(async (option) => {
      text.value = option.text;
      common_vendor.index.setNavigationBarTitle({
        title: text.value
      });
      getImagesByText();
    });
    const getImagesByText = async () => {
      try {
        let res;
        let imgUrls = [];
        if (text.value === "我的喜欢") {
          res = await common_vendor.index.request({
            url: "http://127.0.0.1:8080/like",
            method: "GET",
            data: {
              uid
            }
          });
          imgUrls = res.data.data.map((item) => item.url);
        } else if (text.value === "我的下载") {
          res = await common_vendor.index.request({
            url: "http://127.0.0.1:8080/download",
            method: "GET",
            data: {
              uid
            }
          });
          imgUrls = res.data.data;
        }
        if (res.data.code === 200) {
          imgs.length = 0;
          imgs.push(...imgUrls);
        } else {
          common_vendor.index.showToast({
            title: "请求失败",
            icon: "error"
          });
        }
      } catch (err) {
        common_vendor.index.showToast({
          title: "网络异常",
          icon: "error"
        });
      }
    };
    function toImgShow({ imgs: imgs2, index }) {
      common_vendor.index.navigateTo({
        url: `/pages/ImagePreview/ImagePreview?imgs=${imgs2}&index=${index}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(imgs), (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => toImgShow({
              imgs: common_vendor.unref(imgs),
              index
            }), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff7357c5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Minitem/Minitem.js.map
