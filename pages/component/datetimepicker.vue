<template>
	<view class="cu-form-group" @click="showDatePicker">
		<view class="title">报名截止时间</view>
		<view>{{datetime}}</view>
		<mx-date-picker :show="showPicker" :type="datetype" :value="value" :show-tips="true"
		 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import MxDatePicker from "./mx-datepicker.vue"
	import getDate from "../../utils.js"
	export default {
		component: {
			MxDatePicker
		},
		props: {
			datetype: {
				type: String,
				required: true
			}
		},
		data() {
			const currentDate = getDate();
			return {
				showPicker: false,
				value: '',
				datetime: currentDate + "00:00:00",
			}
		},
		methods: {
			showDatePicker() { //显示
				this.showPicker = true;
				this.value = this[this.datetype];
				console.log(this.datetype);
				console.log(this.value);
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			}
		}
	}
	
</script>

<style>
</style>
