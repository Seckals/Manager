<template>
	<div class="content">
		<div class="nav">
			<div class="btn">
				<img src="../../../static/img/back.png" alt="" class="back" @click="back">
				<img src="../../../static/img/go.png" alt="" class="go" @click='go'>
			</div>
			<ul>
				<li ><router-link to='/App/me/dealbox'>我已处理</router-link></li>
				<li ><router-link to='/App/me/userbox'>用户账号管理</router-link></li>
				<li ><router-link to='/App/me/myInfo'>我的资料</router-link></li>
			</ul>
		</div>
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
