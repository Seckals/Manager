<template>
	<div id="QRcode">
		<div class="QRcode">
			<div class="QRinfo">
				<img src="./img/code.jpg">
				<router-link to='/login'>返回登录页</router-link>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
		}
	},
	methods:{
		
	}
}
</script>

<style>
#QRcode{
	position: absolute;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	background: #fff;
}
.QRcode{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.7);
}
.QRinfo{
	width: 300px;
	height: 350px;
	position: absolute;
	top:50%;
	left: 50%;
	margin:-250px 0 0 -150px;
	text-align: center;
}
.QRinfo>img{
	display: block;
	margin:0 auto;
}
.QRinfo>a{
	font-size: 14px;
	line-height: 50px;
	color:#fff;
}
</style>
