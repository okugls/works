"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Person",
  setup(__props) {
    const avatarUrl = common_vendor.ref("/static/images/user.jpg");
    const nickname = common_vendor.ref("");
    const chooseAvatar = async () => {
      const res = await common_vendor.index.chooseImage({
        count: 1,
        // 仅选1张
        sizeType: ["original", "compressed"]
      });
      avatarUrl.value = res.tempFilePaths[0];
    };
    const submitModify = async () => {
      if (!nickname.value.trim()) {
        common_vendor.index.showToast({
          title: "昵称不能为空",
          icon: "none"
        });
        return;
      }
      const res = await common_vendor.index.request({
        url: "http://127.0.0.1:8080/changeUser",
        method: "POST",
        data: {
          avatar: avatarUrl.value,
          nickname: nickname.value,
          uid: common_vendor.index.getStorageSync("userInfo").uid
        }
      });
      if (res.data.success) {
        const oldUserInfo = common_vendor.index.getStorageSync("userInfo") || {};
        const newUserInfo = { ...oldUserInfo, userName: nickname.value, userImg: avatarUrl.value };
        common_vendor.index.setStorageSync("userInfo", newUserInfo);
        common_vendor.index.navigateBack({
          delta: 1,
          success: () => {
            const pages = getCurrentPages();
            const minePage = pages[pages.length - 1];
            minePage.onLoad();
          }
        });
        common_vendor.index.showToast({
          title: "修改成功"
        });
      } else {
        common_vendor.index.showToast({
          title: "修改失败，请重试",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.o(chooseAvatar),
        c: nickname.value,
        d: common_vendor.o(($event) => nickname.value = $event.detail.value),
        e: common_vendor.o(submitModify)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-976f2597"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Person/Person.js.map
