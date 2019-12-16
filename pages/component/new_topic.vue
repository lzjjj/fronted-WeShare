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
					<view class="bg-img" @tap="viewImage">
						<image :src="imgPath" mode="aspectFill"></image>
						<view class="solids" @tap="chooseImage">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">演讲者</view>
				<input placeholder="请输入演讲者姓名" name="input"></input>
			</view>
			<datetimepicker :datetype="datetime"></datetimepicker>
			<view class="cu-form-group">
				<view class="title">地点</view>
				<input placeholder="请输入分享会地点" name="input"></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">可报名人数</view>
			</view>
			<view class="cu-form-group">
				<view class="title">报名截止时间</view>
				<view @click="showDatePicker">{{endDate}}</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected"
				 @cancel="onSelected" />
			</view>
			<view>

			</view>
		</form>
	</view>
</template>

<script>
	import getDate from "../../utils.js"
	import MxDatePicker from "./mx-datepicker.vue"
	export default {
		components: {
			MxDatePicker
		},
		data() {
			const currentDate = getDate();
			return {
				date: currentDate,
				time: '12:01',
				showPicker: false,
				type: 'datetime',
				value: '',
				endDate: currentDate + " 00:00:00",
				sharingDate: currentDate + " 00:00:00",
				img: null,
				imgPath: null
			}
		},
		methods: {
			showDatePicker() { //显示
				this.showPicker = true;
				this.value = this[this.type];
				console.log(this.value);
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgPath = res.tempFilePaths[0];
						this.img = res.tempFiles[0];
					}
				});
			},
			viewImage: function(e) {
				uni.previewImage({
					urls: this.imgPath,
					current: e.currentTarget.dataset.url
				});
			}
		}
	}
</script>


<style>
</style>
