<template>
	<view>
		<rewardList :rewards= rewards />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rewards:[{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'},
				{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'}]
			}
		},
		methods: {
			
		},
		onLoad() {
			
		}
	}
</script>

<style>

</style>
