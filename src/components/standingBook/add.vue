<template lang="html">
    <div class="sAdd">
        <div class="sbox">
            <div class="sitems">
                <div class="sinput">
                    <div class="sitem" v-for="(item,index) in list">
                        <el-input v-model="item.standLocationId" placeholder="请输入设施/设备ID"></el-input>
                        <el-input v-model="item.standInstallLocation" placeholder="安装地点（楼层/区域）"></el-input>
                        <el-input v-model="item.standBelong" placeholder="设施/设备归属"></el-input>
                        <el-input v-model="item.standLastInstallTime" placeholder="安装/启用日期"></el-input>
                        <!-- <el-input v-model="item.standUserId" placeholder="责任人"></el-input>
                        <el-select placeholder="请选择责任人" v-model="item.standUserId">
                            <el-option
                              v-for="it in userList"
                              :value="it.actId"
                              :label="it.userInfo.name"
                              >
                            </el-option>
                         </el-select> -->
                        <div class="smatterBox">
                            <chooseMatter :oneList="onelist" :index='index' @getBackInfo="getBackInfo"></chooseMatter>
                        </div>
                    </div>
                </div>
                <div class="sadd">
                    <i class="el-icon-plus" @click="add"></i>
                </div>
            </div>
            <div class="sbtn">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import chooseMatter from './list/chooseMatter.vue'
export default {
    data(){
        return {
            list:[{standLocationId:'',standUserId:'',standLastInstallTime:'',standBelong:'',standLocationId:'',standInstallLocation:'',standMatterThreeId:''}],
            onelist:[],
            userList:[]
        }
    },
    components:{chooseMatter},
    mounted(){
        this.getOneList()
        // this.getUerList()
    },
    methods:{
        add(){
            this.list.push({id:'',standUserId:'',standLastInstallTime:'',standBelong:'',standLocationId:'',standInstallLocation:'',matterId:'',oneList:this.onelist,twoList:[],threeList:[],oneName:'',twoName:''})
        },
        check(){
            this.resulte = []
            for(var i = 0; i < this.list.length; i++){
                if(this.list[i].id == '' || this.list[i].matterId == ''){
                    return false
                }
            }
            return true
        },
        submit(){
            if(this.check()){
                this.$http.put('/standbook',this.resulte).then(response => {
    				var res = response.data
    				if(res.code === 400 || res.code === 401){
    					this.$message.error(res.msg)
    					this.$router.push("/login")
    				}else if(res.code === 0){
    					this.$message.success("添加成功")
                        this.$route.push('/App/book/info')
    				}else{
    					this.$message.error(res.msg)
    				}
    			},response => {
    				this.$message.error('网络异常')
    			})
            }else{
                this.$message.error("请输入完整");
            }
        },
        getUerList(){
            this.$http.post('/useraccount/manager/userinfo/get/',{pageSize:16,page:this.page},{emulateJSON:true}).then(response => {
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
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
        },
        getBackInfo(msg){
            this.list[msg.index].standMatterThreeId = msg.threeId.thrId
        },
        getOneList(){
            this.$http.post('/matter/select/only/', {
              type: "ONE"
            }, {
              emulateJSON: true
            }).then(response => {
              var res = response.data
              if (res.code === 0) {
                this.onelist = res.data
              } else {
                this.$message.error(res.msg)
              }
            }, response => {
              this.$message.error("网络异常")
            })
        }
    }
}
</script>

<style lang="css">
.sAdd{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
}
.sAdd>.sbox{
    width: 500px;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0 auto;
    font-size: 0;
}
.sAdd>.sbox>.sitems{
    position: relative;
}
.sAdd>.sbox>.sitems>.sinput{
    display: inline-block;
    vertical-align: top;
    width: 450px;
    box-sizing: border-box;
}
.sAdd>.sbox>.sitems>.sinput>.sitem{
    width: 100%;
    border:1px solid #eee;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;
    margin-bottom: 10px;
}
.sAdd>.sbox>.sitems>.sinput>.sitem>.el-input{
    margin-bottom: 4px;
}
.sAdd>.sbox>.sitems>.sadd{
    height: 40px;
    width: 50px;
    position: absolute;
    bottom: 30px;
    right: 0;
    box-sizing: border-box;
}
.sAdd>.sbox>.sitems>.sadd>i{
    cursor: pointer;
    font-size: 18px;
    line-height: 40px;
    margin-left: 20px;
    user-select: none;
    color:#dcdfe6;
}
.sAdd>.sbox>.sitems>.sadd>i:hover{
    color:#409EFF;
}

.sAdd>.sbox>.sbtn{
    width: 100%;
    text-align: right;
}
.sAdd>.sbox>.sbtn>button{
    margin-right: 50px;
    margin-top: 10px;
    padding: 9px 20px !important;
}
</style>
