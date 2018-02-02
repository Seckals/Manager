<template>
	<div id="login">
		<img src="./img/logobg.jpg" class="loginbg">
		<div class="loginbox">
			<div class="logo">
				<img src="./img/logo.png">
			</div>
			<div class="logincont"  v-on:keyup.enter ="login">
				<div class="loginleft" id="login_container">
					<!-- <img src="./img/loginword.png"> -->
				</div> 
				<div class="logincontent">
					<div class="title">登录</div>
					<img src="./img/logintitle2.png">
					<img src="./img/weixin.png" class="weixin" v-on:click="wxLogin">
					<img src="./img/logintitle1.png">
					<div class="username">
						<img src="./img/username.png">
						<input type="text" placeholder="用户名" v-model="username">
					</div>
					<div class="username password">
						<img src="./img/password.png">
						<input type="password" placeholder="密码" v-model="password">
					</div>
					<div class="loginbtn">
						<button class="login" v-on:click="login"><span>登录</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			username:"",
			password:""
		}
	},
	mounted:function(){
		var agent = navigator.userAgent.toLowerCase() ;
		var regStr_ie = /msie [\d.]+;/gi ;
		if(agent.indexOf("MSIE") > 0){
			if (agent.match(regStr_ie)[0].match(/\d/)[0] && agent.match(regStr_ie)[0].match(/\d/)[0] < 10){
				alert("请升级你的浏览器")
			}
		}
	},
	methods:{
		login(){
			this.$http.post("/account/login",{userName:this.username,passWord:this.password},{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 0){
					if(!res.data.userAccount || !res.data.userInfo || !res.data.userAccount.actId || !res.data.userInfo.infoId || !res.data.userAccount.userName){
						this.$message.error("获取用户信息失败")
					}else{
						var info = {
							actId:res.data.userAccount.actId,
							infoId:res.data.userInfo.infoId,
							username:res.data.userAccount.userName
						}
						document.cookie= "info=" + JSON.stringify(info)+";path=/";
						if(res.data.userAccount.userType === '1'){
							this.$router.push('/App')
						}else if(res.data.userAccount.userType === '3'){
							location.href="http://www.dszongbu.com/Pc/admin/index.html" 
						}else{
							this.$message("请前往用户登录界面登录")
						}
					}
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error("网络异常")
			})
		},
		wxLogin(){
			location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wxe4547d3826702c46&redirect_uri="+encodeURIComponent('http://www.dszongbu.com/#/bound') + "&response_type=200&scope=snsapi_login&state=STATE#wechat_redirect";
			// var obj = new WxLogin({
			// 	id:"login_container", 
			// 	appid: "wxe4547d3826702c46", 
			// 	scope: "snsapi_login", 
			// 	redirect_uri: "http://www.dszongbu.com",
			// 	state: "123"
			// });
		}
	}
}
</script>

<style>
#login{
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left: 0;
	background: #fff !important;
}
#login .loginbg{
	width: 100%;
	height: auto;
}
#login .loginbox{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5)
}
#login .logo{
	padding:8px 0 0 11px;
}
#login .logo>img{
	width:150px;
	height: 150px;
}
#login .logincont{
	width: 814px;
	height: 276px;
	position: absolute;
	top:175px;
	right: 26%;
}
#login .loginleft{
	padding-top: 92px;
	float:left;
	margin-right: 166px;
}
#login .logincontent{
	width: 347px;
	height: 100%;
	background: #fff;
	border-radius: 8px;
	float: right;
}
#login .logincontent img{
	display: block;
	margin:0 auto;
}
#login .logincontent .title{
	width: 100%;
	height: 63px;
	line-height: 50px;
	font-size: 18px;
	text-align: center;
}
.weixin{
	margin-top: 11px !important;
	margin-bottom: 11px !important;
	cursor: pointer;
}
.username{
	width: 223px;
	height: 25px;
	margin:12px auto 6px;
	border:1px solid #e0e2cc;
	background: #faffbd;
	display: flex;
	display: -webkit-flex;
	border-radius: 6px;
}
.username img{
	width: 12px;
	height: 13px;
	margin:5px 9px 0 8px !important;
	float: left;
}
.username input{
	width: 190px;
	height: 25px;
	display: block;
	background: transparent;
	float: left;
}
.password{
	margin:0 auto 7px !important;
}
.username input,.login span{
	font-size:12px; 
	transform:scale(0.9,0.9) !important;
	-webkit-transform:scale(0.9,0.9) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
.loginbtn{
	width: 100%;
	text-align: center;
}
.login{
	width: 223px;
	height: 25px;
	border-radius: 6px;
	color:#fff;
	cursor: pointer;
	background: #0168b5;
}
.username input::-webkit-input-placeholder { 
	font-size:12px; 
	display: block;
	transform:scale(0.9,0.9) !important;
	-webkit-transform:scale(0.9,0.9) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
.username input:-moz-placeholder {
	font-size:12px; 
	display: block;
	transform:scale(0.9,0.9) !important;
	-webkit-transform:scale(0.9,0.9) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
.username input::-moz-placeholder {
	font-size:12px; 
	display: block;
	transform:scale(0.9,0.9) !important;
	-webkit-transform:scale(0.9,0.9) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
.username input:-ms-input-placeholder {
	font-size:12px; 
	display: block;
	transform:scale(0.9,0.9) !important;
	-webkit-transform:scale(0.9,0.9) !important;
	transform-origin: left;
	-webkit-transform-origin: left;
	*font-size:11px;
}
</style>
