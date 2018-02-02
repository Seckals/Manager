<template>
	<div class="workList" id="workList">
		<div class="wHeader">
			申请列表
			<!-- <div class="wTog"  v-on:click="toggle">
				{{titleText}}<img src="../../../../static/img/tog.png">
			</div> -->
		</div>
		<div class="wItem" v-bind:class="{wActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
			<router-link	 :to="{ path: 'repIteminfo', query: { id: item.rerId }}" tag="div">
				<div class="wIcon"><img src="../../../../static/img/rep.png"></div>
				<div class="wInfo">
					<div class="wName">{{item.rerName}}</div>
				</div>
				<div class="wTime">{{item.createTime | split}}</div>
			</router-link>
		</div>
		<div class="getMore" v-on:click='getMore' v-show="list.length>=13">{{text}}</div>
	</div>
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data:function(){
		return{
			isHover:"",
			list:[],
			page:1,
			nextPage:'',
			text:'获取更多...',
			status:'all',
			titleText:"我的申请"
		}
	},
	mounted:function(){
		var info = {rerStatus:0,page:1,pageSize:13}
		var _this = this
		this.$http.post('/realestate/manager/repair/all/',info,{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 0){
				_this.nextPage = res.data.nextPage
				if(res.data.nextPage === 0){
					_this.text="没有更多了"
				}
				_this.list = res.data.list
			}else{
				this.$message.error(res.msg)
				this.$router.push("/login")
			}

		},response => {
			this.$message.error('网络异常')
		})
	},
	filters:{
		split:function(val){
			return val.substr(0,10)
		}
	},
	computed:{
		haveToDealNumber(){
			return this.$store.state.haveToDealNumber;
		}
	},
	watch:{
		haveToDealNumber:function(val, oldVal){
			if(oldVal < val){
				var info = {rerStatus:0,page:1,pageSize:13}
				var _this = this
				this.$http.post('/realestate/manager/repair/all/',info,{emulateJSON:true}).then(response => {
					var res = response.data
					if(res.code === 0){
						_this.nextPage = res.data.nextPage
						if(res.data.nextPage === 0){
							_this.text="没有更多了"
						}
						_this.list = res.data.list
					}else{
						this.$message.error(res.msg)
						this.$router.push("/login")
					}

				},response => {
					this.$message.error("网络异常")
				})
			}
		}
	},
	methods:{
		hoverIn:function(val){
			this.isHover = val
		},
		hoverOut:function(){
			this.isHover = false
		},
		getList:function(info){
			var _this = this
			this.$http.post('/realestate/manager/repair/all/',info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 0){
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
					this.$router.push("/login")
				}

			},response => {
				this.$message.error("网络异常")
			})
		},
		getMore(){
			if(this.nextPage !== 0){
				if(this.status === 'all'){
					var info = {rerStatus:0,page:this.page,pageSize:13}
					this.getList(info)
				}else{
					this.getMyList()
				}
			}
		},
		toggle(){
			this.list=[]
			if(this.status === 'all'){
				this.status = 'self'
				this.titleText = "全部"
				var info = {rerStatus:0,page:1,pageSize:13,rerUser:getCookie("info").infoId}
				this.getList(info)
			}else{
				this.status = 'all'
				this.titleText = "我的申请"
				var info = {rerStatus:0,page:1,pageSize:13}
				this.getList(info)
			}
		},
		getMyList(){
			var info = {rerStatus:0,page:this.page,pageSize:13,relUserId:getCookie("info").infoId}
			this.getList(info)
		}
	}
}
</script>

<style>
.workList{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow-x: hidden;
	overflow-y: scroll;
}
.wItem{
	width: 100%;
	height: 44px;
	padding-top: 10px;
	font-weight: bold;
	cursor: pointer;
	border-bottom: 1px solid #e0e2e0;
}
.wItem>div {
	padding: 0 19px 0 5px;
	width: 100%;
	height: 44px;
	box-sizing: border-box;
}
.wItem .wIcon{
	padding-right: 15px;
	float: left;
}
.wItem .wInfo{
	line-height: 30px;
	float: left;
	max-width: 700px;
	overflow: hidden;
}
.wItem .wName{
	font-size: 14px;
}
.wItem .wTime{
	float: right;
}
.wItem .wAddress,.wTime{
	font-size: 12px;
}
.wActive{
	background: #e1e0e0 !important;
}
.getMore{
	font-size: 12px;
	text-align: center;
	line-height: 30px;
	color: #9b9b9b;
	cursor: pointer;
}
.wHeader{
	width: 100%;
	height: 33px;
	line-height: 33px;
	font-size: 12px;
	color: #9b9b9c;
	text-indent: 21px;
	position: relative;
	background: #eee;
}
.wHeader .wTog{
	height: 100%;
	width: 75px;
	position: absolute;
	top:0;
	right: 36px;
	color:#308acb;
	text-indent: 0;
	cursor: pointer;
}
.wHeader .wTog>img{
	display: inline-block;
	vertical-align: top;
	margin-top: -25px;
	margin-left: 60px;
}
</style>
