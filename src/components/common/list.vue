<template lang="html">
    <div id="list" class="clearfix">
        <div class="item" v-for="item in list">
            <i class="icon icon-weixiuguanli"></i>
            <div class="title">你好</div>
            <div class="stern">
                <span :class="{colorG:status==6}">(已完成)</span>
                <span>2017-12-13</span>
            </div>
        </div>
        <div class="more getMore" v-if='' @click="getMore">获取更多...</div>
        <div class="more noMore" v-if=''>没有更多了...</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list: 5,
            status:6
        }
    },
    props:["info"],                     // info:{list:[],nextPage}
    methods:{
        getMore(){

        }
    }
}
</script>

<style lang="css">
#list{
    width: 100%;
    height: 100%;
}
#list>.item{
    width: 100%;
    height: 55px;
    line-height: 55px;
    cursor: pointer;
    border-bottom:1px solid #e0e2e0;
}
#list>.item:hover{
    background: #e1e0e0;
}
#list>.item>i{
    font-style: normal;
    float: left;
    color:rgb(142,195,31);
    font-size:28px;
    margin:0 15px 0 5px;
}
#list>.item>.title{
    float: left;
    font-size: 14px;
}
#list>.item>.stern{
    float: right;
    height: 100%;
    vertical-align: middle;
    margin-right: 15px;
    line-height: normal;
}
#list>.item>.stern>span{
    display: block;
    font-size:12px;
    width: 100%;
    text-align: center;
}
#list>.item>.stern>span:first-child{
    line-height: 20px;
    padding-top:10px;
}
.more{
    width: 100%;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    color: #9b9b9b;
    cursor: pointer;
}
</style>
