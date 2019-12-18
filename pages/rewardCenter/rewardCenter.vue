<template>
	<view>
		<rewardList :rewards= rewards />
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
		onPullDownRefresh() {
			this.pageIndex++;
			this.getRewards()
		},
		methods: {
			getRewards() {
				fetch({
					url: requestUrls.getRewards + "/?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.length > 0) {
						if(this.rewards.length > 0) {
							this.rewards.push(data)
						} else {
							this.rewards = data
						}
					} else {
						this.pageIndex--;
					}
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style>

</style>
