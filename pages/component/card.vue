<template>
	<view>
		<view class="cu-card case" :class="isCard?'no-card':''" @click="navigate">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="picUrl" mode="widthFix" style="max-height: 10rem; min-height: auto;"></image>
				</view>
				<view style="margin:0 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.85rem;font-weight: bold;"> <text class="text-cut">{{topic.topic_name}}</text></view>
					<view class="flex justify-between align-center">
						<view style="color: #C8C7CC;">
							<view>时间: {{topic.from_date}} - {{topic.to_date}}</view>
							<view>地点: {{topic.share_place}}</view>
							<view>截止时间: {{topic.dead_line_date}}</view>
						</view>
						<!-- <view class=" lg text-yellow cuIcon-rechargefill" style="font-size: 0.8rem;">100</view> -->
					</view>
					<view class="flex justify-end align-center" style="margin-bottom: 10px;">
						<view style="color: #C8C7CC;padding-right: 5px;">已报名{{topic.registrationCount}}人</view>
						<view style="color: #F37B1D; font-size: 0.75rem;">剩余{{topic.participants_count - topic.registrationCount}}个名额</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	export default {
		props: ["topic"],
		data() {
			return {
				isCard: false,
				picUrl: this.$props.topic.picture_id ? requestUrls.picLoad + this.$props.topic.picture_id : '../../static/just_share.png'
			};
		},
		mounted() {
		},
		methods: {
			navigate() {
				uni.navigateTo({
					url: '../sharingDetail/sharingDetail?detailId=' + this.$props.topic.id
				})
			},
			IsCard(e) {
				this.isCard = e.detail.value
			}
		}
	}
</script>

<style>

</style>
