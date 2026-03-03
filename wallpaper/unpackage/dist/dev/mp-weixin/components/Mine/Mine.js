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
  __name: "Mine",
  setup(__props) {
    const user = common_vendor.reactive({
      userName: "",
      userImg: "",
      userid: ""
    });
    const showAuthBtn = common_vendor.ref(false);
    const loginLock = common_vendor.ref(false);
    const list = [
      {
        id: "01",
        text: "我的下载",
        icon: "download-filled"
      },
      {
        id: "02",
        text: "我的喜欢",
        icon: "heart-filled"
      },
      {
        id: "03",
        text: "常见问题",
        icon: "flag-filled"
      },
      {
        id: "04",
        text: "联系客服",
        icon: "chatboxes-filled"
      },
      {
        id: "05",
        text: "反馈建议",
        icon: "email-filled"
      },
      {
        id: "06",
        text: "退出登陆",
        icon: "gear-filled"
      }
    ];
    common_vendor.onLoad(() => {
      const savedUser = common_vendor.index.getStorageSync("userInfo");
      if (savedUser) {
        user.userName = savedUser.userName;
        user.userImg = savedUser.userImg;
        user.uid = savedUser.uid;
      }
    });
    const handleUserClick = () => {
      const savedUser = common_vendor.index.getStorageSync("userInfo");
      if (savedUser && savedUser.uid) {
        common_vendor.index.navigateTo({
          url: "/pages/Person/Person"
        });
      } else {
        showAuthBtn.value = true;
      }
    };
    const handleAuth = async (e) => {
      if (loginLock.value)
        return;
      loginLock.value = true;
      try {
        const userInfo = e.detail.userInfo;
        if (!userInfo) {
          common_vendor.index.showToast({
            title: "授权失败",
            icon: "error"
          });
          return;
        }
        const loginRes = await common_vendor.index.login({
          provider: "weixin"
        });
        if (loginRes.errMsg !== "login:ok" || !loginRes.code) {
          common_vendor.index.showToast({
            title: "登录失败，请重试",
            icon: "error"
          });
          return;
        }
        const apiRes = await common_vendor.index.request({
          url: "http://127.0.0.1:8080/login",
          method: "POST",
          data: {
            userInfo
            // 用户昵称、头像
          }
        });
        if (apiRes.data.code === 200) {
          const resData = apiRes.data.data;
          const userInfo2 = resData.userInfo;
          user.userName = userInfo2.nickName;
          user.userImg = userInfo2.avatarUrl;
          user.uid = userInfo2.uid;
          common_vendor.index.setStorageSync("userInfo", {
            userName: user.userName,
            userImg: user.userImg,
            uid: user.uid
          });
          common_vendor.index.showToast({
            title: "登录成功"
          });
          showAuthBtn.value = false;
        } else {
          common_vendor.index.showToast({
            title: apiRes.data.msg || "登录失败",
            icon: "error"
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at components/Mine/Mine.vue:174", "登录异常：", err);
        common_vendor.index.showToast({
          title: "系统异常，请稍后再试",
          icon: "error"
        });
      } finally {
        loginLock.value = false;
      }
    };
    const toMinitems = (text) => {
      const isLogin = common_vendor.index.getStorageSync("userInfo") !== "";
      let url = "";
      if (!isLogin) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "error"
        });
        return;
      } else {
        switch (text) {
          case "我的下载":
            url = `/pages/Minitem/Minitem?text=${text}`;
            break;
          case "我的喜欢":
            url = `/pages/Minitem/Minitem?text=${text}`;
            break;
          case "常见问题":
            url = "/pages/Question/Question";
            break;
          case "联系客服":
            common_vendor.index.openCustomerServiceChat({
              corpId: "",
              success: () => {
                common_vendor.index.__f__("log", "at components/Mine/Mine.vue:209", "唤起客服成功");
              },
              fail: (err) => {
                common_vendor.index.showToast({
                  title: "唤起客服失败",
                  icon: "error"
                });
              }
            });
            break;
          case "反馈建议":
            url = "/pages/Feedback/Feedback";
            break;
          case "退出登陆":
            user.userName = "";
            user.userImg = "";
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.removeStorageSync("likeStatus");
            common_vendor.index.$emit("userLogout");
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
            return;
          default:
            common_vendor.index.showToast({
              title: "页面暂未开发",
              icon: "error"
            });
            return;
        }
      }
      if (url) {
        common_vendor.index.navigateTo({
          url
        });
      }
    };
    const hid = function() {
      showAuthBtn.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: user.userImg || "/static/images/mine.png",
        b: common_vendor.t(user.userName || "点击登录"),
        c: common_vendor.o(handleUserClick),
        d: common_vendor.f(list, (item, k0, i0) => {
          return {
            a: "358cee86-0-" + i0,
            b: common_vendor.p({
              type: item.icon,
              color: "green",
              size: "20"
            }),
            c: common_vendor.t(item.text),
            d: "358cee86-1-" + i0,
            e: item.id,
            f: common_vendor.o(($event) => toMinitems(item.text), item.id)
          };
        }),
        e: common_vendor.p({
          type: "right",
          color: "darkgray",
          size: "15"
        }),
        f: showAuthBtn.value
      }, showAuthBtn.value ? common_vendor.e({
        g: showAuthBtn.value
      }, showAuthBtn.value ? {
        h: common_vendor.o(handleAuth),
        i: common_vendor.o(hid)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-358cee86"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Mine/Mine.js.map
