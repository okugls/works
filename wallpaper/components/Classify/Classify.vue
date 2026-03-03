<template>
	<view class="classify-contain">
		<view class="classify-item" v-for="(item,index) in showClassify" :key="index" @click="TotypeClassify(item)">
			<image :src="item.url" mode="scaleToFill" ></image>
			<view class="classify-item-text"><text>{{item.text}}</text></view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';
	import { allData } from './classifyData';
	const props=defineProps({
		showCount:{
			type:Number,
			//默认长度
			default:allData.length
		}
	})
	const showClassify=computed(()=>{
		return allData.slice(0,props.showCount);
	})
	function TotypeClassify(item){
		uni.navigateTo({
			url: `/pages/Classify-item/Classify-item?type=${item.type}&text=${item.text}`,
		});
	}
</script>

<style scoped lang="scss">
	.classify-contain {
		width: 690rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 10rpx auto;
	}
	.classify-item {
		width: 220rpx;
		height: 400rpx;
		margin: 10rpx 0;
		image {
			width: 220rpx;
			height: 400rpx;
			border-radius: 8rpx;
			z-index: -1;
		}

		.classify-item-text {
			display: block;
			text-align: center;
			width: 220rpx;
			height: 63.9rpx;
			z-index: 1;
			background-color: rgba(91, 91, 91, 0.8);
			position: relative;
			bottom: 70rpx;

			text {
				display: inline-block;
				margin: 5% 0;
				color: #fff;
				font-size: 30rpx;
			}
		}

	}
</style>