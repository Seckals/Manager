<template>
<div class="cont">
  <div class="matListInfoBox">
    <div class="matListBox">
      <div class="matHeader">
        <div class="matTabA clearfix borderBottom">
          <div class="matTabLabel">一级分类:</div>
          <ul class="tablist clearfix">
            <li :class="{liActive:oneState===index}" v-for="(item,index) in oneList" v-on:click="clickOne(item.oneId,index)">{{item.oneName}}</li>
          </ul>
        </div>
        <div class="matTabA clearfix">
          <div class="matTabLabel">二级分类:</div>
          <ul class="tablist clearfix" v-if="twoList">
            <li :class="{liActive:twoState===index}" v-for="(item,index) in twoList" v-on:click="clickTwo(item.twoId,index,item.onePid)">{{item.twoName}}</li>
          </ul>
        </div>
      </div>
      <section class="matSearchBox">
        <div class="inputbox">
          <input type="text" placeholder="请输入搜索内容" v-model="searchInfo">
          <img src="../../../../static/img/schG.png" v-on:click="search">
        </div>
        <a href="/matter/listToExcel/">导出excel</a>
      </section>
      <section id="matList">
        <ul>
          <li class="clearfix">
            <div class="thlab number">序号</div>
            <div class="thlab name">物料名</div>
            <div class="thlab num">在库数量</div>
            <div class="thlab pro">规格</div>
            <div class="thlab price">进货单价/元</div>
            <div class="thlab allprice">总价/元</div>
            <div class="thlab do">操作</div>
          </li>
          <li class="clearfix item" v-for="(item,index) in threeList">
            <div class="lab number">{{index-9+pageNum*10}}</div>
            <div class="lab name">{{item.thrName}}</div>
            <div class="lab num">{{item.thrNumber}}</div>
            <div class="lab pro">{{item.thrNorms}}</div>
            <div class="lab price">{{item.thrPrice}}</div>
            <div class="lab allprice">{{item.thrTotalPrice}}</div>
            <div class="lab do">
              <a class="edit" v-on:click="matEdite(item,index)">编辑</a>
              <a class="delete" v-on:click="matDelete(item.thrId)">删除</a>
            </div>
          </li>
        </ul>
      </section>
      <el-pagination layout="prev, pager, next" :total="totalNumber" @current-change="changePage" v-if="totalNumber > 10"></el-pagination>
    </div>
  </div>
  <matEditor v-bind:matInf="matInfo" v-show="isShow" v-on:close="close" v-on:getBackInfo="getBackInfo"></matEditor>
</div>
</template>

