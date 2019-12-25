<template>
	<view>
		<!-- <card :key="index" v-for="(topic,index) in topics" :topic="topic" :noNeedLuanch="true"></card> -->
		<view class="cu-card case" :key="index" v-for="(item,index) in topics">
			<view class="cu-item shadow">
				<view style="margin:10px 10px;">
					<view class="cu-bar" style="margin: -10px 0;font-size: 0.8rem;font-weight: bold;"> <text class="text-cut">{{item.topic_name}}</text></view>
					<view class="flex justify-between align-center">
						<view class="dots_1">Sharing 简介：{{item.description}}</view>
						<view v-if="item.STATUS == 'new'" class='cu-tag line-blue'>报名中</view>
						<view v-if="item.STATUS == 'process'" class='cu-tag line-blue'>进行中</view>
						<view v-if="item.STATUS == 'cancel'" class='cu-tag line-grey'>已取消</view>
						<view v-if="item.STATUS == 'complete'" class='cu-tag line-blue'>已完成</view>
						<view v-if="item.STATUS == 'deadline'" class='cu-tag line-grey'>已截止</view>
					</view>
					<view class="flex align-center">
						<view class="flex align-center">
							<view style="color: #C8C7CC;">
								<view>时间: {{item.from_date}} - {{item.to_date}}</view>
								<view>地点: {{item.share_place}}</view>
								<view>截止时间: {{item.dead_line_date}}</view>
							</view>
						</view>
						<button v-if="topic.status!='complete' && topic.status!='cancel'" class="bg-gradual-blue cu-btn apply-button"
						 @tap.stop="completeTopic(item.id, index)" style="width: 40%;">完成该话题</button>
					</view>
				</view>
			</view>
		</view>
		<message ref="message"></message>
		<view class='no_content' v-if="requestDone && topics.length == 0"></view>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		props: {
			reachBottom: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				topics: [],
				pageIndex: 1,
				canIRequest: true,
				requestDone: false
			};
		},
		mounted() {
			this.role = uni.getStorageSync("role")
			this.getTopics()
		},

		methods: {
			completeTopic(id, index) {
				fetch({
					url: requestUrls.completeTopic + id,
					method: "PUT"
				}).then(res => {
					if (res.status) {
						this.topics[index].STATUS = "complete"
						this.$refs.message.success('修改成功！')
					}
				})
			},
			refresh() {
				if (this.canIRequest) {
					this.pageIndex++;
					this.getTopics();
				}
			},
			pullDownRefresh() {
				this.pageIndex = 1;
				this.topics = [];
				this.requestDone = false;
				this.getTopics();
			},
			getTopics() {
				this.canIRequest = false;
				fetch({
					url: requestUrls.getTopics + '?page=' + this.pageIndex + '&per_page=10',
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data.msg == 'not found') {
						this.canIRequest = false;
					} else if (data && data.msg == "") {
						this.canIRequest = true;
						this.topics = [...this.topics, ...data.result]

					} else {
						this.pageIndex--;
					}
					this.$emit('closePullDownFresh', false);
					this.requestDone = true
				})
			}
		}
	}
</script>

<style>
</style>
