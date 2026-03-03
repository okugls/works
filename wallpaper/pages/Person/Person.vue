<template>
	<view class="person-container">
		<view class="img" @click="chooseAvatar">
			<image :src="avatarUrl" mode="widthFix"></image>
			<text class="upload-tip">点击更换头像</text>
		</view>
		<view class="name">
			<input type="text" v-model="nickname" placeholder="请输入新昵称" />
		</view>
		<button @click="submitModify">提交修改</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const avatarUrl = ref('/static/images/user.jpg'); // 默认头像
	const nickname = ref(''); // 昵称输入值

	const chooseAvatar = async () => {
		// 调用uni的选择图片API
		const res = await uni.chooseImage({
			count: 1, // 仅选1张
			sizeType: ['original', 'compressed'],
		});
		// 临时文件路径（可直接预览，若要永久保存需上传服务器）
		avatarUrl.value = res.tempFilePaths[0];
	};

	// 3. 提交修改（将头像+昵称提交到服务器）
	const submitModify = async () => {
		if (!nickname.value.trim()) {
			uni.showToast({
				title: '昵称不能为空',
				icon: 'none'
			});
			return;
		}
		// 调用后端接口，提交头像（若已上传则传服务器地址）和昵称
		const res = await uni.request({
			url: 'http://127.0.0.1:8080/changeUser',
			method: 'POST',
			data: {
				avatar: avatarUrl.value, 
				nickname: nickname.value,
				uid:uni.getStorageSync('userInfo').uid
			},
		});
		if (res.data.success) {
			
			const oldUserInfo=uni.getStorageSync('userInfo') || {};
			const newUserInfo={...oldUserInfo,userName:nickname.value,userImg:avatarUrl.value};
			uni.setStorageSync('userInfo',newUserInfo);
			//返回刷新
			uni.navigateBack({
				delta:1,
				success:()=>{
					const pages=getCurrentPages();
					const minePage=pages[pages.length-1];
					minePage.onLoad();
				}
			})
			uni.showToast({
				title: '修改成功'
			});
			// 更新全局用户信息
			
		} else {
			uni.showToast({
				title: '修改失败，请重试',
				icon: 'none'
			});
		}
	};
</script>

<style scoped>
	.person-container {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30rpx;
		margin-top: 200rpx;
	}

	.img {
		position: relative;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid #eee;
	}

	.img image {
		width: 100%;
		height: 100%;
	}

	.upload-tip {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, 0.5);
	}

	.name input {
		width: 600rpx;
		height: 80rpx;
		padding: 0 20rpx;
		border: 1px solid #eee;
		border-radius: 10rpx;
	}

	button {
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #007aff;
		color: #fff;
		border-radius: 10rpx;
	}
</style>