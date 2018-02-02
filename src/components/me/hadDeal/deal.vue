<template>
	<div class="mdhdeal">
		<router-view></router-view>
	</div>   
</template>

<style>
.mdhdeal{
	position: relative;
}
.mdhead{
	height: 55px;
	width: 510px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	display: flex;
	display: -webkit-flex;
	position: relative;
}	
.searchList{
	position: absolute;
	right: 0;
	top: 0;
	padding-top: 19px;
}
.mdhead>div a{
	width: 88px;
	height:54px;
	display: block;
	line-height: 54px;
	margin-right: 64px;
	font-size: 16px;
	cursor: pointer;
	text-align: center;
}
.mdhead>div a{
	color:#7e8080;
}
.mdrep{
	margin-left: 49px;
}
.mdhead .router-link-active{
	border-bottom: 2px solid #058fce !important;
	color:#262626 !important;
}
.mdhdeal{
	width: 100%;
	height: 100%;
}
</style>
