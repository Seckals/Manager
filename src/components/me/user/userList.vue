<template>
	<div class="cont">
		<div class="mulist">
			<div class="muhead">
				<span class="mutitle">所有用户</span>
				<div class="mutitleR">
					<div class="searchBox" v-on:mouseout="hoveOut" v-on:mouseover="hoveIn">
						<input type="text" placeholder="请输入搜索内容" class="inputInfo" v-model="searChInfo">
						<img src="../../../../static/img/schB.png" v-on:click="search" v-on:keyup.enter="search">
					</div>
					<span class="mubtn">
						<img src="../../../../static/img/addW.png">
						<router-link :to="{ path: 'useradd'}" tag="span">添加用户</router-link>
					</span>
				</div>
			</div>
			<div class="mubody scroll">
				<div  class="muitem" v-bind:class="{muactive:isHover === index,bgF4:item.delete == 1}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut"  v-for="(item,index) in list">
					<router-link :to="{ path: 'userinfo', query: { actPid: item.actId}}" tag="div" class="muitemBox">
						<div class="muicon">
							<img src="../../../../static/img/picon.png" v-if="item.delete != 1">
							<img src="../../../../static/img/picong.png" v-if="item.delete == 1">
						</div>
						<div class="muname" :class="{colorBa:item.delete == 1}">{{item.userName}}({{item.company}})</div>
					</router-link>
				</div>
				<div class="getMore" v-on:click='getMore' v-show="list.length>=16">{{text}}</div>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data(){
		return{
			list:[],
			isHover:"",
			type:"list",
			iteminfo:"",
			page:1,
			nextPage:'',
			searChInfo:"",
			text:'获取更多...'
		}
	},
	mounted:function(){
		this.getList()
	},
	methods:{
		hoverIn:function(val){
			this.isHover = val
		},
		hoverOut:function(){
			this.isHover = false
		},
		hoveIn:function(){
			this.$el.querySelector(".inputInfo").style.width = 150+'px'
		},
		hoveOut:function(){
			if(this.searChInfo === ''){
				this.$el.querySelector(".inputInfo").style.width = 0+'px'
			}
		},
		getList:function(){
			var _this = this
			this.$http.post('/useraccount/manager/userinfo/get/',{pageSize:16,page:this.page},{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					_this.nextPage = res.data.nextPage
					if(res.data.nextPage === 0){
						_this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							_this.list.push(data[i])
						}
						_this.page++
					}
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		getSearchList:function(){
			var _this = this
			this.$http.post('/useraccount/manager/userinfo/search/',{pageSize:16,page:this.page,message:this.searChInfo},{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					_this.nextPage = res.data.nextPage
					if(res.data.nextPage === 0){
						_this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							_this.list.push(data[i])
						}
						_this.page++
					}
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		getMore(){
			if(this.nextPage !== 0){
				if(this.searChInfo !== ''){
					this.getSearchList()
				}else{
					this.getList()
				}
			}
		},
		search:function(){
			this.list = []
			this.page=1
			this.getSearchList()
		}
	}
}
</script>

<style>
.scroll{
	overflow-x: hidden;
    overflow-y: auto;
}
.muhead{
	width: 100%;
	height: 40px;
	font-size: 12px;
	position: relative;
	text-align: center;
	background: #eeeeee;
}
.mutitle{
	position: absolute;
	top:0;
	left:21px;
	display: block;
	height: 40px;
	line-height: 40px;
	color:#222;
}
.mubtn{
	width: 86px;
	height: 24px;
	display: inline-block;
	color: #fff;
	font-size: 0;
	cursor: pointer;
	background: #308acb;
	border-radius: 12px;
	line-height: 24px;
}
.mubtn>span{
	font-size: 12px;
	margin-left: 8px;
}
.mubody{
	width: 100%;
	height: 755px;
	background: #fff;
}
.muitem{
	width: 100%;
	height: 44px;
	font-size: 0;
	cursor: pointer;
	border-bottom: 1px solid #e0e2e0;
}
.muitem>div>div{
	display: inline-block;
	vertical-align: top;
}
.muitem .muicon{
	padding: 9px 15px 0 8px;
}
.muitem .muicon>img{
	width: 25px;
	height: 27px;
}
.muname{
	font-size: 14px;
	padding-top: 16px;
}
.colorBa{
	color:#bababa !important;
}
.muactive{
	background: #d9d7d7 !important;
}
.muitemBox{
	width: 100%;
}
.mutitleR{
	position: absolute;
	top: 0px;
	right: 233px;
	padding-top:8px;
	height: 32px;
	font-size: 0;
}
.bgF4{
	background: #f4f4f4 !important;
}
.searchBox{
	display: inline-block;
	vertical-align: top;
	margin-right: 44px;
}
.inputInfo{
	font-size: 12px;
	height: 24px;
	border: none;
	background: transparent;
	border-bottom: 1px solid #308acb;
	width:0;
	transition:width 0.3s;
	-moz-transition:width 0.3s; /* Firefox 4 */
	-webkit-transition:width 0.3s; /* Safari and Chrome */
	-o-transition:width 0.3s; /* Opera */
}
.searchBox>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 4px;
	cursor: pointer;
}
.inputInfo::-webkit-input-placeholder {
	font-size:12px;
}
.inputInfo:-moz-placeholder {
	font-size:12px;
}
.inputInfo::-moz-placeholder {
	font-size:12px;
}
.inputInfo:-ms-input-placeholder {
	font-size:12px;
}
</style>
