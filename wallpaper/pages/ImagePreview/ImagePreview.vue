<template>
	<view class="preview-container">
		<view class="back" @click="back">
			<uni-icons class="left" type="left" color="white" size="20"></uni-icons>
		</view>
		<view class="topShow">
			<text class="index">{{idx+1}}/{{imgs.length}}</text>
			<text class="time">{{hour}}<text class="time_item">:</text>{{minutes}}</text>
			<text class="date">{{month}}月{{data}}日</text>
		</view>
		<view class="imageShow">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :current='idx' @change="changeIndex">
					<swiper-item v-for="(item,index) in imgs" :key="index">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="bottomShow">
			<view class="heart">
				<image @click="like(idx)" :src="getHeartSrc(idx)" mode="scaleToFill"></image>
			</view>
			<uni-icons @click="downLoad(idx)" id="download" type="download" color="black" size="30"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		computed,
		onUnmounted,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	let imgs = reactive([]);
	let idx = ref(0);
	let hour, minutes, month, data = ref('');
	let likeStatus = reactive({});
	let heart = reactive(['/static/images/heart.png', '/static/images/activeHeart.png']);
	onLoad((option) => {
		const date = new Date();
		hour = date.getHours().toString().padStart(2, '0');
		minutes = date.getMinutes().toString().padStart(2, '0');
		month = date.getMonth() + 1;
		data = date.getDate().toString().padStart(2, '0');
		imgs.push(...option.imgs.split(','));
		idx.value = Number(option.index);
		getLikeStatus();
	});
	async function getLikeStatus() {
	  try {
	    // 读取本地缓存的uid
	    const userInfo = uni.getStorageSync('userInfo');
	    const uid = userInfo?.uid || '';
		if(!uid){
			likeStatus==reactive({});
			return;
		}
	    // 携带uid请求后端
	    const res = await uni.request({
	      url: 'http://127.0.0.1:8080/like',
	      method: 'GET',
	      data: { uid: uid } // 传递uid
	    });
	
	    if (res.statusCode === 200 && res.data.code === 200) {
	      // 将数据库的islike状态映射到likeStatus
	      res.data.data.forEach(item => {
	        const islikeNum = Number(item.islike);
	        likeStatus[item.url] = islikeNum === 1;
	      });
	    }
	  } catch (err) {
	    console.error('获取喜欢状态失败：', err);
	  }
	}
	//监听退出登陆事件
	onMounted(()=>{
		uni.$on('userLogout',()=>{
			likeStatus=reactive({});
		})
	})
	onUnmounted(()=>{
		uni.$off('userLogout');
	})
	// 3. 点击爱心时，切换状态并同步到数据库
	async function like(idx) {
		// 1. 判断是否登录（读取本地缓存的uid）
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo?.uid) {
			// 未登录：跳转登录页面
			uni.navigateTo({
				url: '/components/Mine/Mine'
			}); // 需确保Login页面存在
			return;
		}

		// 2. 已登录：获取当前图片URL和新状态
		const currentUrl = imgs[idx];
		const newStatus = !likeStatus[currentUrl];
		likeStatus[currentUrl] = newStatus;

		try {
			// 3. 携带uid请求后端（新增uid参数）
			await uni.request({
				url: 'http://127.0.0.1:8080/like',
				method: 'POST',
				data: {
					url: currentUrl,
					islike: newStatus ? 1 : 0,
					uid: userInfo.uid // 传递当前用户的uid
				}
			});
		} catch (err) {
			// 接口失败：回滚本地状态
			likeStatus[currentUrl] = !newStatus;
			uni.showToast({
				title: '爱心状态同步失败',
				icon: 'error'
			});
		}
	}

	function changeIndex(e) {
		idx.value = e.detail.current;
	}

	function back() {
		uni.navigateBack({
			delta: 1
		});
	}

	let getHeartSrc = (idx) => {
		let currentUrl = imgs[idx];
		return likeStatus[currentUrl] ? heart[1] : heart[0];
	}
	
	// 下载图片并记录到数据库
	const downLoad = async (idx) => {
		try {
			// 1. 获取当前图片URL
			const imgUrl = imgs[idx];
			if (!imgUrl) {
				uni.showToast({
					title: '图片地址无效',
					icon: 'error'
				});
				return;
			}

			// 2. 检查并请求相册权限
			const settingRes = await new Promise(resolve => uni.getSetting({
				success: resolve
			}));
			if (!settingRes.authSetting['scope.writePhotosAlbum']) {
				const authRes = await new Promise(resolve =>
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success: resolve,
						fail: resolve
					})
				);
				// 权限被拒绝时引导用户开启
				if (authRes.errMsg.includes('fail auth deny')) {
					uni.showModal({
						title: '权限申请',
						content: '需要获取相册权限以保存图片，请前往设置开启',
						confirmText: '去设置',
						success: (modalRes) => {
							if (modalRes.confirm) {
								uni.openSetting({
									success: (settingRes) => {
										if (settingRes.authSetting[
												'scope.writePhotosAlbum']) {
											download(idx); // 开启权限后重新下载
										}
									}
								});
							}
						}
					});
					return;
				}
			}

			// 3. 下载图片到临时路径
			const downloadRes = await new Promise((resolve, reject) =>
				uni.downloadFile({
					url: imgUrl,
					success: resolve,
					fail: reject
				})
			);

			// 4. 保存图片到系统相册
			await new Promise((resolve, reject) =>
				uni.saveImageToPhotosAlbum({
					filePath: downloadRes.tempFilePath,
					success: resolve,
					fail: reject
				})
			);

			// 5. 读取本地缓存的用户uid
			const userInfo = uni.getStorageSync('userInfo');
			const uid = userInfo?.uid || ''; // 未登录时uid为空

			// 6. 调用后端接口，记录下载记录
			const apiRes = await uni.request({
				url: 'http://127.0.0.1:8080/download',
				method: 'POST',
				data: {
					imgUrl: imgUrl,
					uid: uid
				}
			});

			// 7. 打印记录结果
			if (apiRes.data.success) {
				console.log('下载记录已存入数据库');
			} else {
				console.error('下载记录存储失败：', apiRes.data.error);
			}

			// 8. 提示下载成功
			uni.showToast({
				title: '下载成功',
				icon: 'success'
			});
		} catch (err) {
			// 捕获异常并提示
			uni.showToast({
				title: err.errMsg || '下载失败',
				icon: 'error'
			});
		}
	};
