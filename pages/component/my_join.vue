<template>
	<view>
		<view class="cu-card case" :class="isCard?'no-card':''" v-for="count in 4" @click="navigate">
			<view class="cu-item shadow">
				<view style="margin:10px 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.8rem;font-weight: bold;"> <text class="text-cut">Subject</text></view>
					<view class="flex justify-between align-center">
						<view style="color: #C8C7CC;font-size: 0.6rem;">
							<view class="dots">Sharing 简介：和疯狂世界很疯狂收到回复开始看对方还是撒可见度发挥快速导航开发还是肯定会伤口缝合看电视剧客户付款还是的看法还是</view>
							<view>时间:2019-12-02 11:00-12:00</view>
							<view>地点:B5 3F Room 03</view>
							<view>截止时间:2019-12-02 11:00</view>
						</view>
						<button class="cu-btn lg bg-blue" style="width: 50%;height: 1.5rem;font-size: 0.55rem;color: #FFFFFF;">取消报名</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			navigate() {
				uni.navigateTo({
				    url: '../myJoinDetail/myJoinDetail'
				})
			},
		}
	}
</script>

<style>
	.dots {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: bold;
		font-size: 0.6rem;
		margin-bottom: 5px;
	}
</style>
