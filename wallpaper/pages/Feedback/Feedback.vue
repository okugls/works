<template>
  <view class="feedback-static">
    <view class="title">反馈意见</view>
    <view class="desc">请扫码添加QQ反馈问题</view>
    <image class="qrcode" src="/static/images/Screenshot_20251114_170738.jpg" mode="widthFix"></image>
    <text class="tip">QQ：1261175950</text>
  </view>
</template>

<script setup>

</script>

<style scoped>
.feedback-static {
  padding: 40rpx 20rpx;
  text-align: center;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
}
.qrcode {
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto;
}
.tip {
	display: block;
  font-size: 26rpx;
  color: #999;
}
</style>
