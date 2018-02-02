<template>
	<div class="wApplyBox">
		<ul class="applyNav">
			<!-- <li ><router-link to='/App/work/apply/self'>自用申请</router-link></li> -->
			<li ><router-link to='/App/work/apply/user'>用户申请</router-link></li>
		</ul>
		<router-view></router-view>
	</div> 
</template>

<script type="ecmascript-6">
export default{
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		go:function(){
			this.$router.go(1);
		}
	}
}
</script>

<style>
.wApplyBox{
	width: 100%;
	height: 100%;
	background: #eee;
}
.applyNav{
	width: 100%;
	height: 55px;
	margin:18px 0 12px;
	font-size: 0;
	background: #fff;
}
.applyNav>li{
	margin-left: 22px;
	display: inline-block;
	vertical-align: top;
	padding-top: 6px;
}
.applyNav>li>a{
	width: 92px;
	height: 41px;
	font-size: 16px;
	color: #6a6c6c;
	display: block;
	text-align: center;
	line-height: 41px;
}
.applyNav>li>.router-link-active{
	background: #058fce;
	color: #fff !important;
}
</style>
