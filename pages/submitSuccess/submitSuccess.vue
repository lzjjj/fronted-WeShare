<template>
	<view style="margin: 20%;">
		<view class="padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="padding text-xsl">
					<text class="cuIcon-roundcheckfill text-green"></text>
				</view>
				<view class="padding text-bold text-xl">提交成功</view>
			</view>
		</view>
		<view><button class="cu-btn block bg-blue margin-tb-sm lg" @click="close">关    闭</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			close() {
				uni.reLaunch({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style>

</style>
