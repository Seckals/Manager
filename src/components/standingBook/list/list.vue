<template>
	<div class="hdlist">
		<div class="hdlistHeader">
			<div class="searchBox searchList" v-on:mouseout="hoveOut" v-on:mouseover="hoveIn">
				<input type="text" placeholder="请输入搜索内容" class="inputInfo" v-model="searChInfo">
				<img src="../../../../static/img/schB.png" v-on:click="search" v-on:keyup.13="search">
			</div>
		</div>
		<div class="hdListBox">
			<div class="wItem" v-bind:class="{wActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
				<router-link :to="{ path: '/App/book/info/info', query: { id: item.standId }}" tag="div" :class="{ gary: item.standStatus == '1'}">
					<div class="wIcon">
						<img src="../../../../static/img/repIconG.png" v-if="item.standStatus==1">
						<img src="../../../../static/img/rep.png" v-if="item.standStatus==0">
					</div>
					<div class="wInfo">
						<div class="wName">{{item.standId}}</div>
					</div>
					<div class="sdeal" v-if="item.standStatus==0">
						<span class='sdel' @click.stop='del(item)'>删除</span>
						<!-- <span class="supdate" @click.stop='update(item)'>修改</span> -->
					</div>
				</router-link>
			</div>
			<div class="getMore" v-on:click='getMore' v-show="list.length>=13">{{text}}</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data:function(){
		return{
			isHover:"",
			list:[],
			page:1,
			isNext:false,
			searChInfo:"",
			text:'获取更多...'
		}
	},
	mounted:function(){
		this.getList(1)
	},
	filters:{
		status:function(val){
			var word = ['未处理','已接单','已报价','已关闭','用户已确认','维修中','已处理']
			return word[val]
		},
		split:function(val){
			return val.substr(0,10)
		},
		url:function(val){
			if(val ==3){
				return './static/img/repIconG.png'
			}else{
				return './static/img/rep.png'
			}
		}
	},
	methods:{
		hoverIn:function(val){
			this.isHover = val
		},
		hoverOut:function(){
			this.isHover = false
		},
		hoveIn:function(){
			this.$el.querySelector(".inputInfo").style.width = 150+'px'
		},
		hoveOut:function(){
			if(this.searChInfo === ''){
				this.$el.querySelector(".inputInfo").style.width = 0+'px'
			}
		},
		getList:function(page){
			var url = '/standbook?ev=0%2C1&e=stand_status&page='+page+'&size=13'
			this.sendInfoXHR(url)
		},
		getSearchList:function(page){
			var url = '/standbook?ev=0%2C1&e=stand_status&page='+page+'&size=13&q=stand_id&qv='+this.searChInfo.replace(/(^\s*)|(\s*$)/g,'')
			this.sendInfoXHR(url)
		},
		search:function(){
			this.list = []
			this.page=1
			this.getSearchList(1)
		},
		getMore(){
			if(this.isNext){
				if(this.searChInfo !== ''){
					this.getSearchList(this.page+1)
				}else{
					this.getList(this.page+1)
				}
			}
		},
		del(item){
			this.$http.delete('/standbook/'+item.standId).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$set(item,'standStatus',0)
					this.$message.success("删除成功")
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		update(item){

		},
		sendInfoXHR(url){
			this.$http.get(url).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.pages = res.data.pages
					this.page = res.data.current
					if((res.data.current+1) > res.data.pages){
						this.text="没有更多了"
						this.isNext = false
					}else{
						this.isNext = true
					}
					if(res.data.records){
						var data = res.data.records
						for(var i=0; i<data.length;i++){
							this.list.push(data[i])
						}
					}
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
	.sdeal{
		float: right;
		line-height: 30px;
		font-size:13px;
	}
	.sdeal>.sdel:hover{
		color:red;
		text-decoration: underline;
	}
	.sdeal>.supdate:hover{
		color:green;
		text-decoration: underline;
	}
</style>
