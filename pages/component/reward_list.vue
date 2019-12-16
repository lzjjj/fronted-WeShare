<template>
	<view class="cu-list menu-avatar">
		<view class="cu-item" v-for="(reward, index) in rewards" :key="index" style="height: 100px;">
			<view class="cu-avatar round lg" v-bind:style="'background-image:url(' + reward.photo + ')'"></view>
			<view class="content">
				<view class="flex">
					<view class="flex-sub padding-sm margin-xs radius" style="width: 50%;">
						<view class="text-grey text-cut" >{{reward.name}}</view>
					</view>
					<view class="flex-sub padding-sm margin-xs radius">
						<view class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.8rem;">{{reward.price}}</view>
					</view>
				</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">
						{{reward.desc}}
					</view> 
				</view>
			</view>
			<view>
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			rewards: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style>
</style>