<script type="ecmascript-6">
import {
  getCookie
} from '../../../../static/js/common.js'
import matEditor from './matEditor'
export default {
  data: function() {
    return {
      oneList: '', // 一级物料列表
      twoList: '', // 二级物料列表
      threeList: '', // 三级物料列表
      oneState: 0, // 一级选中状态
      twoState: '', // 二级选中状态
      twoCurrentID: '', // 二级选中物料
      totalNumber: '', // 当前一，二级状态下三级物料总数
      oneIdList: [], // 一级物料ID列表
      twoIdList: [], // 二级物料ID列表
      matInfo: '', // 物料详情
      isShow: false, // 是否显示
      searchInfo: '', // 搜索内容
      pageNum: 1, // 当前页数

    }
  },
  mounted: function() {
    this.getOneList()
  },
  components: {
    matEditor
  },
  methods: {
    clickOne(id, index) {
      this.oneState = index
      this.getTwoList(id)
      this.searchInfo = ''
    },
    clickTwo(id, index, oneId) {
      this.searchInfo = ''
      this.getTwoList(oneId, id)
      this.locateOne(oneId)
    },
    locateOne(id) {
      for (var i = 0; i < this.oneList.length; i++) {
        if (this.oneList[i].oneId == id) {
          this.oneState = i
        }
      }
    },
    // 编辑物料
    matEdite: function(val, index) {
      this.matInfo = {
        matInfo: val,
        index: index
      }
      this.isShow = true
    },
    matDelete: function(id) {
      var user = getCookie('info').infoId
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this.$http.delete('/matter/thr/' + id + '/' + user, {
          emulateJSON: true
        }).then(response => {
          var res = response.data
          if (res.code === 400 || res.code === 401) {
            this.$message.error(res.msg)
            this.$router.push("/login")
          } else if (res.code === 0) {
            this.getThreeList(this.twoCurrentID, this.pageNum)
          } else {
            this.$message.error(res.msg)
          }
        }, response => {
          this.$message.error('网络异常')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getBackInfo: function(msg) {
      if (msg) {
        this.threeList[msg.index] = msg.info
      }
    },
    close: function(msg) {
      this.isShow = msg
    },
    // 分页
    changePage: function(val) {
      this.pageNum = val
      if (this.searchInfo === '') {
        this.getThreeList(this.twoCurrentID, val)
      } else {
        var info = {
          thrName: this.searchInfo,
          page: val,
          pageSize: 10
        }
        if (this.twoCurrentID == 'ALL') {
          info['twoPidList'] = this.twoIdList.join(',')
        } else {
          info['twoPidList'] = this.twoCurrentID
        }
        this.$http.post('/matter/search/', info, {
          emulateJSON: true
        }).then(response => {
          var res = response.data
          if (res.code === 400 || res.code === 401) {
            this.$message.error(res.msg)
            this.$router.push("/login")
          } else if (res.code === 0) {
            this.threeList = res.data.list
          }
        }, response => {
          this.$message.error("网络异常")
        })
      }
    },
    // 搜索
    search: function() {
      var info = {
        thrName: this.searchInfo,
        page: 1,
        pageSize: 10
      }
      if (this.twoCurrentID == 'ALL') {
        info['twoPidList'] = this.twoIdList.join(',')
      } else {
        info['twoPidList'] = this.twoCurrentID
      }
      this.$http.post('/matter/search/', info, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 400 || res.code === 401) {
          this.$message.error(res.msg)
          this.$router.push("/login")
        } else if (res.code === 0) {
          this.threeList = res.data.list
          this.totalNumber = res.data.total
        }
      }, response => {
        this.$message.error("网络异常")

      })
    },
    // 获取内容
    getOneList() {
      this.$http.post('/matter/selective/', {
        type: 'ONE'
      }, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 400 || res.code === 401) {
          this.$message.error(res.msg)
          this.$router.push("/login")
        } else if (res.code === 0) {
          this.oneList = res.data.list
          this.oneList.unshift({
            oneId: "ALL",
            oneName: "全部"
          })
          for (var i = 0; i < res.data.list.length; i++) {
            this.oneIdList.push(res.data.list[i].oneId)
          }
          this.getTwoList("ALL")
        } else {
          this.$message.error(res.msg)
        }
      }, response => {
        this.$message.error('网络异常')
      })
    },
    getTwoList(id, twoid) {
      var info = {
        type: 'TWO'
      }
      var allItem = {}
      var twoId = twoid || 'ALL'
      if (id === 'ALL') {
        info["idList"] = this.oneIdList.join(",")
        allItem = {
          onePid: "ALL",
          twoId: "ALL",
          twoName: "全部"
        }
      } else {
        info["idList"] = id
        allItem = {
          onePid: id,
          twoId: "ALL",
          twoName: "全部"
        }
      }
      this.$http.post('/matter/selective/', info, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 400 || res.code === 401) {
          this.$message.error(res.msg)
          this.$router.push("/login")
        } else if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.twoCurrentID = twoId
            this.twoIdList = []
            this.twoList = res.data.list
            this.twoList.unshift(allItem)

            for (var i = 0; i < this.twoList.length; i++) {
              this.twoIdList.push(this.twoList[i].twoId)
              if (this.twoList[i].twoId == twoId) {
                this.twoState = i
              }
            }
            this.twoIdList.shift()
            this.getThreeList(twoId, 1)
          } else {
            this.twoList = []
            this.twoIdList = []
            this.threeList = []
          }
        } else {
          this.threeList = []
        }
      }, response => {
        this.$message.error('网络异常')
      })
    },
    getThreeList(id, page) {
      if (page == 1) this.pageNum = 1
      var info = {
        type: 'THR',
        page: page,
        pageSize: 10
      }
      if (id === 'ALL') {
        info["idList"] = this.twoIdList.join(",")
      } else {
        info["idList"] = id
      }
      this.$http.post('/matter/selective/', info, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 400 || res.code === 401) {
          this.$message.error(res.msg)
          this.$router.push("/login")
        } else if (res.code === 0) {
          this.threeList = res.data.list
          this.totalNumber = res.data.total
        }
      }, response => {
        this.$message.error('网络异常')
      })
    }
  }
}
</script>

