<template>
	<view>
		<button class="bg-gradual-blue cu-btn apply-button" @tap="open('../commodity/commodity')">上传商品</button>
		<rewardList :rewards="rewards" :manage="true" :requestDone="requestDone"></rewardList>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'

	export default {
		data() {
			return {
				rewards: [],
				pageIndex: 1,
				canIRequest: true,
				manage: true,
				requestDone: false
			}
		},
		onLoad() {
			this.getRewards()
		},
		onReachBottom() {
			if (this.canIRequest) {
				this.pageIndex++;
				this.getRewards()
			}
		},
		onPullDownRefresh() {
			this.canIRequest = true;
			this.requestDone = false;
			this.rewards = [];
			this.pageIndex = 1;
			this.getRewards();
		},
		methods: {
			delete: function() {

			},
			open(path) {
				uni.navigateTo({
					url: path
				});		
			},
			getRewards() {
				this.canIRequest = false;
				fetch({
					url: requestUrls.getRewards + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					uni.stopPullDownRefresh();
					if (data.msg == 'not found') {
						this.canIRequest = false;
					} else if (data && data.msg == "") {
						this.requestDone = true;
						console.log(data.result)
						this.canIRequest = true;
						this.rewards = this.rewards.concat(data.result.filter(reward => reward.name));
						console.log(this.rewards)
					} else {
						this.pageIndex--;
					}
				})
			}
		}
	}
</script>

<style>
	.apply-button {
		margin: 5%;
		width: 90%;
		height: 2.5rem;
	}
</style>
