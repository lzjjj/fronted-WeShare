<template>
	<view>
		<card v-for="topic in topics" :topic = "topic"></card>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	export default{
		data() {
			return {
				topics : []
			};
		},
		mounted() {
			this.getTopics()
		},
		methods:{
			getTopics() {
				uni.request({
						url: requestUrls.getTopics
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						const [error, res] = data
						if(res) {
							this.topics = res.data
						}
					})
			}
		}
	}
</script>

<style>
</style>
