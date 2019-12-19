<template>
	<view>
		<view class="cu-card case" :class="isCard?'no-card':''" :key="index" v-for="(item,index) in joinLists" @click="navigate(item)">
			<view class="cu-item shadow">
				<view style="margin:10px 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.8rem;font-weight: bold;"> <text class="text-cut">{{item.topic_name}}</text></view>
					<view class="flex justify-between align-center">
						<view class="dots">Sharing 简介：{{item.description}}</view>
						<view v-if="item.status == 'new'" class='cu-tag line-blue' >报名中</view>
						<view v-if="item.status == 'process'" class='cu-tag line-blue' >进行中</view>
						<view v-if="item.status == 'cancel'"  class='cu-tag line-grey' >已取消</view>
						<view v-if="item.status == 'complete'" class='cu-tag line-blue' >已完成</view>
						<view v-if="item.status == 'deadline'" class='cu-tag line-grey' >已截止</view>
					</view>
					<view style="color: #C8C7CC;">
						<view>时间: {{item.from_date}} - {{item.to_date}}</view>
						<view>地点: {{item.share_place}}</view>
						<view>截止时间: {{item.dead_line_date}}</view>
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
				joinLists: [],
				pageIndex: 1,
				canRequest: true
			};
		},
		mounted() {
			this.getMyJoins()
		},
		methods: {
			refresh() {
				if (this.canRequest) {
					this.pageIndex++;
					this.getMyJoins();
				}
			},
			getMyJoins() {
				this.canRequest = false;
				fetch({
						url: requestUrls.getMyJoins + '?page=' + this.pageIndex + '&per_page=10'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						this.canRequest = true;
						console.log(data.result)
						if (data.msg == 'not found') {
							this.canRequest = false;
						} else if (data && data.msg=="") {
							this.joinLists = [...this.joinLists, ...data.result]
						} else {
							this.pageIndex--;
						}
					})
			},
			navigate(item) {
				uni.navigateTo({
					url: '../myJoinDetail/myJoinDetail?detailId='+ item.id
				})
			},
		}
	}
</script>

<style>
	.dots {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		/* font-weight: bold; */
		margin-bottom: 8px;
		width: 65%;
	}
</style>
