<template>
	<div class="content">
		<div class="nav">
			<div class="btn">
				<img src="../../../static/img/back.png" alt="" class="back" @click="back">
				<img src="../../../static/img/go.png" alt="" class="go" @click='go'>
			</div>
			<ul>
				<li class="nonumbox">
					<router-link to='/App/work/appRepbox'>报修工单</router-link>
					<span class="nonum" v-if="haveToDealNumber">{{haveToDealNumber}}</span>
				</li>
				<li class="pst"><router-link to='/App/work/apply'><img src="../../../static/img/add.png" class="imgAdd"><img src="../../../static/img/addW.png" class="imgAddW">新建工单</router-link></li>
				<li ><router-link to='/App/work/dealBox'>处理中</router-link></li>
				<li ><router-link to='/App/work/wdealbox'>已完成</router-link></li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data:function(){
		return{
			isShow:false
		}
	},
	computed:{
		haveToDealNumber(){
			return this.$store.state.haveToDealNumber;
		}
	},
	methods:{
		back:function(){
			history.go(-1);
		},
		go:function(){
			history.go(1);
		}
	}
}
</script>

<style>
.pst>a{
	position: relative;
}
.imgAdd,.imgAddW{
	position: absolute;
	top:15px;
	left: 15px;
}
.imgAddW{
	display: none;
}
.router-link-active>.imgAddW{
	display:block !important;
}
.nonumbox{
	position: relative;
}
.nonum{
	display: block;
	position: absolute;
	top:-8px;
	right: 5px;
	padding: 0 3px;
	min-width: 14px;
	height: 20px;
	line-height: 20px;
	border-radius: 10px;
	font-size: 12px;
	color:#fff;
	text-align: center;
	background: #f01414;
	font-style: normal;
}
</style>
