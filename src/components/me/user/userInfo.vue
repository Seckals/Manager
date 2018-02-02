<template>
	<div class="mulist">
		<div class="muhead">
			<span class="mutitle">基本信息</span>
			<span class="mubtn setPlace" v-show="childtype === 'show'" v-on:click="showeditor" v-if="accountInfo.delete != 1">
				<img src="../../../../static/img/editor.png">
				<span>修改</span>
			</span>
			<button class="musave setPlaceBtn" v-show="childtype === 'save'" v-on:click="savetop">保存</button>
		</div>
		<div class="mubody">
			<div class="mushow" v-show="childtype === 'show'">
				<div class="muitem">
					<div class="mulabel">姓名</div>
					<div class="muinfo">{{name}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">手机号</div>
					<div class="muinfo">{{phone}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">房号</div>
					<div class="muinfo">{{address}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">年龄</div>
					<div class="muinfo">{{age}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">生日</div>
					<div class="muinfo">{{birthday}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">身份证</div>
					<div class="muinfo">{{idCard}}</div>
				</div>
				<div class="muitem">
					<div class="mulabel">性别</div>
					<div class="muinfo">{{sex}}</div>
				</div>
			</div>
			<div class="muedit" v-show="childtype === 'save'">
				<div class="muitem">
					<div class="mulab">姓名</div>
					<div class="muinf"><input type="text" placeholder="请输入姓名" v-model="name" v-on:change="update('name',name)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">手机号</div>
					<div class="muinf"><input type="text" placeholder="请输入手机号" v-model="phone" v-on:change="update('phone',phone)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">住址</div>
					<div class="muinf"><input type="text" placeholder="请输入住址" v-model="address" v-on:change="update('address',address)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">年龄</div>
					<div class="muinf"><input type="text" placeholder="请输入年龄" v-model="age" v-on:change="update('age',age)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">生日</div>
					<div class="muinf"><input type="text" placeholder="请输入生日" v-model="birthday" v-on:change="update('birthday',birthday)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">身份证</div>
					<div class="muinf"><input type="text" placeholder="请输入身份证" v-model="idCard" v-on:change="update('idCard',idCard)"></div>
				</div>
				<div class="muitem">
					<div class="mulab">性别</div>
					<div class="muinf"><input type="text" placeholder="请输入性别" v-model="sex" v-on:change="update('sex',sex)"></div>
				</div>
			</div>
			<div class="muhead">
				<span class="mutitle">账号安全</span>
			</div>
			<div class="muitem nocursor" v-show="acctype === 'accountI'">
				<div class="mulab">账号</div>
				<div class="muinf"><input type="text" placeholder="请输入账号" v-model="account"></div>
				<button class="musave setPlaceBtn" v-on:click="savebottom('account')">保存</button>
			</div>
			<div class="muitem nocursor" v-show="acctype === 'account'">
				<div class="mulabel">账号</div>
				<div class="muinfo">{{account}}</div>
				<div class="mueditor" v-on:click="showsaveB('account','accountI')" v-if="accountInfo.delete != 1">
					修改
				</div>
			</div>
			<div class="muitem nocursor" v-show="pwdtype === 'pwdI'">
				<div class="mulab">密码</div>
				<div class="muinf"><input type="text" placeholder="请输入密码" v-model="pwd"></div>
				<button class="musave setPlaceBtn" v-on:click="savebottom('pwd')">保存</button>
			</div>
			<div class="muitem nocursor" v-show="pwdtype === 'pwd'">
				<div class="mulabel">密码</div>
				<div class="muinfo">{{pwd}}</div>
				<div class="mueditor" v-on:click="showsaveB('pwd','pwdI')" v-if="accountInfo.delete != 1">
					修改
				</div>
			</div>
			<div class="muitem nocursor" v-show="companytype === 'cptI'">
				<div class="mulab">公司</div>
				<div class="muinf"><input type="text" placeholder="请输入公司名称" v-model="company"></div>
				<button class="musave setPlaceBtn" v-on:click="savebottom('cpt')">保存</button>
			</div>
			<div class="muitem nocursor" v-show="companytype === 'cpt'">
				<div class="mulabel">公司</div>
				<div class="muinfo">{{company}}</div>
				<div class="mueditor" v-on:click="showsaveB('companytype','cptI')">
					修改
				</div>
			</div>
			<div class="delbtn">
				<button class="mudelect" v-on:click='delectuser' v-if="accountInfo.delete != 1">删除用户</button>
				<button class="mudelect bgblue" v-on:click='desterilize' v-if="accountInfo.delete == 1">恢复用户</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			childtype:"show",
			childtypeb:"showbot",
			userinfo:"",
			account:"",
			name:"",
			phone:"",
			address:"",
			age:"",
			birthday:"",
			idCard:"",
			sex:"",
			company:'',
			pwd:"",
			userid:"",
			updateinfo:{},
			accountInfo:"",
			pwdtype:"pwd",
			acctype:"account",
			companytype:'cpt',
			infoId:"",
			actId:''
		}
	},
	created(){
		this.$http.get('/info/detail/'+this.$route.query.actPid+'/',{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else  if(res.code === 0){
				if(res.data.account){
					this.accountInfo =res.data.account
					this.account = this.accountInfo.userName
					this.pwd = this.accountInfo.passWord
					this.company = this.accountInfo.company
					this.actId = res.data.account.actId
				}
				if(res.data.userinfo){
					this.userinfo = res.data.userinfo
					this.infoId = res.data.userinfo.infoId
					this.setInfo()
				}
			}
		},response => {
			this.$message.error('网络异常')
		})
	},
	methods:{
		setInfo(){
			this.name = this.userinfo.name
			this.phone = this.userinfo.phone
			this.address = this.userinfo.address
			this.age = this.userinfo.age
			this.birthday = this.userinfo.birthday
			this.idCard = this.userinfo.idCard
			this.sex = this.userinfo.sex
		},
		desterilize(){
			this.$http.post('/useraccount/manager/account/record',{actId:this.accountInfo.actId}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.accountInfo.delete = 0
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		showeditor(){
			this.childtype = "save"
		},
		savetop(){
			var errorMsgList = []
			var info = {}
			var phoneReg = /^1[34578]\d{9}$/
			var ageReg = /^\d{1,3}$/
			if(this.updateinfo.name){
				this.updateinfo.name !== '' && this.updateinfo.name.length <= 10 ? info["name"] = this.name : errorMsgList.push("姓名长度为1-10位")
			}
			if(this.updateinfo.phone){
				phoneReg.test(this.updateinfo.phone) ? info["phone"] = this.updateinfo.phone : errorMsgList.push("手机号码格式不正确")
			}
			if(this.updateinfo.address){
				this.updateinfo.address.length >= 1 && this.updateinfo.address.length <= 20 ? info["address"] = this.updateinfo.address : errorMsgList.push("地址长度为1-20位")
			}
			if(this.updateinfo.age){
				ageReg.test(this.updateinfo.age) ? info["age"] = this.updateinfo.age : errorMsgList.push("年龄长度为1-3位")
			}
			if(this.updateinfo.sex){
				this.updateinfo.sex.length === 1 ? info["sex"] = this.updateinfo.sex : errorMsgList.push("性别长度为1位")
			}
			if(this.updateinfo.birthday){
				info["birthday"] = this.updateinfo.birthday
			}
			if(this.updateinfo.idCard){
				info["idCard"] = this.updateinfo.idCard
			}
			if(errorMsgList.length >= 1){
				this.$message.error(errorMsgList[0])
			}else{
				if(JSON.stringify(info) !== "{}"){
					info["infoId"] = this.infoId
					this.submitTop(info)
				}else{
					this.childtype = 'show'
				}
			}
		},
		savebottom(val){
			var nameReg = /^[0-9a-zA-Z]{3,30}$/
			var pwdReg = /^[0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)]{6,16}$/
			var info = {
				"actId": this.$route.query.actPid
			}
			if(val === 'account'){
				if(nameReg.test(this.account)){
					info["userName"] = this.account
					this.submitAccount(info,val)
				}else{
					this.$message.error('账号由3-30位 大小写字母数字组成')
				}
			}else if(val === 'pwd'){
				if(this.pwd !== this.accountInfo.passWord){
					if(pwdReg.test(this.pwd)){
						info["passWord"] = this.pwd
						this.submitPassword(info,val)
					}else{
						this.$message.error('密码由6-16位大小写字母数字符号组成')
					}
				}else{
					this.pwdtype = val
				}
			}else if(val === 'cpt') {
				if(this.company.length>0 && this.company.length <= 50){
					info["company"] = this.company
					this.submitCompany(info,val)
				}else{
					this.$message.error('公司名称不得为空且不能超过50个字符')
				}
			}
		},
		showsaveB(type,val){
			if(type === 'pwd'){
				this.pwdtype = val
			}else if(type === 'account'){
				this.acctype = val
			}else if(type === 'companytype'){
				this.companytype = val
			}
		},
		delectuser(){
			var _this = this
			this.$confirm('确定要删除吗, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				this.$http.delete('/useraccount/manager/account/'+this.actId+'/',{emulateJSON:true}).then(response => {
  				  var res = response.data
  				  if(res.code === 400 || res.code === 401){
  					  this.$message.error(res.msg)
  					  this.$router.push("/login")
  				  }else if(res.code === 0){
  					  this.$message.success(res.msg)
  					  _this.$router.push("userList")
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
		update(name,val){
			this.updateinfo[name] = val
		},
		submitTop(info){
			this.$http.post('/useraccount/manager/userinfo/',info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.childtype = 'show'
				}else{
					this.$message.error(res.msg)
					this.setInfo()
					this.childtype = 'show'
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		submitAccount(info,val){
			this.$http.post('/useraccount/manager/account/',info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.acctype = val
				}else{
					this.$message.error(res.msg)
					this.account = this.accountInfo.userName
					this.acctype = val
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		submitPassword(info,val){
			this.$http.post('/useraccount/manager/account/',info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.pwdtype = val
				}else{
					this.$message.error(res.msg)
					this.account = this.accountInfo.passWord
					this.pwdtype = val
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		submitCompany(info,val){
			this.$http.post('/useraccount/manager/account/edit/'+this.$route.query.actPid,info).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.companytype = val
				}else{
					this.$message.error(res.msg)
					this.company = this.accountInfo.company
					this.companytype = val
				}
			},response => {
				this.$message.error('网络异常')
			})
		}
	}
}
</script>

<style>
.mushow>.muitem,.muedit>.muitem,.nocursor{
	cursor: auto;
}
.el-message-box{
	vertical-align: baseline !important;
}
.bgblue{
	background: #308acb !important;
}
.muitem{
	display: flex;
	display: -webkit-flex;
}
.musave{
	width: 54px;
	height: 24px;
	border-radius: 12px;
	background: #308acb;
	line-height: 27px !important;
	color: #fff;
	display: block;
	cursor: pointer;
	top:8px;
}
.nocursor{
	position: relative;
}
.setPlaceBtn{
	position: absolute;
	left: 326px;
	font-size: 12px;
}
.setPlace{
	position: absolute;
	left:326px;
	line-height: 40px;
	font-size: 12px;
	margin-top: 8px;
	background: transparent;
}
.setPlace>span{
	display: inline-block;
	line-height: 24px;
	vertical-align: top;
	color: #308acb;
}
.setPlace>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 5px;
}
.mulabel{
	width: 321px;
	font-size: 14px;
	text-indent:19px;
	line-height: 44px;
	color:#999;
}
.mulab{
	font-size: 14px;
	text-indent:19px;
	line-height: 44px;
	margin-right: 39px;
}
.muinfo{
	font-size: 14px;
	line-height: 44px;
	color:#222;
}
.mueditor{
	width: 30px;
	height: 12px;
	margin-left: 12px;
	margin-top: 17px;
	color:#308acb;
	cursor: pointer;
	font-size: 12px;
	font-weight: bold;
}
.muinf{
	padding-top: 15px;
}
.muinf>input{
	width: 200px;
	height: 15px;
	font-size: 14px;
}
.delbtn{
	padding-top: 42px;
	text-align: center;
}
.mudelect{
	width: 125px;
	height: 36px;
	border-radius: 18px;
	background: #eb4141;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}
.muinf>input::-webkit-input-placeholder {
	font-size:14px;
}
.muinf>input:-moz-placeholder {
	font-size:14px;
}
.muinf>input::-moz-placeholder {
	font-size:14px;
}
.muinf>input:-ms-input-placeholder {
	font-size:14px;
}
</style>
