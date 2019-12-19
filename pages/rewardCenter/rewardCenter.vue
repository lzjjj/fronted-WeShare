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
		methods: {
			getRewards() {
				fetch({
					url: requestUrls.getRewards + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.result.length > 0) {
						if(this.rewards.length > 0) {
							this.rewards.push(data.result)
						} else {
							this.rewards = data.result
						}
					} else {
						this.pageIndex--;
					}
				})
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
