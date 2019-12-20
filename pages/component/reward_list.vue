<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(reward, index) in rewards" :key="index" style="height: 100px;">
				<view class="cu-avatar round lg" v-bind:style="'background-image:url(http://hdpdwz.natappfree.cc/' + reward.picture_id + ')'"></view>
				<view class="content">
					<view class="flex">
						<view class="flex-sub radius" style="width: 50%;">
							<view class="text-grey text-cut">{{reward.name}}</view>
						</view>
						<view class="flex-sub radius">
							<view class="lg text-yellow cuIcon-rechargefill" style="font-size: 0.95rem;">{{reward.price}}</view>
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{reward.description}}
						</view>
					</view>
					<view v-if="title != '已兑换商品'" class="text-red text-sm flex">
						<view v-if="reward.amount > 0">
							剩余{{reward.amount}}件
						</view>
						<view v-else>库存不足</view>
					</view>
					<view v-else class="text-orange text-sm flex">
						数量:{{reward.amount}}
						<view class="padding-sm"></view>
						时间:{{reward.exchange_date}}
					</view>
				</view>
				<view v-if="!manage" class="blockclass">
					<view v-if="(reward.amount > 0) && title != '已兑换商品'">
						<button class="cu-btn bg-green shadow" @tap="showModal(reward)" data-target="rewardDialog">兑换</button>
					</view>
					<view v-if="title == '已兑换商品'">
						<view v-if="reward.status=='process'" class="align-center text-blue">等待兑换</view>
						<view v-if="reward.status=='success'" class="align-center text-green">兑换成功</view>
					</view>
				</view>
				<view v-else>
					<view class="cuIcon-deletefill text-red bigView" style="margin-left: -200%;" v-on:click="showDeletePopup(reward)"></view>
				</view>

			</view>
			<rewardDialog ref="popup" :showUp="showUp" :reward="currItem"  @confirm='onConfirm'></rewardDialog>
			<rewardDialog ref="popupDelete" :title="deleteTitle" :msg="deleteMsg" :showUp="showUpDelete" @confirm='onConfirmDelete'></rewardDialog>
			<message ref="Message"></message>
		</view>
		<view class="no_content" v-if="requestDone && rewards.length == 0"></view>
	</view>
</template>

<script>
	import fetch from '../../fetch.js'
	import requestUrls from '../../api.js'
	export default {
		props: {
			requestDone: {
				type: Boolean,
				required: true
			},
			rewards: {
				type: Array,
				required: true
			},
			title: {
				type: String,
				required: false
			},
			manage: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showUp: '',
				currItem: {},
				showUpDelete:'',
				deleteMsg: "是否确定删除?",
				deleteTitle: "提示"
			}
		},
		methods: {
			onDelete(reward) {
				fetch({
					url: requestUrls.deleteRewards,
					method: "DELETE",
					payload: {
						id: reward.id
					}
				})
				console.log('todo delete this commodity')
			},
			showDeletePopup(item) {
				this.$refs.popupDelete.showModal()
				this.currItem = item
			},
			onConfirmDelete() {
				this.$refs.popupDelete.hideModal()
				fetch({
					url: requestUrls.deleteRewards,
					method: 'DELETE',
					payload: {
						id: this.currItem.id
					}
				}).then((res) => {
					if (res && res.status) {
						this.$refs.Message.success('删除成功');
					} else {
						this.$refs.Message.error('删除失败');
					}
				})
			},
			showModal(item) {
				this.$refs.popup.showModal()
				this.currItem = item
			},
			onConfirm(payload) {
				if (payload.amount == 0) {
					this.$refs.Message.warn('请先选择兑换数量')
				} else if (payload.balance == 0 || payload.balance < payload.total) {
					this.$refs.Message.error('你的余额不足')
				} else {
					fetch({
						url: requestUrls.getRewards,
						method: 'PUT',
						payload: {
							id: this.currItem.id,
							count: payload.amount
						}
					}).then(data => {
						if (data.status) {
							this.$refs.Message.success('兑换成功')
							this.$refs.popup.hideModal()
							this.$emit('changeReward', {
								id: this.currItem.id,
								count: payload.amount
							})
						} else {
							this.$refs.Message.warn(data.msg)
						}
					})
				}
			}
		}
	}
</script>

<style>
	.blockclass {
		margin-right: 3%;
	}

	.bigView {
		
	}

	.showtag {
		width: 150rpx;
	}
</style>
