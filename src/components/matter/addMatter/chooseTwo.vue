<template>
	<div class="newBox">
		<div class="newhead">
			<div class="matTitleBox">
				<div>一级物料</div>
				<div  class="addtab">二级物料</div>
				<div>三级物料</div>
			</div>
			<div class="matChooseBox">
				<div><span>1</span><span>{{onename}}(已选)</span></div>
				<img src="./arrows.png">
				<div><span  class="matChooseActive">2</span></div>
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
		<div class="mMatItem" v-for="(item,index) in list" :class="{'addactive':type===index}" v-on:click="chooseThis(index,item.twoId,item.twoName)" v-on:dblclick.stop="dbEvent(item.twoId,item.twoName)">
			{{item.twoName}}
			<img src="../../../../static/img/edit.png" class="firstedit" v-on:click.stop="twoEditor(item,index)">
			<img class="firstdel" src="../../../../static/img/rubish.png" v-on:click.stop="twoDelete(item.twoId,index)">
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
			onename:"",
			twoname:"",
			info:'',
			isShow:false
		}
	},
	components:{editeTip},
	mounted:function(){
		this.onename = this.$route.query.name
		this.getList(this.$route.query.id)
	},
	methods:{
		close(msg){
			this.isShow = msg
		},
		getBackInfo(msg){
			if(typeof msg == 'object'){
				this.list[msg.index] = msg.info
			}else{
				this.getList(this.$route.query.id)
			}
		},
		chooseThis:function(i,id,name){
			this.type = i
			this.id = id
			this.twoname = name
		},
		dbEvent:function(id,name){
			this.$router.push({ path: 'inpThreeInfo', query: {id:id,onename:this.onename,twoname:name}})
		},
		addNext:function(){
			if(this.id === ""){
				this.$message('请选择二级物料')
			}else{
				this.$router.push({ path: 'inpThreeInfo', query: {id:this.id,onename:this.onename,twoname:this.twoname}})
			}
		},
		addFinish:function(){
			this.$router.push('/App/matter/matterList')
		},
		showAdd:function(){
			this.isShow = true
			this.info = {
				type:1,
				info:'',
				id:this.$route.query.id
			}
		},
		twoEditor:function(item,index){
			this.isShow = true
			this.info = {
				type:3,
				info:item,
				index:index
			}
		},
		twoDelete:function(id,index){
			this.$confirm('确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error',
				center: true
			}).then(() => {
				this.$http.delete('/matter/two/'+id+'/'+getCookie("info").infoId).then(response => {
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
		getList(id){
			this.$http.post('/matter/selective/',{type:'TWO',idList:id},{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.list = res.data.list
				}
			},response => {
				this.$message.error('网络异常')
			})
		}
	}
}  
</script>
