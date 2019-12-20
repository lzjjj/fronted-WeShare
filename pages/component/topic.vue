<template>
	<view>
		<card :key="index" v-for="(topic,index) in topics" :topic="topic"></card>
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
				canIRequest: true
			};
		},
		beforeCreate() {
			// 登录
			uni.login({
				provider: 'weixin',
			}).then(res => {
				this.login(res[1].code)
			})
		},
		mounted() {},

		methods: {
			login(code) {
				uni.request({
						url: requestUrls.WeChatlogin + code
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						const [error, res] = data
						if (error) console.log(error)
						if (res) {
							uni.setStorage({
								key: 'token',
								data: res.data
							}).then(() => {
								this.getTopics()
							})
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
				this.getTopics();
			},
			getTopics() {
				this.canIRequest = false;
				fetch({
					url: requestUrls.getTopics + '?page=' + this.pageIndex + '&per_page=10',
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data.msg == 'not found') {
						this.canIRequest = false;
					} else if (data && data.msg=="") {
						this.canIRequest = true;
						this.topics = [...this.topics, ...data.result]
					} else {
						this.pageIndex--;
					}
				})
			}
		}
	}
</script>

<style>
</style>
