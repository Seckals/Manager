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
				<img :src="'/img/'+imgurl" class="uploadImg"   v-if="imgurl" v-on:click="showImg('/img/'+imgurl)">
				<div class="noimg" v-if="!imgurl">
					暂无图片信息
				</div>
			</div>
		</div>
		<div class="wtitle">申请人信息</div>
		<div class="witem">
			<div class="hdname hdtitle">申请人</div>
			<div class="hdname hdinfo" v-if="userinfo">{{userinfo.name}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">手机号码</div>
			<div class="hdname hdinfo" v-if="userinfo">{{userinfo.phone}}</div>
		</div>
		<div class="witem">
			<div class="hdname hdtitle">房号</div>
			<div class="hdname hdinfo" v-if="userinfo">{{userinfo.address}}</div>
		</div>
		<div v-if="acceptInfo">
			<div class="wtitle">处理信息</div>
			<div class="witem">
				<div class="hdname hdtitle">受理人</div>
				<div class="hdname hdinfo" v-if="">{{acceptInfo.name}}</div>
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
					<img src="../../../../../static/img/good.png" v-if="isgood">
					<img src="../../../../../static/img/nogood.png" v-if="!isgood">
					<span>{{info.rerIsGood | evaluate}}</span>
				</div>
				<div class="evainfo" v-if='info.rerIsGoodMsg'>
					{{info.rerIsGoodMsg}}
				</div>
			</div>
		</div>
		<div  v-if='info.rerStatus == 6'>
			<div class="wtitle">工单</div>
			<div class="orderBox">
				<div class="imgBox" v-if='isUpload'>
					<img :src="url" class="uploadImg" v-on:click="showImg(url)">
				</div>
				<div class="uplImg"  v-on:mouseover='over' v-on:mouseout='out' v-if='!isUpload' v-show='isUpShow'>
					<div class="uplImgbox" v-if='url'>
						<img :src='url' class="uploadImg">
						<canvas style="display: none;" id="mycanvas" width="600" height="600" ></canvas>
					</div>
					<div class="uplImgbox grayBg" v-if="!url"></div>
					<div class="uplMask" v-show='toolShow'>
						<button class="reupload" v-on:click="openUp">重选</button>
						<button class="redel" v-on:click="redel">删除</button>
					</div>
				</div>
			</div>
		</div>
		<div class="btns padTB" v-if='info.rerStatus != 2'>
			<button class="print" v-on:click='printOrder' v-if="info.rerStatus==6">打印工单</button>
			<button class="upload" v-on:click="openUpone" v-if="uploadnum ==1">上传工单</button>
			<button class="upload" v-on:click="subUpload" v-if="uploadnum ==2">上传</button>
		</div>
		<showimg :surl='showurl' v-on:close='close' v-show="isShow"></showimg>
		<print v-show="showprint" :Pinfo="printinfo"></print>
	</div>
</template>

<script type="ecmascript-6">
import showimg from './showimg'
import print from '../../rep/print.vue'
import $ from 'jquery'
export default{
	data(){
		return{
			info:"",
			matList:"",
			userinfo:"",
			acceptInfo:"",
			url:"",
			isShow:false,
			isUpload:'',
			file:'',
			fileName:'',
			showprint:false,
			printinfo:'',
			isgood:'',
			uploadnum:0,
			isUpShow:false,
			imgurl:'',
			showurl:'',
			toolShow:false
		}
	},
	components:{
		showimg,
		print
	},
	mounted(){
		this.$http.get('/realestate/manager/repair/'+this.$route.query.id+'/',{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else  if(res.code === 0){
				this.info = res.data
				if(this.info.rerDescribeImg){
					this.imgurl = this.info.rerDescribeImg
				}

				if(this.info.rerResultImg == '' && this.info.rerStatus == '6'){
					this.uploadnum = 1
				}
				if(this.info.rerIsGood !== '' && this.info.rerIsGood == 0){
					this.isgood = true
				}else if(this.info.rerIsGood == 1){
					this.isgood = false
				}
				if(res.data.repairDetailList){
					this.matList = res.data.repairDetailList
				}
				if(res.data.rerUserDetail){
					this.userinfo = res.data.rerUserDetail
						// if(this.userinfo && this.userinfo && this.userinfo.actPid==='GUEST'){
						// 	this.userinfo.address = "访客"
						// }
					}
					if(this.info.rerResultImg){
						this.isUpload  = true
						this.url = '/img/'+this.info.rerResultImg
					}else{
						this.isUpload = false
					}
					if(res.data.rerAcceptUserDetail){
						this.acceptInfo = res.data.rerAcceptUserDetail
					}
				}else{
					this.$message.error(res.msg)
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
		showImg(val){
			this.showurl = val
			this.isShow = true
		},
		over(){
			this.toolShow = true
		},
		out(){
			this.toolShow = false
		},
		openUpone(){
			this.openUp()
		},
		openUp(){
			if(this.isUpload) return
				var fil = document.createElement("input")
			fil.type = 'file'
			fil.onchange = this.upload
			fil.style.display = 'none'
			fil.accept = "image/gif, image/jpeg, image/png, image/jpg"
			return  $(fil).click();
		},
		redel(){
			this.url='',
			this.file='',
			this.fileName = ''
		},
		upload(e){
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length){
				return;
			}else{
				if((files[0].size/1024)>500){
					this.$message.error('图片大小不得大于500k')
				}else{
					this.uploadnum = 2
					this.createImage(files)
				}
			}
		},
		subUpload(){
			if(this.file !== ''){
				var formData = new FormData()
				var _this = this
				formData.append("file",this.file,this.fileName)
				this.$http.post("/realestate/fileupload/",formData).then(response => {
					var res = response.data
					if(res.code === 400 || res.code === 401){
						this.$message.error(res.msg)
						_this.$router.push("/login")
					}else if(res.code === 0){
						_this.$http.post("/realestate/manager/repair/update/img",{rerId:_this.$route.query.id,rerResultImg:_this.fileName}).then(response => {
							var res = response.data
							if(res.code === 0){
								this.$message.success(res.msg)
								_this.uploadnum = 3
								_this.isUpload = true
							}else{
								this.$message.error(res.msg)
							}
						})
					}else{
						this.$message.error(res.msg)
						_this.$router.push({path:"/App/work/wdealbox/wdeal/wreplist"})
					}
				},response => {
					this.$message.error('网络异常')
				})
			}else{
				this.$message.error('请添加图片')
			}
		},
		createImage(files){
			var vm = this
			var reader = null
			var cvn=document.createElement('canvas');
			var ctx=cvn.getContext('2d');
			var img=new Image();
			reader = new window.FileReader()
			reader.readAsDataURL(files[0])
			var newImageData;
			reader.onload = function (e) {
				img.src = e.target.result
				vm.uploadDelType = true
				img.onload=function(e){
					var originWidth = this.width;
					var originHeight = this.height;
					var maxWidth = 600, maxHeight = 600;
					var targetWidth = originWidth, targetHeight = originHeight;
					if (originWidth > maxWidth || originHeight > maxHeight) {
						if (originWidth / originHeight > maxWidth / maxHeight) {
							targetWidth = maxWidth;
							targetHeight = Math.round(maxWidth * (originHeight / originWidth));
						} else {
							targetHeight = maxHeight;
							targetWidth = Math.round(maxHeight * (originWidth / originHeight));
						}
					}
					cvn.width = targetWidth;
					cvn.height = targetHeight;
					ctx.clearRect(0, 0, targetWidth, targetHeight);
					ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
					newImageData = cvn.toDataURL('image/jpeg');
					vm.url=newImageData;
					vm.isUpShow = true
					vm.size=newImageData.length;
					function dataURLtoBlob(dataurl) {
						var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
						while(n--){
							u8arr[n] = bstr.charCodeAt(n);
						}
						return new Blob([u8arr], {type:mime});
					}
					var blob = dataURLtoBlob(newImageData);
					blob.name=files[0].name.split('.')[0]+Math.random().toString(36).substr(2)+"."+files[0].name.split('.')[1];
					vm.file = blob;
					vm.fileName = blob.name
					files[0] = ''
				}
			}
		},
		printOrder(){
			var matterlist = []
			for(var i = 0; i < this.matList.length;i++){
				var inf = {
					'name':this.matList[i]['matThree'].thrName,
					'number':this.matList[i].redNumber,
					'thrPrice':this.matList[i]['matThree'].thrPrice
				}
				matterlist.push(inf)
			}
			var info = {
				laborCost:this.info.rerLabPrice || 0,
				otherCost: this.info.rerElsePrice,
				matList: matterlist,
				matCost: this.info.rerMatPrice || 0,
				allCost: this.info.rerTotalPrice || 0,
				mark:this.info.rerElseMsg,
				where:'work'
			}
			this.printinfo = info
			this.showprint = true
		}
	}
}
</script>

<style>
.padTB{
	background: #fff;
	padding:13px 0 14px 0;
}
.padTB>button{
	width: 126px;
	height: 36px;
	color:#fff;
	font-size: 16px;
	margin-right: 26px;
	border-radius: 18px;
	cursor: pointer;
}
.padTB>.print{
	background: #308acb;
}
.padTB>.upload{
	background: #a1a1a1;
}
.orderBox{
	background: #fff;
}
.imgBox{
	padding:19px 0 0 17px;
}
.imgBox>img{
	width: 177px;
	height: 126px;
}
.uplImg{
	position: relative;
	width: 200px;
	height: 150px;
}
.uplMask{
	width: 177px;
	height: 126px;
	box-sizing: border-box;
	background: rgba(0,0,0,0.5);
	padding:40px 0 0 34px;
	position: absolute;
	top:19px;
	left:17px;
}
.uplImgbox{
	width: 177px;
	height: 126px;
	position: absolute;
	top:19px;
	left:17px;
}
.uplImgbox>img{
	width: 177px;
	height: 126px;
}
.uplMask>button{
	width: 46px;
	height: 46px;
	border-radius: 23px;
	background: rgba(76,69,66,0.4);
	font-size: 14px;
	color: #fff;
	margin-right: 15px;
	cursor: pointer;
}
.evaheader{
	width: 100%;
	height: 62px;
	border-bottom: 1px solid #eeeeee;
	box-sizing:border-box;
	padding: 15px 0 15px 32px;
	background: #fff;
	font-size: 0;
}
.evaheader>img{
	margin-right: 15px;
}
.evaheader>img,.evaheader>span{
	display: inline-block;
	vertical-align: top;
	font-size: 14px;
	color: #444444;
	line-height: 32px;
}
.evainfo{
	padding:15px 0 15px 32px;
	background: #fff;
	line-height: 30px;
	text-indent: 28px;
}
.colorW{
	color: #000 !important;
}
.grayBg{
	background: #a1a1a1;
}
</style>
