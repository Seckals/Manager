<template>
	<div class="winfo">
		<div class="wtitle">申请详情</div>
		<div class="witem">
			<div class="hdname hdtitle">订单编号</div>
			<div class="hdname hdinfo">{{info.rerId}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">报修物品</div>
			<div class="hdname hdinfo">{{info.rerName}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">申请时间</div>
			<div class="hdname hdinfo">{{info.createTime}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">申请状态</div>
			<div class="hdname hdinfo blue">{{info.rerStatus | status}}</div>
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
			<div class="hdname hdtitle">申请人</div>
			<div class="hdname hdinfo" v-if="userinfo.name">{{userinfo.name}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">手机号码</div>
			<div class="hdname hdinfo" v-if="userinfo.phone">{{userinfo.phone}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">房号</div>
			<div class="hdname hdinfo" v-if="userinfo.address">{{userinfo.address}}</div>
		</div>
		<div v-if="acceptInfo">
			<div class="wtitle">处理信息</div>
			<div class="witem">
				<div class="hdname hdtitle">受理人</div>
				<div class="hdname hdinfo">{{acceptInfo.name}}</div>
			</div>
			<div class="witem">
				<div class="hdname hdtitle">受理时间</div>
				<div class="hdname hdinfo">{{statuTime}}</div>
			</div>
		</div>

		<div v-if="matList.length > 0">
			<div class="wtitle">费用</div>
			<div class="witem">
				<div class="hadmatitem hadmatitemtop">物料</div>
				<div class="hadmatitem">规格</div>
				<div class="hadmatitem">数量</div>
				<div class="hadmatitem">单价</div>
			</div>
			<div class="witem wpad" v-for="item in matList">
				<div class="hadmatitem "><span v-if='item.matThree'>{{item.matThree.thrName}}</span></div>
				<div class="hadmatitem "><span v-if='item.matThree'>{{item.matThree.thrNorms}}</span></div>
				<div class="hadmatitem ">{{item.redNumber}}</div>
				<div class="hadmatitem ">￥{{item.redPrice}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">人工费</div>
				<div class="hadmatitem fontweight">￥{{info.rerLabPrice}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">税金</div>
				<div class="hadmatitem fontweight" v-if="info.rerTaxes">￥{{info.rerTaxes}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">管理费</div>
				<div class="hadmatitem fontweight" v-if="info.rerManagePrice">￥{{info.rerManagePrice}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">其他费用</div>
				<div class="hadmatitem fontweight">￥{{info.rerElsePrice}}</div>
			</div>
			<div class="wbeizhu">
				<div class="wname colorW">其他费用说明</div>
				<div class="wbeizhuinfo">{{info.rerElseMsg | emptyInfo2}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">物料费</div>
				<div class="hadmatitem fontweight">￥{{info.rerMatPrice}}</div>
			</div>
			<div class="witem">
				<div class="hadpeomoney">合计</div>
				<div class="hadmatitem hdall fontweight">￥{{info.rerTotalPrice}}</div>
			</div>
		</div>
		<div  v-if='info.rerIsGood'>
			<div class="wtitle">用户评价</div>
			<div class="evaluate">
				<div class="evaheader">
					<img :src="isgood">
					<span>{{info.rerIsGood | evaluate}}</span>
				</div>
				<div class="evainfo" v-if='info.rerIsGoodMsg'>
					{{info.rerIsGoodMsg}}
				</div>
			</div>
		</div>
		<div class="btns padTB">
			<button class="print" v-on:click='startoffer' v-if="info.rerStatus==1">我要报价</button>
			<button class="print" v-on:click='startdo' v-if="info.rerStatus==4">开始维修</button>
			<button class="print" v-on:click='finish' v-if="info.rerStatus==5">维修完成</button>
		</div>
		<showimg :surl='url' v-on:close='close' v-show="isShow"></showimg>
	</div>
</template>

<script type="ecmascript-6">
import $ from 'jquery'
import showimg from '../hadDeal/hadRep/showimg'
export default{
	data(){
		return{
			info:"",
			matList:"",
			userinfo:"",
			acceptInfo:"",
			isgood:'',
			url:'',
			isShow:false,
			userId:''
		}
	},
	components:{
		showimg
	},
	mounted(){
		this.$http.get('/realestate/manager/repair/'+this.$route.query.id+'/',{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else  if(res.code === 0){
				this.info = res.data
				this.userId = this.info.rerUser
				if(this.info.rerIsGood !== '' && this.info.rerIsGood == 0){
					this.isgood = './static/img/good.png'
				}else if(this.info.rerIsGood == 1){
					this.isgood = './static/img/nogood.png'
				}
				if(res.data.repairDetailList){
					this.matList = res.data.repairDetailList
				}
				if(res.data.rerUserDetail){
					this.userinfo = res.data.rerUserDetail
					if(this.userinfo && this.userinfo && this.userinfo.actPid==='GUEST'){
						this.userinfo.address = "访客"
					}
				}
				if(this.info.rerDescribeImg){
					this.isUpload  = false
				}else{
					this.isUpload = true
				}
				if(res.data.rerAcceptUserDetail){
					this.acceptInfo = res.data.rerAcceptUserDetail
				}
				if(this.info.rerDescribeImg !== ''){
					this.url = '/img/'+this.info.rerDescribeImg
				}
			}
		},response => {
			this.$message.error('网络异常')
		})
	},
	computed:{
		statuTime:function(){
			switch(this.info.rerStatus){
				case '0':
				return this.info.createTime
				break
				case '1':
				return this.info.rerAcceptTime
				break
				case '2':
				return this.info.rerOfferTime
				break
				case '3':
				return this.info.rerShutTime
				break
				case '4':
				return this.info.rerConfirmTime
				break
				case '5':
				return this.info.rerServiceStartTime
				break
				case '6':
				return this.info.rerServiceEndTime
				break
			}
		}
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
		},
		emptyInfo2:function(val){
			if(val === ''){
				return '暂无说明内容'
			}else{
				return val
			}
		},
		evaluate:function(val){
			var word = ["满意","不满意"]
			return word[val]
		}
	},
	methods:{
		close(msg){
			this.isShow = msg
		},
		showImg(){
			this.isShow = true
		},
		startoffer(){
			this.$router.push({path:"/App/work/appRepbox/addRepMat",query:{id:this.$route.query.id,userId:this.userId}})
		},
		startdo () {
			this.$http.post('/realestate/manager/repair/start/',{rerId:this.$route.query.id,rerUser:this.userId}).then(response => {
				var res = response.data
				if(res.code == 400 || res.code == 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code == 0){
					this.$store.commit('substractHadConfirmNumber',1)
					this.$router.push("/App/work/dealBox/dealling/frouth")
				}else{
					this.$router.push("/App/work/dealBox/dealling/third")
				}
			})
		},
		finish(){

			this.$http.post('/realestate/manager/repair/finish/',{rerId:this.$route.query.id,rerUser:this.userId,rerUserDetail:this.info.rerUserDetail}).then(response => {
				var res = response.data
				if(res.code == 400 || res.code == 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code == 0){
					this.$router.push("/App/work/wdealbox/wreplist")
				}else{
					this.$router.push("/App/work/dealBox/dealling/frouth")
				}
			})
		}
	}
}
</script>
