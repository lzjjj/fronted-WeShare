<template>
	<view>
		<rewardList :rewards=rewards />
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
				canIRequest: true
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
		methods: {
			getRewards() {
				this.canIRequest = false;
				fetch({
					url: requestUrls.getRewards + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.msg == 'not found') {
						this.canIRequest = false;
					} else if (data && data.msg == "") {
						this.canIRequest = true;
						this.rewards = this.rewards.concat(data.result);
						if(this.rewards.length > 0) {
							this.rewards = this.rewards.filter(reward =>  reward.amount > 0)
						}
					} else {
						this.pageIndex--;
					}
				})
			}
		}
	}
</script>

<style>

</style>
