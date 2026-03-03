<template>
	<view class="topic-item" @click="toClassifyItem(item.type)">
		<!-- 斜切拼接图片区域 -->
		<view class="topic-img-group">
			<image v-for="(img, index) in item.imgs" :key="index" :src="img" mode="scaleToFill" class="topic-img"
				:style="{ clipPath: getClipPath(index) ,width:'33.3%'}" />
		</view>
		<view class="topic-info">
			<text class="topic-title">{{ item.title }}</text>
			<view class="topic-meta">
				<text class="like-count">{{ item.likeCount }}人喜欢</text>
				<view class="pic-count">
					<image src="/static/images/img.png" mode="scaleToFill" class="pic-icon" />
					<text>{{ item.picCount }}P</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 接收父组件传递的专题数据
	import {
		defineProps
	} from 'vue';
	
	const props = defineProps({
		item: {
			type: Object,
			required: true,
			default: () => ({
				imgs: [],
				title: '',
				likeCount: 0,
				picCount: 0
			})
		}
	});

	// 生成图片斜切的clipPath样式
	const getClipPath = (index) => {
		const paths = [
			'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
			'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
			'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
			'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'
		];
		return paths[index] || 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
	};
	const toClassifyItem=(type)=>{
		uni.navigateTo({
			url:`/pages/Classify-item/Classify-item?type=${type}`
		})
	}
</script>

<style scoped lang="scss">
	.topic-item {
		width: 680rpx;
		margin: 30rpx auto;
		border-radius: 12rpx;
		background: #fff;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.topic-img-group {
		width: 100%;
		height: 340rpx;
		position: relative;
		overflow: hidden;

		.topic-img {
			position: absolute;
			top: 0;
			width: 35%;
			height: 100%;
			object-fit: cover;

			&:nth-child(1) {
				left: 0;
			}

			&:nth-child(2) {
				left: 28%;
			}

			&:nth-child(3) {
				left: 56%;
			}

			&:nth-child(4) {
				left: 84%;
			}
		}
	}

	.topic-info {
		padding: 20rpx 24rpx;
		background-color: #fff;

		.topic-title {
			font-size: 32rpx;
			font-weight: 600;
			line-height: 44rpx;
			color: #333;
		}

		.topic-meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 12rpx;
			font-size: 24rpx;
			color: #666;

			.pic-count {
				display: flex;
				align-items: center;

				.pic-icon {
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}
			}
		}
	}
</style>