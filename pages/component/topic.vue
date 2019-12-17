<template>
	<view>
		<card :key="index" v-for="(topic,index) in topics" :topic="topic"></card>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				topics: []
			};
		},
		mounted() {
			this.getTopics()
		},
		methods: {
			getTopics() {
				fetch({
					url: requestUrls.getTopics + '?page=1&per_page=10',
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data) {
						this.topics = data
					}
				})
			}
		}
	}
</script>

<style>
</style>
