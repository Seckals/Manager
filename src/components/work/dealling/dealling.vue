<template>
	<div class="dealBox">
		<div class="dealtab">
			<ul>
				<router-link class="tabTitle" tag="li" to="first">已接单</router-link>
				<li class="line">|</li>
				<router-link class="tabTitle" tag="li" to="second">已报价</router-link>
				<li class="line">|</li>
				<router-link class="tabTitle" tag="li" to="third">
					用户已确认
					<span class="hadConfirm" v-if="hadConfirmNumber">{{hadConfirmNumber}}</span>
				</router-link>
				<li class="line">|</li>
				<router-link class="tabTitle" tag="li" to="frouth">维修中</router-link>
			</ul>
		</div>
		<div class="dealinfo pt0">
			<router-view></router-view>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	data () {
		return {

		}
	},
	computed:{
		hadConfirmNumber(){ 
			return this.$store.state.hadConfirmNumber;
		}
	}
}
</script>

<style scoped>
.dealBox{
	width: 882px;
	height: 795px;
	background: #fff;
}
.dealtab{
	width: 835px;
	height: 46px;
	margin:0 auto;
	border-bottom: 1px solid #e8e8e8;
}
.dealtab>ul{
	font-size: 0;
}
.dealtab>ul>li{
	display: inline-block;
	vertical-align: top;
	font-size: 16px;
	color:#000;
	height: 46px;
	line-height: 46px;
	position:relative;
}
.tabTitle{
	padding:0 25px;
	cursor: pointer;
	font-weight: 500;
}
.line{
	padding: 0 18px;
	color: #e8e8e8 !important;
}
.dealtab > ul > .router-link-active{
	color:#0168b5;
	border-bottom: 2px solid #0168b5;
}
.dealinfo{
	width: 100%;
	padding-top: 27px;
}
.pt0{
	padding-top: 0 !important;
}
.dealList{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow-y: auto;
	overflow-x: hidden;
}
.hadConfirm{
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	padding: 0 3px;
	min-width: 14px;
	height: 20px;
	line-height: 20px;
	border-radius: 10px;
	font-size: 12px;
	color: #fff;
	text-align: center;
	background: #f01414;
	font-style: normal;
}
.h745{
	height: 745px !important;
}
</style>

