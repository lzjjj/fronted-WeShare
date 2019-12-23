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
				<textarea maxlength="-1" name="description" placeholder="请输入商品描述"></textarea>
			</view>
			<button class="cu-btn block line-orange lg margin-xs" style="margin-top: 20%;" form-type="submit">
				<text class="cuIcon-upload"></text> 确认提交
			</button>
		</form>
		<message ref="Message"></message>
	</view>
</template>

<script>
	import {
		uploadPic
	} from "../../utils.js"
	import requestUrls from '../../api.js'
	import fetch from '../../fetch.js'
	export default {
		data() {
			return {
				imgList: [],
				imgId: ''
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
						uploadPic(requestUrls.picUpload, this.imgList[0])
							.then((res) => {
								this.imgId = res;
							});
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
			formSubmit(e) {
				let json = e.detail.value;
				let validationMsg = '';
				if (json.name == '') {
					validationMsg = '请输入商品名称'
				} else if (json.price == 0) {
					validationMsg = '请输入商品价格'
				} else if (json.amount == 0) {
					validationMsg = '请输入商品数量'
				}
				if (validationMsg != '') {
					this.$refs.Message.warn(validationMsg);
					return;
				}
				if (this.imgId != '') {
					json.picture_id = this.imgId
				}
				fetch({
					url: requestUrls.getRewards,
					method: 'POST',
					payload: json
				}).then(data => {
					if (data.status) {
						this.$refs.Message.success('添加成功')
						setTimeout(uni.navigateBack, 1000)
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
