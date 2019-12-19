<template>
	<view>
		<rewardList :rewards= rewards @changeReward='changeReward'/>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				rewards:[],
				pageIndex: 1
			}
		},
		onLoad() {
			this.getRewards()
		},
		onReachBottom() {
			this.pageIndex++;
			this.getRewards()
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.getRewards()
		},
		methods: {
			getRewards() {
				fetch({
					url: requestUrls.getRewards + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.result.length > 0) {
						if(this.rewards.length > 0 && this.pageIndex != 1) {
							this.rewards.push(data.result)
						} else {
							this.rewards = data.result
						}
					} else {
						this.pageIndex--;
					}
				})
				uni.stopPullDownRefresh();
			},
			changeReward(payload){
				let index = 0;
				for (var i = 0; i < this.rewards.length; i++) {
					if(this.rewards[i].id == payload.id) {
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
