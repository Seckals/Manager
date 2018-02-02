<template>
	<div class="applyBox">
		<div class="applyItem">
			<img src="../../../../static/img/matApply.png">
			<input type="text" v-model="repInfo" placeholder="报修物品">
		</div>
		<div class="applyItem">
			<img src="../../../../static/img/beizhu.png" class="beizhu">
			<input type="text" v-model="beizhuInfo" placeholder="备注">
		</div>
		<div class="applytitle">申请用户选择</div>
		<div class="userInfoBox">
			<div class="userSearch">
				<div class="userBoxLeft">
					<div class="haveAccount" v-show="type==='hAccount'">
						<div class="userSearchBox">
							<el-row class="demo-autocomplete">
								<el-col :span="12">
									<el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch" placeholder="请选择用户" @select="handleSelect"></el-autocomplete>
								</el-col>
							</el-row>
						</div>
						<div class="userInfo" v-show="accountInfo">
							<div class="userInfoItem">
								<div class="title">申请人</div>
								<div class="value">{{username}}</div>
							</div>
							<div class="userInfoItem">
								<div class="title">手机号码</div>
								<div class="value">{{userphone}}</div>
							</div>
							<div class="userInfoItem">
								<div class="title">房号</div>
								<div class="value">{{useraddress}}</div>
							</div>
						</div>
					</div>
					<!-- <div class="noAccount" v-show="type==='nAccount'">
						<div class="userInfoItem">
							<div class="label">申请人</div>
							<input type="text" placeholder="请输入申请人" v-model="userName">
						</div>
						<div class="userInfoItem">
							<div class="label">手机号码</div>
							<input type="text" placeholder="请输入手机号码" v-model="userPhone">
						</div>
					</div> -->
				</div>
				<!-- <div class="userToggle" v-on:click="toguser">
					{{togText}}
					<img src="../../../../static/img/tog.png">
				</div> -->
			</div>
		</div>
		<div class="wbtn">
			<button class="wdeal" v-on:click="submit">申请</button>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			repInfo:"",
			beizhuInfo:"",
			restaurants: [],
			state: '',
			type:'hAccount',
			accountInfo:false,
			username:'',
			userphone:'',
			useraddress:'',
			userName:'',
			userPhone:'',
			userId:'',
			togText: '非正式用户'
		}
	},
	mounted() {
		this.$http.post("/useraccount/manager/info/search/",{message:''},{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else if(res.code === 0){
				for(var i=0;i<res.data.length;i++){
					res.data[i].value = res.data[i].name
					delete res.data[i].name;
				}
				this.restaurants = res.data
			}
		},response => {
			this.$message.error("网络异常")
		})
	},
	methods:{
		querySearch(queryString, cb) {
			var restaurants = this.restaurants
			var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
			this.username = ''
			this.userphone = ''
			this.useraddress = ''
			cb(results)
		},
		createFilter(queryString) {
			return (restaurant) => {
				return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
			}
		},
		handleSelect(item) {
			this.username = item.value
			this.userphone =item.phone
			this.useraddress = item.address
			this.userId = item.infoId
			this.accountInfo =true
		},
		toguser(){
			if(this.type === 'hAccount'){
				this.type = 'nAccount'
				this.togText = '正式用户'
			}else{
				this.type = 'hAccount'
				this.togText = '非正式用户'
			}
		},
		submit(){
			var info = {}
			var phoneReg = /^1[34578]\d{9}$/
			if(this.repInfo !== '' && this.repInfo.length <21){
				info["rerName"] = this.repInfo
				this.beizhuInfo === '' ? info["rerMemo"] = '' : info["rerMemo"] = this.beizhuInfo
				if(this.type === 'hAccount'){
					if(this.userId === ''){
						this.$message("请选择申请人")
					}else{
						info["rerUser"] = this.userId
						this.sendInfo(info)
					}
				}else{
					if(this.userName !== '' && this.userPhone !== ''){
						info["selective"] = 'GUEST'

						if(this.userName.length > 10){
							this.$message("申请人长度不能超过10位")
						}else if(phoneReg.test(this.userPhone)){
							info["name"] = this.userName
							info["phone"] = this.userPhone
							this.sendInfo(info)
						}else{
							this.$message("手机号格式不正确")
						}
					}else{
						this.$message("请填写完整非正式用户信息")
					}
				}
			}else{
				this.$message("请输入报修物品长度小于20个字符")
			}
		},
		sendInfo(info){
			this.$http.post("/realestate/manager/repair/selective/",info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg);
					this.$router.push("/App/work/appRepbox")
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
<style type="text/css">
.applyItem {
	width: 100%;
	height: 35px;
	border-bottom: 1px solid #e6efef;
	font-size: 0;
	padding-top: 13px;
}
.applyItem>img {
	display: inline-block;
	margin-left: 21px;
	margin-right: 15px;
	vertical-align: top;
}
.applyItem>input {
	width: 600px;
	font-size: 14px;
	color: #262626;
	border: none;
	display: inline-block;
	vertical-align: top;
	margin-top: 4px;
}
.applytitle {
	width: 100%;
	height: 31px;
	line-height: 31px;
	text-indent: 21px;
	color: #222;
	font-size: 12px;
	background: #eee;
}
.userSearch {
	font-size: 0;
}
.userBoxLeft, .userToggle {
	display: inline-block;
	vertical-align: top;
}
.userBoxLeft {
	margin-left: 20px;
}
.userToggle {
	font-size: 12px;
	margin-left: 110px;
	color: #308acb;
	line-height: 36px;
	margin-top: 21px;
	cursor: pointer;
}
.userSearchBox {
	margin-top: 21px;
}
.haveAccount .userInfo {
	padding-top: 10px;
}
.userInfoItem {
	width: 100%;
	height: 41px;
	font-size: 0;
	border-bottom: 1px solid #e6efef;
}
.userInfoItem .title, .userInfoItem .value {
	height: 100%;
	line-height: 41px;
	display: inline-block;
	vertical-align: top;
	font-size: 14px;
}
.userInfoItem .title {
	width: 323px;
	text-indent: 20px;
	color: #727272;
}
.userInfoItem .value {
	color: #000;
}
.userBoxLeft, .userToggle {
	display: inline-block;
	vertical-align: top;
}
.userToggle>img {
	display: inline-block;
	position: relative;
	top: 4px;
}
.el-col-12 {
	width: 64.5%!important;
}
.el-autocomplete, .el-dropdown {
	width: 441px;
}
.noAccount {
	padding-top: 10px;
	width: 441px;
}
.userInfoItem .label {
	height: 100%;
	line-height: 41px;
	text-indent: 20px;
	color: #727272;
	width: 76px;
	text-align: right;
}
.userInfoItem .label, .userInfoItem>input {
	font-size: 14px;
	display: inline-block;
	vertical-align: top;
}
.userInfoItem>input {
	width: 300px;
	height: 21px;
	margin-left: 30px;
	margin-top: 10px;
}
</style>
