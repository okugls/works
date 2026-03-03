<template>
  <view class="topic-page">
    <!-- 专题列表 -->
    <view class="topic-list">
      <TopticItem 
	   v-for="(item, index) in topicList" 
        :key="index"
        :item="item"
      />
    </view>
  </view>
</template>

<script setup>
import TopticItem from '../../pages/Toptic-item/Toptic-item.vue'

const topicList = [
  {
    imgs: [
      'http://127.0.0.1:8080/images/Jay/Jay01.jpg',
      'http://127.0.0.1:8080/images/Jay/Jay02.webp',
      'http://127.0.0.1:8080/images/Jay/Jay03.webp',
	  'http://127.0.0.1:8080/images/Jay/Jay04.webp'
    ],
	type:'Jay',
    title: '周杰伦YYDS',
    likeCount: 376,
    picCount: 15
  },
  {
    imgs: [
      'http://127.0.0.1:8080/images/Starrysky/s01.webp',
      'http://127.0.0.1:8080/images/Starrysky/s02.webp',
      'http://127.0.0.1:8080/images/Starrysky/s03.webp',
	  'http://127.0.0.1:8080/images/Starrysky/s04.webp'
    ],
	type:'Starrysky',
    title: '浩瀚星空',
    likeCount: 595,
    picCount: 15
  },
  {
    imgs: [
      'http://127.0.0.1:8080/images/古力娜扎/gu01.webp',
      'http://127.0.0.1:8080/images/古力娜扎/gu02.webp',
      'http://127.0.0.1:8080/images/古力娜扎/gu03.webp',
	  'http://127.0.0.1:8080/images/古力娜扎/gu04.webp'
    ],
	type:'古力娜扎',
    title: '异域美人古力娜扎',
    likeCount: 200,
    picCount: 15
  },
  {
    imgs: [
      'http://127.0.0.1:8080/images/章若楠/z01.webp',
      'http://127.0.0.1:8080/images/章若楠/z02.webp',
      'http://127.0.0.1:8080/images/章若楠/z03.webp',
	  'http://127.0.0.1:8080/images/章若楠/z04.webp'
    ],
	type:'章若楠',
    title: '清纯甜美章若楠',
    likeCount: 180,
    picCount: 15
  }
];
</script>

<style scoped lang="scss">
.topic-page {
  min-height: 100vh;
  //background-color: #f5f5f5;
}

.topic-list {
  padding: 0;
}
</style>
