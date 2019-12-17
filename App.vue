<script>
	import requestUrls from 'api.js'
	export default {
		onLaunch: () => {},
		beforeCreate() {
			// 登录
			uni.login({
				provider: 'weixin',
			}).then(res => {
				this.login(res[1].code)
			})
		},
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
							})
						}
					})
			},
		},
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
