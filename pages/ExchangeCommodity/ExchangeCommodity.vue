<template>
	<view>
		<rewardList :rewards= rewards :title=title />
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				rewards:[],
				title:'已兑换商品',
				pageIndex: 1
			}
		},
		methods: {
			loadData() {
				fetch({
					url: requestUrls.getExchangeHistory + "?page=" + this.pageIndex + "&per_page=10",
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
			}
		},
		onLoad() {
			this.loadData()
		},
		onReachBottom() {
			this.pageIndex++;
			this.loadData();
		}
	}
</script>

<style>

</style>
