<template>
	<div class="content">
		<div class="nav">
			<div class="btn">
				<img src="../../../static/img/back.png" alt="" class="back" @click="back">
				<img src="../../../static/img/go.png" alt="" class="go" @click='go'>
			</div>
			<ul>
				<li class="nonumbox">
					<router-link to='/App/book/info'>台账列表</router-link>
				</li>
				<li class="pst"><router-link to='/App/book/add'><img src="../../../static/img/add.png" class="imgAdd"><img src="../../../static/img/addW.png" class="imgAddW">新建台账</router-link></li>
			</ul>
		</div>
		<div class="cont">
			<router-view></router-view>
		</div>
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
