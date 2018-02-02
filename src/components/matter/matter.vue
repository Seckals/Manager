<template>
	<div class="content">
		<div class="nav">
			<div class="btn">
				<img src="../../../static/img/back.png" alt="" class="back" @click="back">
				<img src="../../../static/img/go.png" alt="" class="go" @click='go'>
			</div>
			<ul>
				<li ><router-link to='/App/matter/matterList'>所有物料</router-link></li>
				<li ><router-link to='/App/matter/addMatter' class='add'><span></span>添加物料</router-link></li>
			</ul>
		</div>
		<router-view></router-view> 
	</div> 
</template>

<script type="ecmascript-6">
export default{
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
.content{
	width:100%;
	height:795px;
	display: flex;
	display: -webkit-flex;
}	
.nav{
	width: 122px;
	height: 795px;
}
.nav .btn{
	width:79px;
	height:39px;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:15px 23px 0 20px;
}
.nav .btn img{
	width:23px;
	height:20px;
	cursor: pointer;
}
.nav>ul a{
	color:#7b8398;
	width:100%;
	height:40px;
	display: block;
	font-size: 14px;
	line-height: 40px;
	text-align: center;
}
.nav>ul .add{
	position: relative;
}
.nav>ul .add span{
	position: absolute;
	display: block;
	width: 10px;
	height:10px;
	left:15px;
	top:15px;
	background: url('../../../static/img/add.png') no-repeat;
	background-size: 10px 10px;
}
.nav .router-link-active{
	background: #212227;
	color:#fff !important;
}
</style>
