import {
	reactive
} from "vue";
export default {
	ToclassifyItem({
		type,
		text
	}) {
		uni.navigateTo({
			url: `/pages/Classify-item/Classify-item?type=${type}&text=${text}`,
		});
	},
	Toclassify() {
		uni.switchTab({
			url: "/components/Classify/Classify"
		})
	},
	Totoptic() {
		uni.switchTab({
			url: "/components/Toptic/Toptic"
		})
	},
	toRanking(){
		uni.navigateTo({
			url:'/pages/Ranking/Ranking'
		})
	},
	img_8: reactive([]),
	get_img_8() {
		uni.request({
			url: 'http://127.0.0.1:8080/get_img_8',
			method: 'GET',
			success: (res) => {
				//console.log(res.data);
				if (this.img_8) {
					this.img_8.splice(0, this.img_8.length);
					this.img_8.push(...res.data);
				}
				//console.log(this.img_8);
			},
			fail: (err) => {
				console.log(err);
			}
		});
	},
	toShowImages({type,imgs,index}) {
		uni.navigateTo({
			url: `/pages/ImagePreview/ImagePreview?imgs=${imgs}&index=${index}`,
		})
		//console.log(imgs);	
	}

}