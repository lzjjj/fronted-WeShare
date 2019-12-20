<template>
	<view class="globalColor">
		<view class='head bg-gradual-blue shadow-blur'>
			<view style='text-align:center;color: #000000;margin-top: 10%;'>
				<image :src="userInfo.avatarUrl" class='head-img'></image>
				<view v-if="userInfo == null">请登录</view>
				<view v-else>{{userInfo.nickName}}</view>
				<button class='login-button' open-type="getUserInfo" @click="getWXUserInfo"> </button>
			</view>
			<image src="../../static/wave.gif" mode="scaleToFill" class="gif-black response" style="position: absolute; bottom: 0;height:100upx"></image>
		</view>
		<view class='mine-list'>
			<view class='list-item'>
				<view style='display:flex;justify-content:center;align-items:center;'>
					<image src='../../static/wallet.svg' class='item-img'></image>
					<text>钱包余额</text>
				</view>
				<view v-if="balance!=0" class="lg text-yellow cuIcon-rechargefill" style="font-size: 1rem;">{{balance}}</view>
				<view v-if="balance ==0" class="text-yellow" style="font-size: 1rem;">{{balance}}</view>
			</view>
			<view class='list-item' bindtap='luanchToMyDate' @click="open('../record/record')">
				<view style='display:flex;justify-content:center;align-items:center;'>
					<image src='../../static/record.svg' class='item-img'></image>
					<text>账单</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class='list-item' bindtap='luanchToMyDate' @click="open('../ExchangeCommodity/ExchangeCommodity')">
				<view style='display:flex;justify-content:center;align-items:center;'>
					<image src='../../static/expiry.svg' class='item-img'></image>
					<text>兑换的商品</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view v-if="role == 'admin'" class='list-item' bindtap='luanchToMyDate' @click="open('../manageCommodity/manageCommodity')">
				<view style='display:flex;justify-content:center;align-items:center;'>
					<image src='../../static/goods.svg' class='item-img'></image>
					<text>商品管理</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<message ref="message"></message>
	</view>
</template>

<script>
	import fetch from '../../fetch.js'
	import requestUrls from '../../api.js'
	export default {
		data() {
			return {
				userInfo: null,
				balance: 0,
				canIUse: false,
				role: ''
			}
		},
		methods: {
			getSysUserInfo() {
				fetch({
					url: requestUrls.getUserInfo,
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data.status) {
						this.balance = data.result.balance;
						this.role = data.result.role;
					}
				})
			},
			getWXUserInfo() {
				uni.authorize({
					scope: 'scope.userInfo',
				}).then(() => {
					uni.getUserInfo({
						provider: 'weixin',
					}).then((res) => {
						if (res[0]) {
							this.$refs.message.warn(res[0].errMsg)
						}
						if (res[1]) {
							console.log(res)
							uni.setStorage({
								key: 'userInfo',
								data: res[1].userInfo
							})
							this.userInfo = res[1].userInfo
						}
					})
				})
			},
			open(path) {
				uni.navigateTo({
					url: path
				});
			}
		},
		onLoad() {
		},
		onShow() {
			this.getSysUserInfo()
		}
	}
</script>

<style>
	.globalColor {
		background-color: #FFFFFF;
	}

	.head {
		width: 100%;
		height: 14rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.head-img {
		border: 2px solid #ffffff;
		width: 3.9rem;
		height: 3.9rem;
		border-radius: 50%;
		background-color: #ffffff;
	}

	.login-button {
		width: 3.9rem;
		height: 3.9rem;
		border-radius: 50%;
		position: absolute;
		top: 5.5rem;
		opacity: 0;
	}

	.mine-list {
		padding: 1.73rem 1rem 0 1rem;
	}

	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* font-size:0.9rem; */
		margin-bottom: 0.9rem;
		border-bottom: 1px solid #f8f8f8;
		padding-bottom: 0.4rem;
	}

	.item-img {
		width: 1rem;
		height: 1rem;
	}
	
	/* css 滤镜 控制黑白底色gif的 */
	.gif-black{  
	  mix-blend-mode: screen;  
	}
</style>
