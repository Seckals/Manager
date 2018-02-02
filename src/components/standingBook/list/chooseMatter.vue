<template lang="html">
    <div class="chooseMatter">
        <el-select placeholder="请选择一级物料" @change='getTwoList' v-model="oneId" size='small'>
                <el-option
                  v-for="item in oneList"
                  :value="item.oneId"
                  :label="item.oneName"
                  >
                </el-option>
         </el-select>
         <el-select placeholder="请选择二级物料" @change='getThreeList' v-model="twoId" size='small'>
                 <el-option
                   v-for="item in twoList"
                   :value="item.twoId"
                   :label="item.twoName"
                   >
                 </el-option>
          </el-select>
          <el-select @change="choose" value-key="thrName" placeholder="请选择三级物料" v-model="thrId" size='small'>
                  <el-option
                    v-for="item in threeList"
                    :value="item"
                    :label="item.thrName"
                    :key="item.thrName"
                    >
                  </el-option>
           </el-select>
    </div>
</template>

<script>
export default {
    data(){
        return {
            oneId:'',
            twoId:'',
            thrId:'',
            twoList:[],
            threeList:[]
        }
    },
    props:['oneList','index'],
    methods:{
        getTwoList(id){
            this.twoList = []
            this.threeList = []
            this.twoId = ''
            this.thrId = ''
            this.$http.post('/matter/select/only/', {
              type: 'TWO',
              matterId: id
            }, {
              emulateJSON: true
            }).then(response => {
              var res = response.data
              if (res.code === 0) {
                this.twoList = res.data
              } else {
                this.$message.error(res.msg)
              }
            }, response => {
              this.$message.error("网络异常")
            })
        },
        getThreeList(id){
            this.threeList = []
            this.thrId = ''
            this.$http.post('/matter/select/only/', {
              type: 'THR',
              matterId: id
            }, {
              emulateJSON: true
            }).then(response => {
              var res = response.data
              if (res.code === 0) {
                this.threeList = res.data
              } else {
                this.$message.error(res.msg)
              }
            }, response => {
              this.$message.error("网络异常")
            })
        },
        choose(id){
            this.$emit("getBackInfo",{index:this.index,threeId:id})
        }
    }
}
</script>

<style lang="css">
.chooseMatter{
    width: 100% !important;
    display: flex;
    justify-content: space-between;
}
.chooseMatter>.el-select{
    width: 33%;
}
</style>
