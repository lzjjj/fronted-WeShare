<template>
	<view>
		<detail type = "2" :detailId="detailId"></detail>
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
