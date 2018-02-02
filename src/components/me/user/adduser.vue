<template>
	<div class="mulist">
		<div class="muhead">
			<span class="mutitle">基本信息</span>
		</div>
		<div class="mubody">
			<div class="muedit">
				<div class="muitem">
					<div class="mulab">姓名</div>
					<div class="muinf"><input type="text" placeholder="请输入姓名" v-model="name"></div>
				</div>
				<div class="muitem">
					<div class="mulab">手机号</div>
					<div class="muinf"><input type="text" placeholder="请输入手机号" v-model="phone"></div>
				</div>
				<div class="muitem">
					<div class="mulab">房号</div>
					<div class="muinf"><input type="text" placeholder="请输入房号" v-model="address"></div>
				</div>
				<div class="muitem">
					<div class="mulab">年龄</div>
					<div class="muinf"><input type="text" placeholder="请输入年龄" v-model="age"></div>
				</div>
				<div class="muitem">
					<div class="mulab">生日</div>
					<div class="muinf"><input type="text" placeholder="请输入生日" v-model="birthday"></div>
				</div>
				<div class="muitem">
					<div class="mulab">身份证</div>
					<div class="muinf"><input type="text" placeholder="请输入身份证" v-model="idCard"></div>
				</div>
				<div class="muitem">
					<div class="mulab">性别</div>
					<div class="muinf"><input type="text" placeholder="请输入性别" v-model="sex"></div>
				</div>
				<div class="muitem">
					<div class="mulab">公司</div>
					<div class="muinf"><input type="text" placeholder="请输入公司名称" v-model="company"></div>
				</div>
			</div>
			<div class="muhead">
				<span class="mutitle">账号安全</span>
			</div>
			<div class="muitem nocursor">
				<div class="mulab">账号</div>
				<div class="muinf"><input type="text" placeholder="请输入账号" v-model="account"></div>
			</div>
			<div class="muitem nocursor">
				<div class="mulab">密码</div>
				<div class="muinf"><input type="text" placeholder="请输入密码" v-model="pwd"></div>
			</div>
			<div class="delbtn">
				<button class="muadd green" v-on:click='add'>完成添加</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			account:"",
			name:"",
			phone:"",
			address:"",
			age:"",
			birthday:"",
			idCard:"",
			sex:"",
			pwd:"",
			company:''
		}
	},
	methods:{
		add(){
			var info = {}
			var errorMsgList = []
			var nameReg = /^[0-9a-zA-Z]{3,30}$/
			var pwdReg = /^[0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)]{6,16}$/
			var phoneReg = /^1[34578]\d{9}$/
			var ageReg = /^\d{1,3}$/

			this.name !== '' && this.name.length <= 10 ? info["name"] = this.name : errorMsgList.push("姓名长度为1-10位")
			phoneReg.test(this.phone) ? info["phone"] = this.phone : errorMsgList.push("手机号码格式不正确")
			this.address.length >= 1 && this.address.length <= 20 ? info["address"] = this.address : errorMsgList.push("地址长度为1-20位")
			ageReg.test(this.age) ? info["age"] = this.age : errorMsgList.push("年龄长度为1-3位")
			this.birthday !== '' ? info["birthday"] = this.birthday : errorMsgList.push("生日不能为空")
			this.idCard !== '' ? info["idCard"] = this.idCard : errorMsgList.push("身份证不能为空")
			this.sex.length === 1 ? info["sex"] = this.sex : errorMsgList.push("性别长度为1位")
			nameReg.test(this.account) ? info["userName"] = this.account : errorMsgList.push("账号由3-30位 大小写字母或数字组成")
			pwdReg.test(this.pwd) ? info["passWord"] = this.pwd : errorMsgList.push("密码由6-16位大小写字母或数字符号组成")
			this.company.length < 50 && this.company.length > 0 ? info['company'] = this.company : errorMsgList.push("公司长度不得超过50个字符")

			if(info.userName && info.passWord && info.name && info.sex && info.address && info.phone && info.age&&info.birthday&&info.idCard&&info.company){
				var _this =this
				this.$http.get("/account/validation/"+info["userName"]+"/",{emulateJSON:true}).then(response => {
					var res = response.data
					if(res.code === 400 || res.code === 401){
						this.$message.error(res.msg)
						this.$router.push("/login")
					}else if(res.code === 0 ){
						_this.$http.post('/useraccount/manager/register/',info,{emulateJSON:true}).then(response => {
							var resp = response.data
							if(resp.code === 400 || resp.code === 401){
								_this.$message.error(resp.msg)
								_this.$router.push("/login")
							}else if(resp.code === 0){
								_this.$message.success(res.msg)
								_this.$router.push('userList')
							}else{
								_this.$message.error(res.msg)
							}
						})
					}else{
						this.$message.error(res.msg)
					}
				},response => {
					var res = response.data
					this.$message.error(res.msg)
				})
			}else{
				this.$message.error(errorMsgList[0])
			}
		}
	}
}
</script>

<style>
.muadd{
	width: 125px;
	height: 36px;
	border-radius: 18px;
	background: #eb4141;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}
.green{
	background: #308acb !important;
}
</style>
