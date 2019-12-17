<template>
	<view class="cu-modal" :class="{'show': show}">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">{{title}}</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view v-if="msg=='' && show" class="padding-xl">
				你当前有金币1000，该商品需要{{reward.price}}金币，你确定要兑换吗
			</view>
			<view v-if="msg!='' && show" class="padding-xl">
				{{msg}}
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
			title:{
				type: String,
				default: "兑换确认"
			},
			msg: {
				type: String, 
				default: ''
			},
			showUp:{
				type: String,
				required: true
			},
			reward: {
				type: Object
			}
		},
		data() {
			return {
				show : false,
			}
		},
		methods:{
			showModal() {
				this.show = true;
			},
			hideModal() {
				this.show = false;
			},
			confirm() {
				this.hideModal();
				this.$emit('confirm');
			}
		}
	}
	
</script>

<style>
</style>
