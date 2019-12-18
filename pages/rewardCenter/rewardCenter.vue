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
				rewards:[{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖超级好吃的棉花糖超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg', quantity: 10},
				{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',quantity: 0}]
			}
		},
		methods: {
			getRewards() {
				/* fetch({
					url: requestUrls.getRewards,
				}).then(data => {
					if (data) {
						this.topics = data
					}
				}) */
			}
		},
		onLoad() {
			this.getRewards()
		}
	}
</script>

<style>

</style>
