<template lang="html">
    <div id="list" class="clearfix">
        <div class="item" v-for="item in list">
            <div class="icons">
                <i class="icon icon-weixiuguanli" :class="{cGreen:info.rerStatus!=6,cGray:info.rerStatus==6}"></i>
            </div>
            <div class="title">你好</div>
            <div class="stern">
                <span :class="{cGray:status==6}">(已完成)</span>
                <span>2017-12-13</span>
            </div>
        </div>
        <div class="more getMore" v-if='info.nextPage' @click="getMore">获取更多...</div>
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
    props:["info"],                     // info:{list:[],nextPage,type}
    methods:{
        getMore(){

        }
    }
}
</script>

<style lang="css" scoped>
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
#list>.item>.icons{
    height: 100%;
    float: left;
    margin:0 15px 0 5px;
}
#list>.item>.icons>i{
    font-style: normal;
    font-size:28px;
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
