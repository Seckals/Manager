<template>
	<div class="ntbox">
		<div class="ntboxinfo" v-show="list.length !== 0">
			<div class="nlist" v-bind:class="{nActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
				<router-link :to="{ path: 'shownotice', query: { id: item.noticeId}}" tag="div">
					<img src="../../../../static/img/notice.png">
					<div class="ninfo">
						<div class="nname">{{item.msgTitle}}</div>
						<div class="nlittleinfo">{{item.message}}</div>
					</div>
					<span class="ntime">{{item.createTime | split}}</span>
				</router-link>
			</div>
			<div class="getMore" v-on:click='getMore' v-show="list.length>=14">{{text}}</div>
		</div>
		<div class="ntboxinfo ntcss" v-show="list.length === 0">
			没有任何通知
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			isHover:"",
			list:[],
			page:1,
			nextPage:"",
			text:'获取更多...'
		}
	},
	mounted:function(){
		this.getList()
	},
	filters:{
		split:function(val){
			return val.substr(0,10)
		}
	},
	methods:{
		hoverIn:function(val){
			this.isHover = val
		},
		hoverOut:function(){
			this.isHover = false
		},
		getList:function(){
			var _this = this
			this.$http.get('/realestate/manager/notice/'+this.page+'/',{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					_this.nextPage = res.data.nextPage
					if(res.data.nextPage === 0){
						_this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							_this.list.push(data[i])
						}
						_this.page++
					}
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		getMore(){
			if(this.nextPage !== 0){
				this.getList()
			}
		}
	}

}
</script>

<style>
.ntbox{
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	background: #fff;
}
.nlist{
	width: 100%;
	height: 54px;
	font-size: 14px;
	cursor: pointer;
	border-bottom: 1px solid #e0e2e0;
}
.nlist>div{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	line-height: 54px;
	padding: 0 19px 0 15px;
}
.nlist img{
	float: left;
	margin-right:17px;
	width: 22px;
	height: 28px;
	margin-top: 13px;
}
.nlist .ninfo{
	float: left;
	overflow: hidden;
	max-width: 700px;
	padding-top: 8px;
	line-height: 19px;
}
.nlittleinfo{
	width: 150px;
	text-overflow: ellipsis;
	overflow:hidden;
	white-space: nowrap;
	color: #999;
	font-size: 12px;
}
.nlist .ninfo .nname{
	color: #222;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.nlist .ntime{
	font-size: 12px;
	float: right;
}
.nActive{
	background: #d9d7d7 !important;
}
.ntboxinfo{
	width: 100%;
	height: 100%;
}
.ntcss{
	font-size: 28px;
	color: #afafaf;
	text-align: center;
	line-height: 140px;
}
</style>
