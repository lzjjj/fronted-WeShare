<template>
	<view>
		<view class="cu-card case" :key="index" v-for="(item,index) in myCreateList" @tap.stop="navigate(item)">
			<view class="cu-item shadow">
				<view style="margin:10px 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.8rem;font-weight: bold;"> <text class="text-cut">{{item.topic_name}}</text></view>
					<view class="flex justify-between align-center">
						<view class="dots_1">Sharing 简介：{{item.description}}</view>
						<view v-if="item.status == 'new'" class='cu-tag line-blue'>报名中</view>
						<view v-if="item.status == 'process'" class='cu-tag line-blue'>进行中</view>
						<view v-if="item.status == 'cancel'" class='cu-tag line-grey'>已取消</view>
						<view v-if="item.status == 'complete'" class='cu-tag line-blue'>已完成</view>
						<view v-if="item.status == 'deadline'" class='cu-tag line-grey'>已截止</view>
					</view>
					<view class="flex align-center">
						<view style="color: #C8C7CC;">
							<view>时间: {{item.from_date}} - {{item.to_date}}</view>
							<view>地点: {{item.share_place}}</view>
							<view>截止时间: {{item.dead_line_date}}</view>
						</view>
						<button v-if="item.status!='complete' && item.status!='cancel' &&  role == 'admin'" class="bg-gradual-blue cu-btn apply-button" @tap.stop="completeTopic(item.id, index)"
						 style="width: 40%;">完成该话题</button>
					</view>
				</view>
			</view>
		</view>
		<view class='no_content' v-if="requestDone && myCreateList.length == 0"></view>
		<message ref="message"></message>
	</view>
</template>

<script>
	import fetch from '../../fetch.js'
	import requestUrls from '../../api.js'
	export default {
		data() {
			return {
				myCreateList: [],
				pageIndex: 1,
				canRequest: true,
				requestDone: false,
				role:""
			};
		},
		mounted() {
			this.getSysUserInfo()
			this.getMyCreates()
		},
		methods: {
			getSysUserInfo() {
				fetch({
					url: requestUrls.getUserInfo,
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data.status) {
						this.role = data.result.role;
					}
				})
			},
			completeTopic(id, index) {
				fetch({
					url: requestUrls.completeTopic + id,
					method: "PUT"
				}).then(res => {
					if (res.status) {
						this.myCreateList[index].status = "complete"
						this.$refs.message.success('修改成功！')
					}
				})
			},
			refresh() {
				if (this.canRequest) {
					this.pageIndex++;
					this.getMyCreates();
				}
			},
			pullDownRefresh() {
				this.pageIndex = 1;
				this.myCreateList = [];
				this.requestDone = false;
				this.getMyCreates();
			},
			getMyCreates() {
				this.canRequest = false;
				fetch({
						url: requestUrls.getMyCreates + '?page=' + this.pageIndex + '&per_page=10'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						this.canRequest = true;
						this.$emit('closePullDownFresh', false);
						if (data.msg == 'not found') {
							this.canRequest = false;
						} else if (data && data.msg == "") {
							this.myCreateList = [...this.myCreateList, ...data.result]
						} else {
							this.pageIndex--;
						}
						this.requestDone = true
					})
			},
			navigate(item) {
				uni.navigateTo({
					url: '../myCreateDetail/myCreateDetail?detailId=' + item.id
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
