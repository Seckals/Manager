<template>
	<div class="winfo">
		<div class="wtitle">申请详情</div>
		<div class="witem">
			<div class="wname">订单编号</div>
			<div class="wval">{{info.rerId}}</div>
		</div>
		<div class="witem">
			<div class="wname">申请物品</div>
			<div class="wval">{{info.rerName}}</div>
		</div>
		<div class="witem">
			<div class="wname">申请时间</div>
			<div class="wval">{{info.createTime}}</div>
		</div>
		<div class="witem">
			<div class="wname">申请状态</div>
			<div class="wval wValRed" v-if="info.rerStatus"><span></span>{{info.rerStatus | status}}</div>
		</div>
		<div class="wbeizhu">
			<div class="wname">备注</div>
			<div class="wbeizhuinfo">{{info.rerMemo | emptyInfo}}</div>
		</div>
		<div class="wbeizhu">
			<div class="wname">报修物品图片描述</div>
			<div class="wbeizhuimg">
				<img :src='url' class="uploadImg"   v-if="url" v-on:click="showImg">
				<div class="noimg" v-if="!url">
					暂无图片信息
				</div>
			</div>
		</div>
		<div class="wtitle">申请人信息</div>
		<div class="witem">
			<div class="wname">申请人</div>
			<div class="wval" v-if="userinfo">{{userinfo.name}}</div>
		</div>
		<div class="witem">
			<div class="wname">手机号码</div>
			<div class="wval" v-if="userinfo">{{userinfo.phone}}</div>
		</div>
		<div class="witem">
			<div class="wname">房号</div>
			<div class="wval" v-if="userinfo">{{userinfo.address}}</div>
		</div>
		<div class="wbtn">
			<button class="wdeal" v-on:click="submit">我要处理</button>
		</div>
		<showimg :surl='url' v-on:close='close' v-show="isShow"></showimg>
	</div>
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
import showimg from '../hadDeal/hadRep/showimg'
export default{
	data(){
		return{
			info:"",
			userinfo:"",
			url:'',
			isShow:false,
			userId:''
		}
	},
	mounted(){
		this.$http.get('/realestate/manager/repair/'+this.$route.query.id+'/',{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 0){
				this.info = res.data
				this.userId = res.data.rerUser
				this.userinfo = res.data.rerUserDetail
				if(this.info.rerDescribeImg){
					this.url = '/img/'+ this.info.rerDescribeImg
				}

				if(this.userinfo && this.userinfo && this.userinfo.actPid==='GUEST'){
					this.userinfo.address = "访客"
				}
			}else{
				this.$message.error(res.msg)
				this.$router.push("/login")
			}
		},response => {
			this.$message.error("网络异常")
		})
	},
	components:{
		showimg
	},
	filters:{
		status:function(val){
			var word = ['未处理','已接单','已报价','已关闭','用户已确认','维修中','已处理']
			return word[val]
		},
		emptyInfo:function(val){
			if(val === ''){
				return '暂无备注信息'
			}else{
				return val
			}
		}
	},
	methods:{
		close(msg){
			this.isShow = msg
		},
		showImg(){
			this.isShow = true
		},
		submit(){
			var _this = this
			this.$http.post('/realestate/manager/repair/check/',{rerId:this.$route.query.id,rerAcceptUser:getCookie("info").infoId,rerUser:this.userId}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success(res.msg)
					this.$store.commit('substractHaveToDealNumber',1)
					this.$router.push('/App/work/dealBox/dealling/first')
				}else{
					this.$message.error(res.msg)
					this.$router.push('/App/work/appRepbox/appRepList')
				}
			},response => {
				this.$message.error("网络异常")
			})
		}
	}
}
</script>

<style>
.winfo{
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	background: #eeeeee;
}
.winfo .wtitle{
	width:100%;
	height:31px;
	line-height: 31px;
	text-indent: 21px;
	color:#222;
	font-size: 12px;
}
.winfo .witem{
	width: 100%;
	height: 43px;
	font-size: 14px;
	display: flex;
	display: -webkit-flex;
	border-bottom: 1px solid #e6efef;
	line-height: 43px;
	background: #fff;
}
.winfo .witem>div{
	width:320px;
	height: 100%;
}
.winfo .witem .wname{
	text-indent: 21px;
	color: #999;
}
.winfo .witem .wval{
	color:#222;
}
.wValRed{
	color:red !important;
}
.wValRed span{
	display: inline-block;
	vertical-align: middle;
	width: 6px;
	height: 6px;
	margin-right: 7px;
	background: red;
	border-radius: 3px;
}
.wbtn{
	width: 100%;
	padding-top: 37px;
	padding-bottom: 101px;
	text-align:center;
}
.wbtn .wdeal{
	width: 125px;
	height: 36px;
	font-size: 16px;
	cursor: pointer;
	background: #308acb;
	border-radius: 18px;
	color:#fff;
}
.wbeizhu{
	width: 100%;
	min-height: 100px;
	background: #fff;
	font-size: 14px;
	padding-bottom: 10px;
	border-bottom: 1px solid #e6efef;
}
.wbeizhu .wname{
	text-indent: 21px;
	color: #999;
	width: 320px;
	line-height: 43px;
}
.wbeizhuinfo {
	width: 418px;
	padding: 15px 27px;
	border: 1px solid #bfcbd9;
	border-radius: 4px;
	margin-left: 21px;
	margin-bottom: 10px;
	font-size: 14px;
	color: #1f2d3d;
	line-height: 20px;
}
.wbeizhuimg{
	width: 177px;
	height: 126px;
	padding:10px 0 10px 21px;
}
.wbeizhuimg>img{
	width: 177px;
	height: 126px;
}
.noimg{
	width: 177px;
	height: 126px;
	border:1px solid #eee;
	text-align: center;
	line-height: 126px;
	font-size: 14px;
	color:#999;
}
</style>
