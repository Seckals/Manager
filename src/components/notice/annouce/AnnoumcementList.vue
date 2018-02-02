<template>
	<div class="ntbox">
		<div class="ntboxinfo" v-show="list.length !== 0">
			<div class="nlist" v-bind:class="{nActive:isHover === index}" v-on:mouseover="hoverIn(index)" v-on:mouseout="hoverOut" v-for="(item,index) in list">
				<router-link :to="{ path: 'annoumcementInfo', query: { id: item.antId}}" tag="div">
					<img src="../../../../static/img/notice.png">
					<div class="ninfo">
						<div class="nname">{{item.antTitle}}</div>
						<div class="nlittleinfo">{{item.antMsg}}</div>
					</div>
					<span class="ntime">{{item.createTime | split}}</span>
				</router-link>
			</div>
			<div class="getMore" v-on:click='getMore' v-show="list.length>=14">{{text}}</div>
		</div>
		<div class="ntboxinfo ntcss" v-show="list.length === 0">
			没有任何公告
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
			this.$http.get('/manager/announcement/?sqlDomain.order=create_time&sqlDomain.sort=DESC&page='+this.page+'&pageSize=14').then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.nextPage = res.data.nextPage
					if(res.data.nextPage === 0){
						this.text="没有更多了"
					}
					if(res.data.list){
						var data = res.data.list
						for(var i=0; i<data.length;i++){
							this.list.push(data[i])
						}
						this.page++
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
