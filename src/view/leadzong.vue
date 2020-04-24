<template>
<div>
  <div
    style="padding: 15px;background: #fff;border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;font-size:0.3rem;"
    v-for="item in tabdata1" 
    :key="item"
  >
    <div>
      <h3 style="text-align:left;line-height:0.8rem;">
        <p style="line-height:0.6rem;padding-bottom:0.2rem;">{{item.departmentName}}</p>
        <div style="overflow:hidden;">
            <div class="left">财务评级</div>
            <div class="right">{{item.totalMoneyGrade}}</div>
        </div>
         <div  style="overflow:hidden;">
            <div class="left">运营评级</div>
            <div class="right">{{item.departmentLevel}}</div>
        </div>
      </h3>
    </div>
    <div class="bmcontent" style="display:flex;flex-wrap:wrap;margin-top:0.2rem;overflow:hidden;">
        <p style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;">月经营情况：{{item.monthBusiness }}</p>
      <!-- <div>
        <p class="bmqb">{{item.monthMoney}}W</p>
        <p class="bmbt">本月任务</p>
      </div> -->
      <div>
        <p class="bmqb">{{item.dayMoney}}W</p>
        <p class="bmbt">今日完成</p>
      </div>
      <div>
        <p class="bmqb">{{item.finishRate.split('/')[0]}}</p>
        <p class="bmbt">实时完成率</p>
      </div>
      <div  class="noboder">
         <p class="bmqb">上月环比{{item.monthCompare}}</p>
        <p class="bmbt">去年同比{{item.yearCompare}}</p>
      </div>
       <p style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;">今日订单来自客户：{{item.firstCustomer}}，{{item.secondCustomer}}，{{item.thirdCustomer}}</p>
      <!-- <div class="noboder">
        <p class="bmqb">{{item.monthShouldMoney}}W</p>
        <p class="bmbt">截止今日应完成</p>
      </div> -->
      <div>
        <p class="bmqb">{{item.finishMoney}}W 第3名</p>
        <p class="bmbt">截止今日销售累计</p>
      </div>
      <div>
        <p class="bmqb">{{item.netProfit}}</p>
        <p class="bmbt">截止今日实现月净利</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.grossProfitMoney}}</p>
        <p class="bmbt">截止今日实现毛利</p>
      </div>
      <div>
        <p class="bmqb">{{item.monthShouldMoney}}</p>
        <p class="bmbt">截止今日应完成</p>
      </div>
      <div>
        <p class="bmqb">{{item.targetNet}}</p>
        <p class="bmbt">月净利润预算</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.targetProfit}}W</p>
        <p class="bmbt">月毛利润预算</p>
      </div>
      <div>
        <p class="bmqb">{{item.differenceMoney}}</p>
        <p class="bmbt">距销售目标差额</p>
      </div>
      <div>
        <p class="bmqb">{{item.netsProfit}}</p>
        <p class="bmbt">截止今日实现月净净利</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{}}</p>
        <p class="bmbt">距离目标毛利润差额</p>
      </div>
      <div>
        <p class="bmqb">{{item.monthMoney}}</p>
        <p class="bmbt">月销售额预算</p>
      </div>
      <div>
        <p class="bmqb">{{item.targetNets}}W</p>
        <p class="bmbt">月净净利预算</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.grossProfit.split('/')[1]}}W</p>
        <p class="bmbt">月平均毛利率</p>
      </div>
       <!-- <p style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;">截止目前部门费用：【】万元</p> -->
      <div>
        <p class="bmqb">{{item.departmentTargetBear}}W</p>
        <p class="bmbt">月部门费用控制目标</p>
      </div>
      <div>
        <p class="bmqb">{{item.bearsMoney}}W</p>
        <p class="bmbt">分摊费用</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.departmentCount}}/{{item.departmentSalary}}</p>
        <p class="bmbt">部门人数/工资</p>
      </div>
      <p style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;">财务情况：良</p>
      <div>
        <p class="bmqb">{{item.receipt}}W</p>
        <p class="bmbt">月收款</p>
      </div>
      <div>
        <p class="bmqb">{{item.payment}}W</p>
        <p class="bmbt">月付款</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.bear}}W</p>
        <p class="bmbt">月费用</p>
      </div>
       <div>
        <p class="bmqb">{{item.receiptPlan}}W</p>
        <p class="bmbt">月收款计划</p>
      </div>
      <div>
        <p class="bmqb">{{item.paymentPlan}}W</p>
        <p class="bmbt">月付款计划</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.loseTenderMoney}}W</p>
        <p class="bmbt">部门本月是否有资金使用</p>
      </div>
       <div>
        <p class="bmqb">{{item.monthBadDeb}}W</p>
        <p class="bmbt">月提起坏账</p>
      </div>
      <div>
        <p class="bmqb">{{item.quarterBadDeb}}W</p>
        <p class="bmbt">季度坏账</p>
      </div>
      <div  class="noboder">
        <p class="bmqb">{{item.yearBadDebt}}W</p>
        <p class="bmbt">年度坏账</p>
      </div>
    </div>
  </div>
  <div>
      <div>
          <!-- <router-link></router-link> -->
      </div>
  </div>
  </div>
