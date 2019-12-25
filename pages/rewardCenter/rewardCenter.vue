<template>
	<view>
		<rewardList :rewards=rewards @changeReward='changeReward' :requestDone='requestDone'/>
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
			this.requestDone = false
			this.pageIndex = 1;
			this.rewards = []
			this.getRewards()
		},
		methods: {
			getRewards() {
				this.canIRequest = false;
				fetch({
					url: requestUrls.getRewards + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.msg == 'not found') {
						this.canIRequest = false;
						this.requestDone = true;
					} else if (data && data.msg == "") {
						this.requestDone = false;
						this.canIRequest = true;
						this.rewards = this.rewards.concat(data.result);
						if (this.rewards.length > 0) {
							let temp = this.rewards.filter(reward => reward.amount > 0)
							this.rewards = temp.length == 0 ? [] : temp
						}
					} else {
						this.pageIndex--;
						this.requestDone = true;
					}
					uni.stopPullDownRefresh()
				})
			},
			changeReward(payload) {
				let index = 0;
				for (var i = 0; i < this.rewards.length; i++) {
					if (this.rewards[i].id == payload.id) {
						index = i;
						break;
					}
				}
				this.rewards[i].amount -= payload.count;
			}
		}
	}
</script>

<style>

</style>
