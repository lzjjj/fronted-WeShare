<template>
	<view>
		<form @submit="formSubmit">
			<view class="cu-bar bg-white margin-top">
				<view class="action">添加图片</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length < 1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">商品名称</view>
				<input placeholder="请输入商品名称" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">商品价格</view>
				<input placeholder="请输入商品价格" name="price" type="digit"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">商品库存</view>
				<input placeholder="请输入商品库存" name="amount" type="number"></input>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" name="description" @input="textareaAInput" placeholder="请输入商品描述"></textarea>
			</view>
			<button class="cu-btn block line-orange lg" style="margin-top: 20%;" form-type="submit">
				<text class="cuIcon-upload"></text> 确认提交
			</button>
		</form>
		<message ref="Message"></message>
	</view>
</template>

<script>
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				imgList:[],
				commodity: {name: '', price: 0, amount: 0, description:'', picture_id:''}
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 4,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.commodity.description = e.detail.value
			},
			formSubmit(e) {
				if(this.imgList.length > 0) {
					e.detail.value.picture_id = this.imgList[0]
				}
				fetch({
					url: requestUrls.getRewards,
					method: 'POST',
					payload: e.detail.value
				}).then(data => {
					if(data.status) {
						this.$refs.Message.success('添加成功')
					} else {
						this.$refs.Message.warn('添加失败')
					}
				})
			}
		}
	}
</script>

<style>
</style>