</template>

<script>
import { chabumen } from "@/api/config";
export default {
    name:'leadzong',
    data(){
        return {
            tabdata1:[]
        }
    },
    mounted(){
        this.getdata()
    },
    methods:{
        getdata(){
        
            var date1 = this.$route.query.date
            var idnum = this.$route.query.id
            chabumen({
                submitTime: date1,
                page: 1,
                role: localStorage.getItem("role")
            }).then(res=>{
                console.log(res)
                this.tabdata1.push(res.saleInfoList[idnum])
                console.log(this.tabdata1)
            })
        }
    }
};
</script>

<style scoped>
.left{float: left;font-weight:300}
.right{float:right;width:50%;text-align: center;font-weight:300}
.bmqb {
  font-size: 0.3rem;
  color: black;
}
.bmbt {
  font-size: 0.26rem;
  color: #999;
  margin-top: 0.15rem;
}
.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}
.bmcontent > div {
  width: 33%;
  padding-bottom: 0.3rem;
  float:left;
}
body,
html {
  background: #f5f5f7;
}
.flex_1 {
  flex-wrap: wrap;
}
.flex_1 > div {
  width: 100%;
  /* padding-bottom: 0.1rem; */
  line-height: 0.6rem;
}
.flex_1 > div > span {
  /* display: block; */
  /* width: 100%; */
}
.blue {
  color: #999;
  /* width: 30%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.3rem;
}
.black {
  color: black;
  /* width: 40%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-select-dropdown {
  width: 98%;
}
#maincontent1 p {
  padding-left: 20px;
  text-align: left;
}
#maincontent p {
  padding-left: 20px;
  text-align: left;
}
.head {
  height: 1rem;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #21aefb;
  color: #fff;
}
.tap {
  font-size: 0.3rem;
  background: #21aefb;
  height: 0.7rem;
  line-height: 0.7rem;
}
.tap .act {
  background: #fff;
  color: #333;
}
.tap .act a {
  color: #333;
}
.tap a {
  color: #fff;
  text-decoration: none;
}
.maincontent {
  font-size: 0.3rem;
  /* height: 5.5rem; */
  overflow: hidden;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nianBt {
  line-height: 4.2rem;
  width: 20%;
  background: red;
  color: #fff;
}
table,
tbody,
thead {
  width: 100% !important;
}

.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0;
  text-align: center;
}
.red {
  color: #f16c5d;
}
.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
}
.newxin {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: none;
  color: #ccc;
  font-size: 0.24rem;
}
.bmcontent>div{border-bottom:1px solid #ccc;padding-top:0.2rem; border-right: 1px solid #ccc}
.bmcontent>.noboder{border-right: none}
</style>