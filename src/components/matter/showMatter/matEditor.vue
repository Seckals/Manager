<template>
	<div class="editorBox">
		<div class="editorContant">
			<div class="editorHeader">
				修改物料
				<div class="close" v-on:click="close">
					<img src="../../../../static/img/close.png">
				</div>
			</div>
			<div class="editorCont">
				<div class="editItem">
					<div class="label">物料名</div>
					<div class="input">
						<input type="text" v-model="thrName" placeholder="请输入内容">
					</div>
				</div>
				<div class="editItem">
					<div class="label">在库数量</div>
					<div class="input">
						<input type="number" v-model="thrNumber" placeholder="请输入内容" v-on:keyup="caculate">
					</div>
				</div>
				<div class="editItem">
					<div class="label">规格</div>
					<div class="input">
						<input type="text" v-model="thrNorms" placeholder="请输入内容">
					</div>
				</div>
				<div class="editItem">
					<div class="label">进货单价</div>
					<div class="input">
						<input type="number" step="0.01" v-model="thrPrice" placeholder="请输入内容" v-on:keyup="caculate">
					</div>
				</div>
				<div class="editItem">
					<div class="label">进货地</div>
					<div class="input">
						<input type="text" v-model="place" placeholder="请输入内容">
					</div>
				</div>
				<div class="editItem">
					<div class="label">进货总价</div>
					<div class="input">
						￥{{thrTotalPrice}}
					</div>
				</div>
				<div class="editorbtns">
					<button class="cancle" v-on:click="close">取消</button>
					<button class="edtsave" v-on:click="save">保存</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data:function(){
		return {
			thrName:'',
			thrNumber:'',
			thrNorms:'',
			thrPrice:'',
			thrTotalPrice:'',
			place:''
		}
	},
	props: ['matInf'],
	watch: {
		matInf(newInfo,old){
			this.showInfo()
		}
	},
	methods:{
		showInfo(){
			this.thrName=this.matInf.matInfo.thrName
			this.thrNumber=this.matInf.matInfo.thrNumber
			this.thrNorms=this.matInf.matInfo.thrNorms
			this.thrPrice=this.matInf.matInfo.thrPrice
			this.thrTotalPrice=this.matInf.matInfo.thrTotalPrice
			this.place=this.matInf.matInfo.thrPurchaseLocation
		},
		close(){
			this.showInfo()
			this.$emit("close",false)
		},
		caculate(){
			this.thrNumber = isNaN(parseInt(this.thrNumber))?0:parseInt(this.thrNumber)
			this.thrPrice = isNaN(parseFloat(this.thrPrice))?'0':parseFloat(this.thrPrice).toFixed(2)
			this.thrTotalPrice = (this.thrNumber * this.thrPrice).toFixed(2)
		},
		save(){
			var info = this.matInf.matInfo
			info["thrName"] = this.thrName
			info["thrNumber"] = this.thrNumber
			info["thrNorms"] = this.thrNorms
			info["thrPrice"] = this.thrPrice
			info["thrTotalPrice"] = this.thrTotalPrice
			info["thrPurchaseLocation"] = this.place
			var dat = []
			dat.push(info)
			
			this.$http.post("/matter/thr",JSON.stringify(dat)).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$emit("getBackInfo",{'info':info,'index':this.matInf.index})
					this.$emit("close",false)
					this.$message.success(res.msg)
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		}
	}
}
</script>

<style>
.editorBox{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
	position: absolute;
	top:0;
	left: 0;
}
.editorContant{
	width: 600px;
	height: 466px;
	position: absolute;
	top:50%;
	left:50%;
	margin:-233px 0 0 -300px;
	border-radius: 9px;
	background: #fff;
}
.editorHeader{
	width: 100%;
	height: 42px;
	position: relative;
	line-height: 42px;
	font-size: 16px;
	font-weight: 500;
	text-align: center;
	border-bottom: 1px solid #d1dfd7;
}
.editorHeader .close{
	width: 41px;
	height: 41px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	border-left: 1px solid #e6efef;
}
.editorHeader .close>img{
	width: 13px;
	height: 13px;
	display: block;
	margin: 15px auto;
}
.editorCont{
	padding:8px 0 0 24px;
}
.editItem{
	margin-top: 19px;
	height: 36px;
}
.editItem .label{
	line-height: 36px;
	font-size: 14px;
	color: #727272;
	margin-right: 16px;
	display: inline-block;
	vertical-align: top;
}
.editItem .input{
	width: 185px;
	height: 100%;
	line-height: 36px;
	display: inline-block;
	vertical-align: top;
}
.editItem .input>input{
	width: 181px;
	height: 28px;
	font-size: 13px;
	text-indent: 12px;
	border: 2px solid #e3e3e3;
	border-radius: 8px;
}
.editorbtns{
	width: 100%;
	text-align: center;
}
.editorbtns > button{
	width: 111px;
	height: 30px;
	border-radius: 15px;
	color:#fff;
	font-size:15px;
	cursor: pointer;
}
.cancle{
	background: #1e8e85;
	margin-right: 23px;
}
.edtsave{
	background: #308acb;
}
</style>
