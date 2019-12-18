<template>
	<view>
		<detail type = "1" :detail="detail"></detail>
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
	}
</script>

<style>

</style>
