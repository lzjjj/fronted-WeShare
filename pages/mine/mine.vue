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
		      <image src='' class='item-img'></image>
		      <text>钱包余额</text>
		    </view>
		    <view>{{userInfo.balance}} 元</view>
		  </view>
		  <view class='list-item' bindtap='luanchToMyDate'>
		    <view style='display:flex;justify-content:center;align-items:center;'>
		      <image src='' class='item-img'></image>
		      <text>兑换记录</text>
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
					avatarUrl:'http://xuvi7-w10:9090/1576464501443bbb.png',
					},
				canIUse: false
			}
		},
		methods: {
			getUserInfo() {
				console.log('登录操作')
			}
		},
		onLoad() {
			
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
  background-color: #f1ed00e5;
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
  font-size:0.9rem;
  margin-bottom: 0.9rem;
  border-bottom: 1px solid #f8f8f8;
  padding-bottom: 0.4rem;
}
.item-img{
  width: 25px;
  height: 25px;
}
</style>
