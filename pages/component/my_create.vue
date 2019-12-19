<template>
	<view>
		<view class="cu-card case" :key="index" v-for="(item,index) in myCreateList" @click="navigate(item)" >
			<view class="cu-item shadow">
				<view style="margin:10px 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.8rem;font-weight: bold;"> <text class="text-cut">{{item.topic_name}}</text></view>
					<view class="flex justify-between align-center">
						<view class="dots_1">Sharing 简介：{{item.description}}</view>
						<button v-if="item.status == 'new'" class="cu-btn lg bg-blue" style="width: 5.5rem;height: 1.8rem;font-size: 0.7rem;color: #FFFFFF;">报名中</button>
						<button v-if="item.status == 'process'" class="cu-btn lg bg-blue" style="width: 5.5rem;height: 1.8rem;font-size: 0.7rem;color: #FFFFFF;">进行中</button>
						<button v-if="item.status == 'cancel'" class="cu-btn lg bg-grey" style="width: 5.5rem;height: 1.8rem;font-size: 0.7rem;color: #FFFFFF;">已取消</button>
						<button v-if="item.status == 'complete'" class="cu-btn lg bg-green" style="width: 5.5rem;height: 1.8rem;font-size: 0.7rem;color: #FFFFFF;">已完成</button>
						<button v-if="item.status == 'deadline'" class="cu-btn lg bg-red" style="width: 5.5rem;height: 1.8rem;font-size: 0.7rem;color: #FFFFFF;">已截止</button>
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
	import fetch from '../../fetch.js'
	import requestUrls from '../../api.js'
	export default {
		data() {
			return {
				myCreateList: []
			};
		},
		mounted() {
			this.getMyCreates()
		},
		methods: {
			getMyCreates(){
				fetch({
						url: requestUrls.getMyCreates + '?page=1&per_page=10'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						if (data) {
							this.myCreateList = data.result
						}
					})
			},
			navigate(item) {
				uni.navigateTo({
					url: '../myCreateDetail/myCreateDetail?detailId='+ item.id
				})
			},
		}
	}
</script>

<style>
	.dots_1 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 8px;
		width: 65%;
	}
</style>
