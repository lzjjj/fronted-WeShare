<template>
	<view class="cu-modal" :class="{'show': show}">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">{{title}}</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view v-if="msg==''" class="padding-xl bg-white">
				<view class="flex p-xs margin-bottom-sm mb-sm">
					<view class="flex-sub padding-sm"><view class="align-center text-bold" style="height: 35px; display: flex;">兑换数量：</view></view>
					<view class="flex-twice padding-sm"><uni-number-box ref="numberbox" :value="0" :max="100" @change="bindChange"></uni-number-box></view>
				</view>
				你当前有金币{{balance}}，商品总额{{total}}，你确定要兑换吗?
			</view>
			<view v-if="msg!=''" class="padding-xl">
				{{msg}}
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button v-if="title!='警告' && title!=''" class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="confirm">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		props:{
			showCancel: {
				type: Boolean,
				default: true
			},
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
		components: {uniNumberBox},
		data() {
			return {
				show : false,
				total: 0,
				amount: 0,
				balance: 0
			}
		},
		methods:{
			showModal() {
				this.show = true;
				if(this.msg == '') {
					this.getSysUserInfo();
					this.$refs.numberbox.inputValue = 0;
				}
			},
			hideModal() {
				this.show = false;
			},
			confirm() {
				this.$emit('confirm', {amount: this.amount, total: this.total, balance: this.balance});
			},
			bindChange(e) {
				this.amount = e;
				this.total = e * this.reward.price;
			},
			getSysUserInfo() {
				fetch({
					url: requestUrls.getUserInfo,
				}).then(data => {
					if (data.status) {
						this.balance = data.result.balance;
					}
				})
			}
		}
	}
	
</script>

<style>
</style>
