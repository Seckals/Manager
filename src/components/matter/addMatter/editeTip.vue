<template>
	<div class="addBox">
		<div class="addcontent">
			<div class="addContHead">
				{{titleList[info.type]}}
				<div class="close" v-on:click="close">
					<img src="../../../../static/img/close.png">
				</div>
			</div>
			<div class="addInputbox">
				<div class="addlabel">物料名</div>
				<input type="text" v-model="name" >
			</div>
			<div class="addbtnbox">
				<button class="addbtn" v-on:click="todo">保存</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data:function () {
		return {
			name:'',
			userId:getCookie("info").infoId,
			titleList:['添加一级物料','添加二级物料','修改一级物料','修改二级物料']
		}
	},
	props: ['info'],		// 0：添加一级物料，1：添加二级物料，2：修改一级物料，3：修改二级物料
	watch:{
		info(){
			if(this.info.info.oneName){
				this.name = this.info.info.oneName
			}else if(this.info.info.twoName){
				this.name = this.info.info.twoName
			}else{
				this.name = ''
			}
		}
	},
	methods:{
		close(){
			this.$emit("close",false)
		},
		todo(){
			if(this.name){
				var _this = this
				switch(this.info.type){
					case 0:
						this.add('/matter/one',{oneName:this.name,user:this.userId},function(data){
							_this.$emit('getBackInfo')
							_this.close()
						})
						break;
					case 1:
						this.add('/matter/tow',{twoName:this.name,onePid:this.info.id,user:this.userId},function(data){
							_this.$emit('getBackInfo')
							_this.close()
						})
						break;
					case 2:
						this.edite('/matter/one', {oneName:this.name,oneId:this.info.info.oneId,user:this.userId},function(data){
							_this.info.info.oneName = _this.name
							_this.$emit('getBackInfo',_this.info)
							_this.close()
						})
						break;
					case 3:
						this.edite('/matter/tow', {twoName:this.name,twoId:this.info.info.twoId,user:this.userId},function(data){
							_this.info.info.twoName = _this.name
							_this.$emit('getBackInfo',_this.info)
							_this.close()
						})
						break;
				}
			}else{
				this.$message.error('请填写完整')
			}
		},
		add(url,data,fn){
			this.$http.put(url,data,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					fn.call(null,res.data)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error("网络异常")
			})
		},
		edite(url,data,fn){
			this.$http.post(url,JSON.stringify([data])).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.$message.success(res.msg)
					fn.call(null,res.data)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error("网络异常")
			})
		}
	}
}
</script>
<style>
.addBox{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
	position: fixed;
	top:0;
	left: 0;
}
.addcontent{
	width: 432px;
	height: 205px;
	position: fixed;
	top:50%;
	left:50%;
	margin:-216px 0 0 -104px;
	background: #fff;
	border-radius: 8px;
}
.addContHead{
	width: 100%;
	height: 44px;
	position: relative;
	text-align: center;
	line-height: 44px;
	font-size: 15px;
	font-weight: bold;
	border-bottom: 1px solid #e6efef;
}
.addContHead>.close{
	width: 43px;
	height: 43px;
	position: absolute;
	top:0;
	right: 0;
	border-left:1px solid #e6efef;
}
.addContHead>.close>img{
	width: 13px;
	height: 13px;
	display: block;
	margin:15px;
	cursor: pointer;
}
.addInputbox{
	height: 32px;
	padding-left: 8px;
	margin-top: 27px;
	display: flex;
	display: -webkit-flex;
}
.addInputbox .addlabel{
	width: 72px;
	height: 100%;
	text-align: center;
	line-height: 32px;
	font-size: 14px;
	color:#727272;
}
.addInputbox>input{
	width: 321px;
	height: 28px;
	display: block;
	font-size: 13px;
	border:2px solid #e3e3e3;
	border-radius: 8px;
	text-indent: 11px;
}
.addbtnbox{
	width: 100%;
	margin-top: 47px;
	text-align: center;
}
.addbtnbox>.addbtn{
	width: 111px;
	height: 30px;
	border-radius: 15px;
	background: #308acb;
	font-size: 15px;
	color:#fff;
	cursor: pointer;
}
.addInputbox>input::-webkit-input-placeholder {
	font-size:13px;
	color: #cacaca;
}
.addInputbox>input:-moz-placeholder {
	font-size:13px;
	color: #cacaca;
}
.addInputbox>input::-moz-placeholder {
	font-size:13px;
	color: #cacaca;
}
.addInputbox>input:-ms-input-placeholder {
	font-size:13px;
	color: #cacaca;
}
</style>
