<template>
<div class="cont">
  <div class="naddbox">
    <div class="nadditem">
      <div class="naddlabel">标题</div>
      <div class="naddlist"><input type="text" placeholder="请输入公告标题" v-model="title"></div>
    </div>
    <div class="nadditem">
      <div class="naddlabel">正文</div>
      <div class="infoCludetip">
          <textarea class="naddlist" @blur='tipHide' @keyup='setLength' placeholder="请输入公告正文，请不要超过1000字" v-model="info"></textarea>
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
            url:'',
			toolShow:false,
			isUpImgBoxShow:false,
			fileName:'',
			file:'',
			isTipShow:false,
			length:0
		}
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
		submit(){
            if(this.title == '' || this.info == ''){
                this.$message.error("请填写完整")
            }else{
                if(this.file != ''){
                    this.subImg()
                }else if(this.title.length > 100){
                    this.$message.error("标题不得超过100字")
                }else if(this.info.length > 1000){
                    this.$message.error("正文不得超过1000字")
                }else{
                    this.$http.put('/manager/announcement',{"antMsg": this.info,"antTitle": this.title,"antImg":this.fileName}).then(response => {
                        var res = response.data
                        if(res.code === 400 || res.code === 401){
                            this.$message.error(res.msg)
                            this.$router.push("/login")
                        }else  if(res.code === 0){
                            this.$message.success(res.msg)
                            this.$router.push({path:"/App/notice/annouceBox"})
                        }else{
                            this.$message.error(res.msg)
                        }
                    },response => {
                        this.$message.error('网络异常')
                    })
                }
            }
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
        subImg(){
            var formData = new FormData()
            formData.append("file",this.file,this.fileName)
            this.$http.post("/realestate/fileupload/",formData).then(response => {
                var res = response.data
                if(res.code === 400 || res.code === 401){
                    this.$message.error(res.msg)
                    this.$router.push("/login")
                }else if(res.code === 0){
                    this.$http.put('/manager/announcement',{"antMsg": this.info,"antTitle": this.title,"antImg":this.fileName}).then(response => {
                        var res = response.data
                        if(res.code === 400 || res.code === 401){
                            this.$message.error(res.msg)
                            this.$router.push("/login")
                        }else  if(res.code === 0){
                            this.$message.success(res.msg)
                            this.$router.push({path:"/App/notice/annouceBox"})
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
