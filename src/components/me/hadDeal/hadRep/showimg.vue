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

<style>
.imgbox{
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	background: rgba(0,0,0,0.6);
}
.imgbox > .imgcont{
	position: absolute;  
	margin: auto;  
	top: 0;  
	right: 0;  
	bottom: 0;  
	left: 0;  
}
.closeImg{
	display: block;
	position: absolute;
	top:30px;
	right: 40px;
	cursor: pointer;
	z-index: 100;
	color: #969A98;
	font-weight: bold;
}
.closeImg:hover{
	color: #fff !important;
}
</style>
