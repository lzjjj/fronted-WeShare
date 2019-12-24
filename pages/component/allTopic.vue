<template>
	<view>
		<card :key="index" v-for="(topic,index) in topics" :topic="topic"></card>
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
			this.getTopics()
		},

		methods: {
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
