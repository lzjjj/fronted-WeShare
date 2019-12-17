<template>
	<view class="cu-list menu-avatar">
		<view class="cu-item" v-for="(reward, index) in rewards" :key="index" style="height: 100px;">
			<view class="cu-avatar round lg" v-bind:style="'background-image:url(' + reward.photo + ')'"></view>
			<view class="content">
				<view class="flex">
					<view class="flex-sub radius" style="width: 50%;">
						<view class="text-grey text-cut" >{{reward.name}}</view>
					</view>
					<view class="flex-sub radius">
						<view class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.8rem;">{{reward.price}}</view>
					</view>
				</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">
						{{reward.desc}}
					</view> 
				</view>
				<view v-if="title != '已兑换商品'" class="text-red text-sm flex">
					<view v-if="reward.quantity > 0">
						剩余{{reward.quantity}}件
					</view>
					<view v-else>库存不足</view>
				</view>
			</view>
			<view v-if="(reward.quantity > 0) && title != '已兑换商品'">
				<button class="cu-btn bg-green shadow" @tap="showModal(reward)" data-target="rewardDialog">兑换</button>
			</view>
			<view v-if="title == '已兑换商品'">
				<view class="cu-tag radius"  :class=" reward.status == '未兑换' ? 'bg-blue' : 'bg-green'">{{reward.status}}</view>
			</view>
		</view>
		<rewardDialog ref="popup" :showUp=showUp :reward=currItem @hideModal="hideModal" @confirm='onConfirm'></rewardDialog>
	</view>
</template>

<script>
	export default {
		props: {
			rewards: {
				type: Array,
				required: true
			},
			title: {
				type: String,
				required: false
			}
		},
		data() {
			return {
				showUp: '',
				currItem: {}
			}
		},
		methods: {
			showModal(item) {
				this.$refs.popup.show = true
				this.currItem = item
			},
			onConfirm() {
				console.log("reward confirm");
			}
		}
	}
</script>

<style>
</style>
