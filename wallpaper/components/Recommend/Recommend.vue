<template>
	<view class="contain">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay interval="3000" indicator-color="#d8d8d8"
				indicator-active-color="white">
				<swiper-item>
					<image src="/static/images/lunbo/art.webp" @click="recommend.ToclassifyItem({type:'Art',text:'色彩艺术'})" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="/static/images/lunbo/banner2.jpg" @click="recommend.ToclassifyItem({type:'Pets',text:'可爱萌宠'})" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="/static/images/lunbo/banner3.jpg" @click="recommend.ToclassifyItem({type:'AI',text:'AI绘画'})" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="announcement">
			<uni-notice-bar show-icon scrollable  background-color="whitesmoke" color="" moreColor=""
				text="欢迎关注白了白壁纸分享" />
		</view>
		<view class="scroll-view-one">
			<view class="scroll-top" @click="recommend.get_img_8()">
				<text class="recText">优选推荐</text>
				<image src="/static/images/刷新.png" mode=""></image><text style="color: black;">换一批</text>
			</view>
			<scroll-view class="scrollall" scroll-x="true" enable-flex="true" show-scrollbar="true">
				<view  v-for="(item,index) in recommend.img_8" :key="index" class="scroll-view-item_H" @click="recommend.toShowImages({imgs:recommend.img_8,index:index})">
					<image :src="item" mode="scaleToFill"></image>
				</view>
			</scroll-view>
		</view>
		<view class="classify">
			<view class="classify-top">
				<text class="recText">分类精选</text>
				<text @click="recommend.Toclassify()">More+</text>
			</view>
			<Classify :showCount="9"></Classify>
			<view class="last-cover" @click="recommend.Toclassify()">
				<uni-icons type="more-filled" size="25" color="white"></uni-icons>
				<text>更多</text>
			</view>
		</view>
		<view class="toptic">
			<view class="toptic-top">
				<text class="recText">专题推荐</text>
				<text @click="recommend.Totoptic()">More+</text>
			</view>
			<scroll-view class="toptic-scroll" scroll-x="true" enable-flex="true">
				<Toptic></Toptic>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import Classify from '../Classify/Classify.vue';
	//import TopticItem from '../../pages/Toptic-item/Toptic-item.vue';
	import Toptic from '../Toptic/Toptic.vue'
	import recommend from './Recommend.js'
	recommend.get_img_8();
</script>

<style scoped>
	@import "./Recommend.css";
</style>