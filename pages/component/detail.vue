<template>
	<view>
		<view style="margin: 10px;">
			<image :src="picUrl" mode="widthFix" style="width: 100%; max-height: 14rem;"></image>
			<view class="detail-content flex justify-start">
				<view class="label">话题：</view>
				<view>{{topic.topic_name}}</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">演讲者：</view>
				<view>{{topic.speaker}}</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">时间：</view>
				<view class="description">{{topic.from_date}} - {{topic.to_date}}</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">地点：</view>
				<view class="text-cut">{{topic.share_place}}</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">最小报名人数：</view>
				<view class="text-cut">{{topic.least_participants}}人</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">可报名人数：</view>
				<view class="text-cut">{{topic.participants_count}}人(已报名人数：{{topic.registrationCount}}人)</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">截止时间：</view>
				<view class="text-cut">{{topic.dead_line_date}}</view>
			</view>
			<view class="detail-content flex justify-start">
				<view class="label">简介：</view>
				<view class="description">{{topic.description}}</view>
			</view>
			<button v-if="type == 0 && !topic.registration_is_valid" class="bg-gradual-blue cu-btn apply-button" @click="register">报名</button>
			<button v-if="type == 0 && topic.registration_is_valid" class="bg-grey cu-btn apply-button">已报名</button>
			<button v-if="type == 1" class="bg-gradual-blue cu-btn apply-button" @click="cancelRegister">取消报名</button>
			<view v-if="type == 2" class="flex justify-around">
				<button v-if="topic.status == 'new'" class="bg-gradual-blue cu-btn apply-button" style="margin-right: 5%;" @click="cancelTopic">取消分享</button>
				<button v-if="false" class="bg-gradual-blue cu-btn apply-button">编辑</button>
			</view>
			<rewardDialog ref="popup" :title="title" :msg="msg" @confirm='popupConfirm'></rewardDialog>
			<message ref="message"></message>
		</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import {
		WARNING_TITLE,
		REGISTRATION_SUCCESS,
		getDate,
		compareDate
	} from '../../utils.js'
	import {} from '../../utils.js'
	import fetch from '../../fetch.js'
	export default {
		props: ["type", "detailId"],
		data() {
			return {
				topic: {},
				picUrl: '',
				title: WARNING_TITLE,
				msg: '',
				topic_id: '',
				isOverDate: false,
				isOverAmount: false
			}
		},
		mounted() {
			this.getTopicDetail()
		},
		methods: {
			validJoinerAmount() {
				return this.topic.participants_count == this.topic.registrationCount
			},
			validDate() {
				console.log(this.topic.dead_line_date)
				console.log(getDate())
				return compareDate(getDate(), this.topic.dead_line_date)
			},
			getTopicDetail() {
				fetch({
					url: requestUrls.getTopics + '/' + this.$props.detailId
				}).then((res) => {
					if (res.status) {
						this.topic = res.result
						this.topic.to_date = this.topic.to_date.substring(11)
						this.picUrl = this.topic.picture_id ? requestUrls.picLoad + this.topic.picture_id :
							'../../static/just_share.png';
						this.topic_id = this.topic.id;
						this.isOverDate = this.validDate()
						this.isOverAmount = this.validJoinerAmount()
					}
				})
			},
			register: function() {
				if (this.isOverDate) {
					uni.showToast({
						title: '报名时间已截止',
						duration: 2000
					})
				} else if (this.isOverAmount) {
					uni.showToast({
						title: '报名人数已满',
						duration: 2000
					})
				} else if (this.topic.isTopicOwner) {
					uni.showToast({
						title: '不可报名该分享',
						duration: 2000
					})
				} else {
					fetch({
						url: requestUrls.registration,
						method: 'POST',
						payload: {
							topic_id: this.topic_id
						}
					}).then((res) => {
						if (res.status) {
							this.$refs.message.success("报名成功");
							setTimeout(uni.reLaunch, 1000, {
								url: '../index/index'
							})
						} else {
							this.$refs.message.warn("报名失败");
						}
					});
				}
			},
			cancelRegister: function() {
				this.msg = "是否确认取消报名?";
				this.$refs.popup.showModal();
			},
			cancelTopic: function() {
				console.log('cancelTopic--------------------');
				this.msg = "是否确认取消分享会?";
				this.$refs.popup.showModal();
			},
			popupConfirm: function() {
				this.$refs.popup.hideModal();
				if (this.$props.type == 1) {
					fetch({
						url: requestUrls.registration,
						method: 'PUT',
						payload: {
							topic_id: this.topic_id
						}
					}).then((res) => {
						this.$refs.message.success("取消报名成功");
					});
				} else if (this.$props.type == 2) {
					fetch({
						url: requestUrls.topics + '/' + this.topic_id,
						method: 'PUT'
					}).then((res) => {
						this.$refs.message.sucess("取消分享会成功")
					});
				}
				setTimeout(uni.reLaunch, 1000, {
					url: '../index/index?TabCur=' + this.$props.type
				})
			}
		}
	}
</script>

<style>
	.description {
		width: 55%;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
		white-space: normal
	}

	.detail-content {
		font-size: 0.9rem;
		margin-top: 10px;
	}

	.label {
		font-size: 0.8rem;
		font-weight: bold;
		width: 33%;
	}

	.apply-button {
		margin-top: 20px;
		width: 100%;
		height: 2.5rem;
	}
</style>
