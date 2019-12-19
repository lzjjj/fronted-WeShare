<template>
	<view>
		<scroll-view scroll-x class="bg-white nav position-top" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in 3" :key="index"
				 @tap="tabSelect" :data-id="index">
					<view v-if="index ==0">话题</view>
					<view v-if="index ==1">我参与的</view>
					<view v-if="index ==2">我创建的</view>
				</view>
			</view>
		</scroll-view>
		<view style="margin-top: 50px;">
			<topic ref="topic" v-if="TabCur == 0"></topic>
			<myJoin ref="myJoin" v-if="TabCur == 1"></myJoin>
			<myCreate ref="myCreate" v-if="TabCur == 2"></myCreate>
		</view>
		<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :direction="direction" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	export default {
		onLoad(option) {
			if(option.TabCur) this.TabCur = Number(option.TabCur)
		},
		onReachBottom() {
			if (this.TabCur == 0) {
				this.$refs.topic.refresh();
			} else if (this.TabCur == 1) {
				this.$refs.myJoin.refresh();
			} else if (this.TabCur == 2) {
				this.$refs.myCreate.refresh();
			}
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				horizontal: 'right',
				direction: 'vertical',
				content: [{
					text: '创建',
					iconPath: '../../static/create_select.svg',
					selectedIconPath: '../../static/create_select.svg'
				}],
				pattern: {
					color: '#3c3e49',
					selectedColor: '#007AFF',
					buttonColor: '#3c3e49'
				}
			}
		},
		components: {
			uniFab
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			trigger() {
				uni.navigateTo({
					url: "../createTopic/createTopic"
				})
			}
		},
		onShareAppMessage() {}

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
