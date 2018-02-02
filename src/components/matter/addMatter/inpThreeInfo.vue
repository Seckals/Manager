<template>
	<!-- 三级物料 -->
	<div class="newBox">
		<div class="newhead">
			<div class="matTitleBox">
				<div>一级物料</div>
				<div>二级物料</div>
				<div   class="addtab">三级物料</div>
			</div>
			<div class="matChooseBox">
				<div><span>1</span><span>{{onename}}(已选)</span></div>
				<img src="./arrows.png">
				<div><span>2</span><span>{{twoname}}(已选)</span></div>
				<img src="./arrows.png">
				<div><span   class="matChooseActive">3</span></div>
			</div>
		</div>
		<div class="aBox">
			<div class="thrListBox">
				<div v-for="(item,index) in list" class="thrListItem">
					<div class="thrTitlt" v-on:click="toggle(status,index)">
						<img class="rubish" src="../../../../static/img/rubish.png" v-on:click.stop="del(index)">
						物料{{index+1}}
						<img src="./reback.png" class="togShow" v-show="!status[index]">
						<img src="./open.png" class="togShow" v-show="status[index]">
					</div>
					<div class="thrContent" v-show="status[index]">
						<div class="thrInpItem">
							<span>物料名</span>
							<input type="text" class="matName" placeholder="请输入物料名" v-model='item.thrName'>
						</div>
						<div class="thrInpItem">
							<span>规格</span>
							<input type="text" class="matNorms" placeholder="请输入物料规格" v-model='item.thrNorms'>
						</div>
						<div class="thrInpItem">
							<span>数量</span>
							<input type="number" class="matNumber" placeholder="请输入物料数量" v-on:keyup="caculate(item)" v-model='item.thrNumber'>
						</div>
						<div class="thrInpItem">
							<span>进货单价</span>
							<input type="number" min="0"  step="0.01" class="matPrice" placeholder="请输入物料进货单价" v-model='item.thrPrice' v-on:blur="caculate(item)">
						</div>
						<div class="thrInpItem">
							<span>采购地</span>
							<input type="text" class="matPlace" placeholder="请输入物料采购地" v-model='item.thrPurchaseLocation'>
						</div>
					</div>
				</div>
			</div>
			<div class="btns">
				<button class="btnsItem goon" v-on:click="add">继续添加</button>
				<button class="btnsItem subfinish" v-on:click="submitInfo">完成</button>
			</div>
		</div>
	</div> 
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data:function(){
		return{
			onename:"",
			twoname:"",
			list:[{
				"thrName":'',
				"thrNorms":'',
				"thrNumber":'',
				"thrPrice":'',
				"thrTotalPrice": '',
				"twoPid": this.$route.query.id,
				"thrPurchaseLocation": ''
			}],
			status:{
				0:true
			}
		}
	},
	mounted:function(){
		this.onename = this.$route.query.onename
		this.twoname = this.$route.query.twoname
	},
	methods:{
		toggle(info,i){
			info[i] = !info[i]
		},
		del(i){
			if(this.list.length <=1){}else{
				this.list.splice(i,1)
			}
		},
		caculate(item){
			item.thrNumber = isNaN(parseInt(item.thrNumber))?0:parseInt(item.thrNumber)
			item.thrPrice = isNaN(parseFloat(item.thrPrice))?0:parseFloat(item.thrPrice).toFixed(2)
			item.thrTotalPrice = (item.thrNumber*parseFloat(item.thrPrice)).toFixed(2)
		},
		submitInfo:function(){
			for(var i = 0; i < this.list.length;i++){
				if(!this.list[i].thrName || !this.list[i].thrNorms || !this.list[i].thrNumber || !this.list[i].thrPrice){
					this.$message.error("请填写完整")
					return;
				}
			}
			this.$http.put('/matter/thr',JSON.stringify(this.list)).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.$message.success(res.msg)
					this.$router.push('/App/matter/matterList')
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error("网络异常")
			})
		},
		add:function(){
			this.list.push({
				"thrName":'',
				"thrNorms":'',
				"thrNumber":'',
				"thrPrice":'',
				"thrTotalPrice": '',
				"twoPid": this.$route.query.id,
				"thrPurchaseLocation": ''
			})
			for(var i in this.status){
				this.status[i] = false
			}
			this.$set(this.status,this.list.length-1,true)

		}
	}
} 
</script>

<style>
.thrTitlt{
	width: 100%;
	height: 36px;
	background: #eeeeee;
	font-size: 14px;
	color:#000;
	text-indent: 52px;
	line-height: 36px;
	position: relative;
	border-bottom: 22px;
}
.thrTitlt>.rubish{
	width: 17px;
	height: 17px;
	display: block;
	position: absolute;
	cursor: pointer;
	top:9px;
	left: 16px;
}
.thrTitlt>.togShow{
	width: 13px;
	height: 8px;
	display: block;
	top:18px;
	right: 14px;
	cursor: pointer;
	position: absolute;
}
.thrContent{
	padding-top: 20px;
}
.thrInpItem{
	height: 32px;
	padding-left: 52px;
	line-height: 32px;
	margin-bottom: 20px;
}
.thrInpItem>span{
	font-size: 14px;
	color: #727272;
	margin-right: 16px;
}
.thrInpItem>input{
	width: 181px;
	height: 28px;
	font-size: 13px;
	text-indent:12px;
	border:2px solid #e3e3e3;
	border-radius: 8px;
}
.btns{
	width: 100%;
	text-align: center;
}
.btnsItem{
	width: 111px;
	height: 30px;
	color: #fff;
	font-size: 15px;
	border-radius: 15px;
	cursor: pointer;
	margin-right: 15px;
}
.aBox{
	padding-bottom: 20px;
}
.goon{
	background: #1e8e85;
}
.subfinish{
	background:#308acb
}
.thrInpItem>input::-webkit-input-placeholder { 
	font-size:13px;
	color: #cacaca;
}
.thrInpItem>input:-moz-placeholder {
	font-size:13px;
	color: #cacaca;
}
.thrInpItem>input::-moz-placeholder {
	font-size:13px;
	color: #cacaca;
}
.thrInpItem>input:-ms-input-placeholder {
	font-size:13px;
	color: #cacaca;
}
</style>
