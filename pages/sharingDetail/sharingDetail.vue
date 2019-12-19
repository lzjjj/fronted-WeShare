<template>
	<view>
		<detail type = "0" :detailId="detailId"></detail>
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
		methods: {
			
		}
	}
</script>

<style>

</style>
