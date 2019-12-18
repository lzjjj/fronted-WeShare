<template>
	<view class="globalColor">
		<view class='head'>
		  <view style='text-align:center;color: #000000;' > 
		    <image :src="userInfo.avatarUrl" class='head-img'></image>
		     <view v-if="canIUse">登录</view> 
			 <view v-else>{{userInfo.nickName}}</view>
		     <button class='login-button' open-type="getUserInfo" @click="getUserInfo"> </button>
		  </view>
		</view>
		<view class='mine-list'>
		  <view class='list-item' >
		    <view style='display:flex;justify-content:center;align-items:center;'>
		      <image src='../../static/wallet.svg' class='item-img'></image>
		      <text>钱包余额</text>
		    </view>
			<view class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.8rem;">{{userInfo.balance}}</view>
		  </view>
		  <view class='list-item' bindtap='luanchToMyDate' @click="openRecord">
		    <view style='display:flex;justify-content:center;align-items:center;'>
		      <image src='../../static/record.svg' class='item-img'></image>
		      <text>账单</text>
		    </view>
		  </view>
		  <view class='list-item' bindtap='luanchToMyDate' @click="openExchange">
		    <view style='display:flex;justify-content:center;align-items:center;'>
		      <image src='../../static/expiry.svg' class='item-img'></image>
		      <text>兑换的商品</text>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickName:'Vic Xu', 
					balance: 100,
					avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					},
				canIUse: false
			}
		},
		methods: {
			getUserInfo() {
				console.log('登录操作')
			},
			openRecord() {
				uni.navigateTo({
				    url: '../record/record'
				});
			},
			openExchange() {
				uni.navigateTo({
				    url: '../ExchangeCommodity/ExchangeCommodity'
				});
			}
		},
		onLoad() {
		},
		onShow() {
		}
	}
</script>

<style>
.globalColor{
	background-color: #FFFFFF;
}
.head{
  width: 100%;
  height:9.7rem;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head-img{
  border: 2px solid #ffffff;
  width: 3.9rem;
  height: 3.9rem;
  border-radius: 50%;
  background-color: #ffffff;
}
.login-button{
  width: 3.9rem;
  height: 3.9rem;
  border-radius: 50%;
  position: absolute;
  top: 2.8rem;
  opacity: 0;
}
.mine-list{
  padding: 1.73rem 1rem 0 1rem;
}
.list-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* font-size:0.9rem; */
  margin-bottom: 0.9rem;
  border-bottom: 1px solid #f8f8f8;
  padding-bottom: 0.4rem;
}
.item-img{
  width: 1rem;
  height: 1rem;
}
</style>
