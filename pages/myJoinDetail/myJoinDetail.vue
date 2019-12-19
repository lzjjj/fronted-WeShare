<template>
	<view>
		<detail type = "1" :detailId="detailId"></detail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId: 1
			}
		},
		onLoad(option) {
			this.detailId = option.detailId
		},
	}
</script>

<style>

</style>
