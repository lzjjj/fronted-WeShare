<template>
	<view>
		<form>
			<view class="bg-img">
				<image :src="imgPath" @tap="chooseImage" mode="widthFix" style="width: 100%; max-height: 14rem;"></image>
			</view>
			<view class="cu-form-group margin-top">
				<input placeholder="请输入标题" maxlength="30" name="input" @input="nameInput" ></input>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" @input="textareaInput" placeholder="请输入分享会简介"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title text-black text-bold ">演讲者</view>
				<input class="input" placeholder="请输入演讲者姓名" maxlength="20" name="input" @input="ownerInput" ></input>
			</view>
			<view class="cu-form-group" @tap="showStartDatePicker">
				<view class="title text-black text-bold">开始时间</view>
				<view class="picker text-left">{{sharingStartDate}}</view>
				<yu-datetime-picker ref="startDate" :showSecond="false" :isAll="false" :current="true" @confirm="onStartConfirm" @cancel="onStartCancel">
				</yu-datetime-picker>
			</view>
			<view class="cu-form-group" @tap="showEndDatePicker">
				<view class="title text-black text-bold">结束时间</view>
				<view class="picker text-left">{{sharingEndDate}}</view>
				<yu-datetime-picker ref="endDate" :showSecond="false" :isAll="false" :current="true" @confirm="onEndConfirm" @cancel="onEndCancel">
				</yu-datetime-picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-black text-bold">地点</view>
				<input class="input" placeholder="请输入分享会地点" maxlength="20" name="input" @input="placeInput" ></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title text-black text-bold">可报名人数</view>
				<input style="margin-left: 4%;" type="number" maxlength="3" name="input" @input="countInput" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-black text-bold">最少报名人数</view>
				<input type="number" maxlength="3" name="input" @input="minCountsInput" ></input>
			</view>
			<view class="cu-form-group" @tap="showDeadlinePicker">
				<view class="title text-black text-bold">截止时间</view>
				<view class="picker text-left">{{deadline}}</view>
				<yu-datetime-picker ref="deadline" :showSecond="false" :isAll="false" :current="true" @confirm="onDeadlineConfirm" @cancel="onDeadlineCancel">
				</yu-datetime-picker>
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
		isEmpty,
		uploadPic,
		WARNING_TITLE,
		WARNING_DATE_LT_CURRENT,
		WARNING_END_LT_START,
		WARNING_DEADLINE,
		WARNING_TITLE_EMPTY,
		WARNING_OWNER_EMPTY,
		WARNING_PLACE_EMPTY,
		WARNING_PARTICIPANTS_EMPTY,
		WARNING_LEAST_PARTICIPANTS_EMPTY,
		WARNING_DEADLINE_DATE_EMPTY,
		WARNING_START_DATE_EMPTY,
		WARNING_END_DATE_EMPTY,
		MORE_THAN_ONE_TOPIC_AT_SAME_TIME,
		WARNING_LEAST_PAR_BT_PARTICIPANTS
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
					speaker:'',
					topic_name:'',
					description:'',
					share_place:'',
					participants_count: 0,
					create_date:'',
					from_date:'',
					to_date:'',
					dead_line_date:'',
					state:'',
					least_participants:'',
					picture_id:''
				},
				deadline: '',
				ownerName:'',
				topicName:'',
				topicDesc:'',
				topicPlace:'',
				counts:0,
				minCounts:0,
				sharingStartDate: currentDate.substr(0, 16),
				sharingEndDate: currentDate.substr(0, 16),
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
				if (!compareDate(this.currentDateTime, e.selectRes)) {
					this.sharingStartDate = e.selectRes.substr(0, 16);
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
					this.sharingEndDate = e.selectRes.substr(0, 16);
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
					this.deadline = e.selectRes.substr(0, 16);
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
						uploadPic(requestUrls.picUpload, this.imgPath)
							.then((res)=>{
								this.imgId = res;	
								console.log('pic upload --- '+this.imgId)
							}).catch((res)=>{});
					}
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
				this.$refs.createPopup.hideModal();
				this.topic.topic_name = this.topicName;
				this.topic.description = this.topicDesc;
				this.topic.speaker = this.ownerName;
				this.topic.share_place = this.topicPlace;
				this.topic.participants_count = this.counts;
				this.topic.from_date = this.sharingStartDate + ":00";
				this.topic.to_date = this.sharingEndDate + ":00";
				this.topic.dead_line_date = this.deadline + ":00";
				this.topic.picture_id = this.imgId;
				this.topic.least_participants = this.minCounts;
				fetch({
					url: requestUrls.createTopic,
					payload: this.topic,
					method: 'POST'
				}).then((res) => {
					if (!isEmpty(res.msg)) {
						this.dateAlert.msg = res.msg;
						this.$refs.dateAlert.showModal();
					} else {
						uni.navigateTo({
							url:"../submitSuccess/submitSuccess"
						})						
					}
				})
				console.log("create new topic");
			},
			onAlertConfirm: function() {
				this.$refs.dateAlert.hideModal();
			}, 
			validateTime: function() {
				if(isEmpty(this.topicName)) {
					this.dateAlert.msg = WARNING_TITLE_EMPTY;
				} else if(isEmpty(this.ownerName)) {
					this.dateAlert.msg = WARNING_OWNER_EMPTY;
				} else if(isEmpty(this.sharingStartDate)) {
					this.dateAlert.msg = WARNING_START_DATE_EMPTY;
				} else if(isEmpty(this.sharingEndDate)) {
					this.dateAlert.msg = WARNING_END_DATE_EMPTY;
				} else if(isEmpty(this.topicPlace)) {
					this.dateAlert.msg = WARNING_PLACE_EMPTY;
				} else if(isEmpty(this.counts)) {
					this.dateAlert.msg = WARNING_PARTICIPANTS_EMPTY;
				} else if(isEmpty(this.minCounts)) {
					this.dateAlert.msg = WARNING_LEAST_PARTICIPANTS_EMPTY;
				} else if(this.minCounts > this.counts) {
					this.dateAlert.msg = WARNING_LEAST_PAR_BT_PARTICIPANTS;
				} else if(isEmpty(this.deadline)) {
					this.dateAlert.msg = WARNING_DEADLINE_DATE_EMPTY;
				} else if(compareDate(this.currentDateTime, this.sharingStartDate) 
					|| compareDate(this.currentDateTime, this.sharingEndDate) 
					|| compareDate(this.currentDateTime, this.deadline)) {
					this.dateAlert.msg = WARNING_DATE_LT_CURRENT;
				}else if(compareDate(this.sharingStartDate, this.sharingEndDate)) {
					this.dateAlert.msg = WARNING_END_LT_START;
				}else if(!compareDate(this.sharingStartDate, this.deadline)) {
					this.dateAlert.msg = WARNING_DEADLINE;
				}
				else return true;
			}
		}
	}
</script>


<style scoped>
	.apply-button {
		margin: 5%;
		width: 90%;
		height: 2.5rem;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.cu-form-group .picker {
		margin-left: -30%;
	}
	.cu-form-group .input {
		margin-left: 8%;
	}
</style>
