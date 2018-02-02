<template>
	<div class="cont">
		<div class="naddbox" v-on:click='listHide'>
			<div class="nadditem">
				<div class="naddlabel naddActive">收件人</div>
				<div class="naddlist naddActive userListBox">
					<div class="userListInfo">
						<span class="nadChooseList" v-for="item in chooseList">{{item.name}} <span class="icon-close" v-on:click="delecter(item.infoId)"></span></span>
						<input type="text" placeholder="请选择收件人" class="nadChooseInput" v-on:click.stop='showPeople' v-on:keyup="inputPeople" v-model='peopleone'>
					</div>
					<div class="userList" v-show="isListShow">
						<ul>
							<li v-on:click='chooseThis(item)' v-for="item in searchList">{{item.name}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="nadditem">
				<div class="naddlabel">标题</div>
				<div class="naddlist"><input type="text" placeholder="请输入通知标题" v-model="title"></div>
			</div>
			<div class="nadditem">
				<div class="naddlabel">正文</div>
				<div class="infoCludetip">
					<textarea class="naddlist" @blur='tipHide' @keyup='setLength' placeholder="请输入通知正文，请不要超过1000字" v-model="info"></textarea>
					<transition name="fade">
						<div class="tip" v-if="isTipShow">
								当前字数{{length}}个
							<div class="popper__arrow"></div>
						</div>
  					</transition>
				</div>
			</div>
			<div class="uploadImgBox">
				<div class="uplImg" v-on:mouseover='over' v-on:mouseout='out' v-if="isUpImgBoxShow">
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
				<button class="upBtn" @click='openUp' v-if="!isUpImgBoxShow"><i></i><span>上传图片</span></button>
			</div>
			<div class="naddbtn">
				<button v-on:click="submit">发布</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data(){
		return{
			title:"",
			info:"",
			isListShow:false,
			peopleone:'',
			chooseList:[],
			lastpeopleone:'',
			list: [],
			searchList:[],
			isAll:false,
			url:'',
			toolShow:false,
			isUpImgBoxShow:false,
			fileName:'',
			file:'',
			isTipShow:false,
			length:0
		}
	},
	mounted(){
		this.$http.post("/useraccount/manager/info/search/",{message:''},{emulateJSON:true}).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else if(res.code === 0){
				this.list = res.data
				this.searchList = res.data
				this.list.unshift({"infoId":'all',"name":'全部'})
			}
		},response => {
			this.$message.error('网络异常')
		})
	},
	methods:{
		tipHide(){
			var _this = this
			setTimeout(function(){
				_this.isTipShow = false
			},2000)
		},
		setLength(){
			this.length =this.info.length
			this.isTipShow = true
		},
		showPeople(){
			this.$el.querySelector('.userList').style.top = this.$el.querySelector('.userListBox').clientHeight + 2 +'px'
			if(this.list.length > 0){
				this.isListShow = true
			}
		},
		inputPeople(e){
			this.$el.querySelector('.userList').style.top = this.$el.querySelector('.userListBox').clientHeight + 2 +'px'
			this.isListShow = true
				if(e.keyCode === 13){  // 回车
					if(this.peopleone == ''){this.$message.error('请输入用户名');return}
					var info = this.isHere(this.peopleone)
					if(info == null){
						this.$message.error('对不起没有该用户')
					}else{
						if(!this.isChoose(info)){
							if(!this.isHaveAll()){
								if(info.infoId == 'all'){
									this.chooseList = []
									this.chooseList.push(info)
								}else{
									this.chooseList.push(info)
								}
							}
						}else{
							this.$message.error('该用户已存在')
						}
						this.peopleone = ''
						this.$el.querySelector(".nadChooseInput").placeholder=''
						this.$el.querySelector(".nadChooseInput").focus()
						this.isListShow = false
					}
				}else{
					this.search(this.peopleone)
				}
			},
			search(val){
				this.searchList = []
				for(var i = 0;i<this.list.length;i++){
					if(this.list[i].name.indexOf(val) > -1){
						this.searchList.push(this.list[i])
					}
				}
				if(this.searchList.length<1){
					this.isListShow = false
				}
			},
			chooseThis(val){
				if(val.infoId=="all"){
					this.chooseList = []
					this.chooseList.push(val)
					this.isAll = true
				}else if(this.isAll || this.isChoose(val)){
					this.$message.error('该用户已存在')
				}else if(!this.isChoose(val)){
					this.chooseList.push(val)
				}

				this.isListShow = false
				this.peopleone = ''
				this.$el.querySelector(".nadChooseInput").placeholder=''
				this.$el.querySelector(".nadChooseInput").focus()
			},
			delecter(id){
				if(id == 'all'){
					this.chooseList = []
					this.isAll = false
				}else{
					var x = []
					for(var i=0; i<this.chooseList.length;i++){
						if(this.chooseList[i].infoId !== id){
							x.push(this.chooseList[i])
						}
					}
					this.chooseList = x
				}
				this.searchList = this.list
				this.$el.querySelector(".nadChooseInput").focus()	
			},
			submit(){
				var noticeReadList = []
				if(this.chooseList[0].infoId == 'all'){
					for(var i=1;i<this.list.length;i++){
						noticeReadList.push({"readUser": this.list[i].infoId})
					}
				}else{
					for(var i=0;i<this.chooseList.length;i++){
						noticeReadList.push({"readUser": this.chooseList[i].infoId})
					}
				}

				if(this.title !== '' && this.info !== ''){
					if(this.title.length > 30){
						this.$message.error('题目不能超过30个字')
					}else if(this.info.length > 1000){
						this.$message.error('内容不能超过1000个字')
					}else{
						var info = {
							message: this.info,
							msgTitle: this.title,
							infoPid: getCookie("info").infoId,
							noticeReadList: noticeReadList
						}
						if(this.file != ''){
							this.subImg(info)
						}else{
							this.$http.put('/realestate/manager/notice/',info).then(response => {
								var res = response.data
								if(res.code === 400 || res.code === 401){
									this.$message.error(res.msg)
									this.$router.push("/login")
								}else  if(res.code === 0){
									this.$message.success(res.msg)
									this.$router.push({path:"/App/notice/noticebox"})
								}else{
									this.$message.error(res.msg)
								}
							},response => {
								this.$message.error('网络异常')
							})
						}
					}
				}else{
					this.$message.error('请填写完整')
				}
			},
			isHere(val){
				for(var i = 0; i < this.list.length; i++){
					if(val == this.list[i].name){
						return this.list[i]
					}
				}
				return null
			},
			isChoose(val){
				for(var i = 0; i < this.chooseList.length; i++){
					if(this.chooseList[i].infoId == "all") return true
					if(val.infoId == this.chooseList[i].infoId){
						return true
					}
				}
				return false
			},
			listHide(){
				this.isListShow =false
			},
			isHaveAll(){
				for(var i=0;i<this.chooseList.length;i++){
					if(this.chooseList[i].infoId=="all"){
						return true
					}
				}
				return false
			},
			openUp(){
				var fil = document.createElement("input")
				fil.type = 'file'
				fil.onchange = this.upload
				fil.style.display = 'none'
				fil.accept = "image/gif, image/jpeg, image/png, image/jpg"
				return  $(fil).click();
			},
			upload(e){
				var files = e.target.files || e.dataTransfer.files;
				if (!files.length){
					return;
				}else{
					if((files[0].size/1024)>500){
						this.$message.error('图片大小不得大于500k')
					}else{
						this.createImage(files)
					}
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
						vm.isUpImgBoxShow = true
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
			redel(){
				this.url='',
				this.file='',
				this.fileName = ''
			},
			over(){
				this.toolShow = true
			},
			out(){
				this.toolShow = false
			},
			subImg(info){
				var formData = new FormData()
				formData.append("file",this.file,this.fileName)
				this.$http.post("/realestate/fileupload/",formData).then(response => {
					var res = response.data
					if(res.code === 400 || res.code === 401){
						this.$message.error(res.msg)
						this.$router.push("/login")
					}else if(res.code === 0){
						info['msgImg'] = this.fileName
						this.$http.put('/realestate/manager/notice/',info).then(response => {
							var res = response.data
							if(res.code === 400 || res.code === 401){
								this.$message.error(res.msg)
								this.$router.push("/login")
							}else  if(res.code === 0){
								this.$message.success(res.msg)
								this.$router.push({path:"/App/notice/noticebox"})
							}else{
								this.$message.error(res.msg)
							}
						},response => {
							this.$message.error('网络异常')
						})
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
	.naddbox{
		width: 100%;
		height: 100%;
		background: #fcfdfc;
	}
	.nadditem{
		padding-left: 13px;
		font-size: 0;
		padding-top: 13px;
	}
	.nadditem>div{
		display: inline-block;
		font-size: 14px;
		vertical-align: top;
	}
	.nadditem .naddlabel{
		width: 60px;
		line-height: 34px;
		color:#000;
		font-weight: bold;
	}
	.nadditem .naddlist{
		width: 570px;
		line-height: 32px;
		text-indent: 12px;
		border:1px solid #d6d6d6;
	}
	.nadditem .naddlist>input{
		height: 32px;
		width: 530px;
		background: #fcfdfc;
	}
	.nadChooseInput{
		width: 100px !important;
		background: #fcfdfc;
	}
	.nadditem textarea{
		min-height: 100px;
		padding:0;
		font-size: 14px;
		width: 572px;
	}
	.naddActive{
		color:#0168b5 !important;
		border-color: #0168b5 !important;
	}
	.naddbtn{
		width: 632px;
		padding-top: 48px;
		text-align: right;
	}
	.naddbtn>button{
		width: 98px;
		height: 30px;
		border-radius: 15px;
		background: #308acb;
		font-size: 15px;
		cursor: pointer;
		color: #fff;
		line-height: 30px;
		text-align: center;
	}
	.userListBox{
		position: relative;
		padding-left: 12px;
		box-sizing: border-box;
		text-indent: 0 !important;
	}
	.userList{
		position: absolute;
		top:32px;
		left:0;
		background: #fcfdfc;
		border: 1px solid #d1dbe5;
		margin: 3px 0;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);
		width: 200px;
		max-height: 200px;
		overflow-x: hidden;
		overflow-y: auto;
		color: #48576a;
		z-index: 1000;
	}
	.userList li{
		cursor: pointer;
		text-indent: 12px;
	}
	.userList li:hover{
		background: #E4E8F1;
	}
	.userList:scrollbar{
		width: 5px;
	}
	.nadChooseList{
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		border: 1px solid #000;
		background-color: rgba(32,160,255,.1);
		border-color: rgba(32,160,255,.2);
		color: #20a0ff;
		border-radius: 4px;
		vertical-align: top;
		font-size: 14px;
		display: inline-block;
		margin-top: 6px;
		margin-right: 5px;
		cursor: pointer;
	}
	.nadChooseList>span{
		border-radius: 50%;
		text-align: center;
		position: relative;
		font-size: 12px;
		transform: scale(.75);
		height: 18px;
		width: 18px;
		line-height: 18px;
		vertical-align: middle;
		top: -1px;
		right: -2px;
		display: inline-block;
	}
	.nadChooseList>span:hover{
		background: #20A0FF;
		color:#fff;
	}
	.userListInfo{
		font-size: 0;
	}

	.userListInfo>input{
		font-size: 14px;
		height: 32px;
		margin-top: 2px;
	}
	.uploadImgBox{
		margin-left: 55px;
	}
	.upBtn{
		padding:0 10px;
		height: 35px;
		border-width: 2px;
		border-style: dashed;
		border-radius:5px;
		background: #fff;
		font-size:0;
		text-align: left;
		margin-left: 17px;
		margin-top: 12px;
		color:#bebebe;
		cursor: pointer;
	}
	.upBtn:hover{
		color:#599bd1;
	}
	.upBtn>i{
	    display: inline-block;
	    width: 10px;
	    height: 10px;
		margin-right: 7px;
	    background: url('../../../../static/img/add.png') no-repeat;
	    background-size: 10px 10px;
	}
	.upBtn>span{
		font-size: 14px;
	}
	.noBorder{
		border:none !important;
	}
	/****************************************************** 提示框 *****************************************************/
	.tip{
		position: absolute;
		left:573px;
		box-sizing: border-box;
		top:0px;
	    transform-origin: center top 0px;
	    z-index: 2082;
		padding: 18px 20px;
		background: #fff;
	    min-width: 150px;
	    border-radius: 4px;
	    border: 1px solid #ebeef5;
	    color: #606266;
	    line-height: 1.4;
	    text-align: justify;
	    word-break: break-all;
	    font-size: 14px;
		margin-left: 12px;
	    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}
	.tip>.popper__arrow{
		top: 50%;
		left: -12px;
		margin-top: -6px;
	    border-left-width: 0;
	    border-right-color: #ebeef5 !important;
		border-width: 6px;
    	filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
	}
	.tip>.popper__arrow:after{
		content: " ";
    	border-width: 6px;
		top: 50%;
		margin-top: -6px;
		left:1px;
		border-left-width: 0;
		border-right-color: #fff !important;
	}
	.tip>.popper__arrow,.tip>.popper__arrow:after{
		position: absolute;
	    display: block;
	    width: 0;
	    height: 0;
	    border-color: transparent;
	    border-style: solid;
	}
	.infoCludetip{
		position: relative;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0
	}
	</style>
