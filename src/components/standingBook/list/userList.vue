<template lang="html">
    <el-select v-model="value" placeholder="请选择" @change="choose">
      <el-option
        v-for="item in list"
        :key="item.userName"
        :label="item.userName"
        :value="item.actId">
      </el-option>
    </el-select>
</template>

<script>
export default {
    data(){
        return {
            list:[],
            value:''
        }
    },
    mounted(){
        this.list = [
            {
                userName:'张三',
                actId:'1'
            },
            {
                userName:'张一',
                actId:'2'
            },
            {
                userName:'张四',
                actId:'3'
            }
        ]
        // this.$http.post('/admin/get/',{pageSize:10,page:10000,userType:1}).then(response => {
        //     var res = response.data
        //     if(res.code === 400 || res.code === 401){
        //         this.$message.error(res.msg)
        //         this.$router.push("/login")
        //     }else if(res.code === 0){
        //         this.list = res.data.list
        //     }else{
        //         this.$message.error(res.msg)
        //     }
        // },response => {
        //     this.$message.error('网络异常')
        // })
    },
    methods:{
        choose(id){
            console.log(id)
            console.log(this.value)
        }
    }
}
</script>

<style lang="css">
</style>
