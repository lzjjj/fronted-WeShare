<template>
	<view>
		<view v-if="records.length > 0" class="cu-list">
			<view v-for="(item, index) in records" :key="index" class="cu-item">
				<view class="flex align-center">
					<view class="padding margin-xs radius" style="width: 80%;">
						<view class="grid col-1">
							<view class="text-black">{{item.subject}}</view>
							<view class="text-grey">{{item.create_date}}</view>
						</view>
					</view>
					<view class="padding-sm margin-xs radius" style="width: 25%;">
						<view v-if="item.amount > 0" class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.95rem; width: 100%;">+{{item.amount}}</view>
						<view v-else class="lg text-red cuIcon-rechargefill" style="font-size: 0.95rem; width: 100%;">{{item.amount}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="text-center margin-top">无记录</view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				records: [],
				pageIndex: 1
			}
		},
		methods: {
			loadData() {
				fetch({
					url: requestUrls.getRecord + "?page=" + this.pageIndex + "&per_page=10",
				}).then(data => {
					if (data.result.length > 0) {
						if(this.records.length > 0 && this.pageIndex > 1) {
							this.records.push(data.result)
						} else {
							this.records = data.result
						}
					} else {
						this.pageIndex--;
					}
					uni.stopPullDownRefresh()
				})
			}
		},
		onLoad() {
			this.loadData();
		},
		onReachBottom() {
			this.pageIndex++;
			this.loadData();
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.loadData();
		}
	}
</script>

<style>

</style>
