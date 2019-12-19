<template>
	<view>
		<view class="cu-list">
			<view v-for="(item, index) in records" :key="index" class="cu-item">
				<view class="flex align-center">
					<view class="padding margin-xs radius" style="width: 80%;">
						<view class="grid col-1">
							<view class="text-black">{{item.name}}</view>
							<view class="text-grey">{{item.time}}</view>
						</view>
					</view>
					<view class="padding-sm margin-xs radius" style="width: 25%;">
						<view v-if="item.cost > 0" class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.95rem; width: 100%;">+{{item.cost}}</view>
						<view v-else class="lg text-red cuIcon-rechargefill" style="font-size: 0.95rem; width: 100%;">{{item.cost}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				records: [{
					name:'分享分享会',
					time:'2019-12-15 10:15:00',
					cost: '1000',
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
