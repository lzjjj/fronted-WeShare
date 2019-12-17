<template>
	<view>
		<view class="cu-list">
			<view v-for="(item, index) in records" :key="index" class="cu-item">
				<view class="flex align-center">
					<view class="padding margin-xs radius" style="width: 80%;">
						<view class="grid col-1">
							<view class="padding-sm text-grey">{{item.name}}</view>
							<view class="text-grey">{{item.time}}</view>
						</view>
					</view>
					<view class="padding-sm margin-xs radius">
						<view class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.95rem;">{{item.cost}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records: [{
					name:'分享分享会',
					time:'2019-12-15 10:15:00',
					cost: '+1000',
					},
					{
					name:'兑换奖励',
					time:'2019-12-15 10:15:00',
					cost: '-1000'
					},
				]
			}
		},
		methods: {
			
		},
		onLoad() {
		}
	}
</script>

<style>

</style>
