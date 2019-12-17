<template>
	<view>
		<rewardList :rewards= rewards :title=title />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rewards:[{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg', status: '未兑换'},
				{name:'棉花糖', price:'100',desc:'超级好吃的棉花糖',photo:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',status: '兑换成功'}],
				title:'已兑换商品'
			}
		},
		methods: {
			
		},
		onLoad() {
			
		},
		onShow() {
			
		}
	}
</script>

<style>

</style>
