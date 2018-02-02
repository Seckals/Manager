<template>
	<div class="applyhdeal">
		<router-view></router-view>
	</div>   
</template>

<script type="ecmascript-6">
</script>

<style>
.applyhead{
	height: 55px;
	width: 100%;
	display: flex;
	background: #fff;
}
.applyhead .router-link-active {
	border-bottom: 2px solid #058fce!important;
	color: #262626!important;
}
.applyhead>div a {
	width: 88px;
	height: 54px;
	display: block;
	line-height: 54px;
	margin-right: 64px;
	font-size: 16px;
	cursor: pointer;
	text-align: center;
	color: #7e8080;
}
.applyhdeal{
	width: 100%;
	height: 710px;
	background: #fff;
}
</style>
