<template>
	<div class="hdlist">
		<div class="hdlistHeader">
			<div class="searchBox searchList" v-on:mouseout="hoveOut" v-on:mouseover="hoveIn">
				<input type="text" placeholder="请输入搜索内容" class="inputInfo" v-model="searChInfo">
				<img src="../../../../../static/img/schB.png" v-on:click="search" v-on:keyup.13="search">
			</div>
		</div>
		<div class="hdListBox">
			<div class="wItem" v-bind:class="{wActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
				<router-link	 :to="{ path: '/App/work/wdealbox/wrepinfo', query: { id: item.rerId }}" tag="div" :class="{ gary: item.rerStatus == '3'}">
					<div class="wIcon">
						<img src="../../../../../static/img/repIconG.png" v-if="item.rerStatus==3">
						<img src="../../../../../static/img/rep.png" v-if="item.rerStatus!=3">
					</div>
					<div class="wInfo">
						<div class="wName">{{item.rerName}}</div>
					</div>
					<div class="wTime">
						<span class="wstatus gary">
							({{item.rerStatus | status}})
						</span>
						{{item.createTime | split}}
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
			itemInfo:"",
			page:1,
			nextPage:'',
			searChInfo:"",
			text:'获取更多...'
		}
	},
	mounted:function(){
		this.getList()
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
		getList:function(){
			var url = '/realestate/manager/repair/processed'
			var info = {
				"domianUtil": {
					"pageUtil": {
						"page": this.page,
						"pageSize": 13
					}
				},
				"rerStatus":6
			}
			this.sendInfoXHR(url,info)
		},
		getSearchList:function(){
			var info = {
				page:this.page,
				pageSize:13,
				rerStatus:'6,3'
			}
			if(this.searChInfo != ''){
				info["message"] = this.searChInfo.replace(/(^\s*)|(\s*$)/g,'')
			}
			var url = '/realestate/manager/repair/search/'
			this.sendSearchXHR(url,info)
		},
		search:function(){
			this.list = []
			this.page=1
			this.getSearchList()
		},
		getMore(){
			if(this.nextPage !== 0){
				if(this.searChInfo !== ''){
					this.getSearchList(this.searChInfo)
				}else{
					this.getList()
				}
			}
		},
		sendInfoXHR(url,info){
			var _this = this
			this.$http.post(url,info).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					_this.nextPage = res.data.nextPage
					if(_this.nextPage === 0){
						_this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							_this.list.push(data[i])
						}
						_this.page++
					}
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		sendSearchXHR(url,info){
			var _this = this
			this.$http.post(url,info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					_this.nextPage = res.data.nextPage
					if(_this.nextPage === 0){
						_this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							_this.list.push(data[i])
						}
						_this.page++
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
