<template>
	<view>
		<form>
			<view class="bg-img">
				<image :src="imgPath" @tap="chooseImage" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="cu-form-group margin-top">
				<input placeholder="请输入标题" maxlength="30" name="input" @input="nameInput" ></input>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" :disabled="modalName!=null" @input="textareaInput" placeholder="请输入分享会简介"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title text-black text-bold">演讲者</view>
				<input placeholder="请输入演讲者姓名" maxlength="20" name="input" @input="ownerInput" ></input>
			</view>
			<view class="cu-form-group" @tap="showStartDatePicker">
				<view class="title text-black text-bold">分享开始时间</view>
				<yu-datetime-picker ref="startDate" :isAll="false" :current="true" @confirm="onStartConfirm" @cancel="onStartCancel">
				</yu-datetime-picker>
				<view class="picker">{{sharingStartDate}}</view>
			</view>
			<view class="cu-form-group" @tap="showEndDatePicker">
				<view class="title text-black text-bold">分享结束时间</view>
				<yu-datetime-picker ref="endDate" :isAll="false" :current="true" @confirm="onEndConfirm" @cancel="onEndCancel">
				</yu-datetime-picker>
				<view class="picker">{{sharingEndDate}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title text-black text-bold">地点</view>
				<input placeholder="请输入分享会地点" maxlength="20" name="input" @input="placeInput" ></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title text-black text-bold">可报名人数</view>
				<input placeholder="请输入可报名人数" type="number" maxlength="3" name="input" @input="countInput" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-black text-bold">最少参加人数</view>
				<input placeholder="请输入最少参加人数" type="number" maxlength="3" name="input" @input="minCountsInput" ></input>
			</view>
			<view class="cu-form-group" @tap="showDeadlinePicker">
				<view class="title text-black text-bold">报名截止时间</view>
				<yu-datetime-picker ref="deadline" :isAll="false" :current="true" @confirm="onDeadlineConfirm" @cancel="onDeadlineCancel">
				</yu-datetime-picker>
				<view class="picker">{{deadline}}</view>
			</view>

		</form>
		<button class="bg-gradual-blue cu-btn apply-button" @click="createTopic">创建</button>
		<rewardDialog ref="createPopup" :title="createConfirm.title" :msg="createConfirm.msg"  @confirm='onConfirmCreate'></rewardDialog>
		<rewardDialog ref="dateAlert" :title="dateAlert.title" :msg="dateAlert.msg"  @confirm='onAlertConfirm'></rewardDialog>
	</view>
</template>

<script>
	import {
		getDate,
		compareDate,
		uploadFile,
		WARNING_TITLE,
		WARNING_DATE_LT_CURRENT,
		WARNING_END_LT_START,
		WARNING_DEADLINE
	} from "../../utils.js"
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	import requestUrls from "../../api.js"
	import fetch from "../../fetch.js"
	export default {
		components: {
			yuDatetimePicker
		},
		data() {
			const currentDate = getDate();
			return {
				currentDateTime: currentDate,
				topic: {
					owner:'',
					topic_name:'',
					description:'',
					share_place:'',
					participants_count: 0,
					create_date:'',
					from_date:'',
					to_date:'',
					dead_line_date:'',
					state:'',
					picId:''
				},
				deadline: '',
				ownerName:'',
				topicName:'',
				topicDesc:'',
				topicPlace:'',
				counts:0,
				minCounts:0,
				sharingStartDate: currentDate,
				sharingEndDate: currentDate,
				imgId:'',
				img: null,
				imgPath: "../../static/upload.png",
				createConfirm: {
					title: "创建分享",
					msg: "是否确认创建分享？"
				},
				dateAlert: {
					title: WARNING_TITLE,
					msg: WARNING_DATE_LT_CURRENT
				}
			}
		},
		methods: {
			nameInput: function(e) {
				this.topicName = e.detail.value;
			},
			textareaInput: function(e) {
				this.topicDesc = e.detail.value;
			},
			ownerInput: function(e) {
				this.ownerName = e.detail.value;
			},
			placeInput: function(e) {
				this.topicPlace = e.detail.value;
			},
			countInput: function(e) {
				this.counts = parseInt(e.detail.value);
			},
			minCountsInput: function(e) {
				this.minCounts = parseInt(e.detail.value);
			},
			showStartDatePicker: function() { //显示
				this.$refs.startDate.show();
			},
			onStartCancel: function(e) {},
			onStartConfirm: function(e) {
				if (compareDate(e.selectRes, this.currentDateTime)) {
					this.sharingStartDate = e.selectRes;
				} else {
					this.dateAlert.msg = WARNING_DATE_LT_CURRENT;
					this.$refs.dateAlert.showModal();
				}
			},
			showEndDatePicker: function() { //显示
				this.$refs.endDate.show();
			},
			onEndCancel: function() {},
			onEndConfirm: function(e) {
				if(compareDate(this.currentDateTime, e.selectRes)) {
					this.dateAlert.msg = WARNING_DATE_LT_CURRENT;
					this.$refs.dateAlert.showModal();
				} else if(compareDate(this.sharingStartDate, e.selectRes)) {
					this.dateAlert.msg = WARNING_END_LT_START;
					this.$refs.dateAlert.showModal();
				} else {
					this.sharingEndDate = e.selectRes;
				} 
			},
			showDeadlinePicker: function() { //显示
				this.$refs.deadline.show();
			},
			onDeadlineCancel: function(e) {},
			onDeadlineConfirm: function(e) {
				if(compareDate(this.currentDateTime, e.selectRes)) {
					this.dateAlert.msg = WARNING_DATE_LT_CURRENT;
					this.$refs.dateAlert.showModal();
				} else if(compareDate(e.selectRes, this.sharingStartDate)) {
					this.dateAlert.msg = WARNING_DEADLINE;
					this.$refs.dateAlert.showModal();
				} else {
					this.deadline = e.selectRes;
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
						this.imgId = uploadFile(requestUrls.picUpload, this.imgPath);
						this.viewImage();
					}
				});
			},
			viewImage: function() {
				uni.previewImage({
					urls: [this.imgPath],
				});
			},
			createTopic: function() {
				if (this.validateTime()) {
					this.popupTitle = "创建分享";
					this.popupMsg = "是否确认创建分享？";
					this.$refs.createPopup.showModal();
				} else {
					this.$refs.dateAlert.showModal();
				}
			},
			onConfirmCreate: function() {
				this.topic.topic_name = this.topicName;
				this.topic.description = this.topicDesc;
				this.topic.owner = this.ownerName;
				this.topic.share_place = this.topicPlace;
				this.topic.participants_count = this.counts;
				this.topic.from_date = this.sharingStartDate;
				this.topic.to_date = this.sharingEndDate;
				this.topic.dead_line_date = this.deadline;
				this.topic.picId = this.imgId;
				// todo
				// this.topic.least_counts = this.minCounts;
				fetch({
					url: requestUrls.createTopic,
					payload: this.topic,
					method: 'POST'
				}).then((res) => {
					console.log(res)
					uni.navigateTo({
						url:"../submitSuccess/submitSuccess"
					})
				})
				console.log("create new topic");
			},
			onAlertConfirm: function() {
				this.$refs.dateAlert.hideModal();
			}, 
			validateTime: function() {
				if(compareDate(this.currentDateTime, this.sharingStartDate) 
					|| compareDate(this.currentDateTime, this.sharingEndDate) 
					|| compareDate(this.currentDateTime, this.deadline)) {
					this.dateAlert.msg = WARNING_DATE_LT_CURRENT;
				}else if(compareDate(this.sharingStartDate, this.sharingEndDate)) {
					this.dateAlert.msg = WARNING_END_LT_START;
				}else if(compareDate(this.deadline, this.sharingStartDate)) {
					this.dateAlert.msg = WARNING_DEADLINE;
				} else return true;
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
