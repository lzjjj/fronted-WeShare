<template>
	<view>
		<detail type = "2" :detail="detail"></detail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(option) {
			this.detail = option.detail
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