<style>
.editor {
  width: 64px;
  height: 25px;
  color: #fff;
  font-size: 12px;
  margin-left: 25px;
  cursor: pointer;
  background: #0168b5;
  border-radius: 12px;
}

.matListBox {
  height: 790px;
  width: 882px;
  font-size: 15px;
  overflow-x: hidden;
  overflow-y: auto;
}

.matTabLabel,
.tablist {
  float: left;
}

.matTabLabel {
  width: 90px;
  border-left: 3px solid #0168b5;
  text-indent: 15px;
  font-size: 14px;
  color: #000;
  padding: 9px 10px;
  font-weight: 600;
}

.tablist {
  width: 745px;
  min-height: 34px;
}

.tablist>li {
  font-size: 14px;
  color: #747474;
  cursor: pointer;
  padding: 9px 10px;
  margin-right: 23px;
  float: left;
  margin-bottom: 10px;
}

.liActive {
  background: #393d47;
  color: #fff !important;
}

.borderBottom {
  border-bottom: 1px solid #e5e5e5;
}

.matTabA {
  width: 100%;
  padding: 20px 0 10px;
}

.matHeader {
  width: 858px;
}

.matListInfoBox {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0 12px;
  box-sizing: border-box;
  overflow: hidden;
}

.matSearchBox {
  position: relative;
  width: 858px;
  height: 45px;
  background: #f3f3f3;
  padding-top: 16px;
  margin-bottom: 12px;
}

.inputbox {
  width: 440px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  background: #fff;
  position: relative;
}

.inputbox>input {
  height: 100%;
  width: 400px;
  margin-left: 10px;
  font-size: 14px;
}

.inputbox>img {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 4px;
  cursor: pointer;
  display: block;
}

.matSearchBox>a {
  width: 72px;
  height: 30px;
  border-radius: 7px;
  background: #308acb;
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 16px;
  right: 36px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
}

#matList ul>li {
  width: 858px;
  height: 38px;
  box-sizing: border-box;
}

#matList ul>li .thlab {
  box-sizing: border-box;
  padding: 0 5px;
  background: #eff1f7;
  float: left;
  height: 100%;
  font-size: 14px;
  text-align: center;
  line-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#matList ul>li .lab {
  box-sizing: border-box;
  padding: 0 5px;
  float: left;
  height: 100%;
  font-size: 14px;
  text-align: center;
  line-height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-right: 1px solid #e9eef3;
}

#matList ul>.item {
  border-bottom: 1px solid #e9eef3;
}

#matList ul>li .number {
  width: 50px;
}

#matList ul>li .name {
  width: 145px;
}

#matList ul>.item .number {
  border-left: 1px solid #e9eef3;
}

#matList ul>li .num {
  width: 120px;
}

#matList ul>li .pro {
  width: 150px;
}

#matList ul>li .price {
  width: 130px;
}

#matList ul>li .allprice {
  width: 128px;
}

#matList ul>li .do {
  width: 135px;
}

.do {
  text-align: center;
  line-height: 38px;
}

.lab>a:hover {
  text-decoration: underline;
}

.lab>.edit {
  font-size: 14px;
  color: #0168b5;
  cursor: pointer;
}

.lab>.delete {
  font-size: 14px;
  color: #d4122e;
  cursor: pointer;
  margin-left: 21px;
}

.el-pagination {
  text-align: center;
  margin-top: 10px;
}

.el-pager li.active {
  border-color: #308acb !important;
  background-color: #308acb !important;
  color: #ffffff !important;
}
</style>
