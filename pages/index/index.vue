<template>
	<view>
		<scroll-view scroll-x class="bg-white nav position-top" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 3" :key="index"
				 @tap="tabSelect" :data-id="index">
					<view v-if="index ==0">话题</view>
					<view v-if="index ==1">我参与的</view>
					<view v-if="index ==2">我创建的</view>
				</view>
			</view>
		</scroll-view>
		<view style="margin-top: 50px;">
			<topic v-if="TabCur == 0"></topic>
			<myJoin v-if="TabCur == 1"></myJoin>
			<myCreate v-if="TabCur == 2"></myCreate>
		</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	export default {
		data() {
			return {
				TabCur: 2,
				scrollLeft: 0
			}
		},
		onLoad() {
			console.log(requestUrls)
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.position-top {
		position: fixed;
		top: 0;
		z-index: 100;
	}
</style>
