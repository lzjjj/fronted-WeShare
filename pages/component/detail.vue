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
			<button v-if="type == 0" class="bg-gradual-blue cu-btn apply-button" @click="register">报名</button>
			<button v-if="type == 1" class="bg-gradual-blue cu-btn apply-button" @click="cancelRegister">取消报名</button>
			<view v-if="type == 2" class="flex justify-around">
				<button class="bg-gradual-blue cu-btn apply-button" style="margin-right: 5%;" @click="cancelTopic">取消分享</button>
				<button v-if="false" class="bg-gradual-blue cu-btn apply-button">编辑</button>
			</view>
			<rewardDialog ref="popup" :title="title" :msg="msg"  @confirm='popupConfirm'></rewardDialog>
		</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import {WARNING_TITLE} from '../../utils.js'
	import fetch from '../../fetch.js'
	export default {
		props: ["type", "detail"],
		data() {
			return {
				topic: {},
				picUrl: '',
				title: WARNING_TITLE,
				msg: ''
			}
		},
		mounted() {
			this.topic = JSON.parse(this.$props.detail)
			this.topic.to_date = this.topic.to_date.substring(11)
			this.picUrl = this.topic.picture_id ? requestUrls.picLoad + this.topic.picture_id :
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
		},
		methods:{
			register: function() {
				fetch({
					url: requestUrls.registration,
					method: 'POST',
					payload: {
						topic_id: this.topic.topic_id
					}
				}).then((res) => {
					console.log(res)
					this.$refs.popup.showModal();
				});
				console.log('register--------------------');
			},
			cancelRegister: function() {
				console.log('cancelRegister--------------------');
				fetch({
					url: requestUrls.registration,
					method: 'PUT',
					payload: {
						topic_id: this.topic.topic_id
					}
				}).then((res) => {
					console.log(res)
					this.$refs.popup.showModal();
				});
			},
			cancelTopic: function() {
				console.log('cancelTopic--------------------');
			},
			popupConfirm: function() {
				this.$refs.popup.hideModal();
				let retUrl = './topic'
				if(this.$props.type == 1) {
					retUrl = '../myJoinDetail/myJoinDetail'
				} else if(this.$props.type == 2){
					retUrl = '../myCreateDetail/myCreateDetail'
				}
				uni.navigateTo({
					url: retUrl
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
