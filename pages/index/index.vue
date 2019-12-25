<template style="min-height: 100%;">
	<view @touchstart="start" @touchend="end" style="height: 100%;">
		<view>
			<scroll-view scroll-x class="bg-white nav position-top" scroll-with-animation :scroll-left="scrollLeft">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in (role =='admin' ? 4 : 3)" :key="index"
					 @tap="tabSelect" :data-id="index">
						<view v-if="index ==0">话题</view>
						<view v-if="index ==1">我参与的</view>
						<view v-if="index ==2">我创建的</view>
						<view v-if="index ==3 && role =='admin'">后门</view>
					</view>
				</view>
			</scroll-view>
			<view style="margin-top: 50px;">
				<topic ref="topic" v-if="TabCur == 0" v-on:closePullDownFresh="closePullDownFresh"></topic>
				<myJoin ref="myJoin" v-if="TabCur == 1" v-on:closePullDownFresh="closePullDownFresh"></myJoin>
				<myCreate ref="myCreate" v-if="TabCur == 2" v-on:closePullDownFresh="closePullDownFresh"></myCreate>
				<allTopic ref="allTopic" v-if="TabCur == 3 && role =='admin'" v-on:closePullDownFresh="closePullDownFresh"></allTopic>
			</view>
		</view>
		<view v-if="!userInfo" class="cu-modal" :class="modalName=='Image'?'show':''"> 
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg');height:200px;">
				</view>
				<view class="bg-gradual-blue">
					<button class='bg-gradual-blue' open-type="getUserInfo" @click="getWXUserInfo">登录</button>
				</view>
			</view>
		</view>
		<message ref="message"></message>
		<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :direction="direction" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import fetch from '../../fetch.js'
	export default {
		onLoad(option) {
			if (option.TabCur) this.TabCur = Number(option.TabCur)
			this.userInfo = uni.getStorageSync("userInfo")
		},
		beforeCreate(){
			
		},
		onReachBottom() {
			if (this.TabCur == 0) {
				this.$refs.topic.refresh();
			} else if (this.TabCur == 1) {
				this.$refs.myJoin.refresh();
			} else if (this.TabCur == 2) {
				this.$refs.myCreate.refresh();
			} else if (this.TabCur == 3) {
				this.$refs.allTopic.refresh();
			}
		},
		onPullDownRefresh() {
			if (this.TabCur == 0) {
				this.$refs.topic.pullDownRefresh();
			} else if (this.TabCur == 1) {
				this.$refs.myJoin.pullDownRefresh();
			} else if (this.TabCur == 2) {
				this.$refs.myCreate.pullDownRefresh();
			} else if (this.TabCur == 3) {
				this.$refs.allTopic.pullDownRefresh();
			}
		},

		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				horizontal: 'right',
				direction: 'vertical',
				content: [{
					text: '创建',
					iconPath: '../../static/create_select.svg',
					selectedIconPath: '../../static/create_select.svg'
				}],
				pattern: {
					color: '#3c3e49',
					selectedColor: '#007AFF',
					buttonColor: '#3c3e49'
				},
				clientX: 0,
				userInfo: null,
				modalName: "Image",
				role: null
			}
		},
		components: {
			uniFab
		},
		methods: {
			login(code, nickName) {
				uni.request({
						url: requestUrls.WeChatlogin,
						data:{
							code: code,
							nickName:nickName
						},
						method:"POST"
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						const [error, res] = data
						if (error) console.log(error)
						if (res) {
							uni.setStorage({
								key: 'token',
								data: res.data
							}).then(() => {
								this.getSysUserInfo()
								this.$refs.topic.getTopics()
							})
						}
					})
			},
			getSysUserInfo() {
				fetch({
					url: requestUrls.getUserInfo,
				}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					if (data.status) {
						this.role = data.result.role;
					}
				})
			},
			getWXUserInfo() {
				uni.authorize({
					scope: 'scope.userInfo',
				}).then(() => {
					uni.getUserInfo({
						provider: 'weixin',
					}).then((res) => {
						if (res[0]) {
							this.$refs.message.warn(res[0].errMsg)
						}
						if (res[1]) {
							uni.setStorage({
								key: 'userInfo',
								data: res[1].userInfo
							})
							this.userInfo = res[1].userInfo
							this.$refs.message.success("登陆成功！")
							this.modalName = null
							// 登录
							uni.login({
								provider: 'weixin',
							}).then(res => {
								console.log(this.userInfo)
								this.login(res[1].code, this.userInfo.nickName)
							})
						}
					})
				})
			},
			start(e) {
				this.clientX = e.changedTouches[0].clientX;
			},
			end(e) {
				const subX = e.changedTouches[0].clientX - this.clientX;
				if (subX > 100) {
					if (this.TabCur != 0) {
						this.TabCur--
					}
				} else if (subX < -100) {
					if (this.TabCur < 2) {
						this.TabCur++
					}

				} else {
					console.log('无效')
				}
			},
			closePullDownFresh(val) {
				uni.stopPullDownRefresh()
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			trigger() {
				uni.navigateTo({
					url: "../createTopic/createTopic"
				})
			}
		},
		onShareAppMessage() {}

	}
</script>

<style>
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.position-top {
		position: fixed;
		top: 0;
		z-index: 100;
	}
</style>
