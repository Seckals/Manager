<template>
	<div class="content">
		<div class="nav">
			<div class="btn">
				<img src="../../../static/img/back.png" alt="" class="back" @click="back">
				<img src="../../../static/img/go.png" alt="" class="go" @click='go'>
			</div>
			<ul>
				<li ><router-link to='/App/notice/noticebox'>所有通知</router-link></li>
				<li ><router-link to='/App/notice/annouceBox'>所有公告</router-link></li>
				<li ><router-link to='/App/notice/addNotice' class='add'><span></span>发布通知</router-link></li>
				<li ><router-link to='/App/notice/annoumcement' class='add'><span></span>发布公告</router-link></li>
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
</style>
