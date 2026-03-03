<template>
	<view class="mine-contain">
		<!-- 用户区域：点击显示授权按钮 -->
		<view class="user" @click="handleUserClick">
			<view class="img">
				<image :src="user.userImg || '/static/images/mine.png'"></image>
			</view>
			<text>{{ user.userName || '点击登录' }}</text>
		</view>

		<!-- 功能列表 -->
		<view class="list">
			<view class="ul">
				<view class="li" v-for="item in list" :key="item.id" @click="toMinitems(item.text)">
					<uni-icons class="icon" :type="item.icon" color="green" size="20"></uni-icons>
					<text>{{ item.text }}</text>
					<uni-icons class="icon-right" type="right" color="darkgray" size="15"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 微信授权按钮（默认隐藏） -->
		<view class="mask" v-if="showAuthBtn">
			<view class="btn" v-if="showAuthBtn">
				<button open-type="getUserInfo" @getuserinfo="handleAuth" class="auth-btn">登录</button>
				<button @click="hid">取消</button>
			</view>
		</view>


	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	// 用户信息
	const user = reactive({
		userName: '',
		userImg: '',
		userid: ''
	});
	// 状态标记
	const showAuthBtn = ref(false); // 是否显示授权按钮
	const loginLock = ref(false); // 登录防抖锁
	// 功能列表
	const list = [{
			id: '01',
			text: '我的下载',
			icon: 'download-filled'
		},
		{
			id: '02',
			text: '我的喜欢',
			icon: 'heart-filled'
		},
		{
			id: '03',
			text: '常见问题',
			icon: 'flag-filled'
		},
		{
			id: '04',
			text: '联系客服',
			icon: 'chatboxes-filled'
		},
		{
			id: '05',
			text: '反馈建议',
			icon: 'email-filled'
		},
		{
			id: '06',
			text: '退出登陆',
			icon: 'gear-filled'
		}
	];
	/* onMounted(()=>{
		const savedUser=uni.getStorageSync('userInfo');
		if(savedUser){
			user.userName = savedUser.userName;
			user.userImg = savedUser.userImg;
			user.uid = savedUser.uid;
		}
	}) */
	onLoad(() => {
		const savedUser = uni.getStorageSync('userInfo');
		if (savedUser) {
			user.userName = savedUser.userName;
			user.userImg = savedUser.userImg;
			user.uid = savedUser.uid;
		}
	})

	const handleUserClick = () => {
		// 从本地缓存读取用户信息，判断是否已登录
		const savedUser = uni.getStorageSync('userInfo');
		if (savedUser && savedUser.uid) {
			// 已登录：跳转到个人中心页面（Person.vue）
			uni.navigateTo({
				url: '/pages/Person/Person'
			});
		} else {
			// 未登录：显示授权登录按钮
			showAuthBtn.value = true;
		}
	};
	const handleAuth = async (e) => {
		if (loginLock.value) return;
		loginLock.value = true;
		try {
			// 1. 获取用户基础信息（昵称、头像）
			const userInfo = e.detail.userInfo;
			if (!userInfo) {
				uni.showToast({
					title: '授权失败',
					icon: 'error'
				});
				return;
			}
			// 2. 调用uni.login获取code（用于换openid）
			const loginRes = await uni.login({
				provider: 'weixin'
			});
			if (loginRes.errMsg !== 'login:ok' || !loginRes.code) {
				uni.showToast({
					title: '登录失败，请重试',
					icon: 'error'
				});
				return;
			}

			// 3. 把userInfo传给后端
			const apiRes = await uni.request({
				url: 'http://127.0.0.1:8080/login',
				method: 'POST',
				data: {
					userInfo: userInfo // 用户昵称、头像
				}
			});

			// 4. 处理后端返回结果
			if (apiRes.data.code === 200) {
				const resData = apiRes.data.data;
				const userInfo = resData.userInfo;
				//console.log(userInfo);
				// 更新用户信息
				user.userName = userInfo.nickName;
				user.userImg = userInfo.avatarUrl;
				user.uid = userInfo.uid; // 保存后端返回的uid
				// 存入本地缓存
				uni.setStorageSync('userInfo', {
					userName: user.userName,
					userImg: user.userImg,
					uid: user.uid
				});
				uni.showToast({
					title: '登录成功'
				});
				showAuthBtn.value = false;
			} else {
				uni.showToast({
					title: apiRes.data.msg || '登录失败',
					icon: 'error'
				});
			}
		} catch (err) {
			console.error('登录异常：', err);
			uni.showToast({
				title: '系统异常，请稍后再试',
				icon: 'error'
			});
		} finally {
			loginLock.value = false;
		}
	};

	// 点击功能列表项的跳转方法
	const toMinitems = (text) => {
		const isLogin = uni.getStorageSync('userInfo') !== '';
		let url = '';
		if (!isLogin) {
			uni.showToast({
				title: '请先登录',
				icon: 'error'
			})
			return;
		} else {
			switch (text) {
				case '我的下载':
					url = `/pages/Minitem/Minitem?text=${text}`;
					break;
				case '我的喜欢':
					url = `/pages/Minitem/Minitem?text=${text}`;
					break;
				case '常见问题':
					url = '/pages/Question/Question';
					break;
				case '联系客服':
					uni.openCustomerServiceChat({
						corpId: '',
						success: () => {
							console.log('唤起客服成功')
						},
						fail: (err) => {
							//console.error(err);
							uni.showToast({
								title:'唤起客服失败',
								icon: 'error'
							})
						}
					})
					break;
				case '反馈建议':
					url = '/pages/Feedback/Feedback';
					break;
				case '退出登陆':
					// 退出登录逻辑（如清除用户信息、跳转到登录页）
					user.userName = '';
					user.userImg = '';
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('likeStatus');
					uni.$emit('userLogout');
					uni.showToast({
						title: '已退出登录',
						icon: 'success'
					});
					return; // 退出不需要跳转页面，直接return
				default:
					uni.showToast({
						title: '页面暂未开发',
						icon: 'error'
					});
					return;
			}

		}
		if (url) {
			uni.navigateTo({
				url: url
			});
		}

	};
	const hid = function() {
		showAuthBtn.value = false;
	}
</script>

<style scoped lang="scss">
	.mine-contain {
		width: 690rpx;
		margin: 0 auto;

		.user {
			width: 100%;
			margin-top: 250rpx;

			.img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				display: block;
				width: 100%;
				text-align: center;
				margin-left: 10px;
				font-size: 16px;
				margin: 0 auto;
			}
		}

		.list {
			.ul {
				.li {
					display: flex;
					align-items: center;
					padding: 15px 0;
					border-bottom: 1px solid #f5f5f5;

					text {
						margin: 0 10px;
						flex: 1;
					}

					.icon {
						margin-top: 6rpx;
					}
				}
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.btn {
		margin: 0 auto;
		width: 400rpx;
		height: 300rpx;
		position: fixed;
		background-color: #ffffff;
		display: flex;
		top: 45%;
		left: 23%;
		align-items: center;
		justify-content: center;
		border-radius: 8rpx;

		button {
			text-align: center;
			width: 150rpx;
			height: 55rpx;
			background-color: darkgray;
			font-size: 20rpx;
		}

		.auth-btn {
			background: #07c160;
			color: #fff;
			border-radius: 8px;
		}
	}
</style>