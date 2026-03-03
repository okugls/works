<template>
	<view class='main-contain'>
		<view class="img" v-for="(item,index) in imgs" :key="index" @click="toImgShow({imgs,index})">
			<image :src="item" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	let imgs = reactive([]);
	let text = ref('');
	const uid = uni.getStorageSync('userInfo')?.uid;
	onLoad(async (option) => {
		text.value = option.text;
		//console.log(text.value);
		uni.setNavigationBarTitle({
			title: text.value
		});
		getImagesByText();
	})
	const getImagesByText = async () => {
		try {
			let res;
			let imgUrls=[];
			if (text.value === '我的喜欢') {
				res = await uni.request({
					url: 'http://127.0.0.1:8080/like',
					method: 'GET',
					data: {
						uid
					}
				});
				imgUrls=res.data.data.map(item=>item.url);
			} else if (text.value === '我的下载') {
				res = await uni.request({
					url: 'http://127.0.0.1:8080/download',
					method: 'GET',
					data: {
						uid
					}
				});
				imgUrls=res.data.data;
			} 
			// 处理接口返回结果
			if (res.data.code === 200) {
				imgs.length = 0; 
				imgs.push(...imgUrls);
				//console.log(imgs);
			} else {
				uni.showToast({
					title: '请求失败',
					icon: 'error'
				});
			}
		} catch (err) {
			uni.showToast({
				title: '网络异常',
				icon: 'error'
			});
		}
	};
	function toImgShow({imgs,index}) {
		uni.navigateTo({
			url: `/pages/ImagePreview/ImagePreview?imgs=${imgs}&index=${index}`,
		})
		//console.log(imgs);	
	}
</script>

<style scoped lang="scss">
	.main-contain {
		width: 100%;
		margin: 5rpx 25rpx;
		display: flex;
		justify-content:flex-start;
		flex-wrap: wrap;
		.img {
			width: 230rpx;
			height: 500rpx;
			margin: 5rpx ;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>