<template>
	<div class="winfo">
		<div class="wtitle">台账详情</div>
		<div class="witem">
			<div class="wname">设备ID</div>
			<div class="wval">{{info.standLocationId}}</div>
		</div>
		<div class="" v-if="info.matthree">
			<div class="witem">
				<div class="wname">设备名称</div>
				<div class="wval">{{info.matthree.thrName}}</div>
			</div>
			<div class="witem">
				<div class="wname">规格/型号</div>
				<div class="wval">{{info.matthree.thrNorms}}</div>
			</div>
			<div class="witem">
				<div class="wname">生产厂家</div>
				<div class="wval">{{info.thrPurchaseLocation}}</div>
			</div>
		</div>
		<div class="witem" v-if='!info.matthree'>
			<div class="wname">选择物料</div>
			<div class="wval w430" v-if="!info.standInstallLocation">
				<div class="wupdate">
					<chooseMatter :oneList="onelist" :index='0' @getBackInfo="getBackInfo"></chooseMatter>
					<div>
						<el-button type="primary" size='small' @click="chooseMatter">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="witem">
			<div class="wname">安装地点（楼层/区域）</div>
			<div class="wval" v-if="info.standInstallLocation">{{info.standInstallLocation}}</div>
			<div class="wval w430" v-if="!info.standInstallLocation">
				<div class="wupdate">
					<el-input placeholder="请输入安装地点（楼层/区域）" size='small'  v-model="info.standInstallLocation"></el-input>
					<div>
						<el-button type="primary" size='small' @click="updateOther('standInstallLocation',info.standInstallLocation)">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="witem">
			<div class="wname">设施/设备归属</div>
			<div class="wval" v-if="info.standBelong">{{info.standBelong}}</div>
			<div class="wval w430" v-if="!info.standBelong">
				<div class="wupdate">
					<el-input placeholder="请输入设施/设备归属" size='small'  v-model="info.standBelong"></el-input>
					<div>
						<el-button type="primary" size='small' @click="updateOther('standBelong',info.standBelong)">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="witem">
			<div class="wname">安装/启用日期</div>
			<div class="wval" v-if="info.standLastInstallTime">{{info.standLastInstallTime}}</div>
			<div class="wval w430" v-if="!info.standLastInstallTime">
				<div class="wupdate">
					<el-input placeholder="请输入安装/启用日期" size='small'  v-model="info.standLastInstallTime"></el-input>
					<div>
						<el-button type="primary" size='small' @click="updateOther('standLastInstallTime',info.standLastInstallTime)">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="witem">
			<div class="wname">责任人</div>
			<div class="wval" v-if="info.standUserId">{{info.standUserId}}</div>
			<div class="wval w430" v-if="!info.standUserId">
				<div class="wupdate">
					<userlist @getId="getId"></userlist>
					<!-- <el-input placeholder="请输入内容" size='small'  v-model="info.standUserId"></el-input> -->
					<div>
						<el-button type="primary" size='small' @click="updateOther('standUserId',info.standUserId)">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="wbeizhu">
			<div class="wname">备注</div>
			<div class="wbeizhuinfo">{{info.rerMemo | emptyInfo}}</div>
		</div>
		<div class="witem">
			<div class="wname">维护记录</div>
			<div class="wval wValRed">></div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import chooseMatter from './chooseMatter.vue'
import userlist from './userList.vue'
export default{
	data(){
		return{
			info:"",
			onelist:[],
			three:''
		}
	},
	mounted(){
		this.getInfo(this.$route.query.id)
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
	},
	components:{chooseMatter,userlist},
	methods:{
		getInfo(id){
			this.$http.get('/standbook/'+id).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.info = res.data
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		chooseMatter(){
			var _this = this
			if(this.three !=''){
				this.update({standMatterThreeId:this.three.thrId},function(){
					_this.info.matthree = _this.three
				})
			}
		},
		updateOther(key,value){
			var _this = this
			if(value !=''){
				this.update({key:value},function(){
					_this.info[key] = value
				})
			}
		},
		getBackInfo(msg){
			this.three = msg.threeId
		},
		update(info,fn){
			this.$http.post('/standbook/'+this.$route.query.id,info).then(response => {
				var res = response.data
				if(res.code === 400 || res.code === 401){
					this.$message.error(res.msg)
					this.$router.push("/login")
				}else if(res.code === 0){
					this.$message.success("添加成功")
					fn()
				}else{
					this.$message.error(res.msg)
				}
			},response => {
				this.$message.error('网络异常')
			})
		},
		getId(msg){
			this.info.standUserId = msg
		}
	}
}
</script>
<style>
	.witem>.matterType{
		display: inline-block;
		vertical-align: top;
		margin-left: 21px;
		width: 500px !important;
	}
	.witem>.matterType>.chooseMatter>.el-select{

	}
	.witem>.submitChooseMatter{
		margin-left: 21px;
	}
	.wupdate{
		display: flex;
	}
	.wupdate>div{
		margin-right: 10px;
	}
	.wupdate>.el-select{
		width: 100%;
	}
	.w430{
		width: 430px !important;
	}
</style>
