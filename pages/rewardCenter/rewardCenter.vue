<template>
	<view>
		<rewardList :rewards= rewards />
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	export default {
		data() {
			return {
				rewards:[{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'},
				{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'}]
			}
		},
		methods: {
			getRewards() {
				/* uni.request({
					url: requestUrls.getRewards,
					method: 'GET',
					success: (res) => {
						console.log(res.data)
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