</script>

<style scoped lang="scss">
	.preview-container {
		width: 100%;
		height: 100vh;
		pointer-events: none;
		position: relative;
		overflow: hidden;

		.back {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: rgba(91, 91, 91, 0.7);
			position: absolute;
			z-index: 10;
			margin-top: 100rpx;
			margin-left: 20rpx;
			text-align: center;
			pointer-events: auto;

			//#ifdef H5
			.left {
				pointer-events: auto;
				position: relative;
				right: 2rpx;
			}

			//#endif

			//#ifndef  H5
			.left {
				pointer-events: auto;
				position: relative;
				top: 10rpx;
				right: 2rpx;
			}

			//#endif
		}

		.topShow {
			position: absolute;
			top: 15%;
			width: 100%;
			height: 300rpx;
			z-index: 10;

			.index {
				width: 100rpx;
				height: 45rpx;
				background-color: rgba(91, 91, 91, 0.8);
				border-radius: 20rpx;
			}

			.time {
				width: 600rpx;
				height: 180rpx;
				font-size: 130rpx;

				.time_item {
					display: inline;
					position: relative;
					bottom: 10rpx;
					margin: 0 15rpx;
				}
			}
		}

		.imageShow {
			position: absolute;
			width: 100%;
			height: 100%;
			pointer-events: auto;
			z-index: 1;

			.uni-margin-wrap {
				width: 100%;
				height: 100%;
			}

			.swiper {
				display: flex;
				width: 100%;
				height: 100%;
				white-space: nowrap;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.bottomShow {
			width: 500rpx;
			height: 100rpx;
			border-radius: 40rpx;
			background-color: #dcdcdc;
			position: absolute;
			top: 80%;
			z-index: 10;
			left: 17%;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-top: 12rpx;
			}

			//#ifdef H5
			.heart {
				pointer-events: auto;
				margin-left: 25%;
			}

			//#endif
			//#ifndef H5
			.heart {
				width: 250rpx;
				pointer-events: auto;

			}

			//#endif
			#download {
				pointer-events: auto;
			}
		}
	}

	text {
		text-align: center;
		color: #f3f3f3;
		display: block;
		margin: 10rpx auto;
	}
</style>