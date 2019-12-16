<template>
	<view class="cu-modal" :class="showUp">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">兑换确认</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				你当前有金币1000，该商品需要{{reward.price}}金币，你确定要兑换吗
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="confirm">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showUp:{
				type: String,
				required: true
			},
			reward: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
			
			}
		},
		methods:{
			hideModal() {
				this.$emit('hideModal')
			},
			confirm() {
				this.hideModal();
			}
		}
	}
	
</script>

<style>
</style>
