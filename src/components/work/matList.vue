<template>
<div class="boxmat">
  <div class="matbox">
    <div class="mattitle">
      <img src="../../../static/img/backB.png" class="matback" v-on:click="matback"> 选择物料
      <div class="close boxMatList" v-on:click="close">
        <img src="../../../static/img/close.png" class="closeIcon">
      </div>
    </div>
    <div class="matSearchB">
      <div class="searchBox boxMatSch" v-on:mouseout="hoveOut" v-on:mouseover="hoveIn">
        <input type="text" placeholder="请输入搜索内容" class="inputInfo" v-model="searChInfo">
        <img src="../../../static/img/schB.png" v-on:click="search" v-on:keyup.enter="search">
      </div>
    </div>
    <div class="matlistbox">
      <div class="onebox" v-if="searchHide">
        <ul>
          <li v-bind:class="{oneactive:type===index}" v-for="(item,index) in list" v-on:click="gettwo(index,item.oneId)">{{item.oneName}}</li>
        </ul>
      </div>
      <div class="twobox" v-if="searchHide">
        <ul>
          <li v-bind:class="{otheractive:twotype===index}" v-for="(item,index) in twolist" v-on:click="getthree(index,item.twoId)">{{item.twoName}}</li>
        </ul>
      </div>
      <div class="threebox">
        <ul>
          <li v-for="(item,index) in threelist" v-on:click="choose(index,item)">
            {{item.thrName}}
            <span class="matNum">({{item.thrNumber}})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      list: "",
      twolist: "",
      threelist: [],
      type: "",
      twotype: "",
      threetypt: "",
      listInfo: [],
      searChInfo: "",
      searchHide: true,
      text: '获取更多...',
      nextPage: "",
      page: 1
    }
  },
  props: ["flist"],
  mounted() {
    this.getone()
  },
  methods: {
    getone() {
      this.$http.post('/matter/select/only/', {
        type: "ONE"
      }, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 0) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
          this.$router.push("/login")
        }
      }, response => {
        this.$message.error("网络异常")
      })
    },
    gettwo(i, id) {
      this.type = i
      this.$http.post('/matter/select/only/', {
        type: 'TWO',
        matterId: id
      }, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 0) {
          this.twolist = res.data
          this.threelist = ""
          this.twotype = false
        } else {
          this.$message.error(res.msg)
          this.$router.push("/login")
        }
      }, response => {
        this.$message.error("网络异常")
      })
    },
    getthree(i, id) {
      this.twotype = i
      this.$http.post('/matter/select/only/', {
        type: 'THR',
        matterId: id
      }, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 0) {
          this.threelist = res.data
        } else {
          this.$message.error(res.msg)
          this.$router.push("/login")
        }
      }, response => {
        this.$message.error("网络异常")
      })
    },
    choose(i, item) {
        if(item.thrNumber == 0){
            this.$message.error("该物料已无库存")
        }else{
            this.threetypt = i
            var info = {
              "id": item.thrId,
              "name": item.thrName,
              "thrPrice": item.thrPrice,
              "number": 1,
              "amount": item.thrNumber,
              "price": isNaN(parseFloat(item.thrPrice)) ? '0.00' : parseFloat(item.thrPrice).toFixed(2)
            }
            if (this.flist !== "") {
              this.listInfo = this.flist
              var p = 0
              for (var i = 0; i < this.listInfo.length; i++) {
                if (this.listInfo[i].id === item.thrId) {
                  p++
                }
              }
              if (p > 0) {
                this.$message.error("所选物料重复")
              } else {
                this.listInfo.push(info)
              }
            } else {
              this.listInfo.push(info)
            }

            this.$emit("updetList", this.listInfo)
            this.$emit("close", false)
        }

    },
    close() {
      this.$emit("close", false)
    },
    hoveIn: function() {
      this.$el.querySelector(".inputInfo").style.width = 150 + 'px'
    },
    hoveOut: function() {
      if (this.searChInfo === '') {
        this.$el.querySelector(".inputInfo").style.width = 0 + 'px'
      }
    },
    search() {
      var sendInfo = {
        page: 1,
        pageSize: 6,
        thrName: this.searChInfo
      }
      if (this.searChInfo === '') {
        sendInfo["thrName"] = 'Null'
      }
      this.threelist = []
      this.searchHide = false
      this.getthreeList(sendInfo)
    },
    getthreeList(val) {
      this.$http.post('/matter/search/', val, {
        emulateJSON: true
      }).then(response => {
        var res = response.data
        if (res.code === 0) {
          this.nextPage = res.data.nextPage
          if (this.nextPage === 0) {
            this.text = "没有更多了"
          }
          if (res.data.list) {
            var data = res.data.list
            for (var i = 0; i < data.length; i++) {
              this.threelist.push(data[i])
            }
            this.page++
          }
        } else {
          this.$message.error(res.msg)
          this.$router.push("/login")
        }
      }, response => {
        this.$message.error("网络异常")
      })
    },
    getMore() {
      if (this.nextPage !== 0) {
        var sendInfo = {
          page: this.page,
          pageSize: 6,
          thrName: this.searChInfo
        }
        if (this.searChInfo = '') {
          sendInfo["thrName"] = 'Null'
        }
        this.getthreeList(sendInfo)
      }
    },
    matback() {
      this.list = []
      this.twolist = []
      this.threelist = []
      this.searchHide = true
      this.getone()
      this.searChInfo = ''
    }
  }
}
</script>

