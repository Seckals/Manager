<template>
	<div id="app">
		<div class="left">
			<!-- <img src="../static/img/logo.png" class="logo"> -->
			<ul>
				<li v-on:mouseover="tog('work')" v-on:mouseout="tog('false')"><router-link to='/App/work' :class="{ hove: type === 'work' }"><span class="icon work"></span>任务</router-link></li>
				<li v-on:mouseover="tog('mat')" v-on:mouseout="tog('false')"><router-link to='/App/matter' :class="{ hove: type === 'mat' }"><span class="icon mat"></span>物料</router-link></li>
				<li v-on:mouseover="tog('notice')" v-on:mouseout="tog('false')"><router-link to='/App/notice' :class="{ hove: type === 'notice' }"><span class="icon notice"></span>通知</router-link></li>
				<li v-on:mouseover="tog('standingBook')" v-on:mouseout="tog('false')"><router-link to='/App/book' :class="{ hove: type === 'standingBook' }"><span class="icon notice"></span>台账</router-link></li>
			</ul>
		</div>
		<div class="right">
			<header>
				<div class="logoTit">
					<!-- <img src="../static/img/logoTit.png"> -->
				</div>
				<div class="account"  v-on:mouseover='hovein' v-on:mouseout="hoveout">
					<div class="perBox">
						<img src="../static/img/person.png">
						<router-link to='/App/me'>{{uName}}</router-link>
					</div>
					<div class="outBox" v-on:click="out" v-show="show">
						<img src="./out.png">
						<span>退出</span>
					</div>
				</div>
			</header>
			<router-view></router-view>
		</div>
		<transition name="enterin">
			<div class="warn" v-show="isShow">
				<div class="closeAlert" v-on:click="cancle"></div>
				<div class="warnheader">
					<img src="../static/img/alertBg.png">
				</div>
				<div class="warncontant">
					<div v-if="haveToDealNumber" v-on:click="todono">
						<span class="warncricle"></span>
						<span class="warninfo">
							您有<span class="warnRed">{{haveToDealNumber}}</span>个订单未处理
						</span>
					</div>
					<div v-if="hadConfirmNumber" v-on:click="todoconfirm">
						<span class="warncricle"></span>
						<span class="warninfo">
							您有<span class="warnRed">{{hadConfirmNumber}}</span>个订单用户已确认
						</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import {getCookie, DelCookie} from '../static/js/common'
import socket from '../static/js/socket'

export default {
	data: function () {
		return {
			type: false,
			show: false,
			uName: '',
			isShow:false
		}
	},
	computed:{
		haveToDealNumber(){
			return this.$store.state.haveToDealNumber;
		},
		hadConfirmNumber(){
			return this.$store.state.hadConfirmNumber;
		}
	},
	created(){
		this.getInfo()
		this.getConfirmInfo()
		var wSocket = socket()
		wSocket.connect(this)
	},
	watch:{
		haveToDealNumber(val,oldVal){
			if(val>0){
				this.isShow=true
			}else{
				this.isShow=false
			}
		},
		hadConfirmNumber(val,oldVal){
			if(val>0){
				this.isShow=true
			}else{
				this.isShow=false
			}
		}
	},
	mounted: function () {
		this.uName = getCookie('info').username
		var _this = this
		setInterval(function(){
			if(_this.hadConfirmNumber>0 || _this.hadConfirmNumber>0){
				_this.isShow=true
			}
		},120000)
	},
	methods: {
		tog: function (val) {
			this.type = val
		},
		out: function () {
			this.$http.get('/account/exit').then(response => {
				var res = response.data
				if (res.code === 0) {
					DelCookie('info')
					this.$router.push("/login")
				} else {
					this.$message.error('注销失败')
				}
			})
		},
		hovein () {
			this.show = true
		},
		hoveout () {
			this.show = false
		},
		cancle(){
			this.isShow=false
		},
		todono(){
			this.$router.push('/App/work/appRepbox/appRepList')
			this.isShow=false
		},
		todoconfirm(){
			this.$router.push('/App/work/dealBox/dealling/third')
			this.isShow=false
		},
		getInfo(){
			var info = {rerStatus:0,page:1,pageSize:13}
			var _this = this
			this.$http.post('/realestate/manager/repair/all/',info,{emulateJSON:true}).then(response => {
				_this.$store.commit('updataHaveToDealNumber',response.data.data.total)
				if(response.data.data.total){
					this.isShow=true
				}
			})
		},
		getConfirmInfo(){
			var info = { "domianUtil": { "pageUtil": { "page": 1,"pageSize": 13}}, "rerStatus":4,"rerAcceptUser":getCookie("info").infoId};
			this.$http.post('/realestate/manager/repair/processeding',info).then(response => {
				this.$store.commit('updataHadConfirmNumber',response.data.data.total)
				if(response.data.data.total){
					this.isShow=true
				}
			})
		}
	}
}
</script>

