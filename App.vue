<script>
	import requestUrls from 'api.js'
	export default {
		onLaunch: () => {
			uni.authorize({
				scope: 'scope.userInfo',
			}).then(() => {
				uni.getUserInfo({
					provider: 'weixin',
				}).then((res) => {
					uni.setStorage({
						key: 'userInfo',
						data: res[1].userInfo
					})
				})
			})
		},
		methods: {},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	/*每个页面公共css */
	page {
		background-color: rgba(250, 250, 250, 0.90);
	}
</style>
