<template>
	<div class="winfo">
		<div class="imgbox">
			<span class="icon-close closeImg" v-on:click="close"></span>
			<img :src="surl" class="imgcont">
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			url:'./static/img/close.png'
		}
	},
	props:["surl"],
	methods:{
		close(){
			this.$emit("close",false)
		}
	}
}
</script>
