<template>
	<div class="newBox">
		<div class="newhead">
			<div class="matTitleBox">
				<div class="addtab">一级物料</div>
				<div>二级物料</div>
				<div>三级物料</div>
			</div>
			<div class="matChooseBox">
				<div><span class="matChooseActive">1</span></div>
				<img src="./arrows.png">
				<div><span>2</span></div>
				<img src="./arrows.png">
				<div><span>3</span></div>
			</div>
		</div>
		<div class="oneAdd">
			<div v-on:click="showAdd">
				<img src="../../../../static/img/addB.png">
				<span>新建</span>
			</div>
		</div>
		<div class="mMatItem" v-for="(item,index) in list" :class="{'addactive':type===index}" v-on:click="chooseThis(index,item.oneId,item.oneName)" v-on:dblclick.stop="dbEvent(item.oneId,item.oneName)">
			{{item.oneName}}
			<img src="../../../../static/img/edit.png" class="firstedit" v-on:click.stop="oneEditor(item,index)">
			<img class="firstdel" src="../../../../static/img/rubish.png" v-on:click.stop="oneDelete(item.oneId,index)">
		</div>
		<div class="btnsbox">
			<button class="addFinish" v-on:click="addFinish">完成</button>
			<button class="addNext" v-on:click="addNext">下一步</button>
		</div>
		<editeTip :info='info' v-on:close="close" v-show='isShow' v-on:getBackInfo="getBackInfo"></editeTip>
	</div>   
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
import editeTip from './editeTip'
export default{
	data:function () {
		return {
			list:"",
			type:"",
			id:"",
			name:"",
			info:'',
			isShow:false
		}
	},
	components:{editeTip},
	mounted:function(){
		this.getList()
	},
	methods:{
		close(msg){
			this.isShow = msg
		},
		getBackInfo(msg){
			if(typeof msg == 'object'){
				this.list[msg.index] = msg.info
			}else{
				this.getList()
			}
		},
		chooseThis:function(i,id,name){
			this.type = i
			this.id = id
			this.name = name
		},
		dbEvent:function(id,name){
			this.$router.push({ path: 'chooseTwo', query: {id:id,name:name}})
		},
		addNext:function(){
			if(this.id === ""){
				this.$message('请选择一级物料')
			}else{
				this.$router.push({ path: 'chooseTwo', query: {id:this.id,name:this.name}})
			}
		},
		addFinish:function(){
			this.$router.push('/App/matter/matterList')
		},
		showAdd:function(){
			this.isShow = true
			this.info = {
				type:0,
				info:''
			}
		},
		oneEditor:function(item,index){
			this.isShow = true
			this.info = {
				type:2,
				info:item,
				index:index
			}
		},
		oneDelete:function(id,index){
			this.$confirm('确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error',
				center: true
			}).then(() => {
				this.$http.delete('/matter/one/'+id+'/'+getCookie("info").infoId).then(response => {
					var res = response.data
					if(res.code === 400 || res.code === 401){
						this.$message.error(res.msg)
						this.$router.push("/login")
					}else if(res.code === 0){
						this.list.splice(index,1)
						this.$message.success(res.msg)
					}else{
						this.$message.error(res.msg)
					}
				},response => {
					this.$message.error('网络异常')
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		getList(){
			this.$http.get('/matter/one',{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.list = res.data
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		}
	}
}  
</script>

<style>
.newBox{
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	background: #fff;
}
.newhead{
	width: 100%;
	height: 96px;
}
.newhead>div{
	font-size:0;
}
.matTitleBox >div{
	width: 180px;
	margin:0 50px;
	font-size:16px;
	font-weight: bold;
	line-height: 58px;
	text-align: center;
	color:#a6a6a6;
	display: inline-block;
	vertical-align: top;
}
.oneAdd{
	width: 100%;
	height: 35px;
	position: relative;
	background: #eeeeee;
}
.oneAdd>div{
	position: absolute;
	top:0;
	right: 277px;
	cursor: pointer;
	display: flex;
	display: -webkit-flex;
}
.oneAdd>div>img{
	width: 10px;
	height: 10px;
	display: block;
	margin-top: 10px;
	margin-right: 4px;
}
.oneAdd>div>span{
	margin-top: 8px;
	color:#0168b5;
	font-size:12px; 
	display: block;
	transform:scale(0.92,0.92) !important;
	-webkit-transform:scale(0.92,0.92) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
.mMatItem{
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-indent: 49px;
	font-size: 14px;
	color: #222;
	cursor: pointer;
	position: relative;
	border-bottom: 1px solid #e6efef;
}
.mMatItem:hover{
	background: #e1e1e1 !important;
}
.mMatItem .firstedit{
	position: absolute;
	top:15px;
	right: 108px;
	cursor: pointer;
}
.mMatItem .firstdel{
	position: absolute;
	top:17px;
	right: 55px;
	cursor: pointer;
}
.btnsbox{
	width: 100%;
	text-align: center;
	margin-top: 42px;
}
.btnsbox>button{
	width: 111px;
	height: 30px;
	border-radius: 15px;
	margin-right: 23px;
	font-size: 15px;
	color:#fff;
	cursor: pointer;
}
.addFinish{
	background: #1e8e85;
}
.addNext{
	background: #308acb;
}
.addactive{
	background: #e1e1e1 !important;
}
.addtab{
	color:#000 !important;
}
.matChooseBox>div,.matChooseBox>img{
	display: inline-block;
	vertical-align: top;
	font-size: 14px;
}
.matChooseBox>div:first-child{
	margin-left:50px !important;
	margin-right:37.5px !important;
}
.matChooseBox>div{
	width: 180px;
	margin:0 37.5px;
	font-size: 0;
	text-align: center;
}
.matChooseBox>div>span:first-child{
	display: inline-block;
	vertical-align: top;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: #a6a6a6;
	font-size: 14px;
	color: #fff;
	text-align: center;
	line-height: 20px;
}
.matChooseBox>div>span:nth-child(2){
	font-size: 14px;
	color: #308acb;
	line-height: 20px;
	margin-left: 10px;
}
.matChooseActive{
	background: #058fce !important;
}
</style>
