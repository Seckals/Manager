<template>
	<div class="cont">
		<div class="winfo">
			<div class="artitle">选择物料</div>
			<div class="addIcon">
				<img src="../../../../static/img/addB.png">
				<span v-on:click="showLIstInfo">添加物料</span>
			</div>
			<div class="tab">
				<table>
					<thead>
						<tr>
							<th>物料名</th>
							<th>数量</th>
							<th>单价(元)</th>
							<th>总价(元)</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr class="listItem" v-for="(item,index) in list" data-id="item.id">
							<td>{{item.name}}</td>
							<td><input type="text" v-on:keyup="setNumber(item)" class="num" v-model="item.number"></td>
							<td class="oneprice">{{item.thrPrice}}</td>
							<td>{{item.price}}</td>
							<td class="deal">
								<span v-on:click='delect(index)'>删除</span>
							</td>
						</tr>
						<tr>
							<td>合计:</td>
							<td colspan="3">{{matmoney}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="artitle">其他费用</div>
			<div class="otherBox">
				<div class="otherlabel">
					<span class="othertitle">其他费用:</span>
					<input type="text" @focus="fcs('otherMoney')" v-model="otherMoney" v-on:blur="format('otherMoney')" placeholder="请输入其他费用">
					<span>元</span>
				</div>
				<div class="othermark">
					<textarea placeholder="请输入备注信息，字数不要超过100字符" v-model="otherMark"></textarea>
				</div>
			</div>
			<div class="artitle">人工费</div>
			<div class="otherBox">
				<div class="otherlabel">
					<span class="othertitle">人工费:</span>
					<input type="text" @focus="fcs('pmoney')" v-model.number="pmoney" v-on:blur="format('pmoney')" placeholder="请输入人工费">
					<span>元</span>
				</div>
			</div>
			<div class="artitle">税金</div>
			<div class="otherBox">
				<div class="otherlabel">
					<span class="othertitle">税金:</span>
					<input type="text" @focus="fcs('rerTaxes')" v-model.number="rerTaxes" v-on:blur="format('rerTaxes')" placeholder="请输入税金">
					<span>元</span>
				</div>
			</div>
			<div class="artitle">管理费</div>
			<div class="otherBox">
				<div class="otherlabel">
					<span class="othertitle">管理费:</span>
					<input type="text" @focus="fcs('rerManagePrice')" v-model.number="rerManagePrice" v-on:blur="format('rerManagePrice')" placeholder="请输入管理费">
					<span>元</span>
				</div>
			</div>
			<div class="accoun">
				<div class="alab">
					<div class="pacc">
						人工费:￥<span>{{pmoney}}</span>
					</div>
					<div class="macc">
						物料费:￥<span>{{ matmoney }}</span>
					</div>
					<div class="macc">
						税金:￥<span>{{ rerTaxes }}</span>
					</div>
					<div class="macc">
						管理费:￥<span>{{ rerManagePrice }}</span>
					</div>
					<div class="macc">
						其他费用:￥<span>{{otherMoney}}</span>
					</div>
				</div>
				<div class="acc">
					<div>合计:￥<span>{{totalmoney}}</span></div>
					<button  v-on:click="submit">确认工单</button>
				</div>
			</div>
		</div>
		<matlist v-show="showlist" v-on:updetList = "upList" :flist="list" v-on:close='close'></matlist>
		<print v-show="showprint" :Pinfo="printinfo"></print>
	</div>
</template>

<script type="ecmascript-6">
import matlist from '../matList'
import print from './print'
import {getCookie} from '../../../../static/js/common.js'
export default{
	data(){
		return{
			list:"",
			type:"addbegin",
			showlist:false,
			pmoney:''|| '0.00',
			matmoney:'' || '0.00',
			otherMoney:'' || '0.00',
			otherMark:'',
			showprint:false,
			printinfo:'',
			rerTaxes:''|| '0.00',
			rerManagePrice:'' || '0.00'
		}
	},
	components:{
		matlist,
		print
	},
	watch:{
		list:{
			handler:function(val,oldval){
				this.calculate()
			},
			deep:true
		}
	},
	computed:{
		totalmoney(){
			var pMoney = isNaN(parseFloat(this.pmoney))?0:parseFloat(this.pmoney).toFixed(2)
			var mMoney = isNaN(parseFloat(this.matmoney))?0:parseFloat(this.matmoney).toFixed(2)
			var rMoney = isNaN(parseFloat(this.rerTaxes))?0:parseFloat(this.rerTaxes).toFixed(2)
			var rmMoney = isNaN(parseFloat(this.rerManagePrice))?0:parseFloat(this.rerManagePrice).toFixed(2)
			var oMoney = isNaN(parseFloat(this.otherMoney))?0:parseFloat(this.otherMoney).toFixed(2)

			var toMoney = (parseFloat(pMoney) + parseFloat(mMoney) + parseFloat(rMoney) + parseFloat(rmMoney)+parseFloat(oMoney)).toFixed(2)
			return toMoney
		}
	},
	methods:{
		fcs(type){
			this[type] = ''
		},
		upList(msg){
			this.list = msg
		},
		close(msg){
			this.showlist = msg
		},
		format(info){
			this[info] = isNaN(parseFloat(this[info]))?'0.00':parseFloat(this[info]).toFixed(2)
		},
		showLIstInfo(){
			this.showlist = true
		},
		delect(i){
			this.list.splice(i,1)
		},
		setNumber(item){
			item['number'] = isNaN(parseInt(item['number'])) ? 0 :parseInt(item['number']);
			if(item['number'] > item['amount']){
				item['number'] = item['amount']
			}
			item['price'] = parseFloat(item['number']*item['thrPrice']).toFixed(2)
		},
		calculate(){
			this.matmoney = 0;
			for(var i = 0; i < this.list.length; i++){
				this.matmoney = parseFloat(parseFloat(this.matmoney) + parseFloat(this.list[i]['price'])).toFixed(2)
			}
		},
		submit(){
			var delist = []
			var subdata = {
				rerId: this.$route.query.id,
				rerMatPrice: this.matmoney || '0.00',
				rerTotalPrice: this.totalmoney || '0.00',
				rerLabPrice: this.pmoney || '0.00',
				rerElsePrice:this.otherMoney || '0.00',
				rerElseMsg:this.otherMark,
				rerUser:this.$route.query.userId,
				rerTaxes:this.rerTaxes,
				rerManagePrice: this.rerManagePrice || '0.00'
			}
			var n = 0
			if(this.otherMark.length > 100){
				this.$message.error('其他费用备注字数太长')
			}else{
				if(this.list.length > 0){
					for(var i=0; i<this.list.length;i++){
						var inf = {
							"redMatterId":this.list[i].id
						}
						if(this.list[i].number && this.list[i].number>=1 && this.list[i].number <= 1000000000){
							inf["redNumber"] = this.list[i].number
							inf["redPrice"] = this.list[i].thrPrice || '0.00'
							inf["redTotalPrice"] = this.list[i].price || '0.00'
							delist.push(inf)
						}else{
							n++
						}
					}
					if(n>0){
						this.$message.error('请完整填写数量')
					}else{
						subdata["repairDetailList"] = delist
						if(this.matmoney != '' && this.totalmoney != '' && getCookie('info').infoId != ''){
							this.sendInfo(subdata)
						}else{
							this.$message.error('请输入完整')
						}
					}
				}else{
					subdata["repairDetailList"] = []
					if(getCookie('info').infoId != ''){
						this.sendInfo(subdata)
					}
				}
			}
		},
		sendInfo(val){
			var _this = this
			this.$http.post("/realestate/manager/repair/offer/",val).then(response => {
				var res = response.data
				if(res.code == 0){
					this.$message.success(res.msg)
					this.$router.push("/App/work/dealBox/dealling/second")
				}else if(res.code == 400 || res.code == 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else{
					this.$message.error(res.msg)
					this.$router.push("/App/work/dealBox/dealling/first")
				}
			},response => {
				this.$message.error('网络异常')
			})
		}
	}
}
</script>

<style>
.artitle{
	width: 100%;
	height: 32px;
	line-height: 32px;
	color: #9b9b9c;
	text-indent: 20px;
	font-size: 12px;
}
.winfo .addIcon{
	width: 100%;
	height: 45px;
	background: #ffffff;
	font-size: 12px;
	color: #308acb;
	text-align: center;
	line-height: 45px;
}
.winfo .addIcon>span{
	cursor: pointer;
}
.tab{
	width: 100%;
	margin-top: 9px;
}
.tab table{
	background: #ffffff;
	font-size: 14px;
}
.tab table th,.tab table td{
	width: 146px;
	height: 55px;
	line-height: 55px;
	border-right:1px solid #eeeeee;
	border-bottom:1px solid #eeeeee;
}
.tab table td{
	font-weight: bold;
	text-align: center;
}
.tab table td>input{
	width: 74px;
	height: 31px;
	border:1px solid #eeeeee;
	border-radius: 8px;
	text-align: center;
}
.tab table td.deal{
	font-size: 12px;
	cursor: pointer;
	color: #308acb;
}
.tab table td.deal>span{
	display: inline-block;
	width: 65px;
	height: 28px;
	border-radius: 7px;
	font-size: 12px;
	color:#fff;
	vertical-align: middle;
	text-align: center;
	line-height: 28px;
	background: #308acb;
}
.otherBox{
	width: 100%;
	padding: 10px 0 10px 32px;
	box-sizing: border-box;
	background: #ffffff;
}
.otherBox .otherlabel{
	width: 200px;
	height: 32px;
	border:1px solid #eeeeee;
	border-radius: 8px;
	font-size: 0;
	line-height: 32px;
	text-indent: 7px;
}
.otherBox .otherlabel>span{
	font-size: 14px;
	color:#8a8d8c;
}
.othertitle{
	color:#000 !important;
	font-weight: 500;
}
.otherBox .otherlabel>input{
	width: 105px;
	height: 20px;
	vertical-align: top;
	font-size: 14px;
	margin-top: 6px;
}
.othermark{
	padding-top: 12px;
}
.othermark>textarea{
	width: 450px;
	height: 97px;
	border:1px solid #eeeeee;
	border-radius: 8px;
	line-height: 26px;
	font-size: 14px;
	padding: 0 6px;
	box-sizing: border-box;
}
.othermark>textarea::-webkit-input-placeholder {
	color: #9b9b9c;
	font-size: 14px;
}
.othermark>textarea:-moz-placeholder {
	color: #9b9b9c;
	font-size: 14px;
}
.othermark>textarea::-moz-placeholder {
	color: #9b9b9c;
	font-size: 14px;
}
.othermark>textarea:-ms-input-placeholder {
	color: #9b9b9c;
	font-size: 14px;
}
.accoun{
	width: 100%;
	min-height: 56px;
	display: inline-block;
	vertical-align: top;
	font-size:0;
	margin-top: 10px;
	background: #fff;
	position: relative;

}
.accoun span{
	font-size: 18px;
	color: #308acb
}
.alab{
	min-width: 193px;
	padding-top: 6px;
	padding-left: 17px;
	line-height: 21px;
	font-size: 14px;
	display: inline-block;
	vertical-align: top;
}
.acc{
	height: 33px;
	font-size:0;
	display: inline-block;
	vertical-align: top;
	padding-top: 20px;
}
.acc>div{
	display: inline-block;
	vertical-align: top;
	font-size: 14px;
	height: 100%;
	line-height: 33px;
	margin-right: 20px;
}
.acc>div span{
	font-size: 18px;
}
.winfo>.accoun button{
	width: 76px;
	height: 33px;
	border-radius: 7px;
	cursor: pointer;
	background: #308acb;
	color:#fff;
	font-size: 14px;
}
.reppic{
	width: 73px;
	height: 73px;
	margin:24px 0 0 20px;
	position: relative;
}
.reppic>.uploadImg{
	width: 100%;
	height: 100%;
	display: block;
	position: absolute;
	top:0;
	left:0;
	z-index: 1;
}
.reppic>input{
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left:0;
	z-index: 10;
	opacity: 0;
	cursor: pointer;
}
.reppic .uploadDel{
	width: 11px;
	width: 11px;
	display: block;
	position: absolute;
	bottom: 2px;
	right: -15px;
	cursor: pointer;
}
</style>
