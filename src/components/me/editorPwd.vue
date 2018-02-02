<template>
	<div class="editorBox">
		<div class="edbox">
			<div class="ahead">
				修改密码
				<div class="close" v-on:click="close"><img src="../../../static/img/close.png" alt=""> </div>
			</div>
			<div class="editorItem">
				<div class="edlab">原始密码</div>
				<div class="edinf"><input type="text" placeholder="请输入原始密码" v-model="pwd"></div>
			</div>
			<div class="editorItem">
				<div class="edlab">新密码</div>
				<div class="edinf"><input type="text" placeholder="请输入新密码" v-model="newPwd"></div>
			</div>
			<div class="editorItem">
				<div class="edlab">确认密码</div>
				<div class="edinf"><input type="text" placeholder="请确认密码" v-model="aginPwd"></div>
			</div>
			<div class="btns marginTop">
				<button class="edsave" v-on:click='edsave'>保存修改</button>
			</div>
		</div>
	</div>   
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../static/js/common.js'
export default{
	data:function () {
		return {
			pwd:"",
			newPwd:"",
			aginPwd:""
		}
	},
	props: ['oldpwd'],
	methods:{
		close:function(){
			this.$emit("close",{type:'edinfo'})
		},
		edsave(){
			var _this = this
			var pwdReg = /^[0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)]{6,16}$/
			if(this.pwd === this.oldpwd){
				if(this.newPwd === this.oldpwd){
					this.$message.error('新密码与原始密码相同')
				}else if(this.newPwd !== this.aginPwd){
					this.$message.error('新密码输入不相同')
				}else if(!pwdReg.test(this.newPwd)){
					this.$message.error('密码格式不正确')
				}else{
					this.$http.post('/useraccount/manager/account/',{passWord:this.newPwd,actId:getCookie("info").actId},{emulateJSON:true}).then(response => {
						var res = response.data
						if(res.code === 400 || res.code === 401){
							this.$message.error(res.msg)
							this.$router.push("/login")
						}else if(res.code === 0){
							this.$message.success(res.msg)
							_this.$emit("close",{type:'edinfo',newPwd:_this.newPwd})
						}else{
							this.$message.error(res.msg)
						}
					},response => {
						this.$message.error('网络异常')
					})
				}
			}else{
				this.$message.error('原始密码不正确')
			}
		}
	}
} 
</script>

<style>
.editorBox{
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	background: rgba(0,0,0,0.6);
}
.edbox{
	width: 508px;
	height: 467px;
	border-radius: 8px;
	position: fixed;
	top:50%;
	left: 50%;
	margin:-234px 0 0 -254px;
	background: #fff;
}
.edbox>.ahead{
	width: 100%;
	height: 44px;
	border-bottom: 1px solid #e6efef;
	position: relative;
	text-align: center;
	line-height: 44px;
	font-size: 15px;
	font-weight: bold;
}
.edbox>.ahead>.close{
	width: 44px;
	height: 44px;
	border-left: 1px solid #e6efef;
	position: absolute;
	top:0;
	right: 0;
}
.edbox>.ahead>.close>img{
	width: 14px;
	height: 14px;
	display: block;
	margin:15px;
	cursor: pointer;
}
.editorItem{
	width: 100%;
	height: 45px;
	font-size: 14px;
	border-bottom: 1px solid #e6efef;
	display: flex;
	display: -webkit-flex;
}
.edlab{
	width: 115px;
	height: 100%;
	line-height: 45px;
	margin-left: 15px;
	color: #575756
}
.edinf input{
	width: 300px;
	height: 15px;
	display: block;
	margin-top: 15px;
}
.edsave{
	width: 111px;
	height: 30px;
	border-radius: 15px;
	background: #308acb;
	font-size: 15px;
	color:#fff;
	cursor: pointer;
}
.marginTop{
	margin-top: 20px;
}
</style>
