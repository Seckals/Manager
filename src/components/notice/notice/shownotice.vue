<template>
	<div class="nbox">
		<div class="ninfobox">
			<div class="ncontentbox">
				<div class="ncontent">
					<div class="nhead">
						<h2>{{info.msgTitle}}</h2>
						<span>{{info.createTime}}</span>
					</div>
					<div class="nbody">
						{{info.message}}
					</div>
					<div class="nImg" v-if="url">
						<img :src="'/img/'+url">
					</div>
				</div>
			</div>
			<div class="peoplebox">
				<div class="peopleItem">
					<span>发送人员:</span>
					<div class="allList">
						<span v-for="item in list" v-if="item.userInfo">{{item.userInfo.name}},</span>
					</div>
				</div>
				<div class="peopleItem">
					<span>已阅人员:</span>
					<div class="allList">
						<span v-for="item in noreadlist" class="colorF" v-if="item.userInfo">{{item.userInfo.name}},</span>
					</div>
				</div>
			</div>
		</div>
		<div class="delbtn">
			<button class="mudelect" @click='del'>删除通知</button>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			info:"",
			list:[],
			noreadlist:[],
			url:''
		}
	},
	mounted:function(){
		this.$http.get("/realestate/manager/notice/detail/"+this.$route.query.id).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else if(res.code === 0){
				this.info = res.data
				this.list = res.data.noticeReadList
				this.url = res.data.msgImg
				this.check(this.list)
			}else{
				this.$message.error(res.msg)
			}
		},response => {
			this.$message.error('网络异常')
		})
	},
	methods:{
		check(val){
			for(var i=0;i<val.length;i++){
				if(val[i].readStatus == 1){
					this.noreadlist.push(val[i])
				}
			}
		},
		del(){
			this.$http.delete("/realestate/manager/notice/"+this.$route.query.id).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success("删除成功")
					this.$router.push("/App/notice/noticebox")
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
.nbox{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	background: #eeeeee;
}
.ninfobox{
	width: 100%;
	min-height: 308px;
	background: #fff;
}
.ncontent{
	width: 800px;
	margin:0 auto;
}
.nhead h2{
	font-size: 16px;
	text-align: center;
	font-weight: bold;
	line-height: 37px;
}
.nhead{
	text-align: right;
}
.nhead>span{
	font-size: 13px;
}
.nbody{
	margin-top: 16px;
	font-size: 14px;
	line-height: 24px;
	text-indent: 28px;
	word-wrap: break-word;
}
.ncontentbox{
	width: 100%;
	padding-bottom: 100px;
	border-bottom: 1px solid #eeeeee;
}
.peoplebox{
	width: 800px;
	margin:0 auto;
}
.peopleItem{
	margin-top: 10px;
	font-size: 0;
}
.peopleItem>.allList{
	display: inline-block;
	width: 700px;
	vertical-align: top;
	line-height: 30px;
}
.peopleItem>.allList>span{
	font-size: 14px;
	color: #000;
	margin-right: 5px;
	vertical-align: top;
}
.peopleItem>span{
	font-size: 14px;
	color: #7c7c7c;
	margin-right: 10px;
	line-height: 30px;
	display: inline-block;
}
.colorF{
	color: #0168b5 !important;
}
.nImg{
	text-align: center;
}
.nImg>img{
	max-width: 100%;
}
</style>
