<template>
	<div class="applyBox">
		<div class="applyItem">
			<img src="../../../../static/img/matApply.png">
			<input type="text" v-model="repInfo" placeholder="报修物品">
		</div>
		<div class="applyItem">
			<img src="../../../../static/img/beizhu.png" class="beizhu">
			<input type="text" v-model="beizhuInfo" placeholder="备注">
		</div>
		<div class="wbtn"> 
			<button class="wdeal" v-on:click="submit">申请</button>
		</div>
	</div>   
</template>

<script type="ecmascript-6">
import {getCookie} from '../../../../static/js/common.js'
export default{
	data(){
		return{
			repInfo:"",
			beizhuInfo:""
		}
	},
	methods:{
		submit(){
			var info = {}
			if(this.repInfo !== '' && this.repInfo.length <21){
				info["rerName"] = this.repInfo
				this.beizhuInfo === '' ? info["rerMemo"] = '' : info["rerMemo"] = this.beizhuInfo
				info["rerUser"] = getCookie("info").infoId
				this.sendInfo(info)
			}else{
				this.$message.error('请输入报修物品长度小于20个字符')
			}
		},
		sendInfo(info){
			this.$http.post("/realestate/manager/repair/selective/",info,{emulateJSON:true}).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else  if(res.code === 0){
					this.$message({
						message: res.msg,
						type: 'success'
					});
					this.$router.push("/App/work/appRepbox")
				}
			},response => {
				this.$message.error("网络异常")
			})
		}
	}
}
</script>
