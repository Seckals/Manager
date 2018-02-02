<template>
	<div id="bound">
		<div class="boundLoading" v-show="isShow"  v-loading="isShow"
		element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading">
		</div>
		<div class="boundBox" v-show="isContantShow">
			<header>
				<div class="wxbox">
					<img src="./img/wx.png">
					<span>微信关联账号</span>
				</div>
			</header>
			<div class="bound_content">
				<img class="title" src="./img/wxtitle.png">
				<input type="text" placeholder="请输入用户名" v-model="username">
				<input type="password" placeholder="请输入密码" v-model="password">
				<div class="bound_code">
					<input type="text" class="code_input" placeholder="请输入验证码" v-model="code">
					<i v-on:click="createCode">{{ctCode}}</i>
				</div>
				<input type="button" value="确认绑定" class="bound_btn" @click="submit">
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			username:'',
			password:'',
			code:'',
			ctCode:'',
			wxCode:'',
			wxId:'',
			isShow:true,
			isContantShow:false
		}
	},
	created(){
		if(this.$route.query.code == undefined){
			this.$message.error('获取用户信息失败')
			this.$router.push("/login")
		}else{
			this.createCode()
			this.wxCode = this.$route.query.code
			this.verify()
		}
	},
	methods:{
		createCode(){
			this.ctCode=''
			var codeLength = 4
			var selectChar = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
			for(var i=0;i<codeLength;i++){
				var charIndex = Math.floor(Math.random()*36);
				this.ctCode +=selectChar[charIndex];
			}
		},
		submit(){
			var reg = new RegExp('^'+this.ctCode+'$','i')
			if(reg.test(this.code.replace(/(^\s*)|(\s*$)/g,''))){
				this.isShow = true
				this.$http.post("/weixin/oauth/bound",{userOauth:{oauthId:this.wxId},userName:this.username,passWord:this.password}).then(response => {
					this.isShow = false
					var res = response.data
					if(res.code === 0){
						if(res.data){
							var info = {
								actId:res.data.actId,
								infoId:res.data.userInfo.infoId,
								username:res.data.userName
							}
							document.cookie= "info=" + JSON.stringify(info)+";path=/";
							if(res.data.userType === '1'){
								this.$router.push('/App')
							}else if(res.data.userType === '3'){
								location.href="http://www.dszongbu.com/Pc/admin/index.html"
							}
						}
					}else if(res.code === 30005){
						this.$message.error(res.msg)
						this.$router.push("/code")
					}else if(res.code === 1){
						this.$message.error(res.msg)
						this.$router.push("/login")
					}else{
						this.$message.error(res.msg)
					}
				},response => {
					this.$message.error("网络异常")
					this.$router.push("/login")
				})
			}else{
				this.$message.error('验证码输入错误！')
			}
		},
		verify(){
			this.$http.post("/weixin/oauth/login",{code:this.wxCode},{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 0){
					var info = {
						actId:res.data.actId,
						infoId:res.data.userInfo.infoId,
						username:res.data.userName
					}
					document.cookie= "info=" + JSON.stringify(info)+";path=/";
					if(res.data.userType === '1'){
						this.$router.push('/App')
					}else if(res.data.userType === '3'){
						location.href="http://www.dszongbu.com/Pc/admin/index.html"
					}
				}else if(res.code === 30000){
					this.$message.error(res.msg)
					this.wxId = res.data
					this.isShow = false
					this.isContantShow = true
				}else{
					this.$message.error(res.msg)
					this.$router.push("/login")
				}
			},response => {
				this.$message.error("网络异常")
				this.$router.push("/login")
			})
		}
	}
}
</script>

<style>
#bound{
	width: 100%;
	height: 100%;
	background:#ffffff;
	position: absolute;
	z-index: -10;
}
.boundLoading{
	width: 100%;
	height: 100%;
	background: rgba(f,f,f,0.6);
	position: absolute;
	top:0;
	left:0;
	z-index: 1000
}
#bound>.boundBox>header{
	width: 100%;
	height: 60px;
	background: #86c610;
	font-size: 20px;
	font-family: '黑体';
	color: #ffffff;
	line-height: 60px;
}
#bound>.boundBox>header .wxbox{
	width: 400px;
	margin:0 auto;
}
#bound>.boundBox>header img{
	display: inline-block;
	vertical-align: middle;
}
#bound>.boundBox>.bound_content{
	width: 400px;
	height: 260px;
	margin:57px auto 0;
}
#bound>.boundBox>.bound_content .title{
	display: block;
	width: 299px;
	height: 20px;
	margin:0 auto 45px;
}
#bound>.boundBox>.bound_content input{
	width: 275px;
	height: 31px;
	border:1px solid #dadada;
	border-radius: 6px;
	display: block;
	font-size:14px;
	margin: 0 auto 15px;
	text-indent: 12px;
}
.bound_btn{
	font-size: 16px;
	background:#0168b5;
	color: #ffffff;
	border: none !important;
	cursor: pointer;
}
.bound_code{
	width: 277px;
	margin:0 auto;
	font-size: 0;
}
.bound_code>.code_input{
	width: 147px !important;
	display: inline-block !important;
	vertical-align: top;
}
.bound_code>i{
	font-family:Arial;
	font-style:italic;
	font-size:14px;
	line-height: 27px;
	color:Red;
	border:0;
	padding:2px 3px;
	letter-spacing:3px;
	font-weight:bolder;
	width: 80px;
	margin-left:10px;
	height: 27px;
	display: inline-block;
	vertical-align: top;
	cursor: pointer;
}
input::-webkit-input-placeholder {
	font-size:14px;
}
input:-moz-placeholder {
	font-size:14px;
}
input::-moz-placeholder {
	font-size:14px;
}
input:-ms-input-placeholder {
	font-size:14px;
}
.el-loading-spinner .el-loading-text{
	line-height: 30px !important;
}
.el-icon-loading:before {
    font-size: 35px;
}
</style>