<style>
.boxmat {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, .6);
}

.boxmat .matbox {
  width: 506px;
  height: 466px;
  border-radius: 8px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -233px 0 0 -253px;
  border: 2px solid #d1dfd7;
}

.boxmat .matbox .mattitle {
  width: 100%;
  height: 42px;
  position: relative;
  line-height: 42px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid #d1dfd7;
}

.boxmat .matbox .mattitle .closeIcon {
  width: 13px;
  height: 13px;
  display: block;
  margin: 15px auto;
}

.matbox .matlistbox {
  width: 481px;
  height: 331px;
  padding: 15px 0 0 25px;
  display: flex;
  display: -webkit-flex;
}

.matlistbox .onebox,
.matlistbox .twobox,
.matlistbox .threebox {
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.matlistbox .onebox {
  width: 160px;
}

.matlistbox .onebox ul,
.matlistbox .twobox ul,
.matlistbox .threebox ul {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.matlistbox .onebox ul li,
.matlistbox .twobox ul li,
.matlistbox .threebox ul li {
  height: 35px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #8a8d8c;
  line-height: 35px;
  cursor: pointer;
}

.matlistbox .twobox ul li {
  border-left: 4px solid #fff;
  text-indent: 15px;
}

.matlistbox .onebox ul {
  width: 180px;
}

.matlistbox .onebox ul li {
  border-left: 4px solid #fff;
  text-indent: 15px;
}

.matlistbox .twobox {
  width: 140px;
}

.matlistbox .threebox {
  width: 130px;
}

.matlistbox .twobox ul {
  width: 160px;
}

.matlistbox .threebox ul {
  width: 150px;
}

.oneactive,
.otheractive {
  color: #308acb !important;
  border-left: 4px solid #308acb !important;
}

.mattitle .close {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  border-left: 1px solid #e6efef;
}

.matNum {
  margin-left: 7px;
  font-size: 12px;
}

.boxMatSch {
  position: absolute;
  right: 45px;
  top: 0;
  margin-right: 15px !important;
}

.matback {
  width: 9px;
  height: 16px;
  position: absolute;
  top: 13px;
  left: 16px;
  cursor: pointer;
}

.matSearchB {
  width: 100%;
  height: 24px;
  padding-top: 8px;
  background: #eeeeee;
  position: relative;
}
</style>
