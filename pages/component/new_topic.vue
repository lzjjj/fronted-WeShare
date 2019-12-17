<template>
	<view>
		<form>
			<view class="bg-img">
				<image :src="imgPath" @tap="chooseImage" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="cu-form-group margin-top">
				<input placeholder="请输入标题" maxlength="30" name="input"></input>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" :disabled="modalName!=null" @input="textareaInput" placeholder="请输入分享会简介"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">演讲者</view>
				<input placeholder="请输入演讲者姓名" maxlength="20" name="input"></input>
			</view>
			<view class="cu-form-group" @tap="showStartDatePicker">
				<view class="title">分享开始时间</view>
				<yu-datetime-picker ref="startDate" :isAll="false" :current="true" @confirm="onStartConfirm" @cancel="onStartCancel">
				</yu-datetime-picker>
				{{sharingStartDate}}
			</view>
			<view class="cu-form-group" @tap="showEndDatePicker">
				<view class="title">分享结束时间</view>
				<yu-datetime-picker ref="endDate" :isAll="false" :current="true" @confirm="onEndConfirm" @cancel="onEndCancel">
				</yu-datetime-picker>
				{{sharingEndDate}}
			</view>
			<view class="cu-form-group">
				<view class="title">地点</view>
				<input placeholder="请输入分享会地点" maxlength="20" name="input"></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">可报名人数</view>
				<input placeholder="请输入可报名人数" type="number" maxlength="3" name="input"></input>
			</view>
			<view class="cu-form-group" @tap="showDeadlinePicker">
				 <view class="title">报名截止时间</view>
				 <yu-datetime-picker ref="deadline" :isAll="false" :current="true" @confirm="onDeadlineConfirm" @cancel="onDeadlineCancel">
				 </yu-datetime-picker>
				 {{deadline}}
			</view>

		</form>
		<button class="bg-gradual-blue cu-btn apply-button" @click="createTopic">创建</button>
		<rewardDialog ref="createPopup" :title="popupTitle" :msg="popupMsg" @hideModal="hideModal" @confirm='onConfirmCreate'></rewardDialog>
	</view>
</template>

<script>
	import {
		getDate,
		compareDate
	} from "../../utils.js"
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	export default {
		components: {
			yuDatetimePicker
		},
		data() {
			const currentDate = getDate();
			return {
				currentDateTime: currentDate,
				topic: null,
				deadline: '',
				sharingStartDate: currentDate,
				sharingEndDate: currentDate,
				img: null,
				imgPath: "../../static/upload.png",
				popupTitle: "创建分享",
				popupMsg: "是否确认创建分享？"
			}
		},
		methods: {
			showStartDatePicker: function() { //显示
				this.$refs.startDate.show();
			},
			onStartCancel: function(e) {},
			onStartConfirm: function(e) {
				this.sharingStartDate = e.selectRes;
			},
			showEndDatePicker: function() { //显示
				this.$refs.endDate.show();
			},
			onEndCancel: function() {},
			onEndConfirm: function(e) {
				// 大于start date
				if (compareDate(e.selectRes, this.sharingStartDate) && compareDate(e.selectRes, this.currentDateTime)) {
					this.sharingEndDate = e.selectRes;
				}
			},
			showDeadlinePicker: function() { //显示
				this.$refs.deadline.show();
			},
			onDeadlineCancel: function(e) {},
			onDeadlineConfirm: function(e) {
				this.deadline = e.selectRes;
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgPath = res.tempFilePaths[0];
						this.img = res.tempFiles[0];
						this.viewImage();
					}
				});
			},
			viewImage: function() {
				uni.previewImage({
					urls: [this.imgPath],
				});
			},
			textareaInput: function(e) {

			},
			createTopic: function() {
				this.popupTitle = "创建分享",
					this.popupMsg = "是否确认创建分享？"
				this.$refs.createPopup.showModal();
			},
			onConfirmCreate: function() {
				console.log("");
			}
		}
	}
</script>


<style>
	.apply-button {
		margin-top: 20px;
		width: 100%;
		height: 2.5rem;
	}
</style>
