<template>
	<view class="imgShow">
		<view v-for="(i,index) in typeImgs" class="img" :key="index" @click="RecJs.toShowImages({imgs:typeImgs,index:index})">
			<image :src="i" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import RecJs from '../../components/Recommend/Recommend.js';
	let typeImgs = reactive([]);
	let type=ref('');
	function getTypeImg(type) {
		return new Promise((res, rej) => {
			uni.request({
				url: 'http://127.0.0.1:8080/get_type',
				data: {
					type
				},
				method: 'GET',
				success: (resData) => {
					res(resData.data)
				},
				fail: (err) => {
					rej(err);
					console.log(err);
				}
			});
		});
		//console.log(Imgs);
	};
	onLoad(async (option) => {
		//console.log(option);
		type.value=option.type;
		uni.setNavigationBarTitle({
			title: option.text || option.type
		});
		const imgs = await getTypeImg(option.type)
		typeImgs.push(...imgs);
		//console.log(typeImgs);
	})
	 
</script>

<style scoped lang="scss">
	.imgShow {
		width: 100%;
		margin: 5rpx auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.img {
			width: 230rpx;
			height: 500rpx;
			margin: 5rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>