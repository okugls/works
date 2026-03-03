"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "ImagePreview",
  setup(__props) {
    let imgs = common_vendor.reactive([]);
    let idx = common_vendor.ref(0);
    let hour, minutes, month, data = common_vendor.ref("");
    let likeStatus = common_vendor.reactive({});
    let heart = common_vendor.reactive(["/static/images/heart.png", "/static/images/activeHeart.png"]);
    common_vendor.onLoad((option) => {
      const date = /* @__PURE__ */ new Date();
      hour = date.getHours().toString().padStart(2, "0");
      minutes = date.getMinutes().toString().padStart(2, "0");
      month = date.getMonth() + 1;
      data = date.getDate().toString().padStart(2, "0");
      imgs.push(...option.imgs.split(","));
      idx.value = Number(option.index);
      getLikeStatus();
    });
    async function getLikeStatus() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        const uid = (userInfo == null ? void 0 : userInfo.uid) || "";
        if (!uid) {
          likeStatus == common_vendor.reactive({});
          return;
        }
        const res = await common_vendor.index.request({
          url: "http://127.0.0.1:8080/like",
          method: "GET",
          data: { uid }
          // 传递uid
        });
        if (res.statusCode === 200 && res.data.code === 200) {
          res.data.data.forEach((item) => {
            const islikeNum = Number(item.islike);
            likeStatus[item.url] = islikeNum === 1;
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/ImagePreview/ImagePreview.vue:80", "获取喜欢状态失败：", err);
      }
    }
    common_vendor.onMounted(() => {
      common_vendor.index.$on("userLogout", () => {
        likeStatus = common_vendor.reactive({});
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("userLogout");
    });
    async function like(idx2) {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!(userInfo == null ? void 0 : userInfo.uid)) {
        common_vendor.index.navigateTo({
          url: "/components/Mine/Mine"
        });
        return;
      }
      const currentUrl = imgs[idx2];
      const newStatus = !likeStatus[currentUrl];
      likeStatus[currentUrl] = newStatus;
      try {
        await common_vendor.index.request({
          url: "http://127.0.0.1:8080/like",
          method: "POST",
          data: {
            url: currentUrl,
            islike: newStatus ? 1 : 0,
            uid: userInfo.uid
            // 传递当前用户的uid
          }
        });
      } catch (err) {
        likeStatus[currentUrl] = !newStatus;
        common_vendor.index.showToast({
          title: "爱心状态同步失败",
          icon: "error"
        });
      }
    }
    function changeIndex(e) {
      idx.value = e.detail.current;
    }
    function back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    let getHeartSrc = (idx2) => {
      let currentUrl = imgs[idx2];
      return likeStatus[currentUrl] ? heart[1] : heart[0];
    };
    const downLoad = async (idx2) => {
      try {
        const imgUrl = imgs[idx2];
        if (!imgUrl) {
          common_vendor.index.showToast({
            title: "图片地址无效",
            icon: "error"
          });
          return;
        }
        const settingRes = await new Promise((resolve) => common_vendor.index.getSetting({
          success: resolve
        }));
        if (!settingRes.authSetting["scope.writePhotosAlbum"]) {
          const authRes = await new Promise(
            (resolve) => common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success: resolve,
              fail: resolve
            })
          );
          if (authRes.errMsg.includes("fail auth deny")) {
            common_vendor.index.showModal({
              title: "权限申请",
              content: "需要获取相册权限以保存图片，请前往设置开启",
              confirmText: "去设置",
              success: (modalRes) => {
                if (modalRes.confirm) {
                  common_vendor.index.openSetting({
                    success: (settingRes2) => {
                      if (settingRes2.authSetting["scope.writePhotosAlbum"]) {
                        download(idx2);
                      }
                    }
                  });
                }
              }
            });
            return;
          }
        }
        const downloadRes = await new Promise(
          (resolve, reject) => common_vendor.index.downloadFile({
            url: imgUrl,
            success: resolve,
            fail: reject
          })
        );
        await new Promise(
          (resolve, reject) => common_vendor.index.saveImageToPhotosAlbum({
            filePath: downloadRes.tempFilePath,
            success: resolve,
            fail: reject
          })
        );
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        const uid = (userInfo == null ? void 0 : userInfo.uid) || "";
        const apiRes = await common_vendor.index.request({
          url: "http://127.0.0.1:8080/download",
          method: "POST",
          data: {
            imgUrl,
            uid
          }
        });
        if (apiRes.data.success) {
          common_vendor.index.__f__("log", "at pages/ImagePreview/ImagePreview.vue:227", "下载记录已存入数据库");
        } else {
          common_vendor.index.__f__("error", "at pages/ImagePreview/ImagePreview.vue:229", "下载记录存储失败：", apiRes.data.error);
        }
        common_vendor.index.showToast({
          title: "下载成功",
          icon: "success"
        });
      } catch (err) {
        common_vendor.index.showToast({
          title: err.errMsg || "下载失败",
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left",
          color: "white",
          size: "20"
        }),
        b: common_vendor.o(back),
        c: common_vendor.t(common_vendor.unref(idx) + 1),
        d: common_vendor.t(common_vendor.unref(imgs).length),
        e: common_vendor.t(common_vendor.unref(hour)),
        f: common_vendor.t(common_vendor.unref(minutes)),
        g: common_vendor.t(common_vendor.unref(month)),
        h: common_vendor.t(common_vendor.unref(data)),
        i: common_vendor.f(common_vendor.unref(imgs), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        j: common_vendor.unref(idx),
        k: common_vendor.o(changeIndex),
        l: common_vendor.o(($event) => like(common_vendor.unref(idx))),
        m: common_vendor.unref(getHeartSrc)(common_vendor.unref(idx)),
        n: common_vendor.o(($event) => downLoad(common_vendor.unref(idx))),
        o: common_vendor.p({
          id: "download",
          type: "download",
          color: "black",
          size: "30"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6976185a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ImagePreview/ImagePreview.js.map
