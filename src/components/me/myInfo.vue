<template>
	<div class="mulist">
		<div v-show="type==='edinfo'">
			<div class="muhead">
				<span class="mutitle">基本信息</span>
				<span class="mubtn setPlace" v-show="childtype === 'show'" v-on:click="showeditor">
					<img src="../../../static/img/editor.png">
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
					</div>				</div>
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
							<div class="mulab">房号</div>
							<div class="muinf"><input type="text" placeholder="请输入房号" v-model="address" v-on:change="update('address',address)"></div>
						</div>
					</div>
					<div class="muhead">
						<span class="mutitle">账号安全</span>
					</div>
					<div class="muitem nocursor">
						<div class="mulabel">账号</div>
						<div class="muinfo">{{account}}</div>
					</div>
					<div class="muitem nocursor">
						<div class="mulabel">密码</div>
						<div class="muinfo">{{this.newP}}</div>
						<div class="mueditor" v-on:click='showsaveB'>
							修改
						</div>
					</div>
				</div>
			</div>
			<editorPwd v-show="type==='edpwd'" :oldpwd='accinfo' v-on:close='close'></editorPwd>
		</div>  
	</template>

	<script type="ecmascript-6">
	import editorPwd from './editorPwd'
	import {getCookie} from '../../../static/js/common.js'
	export default{
		data(){
			return{
				childtype:"show",
				type:"edinfo",
				accountinfo:"",
				account:"",
				name:"",
				phone:"",
				address:"",
				userinfo:"",
				updateinfo:{},
				accinfo:"",
				newP:""
			}
		},
		created(){
			this.$http.get('/info/detail/'+getCookie("info").actId+'/',{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					if(res.data.account){
						this.accountinfo = res.data.account
						this.account = res.data.account.userName
						this.accinfo = res.data.account.passWord
						this.newP = this.accountinfo.passWord
					}
					if(res.data.userinfo){
						this.userinfo = res.data.userinfo
						this.setInfo()
					}
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		components:{
			editorPwd
		},
		methods:{
			setInfo(){
				this.name = this.userinfo.name
				this.phone = this.userinfo.phone
				this.address = this.userinfo.address
			},
			showeditor(){
				this.childtype = "save" 
			},
			savetop(){
				var errorMsgList = []
				var info = {}
				var phoneReg = /^1[34578]\d{9}$/
				if(this.updateinfo.name){
					this.updateinfo.name !== '' && this.updateinfo.name.length <= 10 ? info["name"] = this.name : errorMsgList.push("姓名长度为1-10位")
				}
				if(this.updateinfo.phone){
					phoneReg.test(this.updateinfo.phone) ? info["phone"] = this.updateinfo.phone : errorMsgList.push("手机号码格式不正确")
				}
				if(this.updateinfo.address){
					this.updateinfo.address.length >= 1 && this.updateinfo.address.length <= 20 ? info["address"] = this.updateinfo.address : errorMsgList.push("房号长度为1-20位")
				}
				if(errorMsgList.length >= 1){
					this.$message.error(errorMsgList[0])
				}else{
					if(JSON.stringify(info) !== "{}"){
						info["infoId"] = this.userinfo.infoId
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
					}else{
						this.childtype = 'show'
					}
				}
			},
			showsaveB(){
				this.type = 'edpwd'
			},
			update(name,val){
				this.updateinfo[name] = val
			},
			close(msg){
				this.type = msg.type
				if(msg.newPwd){
					this.newP = msg.newPwd
				}
			}
		}
	} 
	</script>

	<style>
	.mulist{
		width: 100%;
		height: 100%;
		background: #fff;
	}
	</style>
