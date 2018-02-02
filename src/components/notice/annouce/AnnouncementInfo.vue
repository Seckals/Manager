<template>
	<div class="nbox">
		<div class="ninfobox">
			<div class="ncontentbox noBorder">
				<div class="ncontent">
					<div class="nhead">
						<h2>{{info.antTitle}}</h2>
						<span>{{info.createTime}}</span>
					</div>
					<div class="nbody">
						{{info.antMsg}}
					</div>
					<div class="nImg" v-if="url">
						<img :src="'/img/'+url">
					</div>
				</div>
			</div>
			<div class="delbtn">
				<button class="mudelect" @click='del'>删除公告</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
export default{
	data(){
		return{
			info:"",
			url:''
		}
	},
	mounted:function(){
		this.$http.get("/manager/announcement/"+this.$route.query.id).then(response => {
			var res = response.data
			if(res.code === 400 || res.code === 401){
				this.$message.error(res.msg)
				this.$router.push("/login")
			}else if(res.code === 0){
				this.info = res.data
				this.url = res.data.antImg
			}else{
				this.$message.error(res.msg)
			}
		},response => {
			this.$message.error('网络异常')
		})
	},
	methods:{
		del(){
			this.$http.delete("/manager/announcement/"+this.$route.query.id).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success("删除成功")
					this.$router.push("/App/notice/annouceBox")
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