<style>
body{
	background:#000;
	font-family: "黑体";
}
#app{
	width: 1080px;
	height: 850px;
	display: flex;
	display: -webkit-flex;
	margin:30px auto 0;
	overflow: hidden;
	background: #292c34;
}
/*左边*/
.left{
	width:76px;
	height: 841px;
	padding-top: 9px;
	box-shadow: 7px 7px 8px 1px #1a1c22;
	background: #2e313a;
}
.left .logo{
	display: block;
	width:58px;
	height:49px;
	margin:0 auto;
}
.left>ul{
	margin-top: 50px;
}
.left>ul a{
	display: block;
	width:100%;
	padding-top:12px;
	height:65px;
	font-size: 16px;
	color:#7c8399;
	line-height: 31px;
	text-align: center;
}
.left>ul a .icon{
	width: 30px;
	height:30px;
	display: block;
	margin: 0 auto;
	background: url("../static/img/icon.png") no-repeat;
}
.work{
	background-position: -2px 0 !important;
}
.mat{
	background-position: -2px -32px !important;
}
.notice{
	background-position: -2px -62px !important;
}
.me{
	background-position: -2px -92px !important;
}
.apply{
	background: url(../static/img/applyB.png) no-repeat !important;
}
.left .router-link-active{
	color: #fff !important;
	background: url("../static/img/activeBg.png") no-repeat;
}
.left .router-link-active .work{
	background-position: -32px 0 !important;
}
.left .router-link-active .mat{
	background-position: -32px -32px !important;
}
.left .router-link-active .notice{
	background-position: -32px -62px !important;
}
.left .router-link-active .me{
	background-position: -32px -92px !important;
}
.hove{
	color: #fff !important;
}
.hove .work{
	background-position: -32px 0 !important;
}
.hove .mat{
	background-position: -32px -32px !important;
}
.hove .notice{
	background-position: -32px -62px !important;
}
.hove .standingBook{
	background-position: -32px -62px !important;
}
.hove .me{
	background-position: -32px -92px !important;
}
.hove .apply{
	background: url(../static/img/applyW.png) no-repeat !important;
}
.left .router-link-active .apply{
	background: url(../static/img/applyW.png) no-repeat !important;
}
/*右边*/
.right{
	width:1004px;
	height: 100%;
}
.right header{
	width:100%;
	height:55px;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.logoTit{
	padding:16px 0 0 7px;
}
.account{
	position: relative;
	margin-right: 36px;
}
.account .perBox{
	color:#fff;
	height: 54px;
	font-size:0;
}
.account .perBox>img{
	display: inline-block;
	margin: 17px 10px 0 7px;
}
.account .perBox a{
	font-size:14px;
	line-height: 52px;
	color:#fff;
	display: inline-block;
	height: 100%;
	vertical-align: top;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.account:hover{
	border-top:1px solid #727c7c;
	border-right:1px solid #727c7c;
	border-left:3px solid #0168b5;
	background: #252830;
}
.outBox{
	width: 136px;
	height: 39px;
	position: absolute;
	top:54px;
	right: 0;
	z-index: 100;
	cursor: pointer;
	background: #3b3f49;
	border:1px solid #727c7c;
}
.outBox>img{
	display: inline-block;
	margin:10px 13px 0 49px;
}
.outBox>span{
	font-size: 14px;
	line-height: 41px;
	color: #fff;
	display: inline-block;
	vertical-align: top;
	height: 100%;
}

/*提醒*/
.warn{
	width: 242px;
	height: 259px;
	position: absolute;
	bottom:0;
	right: 0;
	background: #ffffff;
}
.warnheader{
	font-size: 0;
}
.warncontant{
	width: 100%;
	height: 113px;
	line-height: 30px;
	box-sizing: border-box;
	padding-top:20px;
	font-size: 0;
}
.warncontant>div{
	cursor: pointer;
	box-sizing: border-box;
	padding-left: 50px;
}
.closeAlert{
	width: 20px;
	height: 20px;
	position:absolute;
	top:0;
	right: 0;
	cursor: pointer;
	background-image: url('./close.png');
	background-repeat:  no-repeat;
	background-position: 6px 6px;
}
.closeAlert:hover{
	background-color: #fb6155;
}
.warncontant .warncricle{
	display: inline-block;
	vertical-align: middle;
	width: 6px;
	height: 6px;
	margin-right: 11px;
	border-radius: 3px;
	background: #aaaaaa;
}
.warncontant .warninfo{
	display: inline-block;
	vertical-align: middle;
	font-size: 14px;
	color:#575757;
}
.warnRed{
	color: #f91313 !important;
	margin:0 3px;
}
.warnfooter{
	width: 100%;
	height: 46px;
	font-size: 0;
}
.warnfooter>button{
	width: 120px;
	height: 100%;
	background: #fff;
	font-size: 16px;
	color: #9b9b9b;
	cursor: pointer;
}
.warnfooter>button:first-child{
	border-right: 1px solid #e2e2e2;
}
.warnfooter>button:last-child{
	color: #308acb !important;
}

.enterin-enter-active,.enterin-leave-active{
	transition-property:width,height;
	transition-duration:0.8s;
	transition-timing-function:linear;
}
.enterin-enter, .enterin-leave-to{
	width: 0;
	height: 0;
}
</style>
