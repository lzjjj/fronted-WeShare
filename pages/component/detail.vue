<template>
	<view>
		<view style="margin: 10px;">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix" style="width: 100%;"></image>
			<view class="detail-content text-cut flex justify-start">
				<view class="label">话题：</view>
				<view>Event Storming</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">演讲者：</view>
				<view>Jay Zhou</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">时间：</view>
				<view>2019-12-04 00：00</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">地点：</view>
				<view>B6 3F Room 03</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">最少报名人数：</view>
				<view>20人</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">可报名人数：</view>
				<view>20人(已报名人数：5人)</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">截止时间：</view>
				<view>2019-12-04 00：00</view>
			</view>
			<view class="detail-content text-cut flex">
				<view class="label">简介：</view>
				<view>DDD Event Storming</view>
			</view>
			<button v-if="type == 0" class="bg-gradual-blue cu-btn apply-button">报名</button>
			<button v-if="type == 1" class="bg-gradual-blue cu-btn apply-button">取消报名</button>
			<view v-if="type == 2" class="flex justify-around">
				<button class="bg-gradual-blue cu-btn apply-button" style="margin-right: 5%;">取消分享</button>
				<button class="bg-gradual-blue cu-btn apply-button">编辑</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["type"],
		mounted() {
			console.log(this.$props.type)
		}
	}
</script>

<style>
	.detail-content {
		font-size: 0.9rem;
		margin-top: 10px;
	}

	.label {
		font-weight: bold;
		width: 33%;
	}

	.apply-button {
		margin-top: 20px;
		width: 100%;
		height: 2.5rem;
	}
</style>
