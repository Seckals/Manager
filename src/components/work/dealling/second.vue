<template>
	<div class="dealList h745">
		<div class="wItem" v-bind:class="{wActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
			<router-link	 :to="{ path: '/App/work/dealBox/dealinfo', query: { id: item.rerId,type:item. rerStatus }}" tag="div">
				<div class="wIcon"><img src="../../../../static/img/rep.png"></div>
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
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data:function(){
		return{
			isHover:"",
			list:[],
			page:1,
			nextPage:'',
			text:'获取更多...',
			status:'all',
			titleText:"我的申请"
		}
	},
	mounted:function(){
		var info = {
			"domianUtil": {
				"pageUtil": {
					"page": 1,
					"pageSize": 13
				}
			},
			"rerStatus":2,
			"rerAcceptUser":getCookie("info").infoId
		}
		this.getList(info)
	},
	filters:{
		status:function(val){
			var word = ['未处理','已接单','已报价','已关闭','用户已确认','维修中','已处理']
			return word[val]
		},
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
		getList:function(info){
			var _this = this
			this.$http.post('/realestate/manager/repair/processeding',info).then(response => {	
				var res = response.data
				if(res.code === 0){
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
				}else{
					this.$message.error(res.msg)
					this.$router.push("/login")
				}
				
			},response => {
				this.$message.error('网络异常')
			})
		},
		getMore(){
			if(this.nextPage !== 0){
				if(this.status === 'all'){
					var info = {
						"domianUtil": {
							"pageUtil": {
								"page": this.page,
								"pageSize": 13
							}
						},
						"rerStatus":2,
						"rerAcceptUser":getCookie("info").infoId
					}
					this.getList(info)
				}else{
					this.getMyList()
				}				
			}
		},
		toggle(){
			this.list=[]
			if(this.status === 'all'){
				this.status = 'self'
				this.titleText = "全部"
				var info = {rerStatus:0,page:1,pageSize:13,rerUser:getCookie("info").infoId}
				this.getList(info)
			}else{
				this.status = 'all'
				this.titleText = "我的申请"
				var info = {rerStatus:0,page:1,pageSize:13}
				this.getList(info)
			}
		},
		getMyList(){
			var info = {rerStatus:0,page:this.page,pageSize:13,relUserId:getCookie("info").infoId}
			this.getList(info)
		}
	}
}
</script>
