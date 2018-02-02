<template>
	<div class="printContainer">
		<div class="printContent">
			<div class="printHeader">打印</div>
			<div class="printInfo">
				<div class="printList">
					<table border='0' cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<td>人工费</td>
								<td>￥{{Pinfo.laborCost}}</td>
								<td>其他费用</td>
								<td class="noBorderR">￥{{Pinfo.otherCost}}</td>
							</tr>
							<tr>
								<td>备注</td>
								<td colspan="3" class="noBorderR">{{Pinfo.mark}}</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>物料费用</td>
								<td colspan="3">
									<span v-if="!Pinfo.matList">￥0</span>
									<table v-if="Pinfo.matList">
										<tr>
											<td>物料名</td>
											<td>数量</td>
											<td>单价</td>
											<td class="noBorderR">总价</td>
										</tr>
										<tr v-for="item in Pinfo.matList">
											<td>{{item.name}}</td>
											<td>{{item.number}}</td>
											<td>￥{{item.thrPrice}}</td>
											<td class="noBorderR">￥{{item.number * item.thrPrice}}</td>
										</tr>
										<tr class="noBorderB">
											<td >总价</td>
											<td class="noBorderB noBorderR" colspan="3">￥{{Pinfo.matCost}}</td>
										</tr>
									</table>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td>总价</td>
								<td colspan="3" class="noBorderR">￥{{Pinfo.allCost}}</td>
							</tr>
						</tfoot>
					</table>
					<div class="writeNameBox">
						<div>
							<span class="writeLabel">甲方</span>
							<span class="writeInfo"></span>
						</div>
						<div>
							<span class="writeLabel">乙方</span>
							<span class="writeInfo"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="printBtns">
				<button v-on:click="print">确认打印</button>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import $ from 'jquery'
export default{
	data:function(){
		return{
		}
	},
	props:["Pinfo"],
	methods:{
		print:function(){
			var _this = this
			$(".printInfo").print({
				globalStyles: true,
				mediaPrint: false,
				stylesheet: null,
				noPrintSelector: ".no-print",
				iframe: true,
				append: null,
				prepend: null,
				manuallyCopyFormValues: true,
				deferred: $.Deferred().done(_this.success),
				timeout: 750,
				title: null,
				doctype: '<!doctype html>'
			})
		},
		success:function(e){
			if(this.Pinfo.where == 'work'){
				this.$router.push({path:"/App/work/wdealbox/wreplist"})
			}else{
				this.$router.push({path:"/App/me/dealbox/replist"})
			}
		}	
	}
}
</script>

<style>	
.printContainer{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
	position: fixed;
	top:0;
	left: 0;
}
.printContent{
	width: 625px;
	height: 740px;
	background: #f3f3f3;
	border-radius: 8px;
	position: absolute;
	left:50%;
	top:50%;
	margin:-370px -313px;
	overflow: hidden;
}
.printBtns{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 63px;
	padding:20px 41px 0 0;
	box-sizing: border-box;
	text-align: right;
}
.printBtns>button{
	width: 94px;
	height: 24px;
	background: #308acb;
	border-radius: 8px;
	font-size: 12px;
	color:#fff;
	cursor: pointer;
}
.printHeader{
	width: 100%;
	height: 37px;
	text-align: center;
	padding: 11px 12px 0 0;
	box-sizing: border-box;
}
.printHeader>img{
	width: 13px;
	height: 13px;
	cursor: pointer;
}
.printInfo{
	width: 100%;
	height: 640px;
	box-sizing: border-box;
	overflow-y: scroll;
	overflow-x: hidden;
	background: #fff;
}
.printList{
	padding:30px;
}
.printList>table{
	border:1px solid #000;
	width: 560px;
}
.printList>table td table{
	width: 100%;
}
.printList table tr{
	border-bottom: 1px solid #000;
}
.printList td{
	width: 112px;
	height: 57px;
	border-right: 1px solid #000;
	text-align: center;
	line-height: 57px;
	box-sizing: border-box;
}
.printList th{
	font-size: 14px;
	color: #4c4e4e;
}
.printList td{
	font-size: 15px;
	color:#000000;
}
.noBorderB{
	border-bottom: 0 !important;
}
.noBorderR{
	border-right: 0 !important;
}
.printList>.writeNameBox {
	width: 150px;
	height: 60px;
	margin: 200px 0 0 400px;
}
.printList>.writeNameBox>div {
	width: 100%;
	height: 30px;
	font-size: 0;
}
.printList>.writeNameBox>div>.writeLabel {
	width: 40px;
	margin-right: 5px;
}
.printList>.writeNameBox>div>span {
	display: inline-block;
	font-size: 15px;
	line-height: 30px;
	height: 30px;
}
.printList>.writeNameBox>div>.writeInfo {
	width: 90px;
	border-bottom: 1px solid #000;
}
</style>
