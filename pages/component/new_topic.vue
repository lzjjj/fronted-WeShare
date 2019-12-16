<template>
	<view>
		<form>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @tap="ViewImage">
						<image :src="img" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" >
							<text class='cuIcon-close'></text>
						</view>
						<view class="solids" @tap="ChooseImage">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">演讲者</view>
				<input placeholder="请输入演讲者姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">时间</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地点</view>
				<input placeholder="请输入分享会地点" name="input"></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">可报名人数</view>
			</view>
			<view class="cu-form-group">
				<view class="title">报名截止时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
		</form>
	</view>
</template>

<script>
	import getDate from "../../utils.js"
	// import MxDatePicker from "./mx-datepicker.vue"
	export default {
		// components: {
		//     MxDatePicker
		// },
		data() {
			const currentDate = getDate();
			return {
				date: currentDate,
				time: '12:01',
				img: null,
			}
		},
		method: {
			TimeChange: function(e) {
				this.time = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			ChooseImage: function() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage: function(e) {
				uni.previewImage({
					urls: this.img,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg: function(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>


<style>
</style>
