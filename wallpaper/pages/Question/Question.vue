<template>
  <view class="page-container">
    <view class="title-bar">
      <text class="title-text">常见问题，自行排查</text>
      <text class="author-info">白了白 2025-11-15 16:57:48</text>
    </view>

    <view class="faq-list">
      <view class="faq-item">
        <view class="faq-question">
          <image class="faq-icon" src="/static/images/图钉.png" mode="widthFix"></image>
          <text class="question-text">壁纸是否可以免费下载使用？</text>
        </view>
        <view class="faq-answer">
          <text>“白了白壁纸”小程序，内的所有图片均可免费下载，但是图片版权属于上传者或者图片来源作者，下载后仅可自己欣赏或个人使用，不能用作商业用途。</text>
        </view>
      </view>

      
      <view class="faq-item">
        <view class="faq-question">
          <image class="faq-icon" src="/static/images/图钉.png" mode="widthFix"></image>
          <text class="question-text">下载壁纸提示请求频繁？</text>
        </view>
        <view class="faq-answer">
          <text>同一张壁纸，不能重复下载，防止有些用户误操作，重复对一张图片下载而浪费你的存储空间，也是为了防止被恶意频繁请求。</text>
        </view>
      </view>

      
      <view class="faq-item">
        <view class="faq-question">
          <image class="faq-icon" src="/static/images/图钉.png" mode="widthFix"></image>
          <text class="question-text">进入图片预览后，大图无法展现？</text>
        </view>
        <view class="faq-answer">
          <text>有时壁纸会比较大，收到服务器带宽及你的网络环境影响，有时间加载会比较慢，需要用户耐心等待，或者返回上一层后重新进入再查看。</text>
        </view>
      </view>

    
      <view class="faq-item">
        <view class="faq-question">
          <image class="faq-icon" src="/static/images/图钉.png" mode="widthFix"></image>
          <text class="question-text">如果你觉得图片侵权了？</text>
        </view>
        <view class="faq-answer">
          <text>图片来自于网络，由用户自行上传，所有监管不能及时，如果被侵权了，请提供侵权证据，反馈给管理QQ：513894357，进行删除。</text>
        </view>
      </view>

    </view>
  </view>
</template>

<script setup>

</script>

<style scoped>

.page-container {
  padding: 15rpx 20rpx;
  background-color: #fff;
  min-height: 100vh;
}


.title-bar {
  margin-bottom: 20rpx;
}
.title-text {
  font-size: 32rpx;
  color: #333;
}
.author-info {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
  display: block;
}

.faq-list {
  margin-top: 20rpx;
}
.faq-item {
  margin-bottom: 30rpx;
}
.faq-question {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.faq-icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 10rpx;
}
.question-text {
  font-size: 35rpx;
  font-weight:bold;
  color: #333;
}
.faq-answer {
  font-size: 26rpx;
  color: #666;
  line-height: 40rpx;
  margin-left: 40rpx;
}

</style>
