<template>
  <div>
    <div
      style="padding: 15px;background: #fff;border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;"
      v-for="(item,index) in tabdata1"
      :key="index"
    >
      <div>
        <h3 style="text-align:left;line-height:0.8rem;font-size:0.4rem;">
          <p style="line-height:0.8rem;padding-bottom:0.2rem;overflow:hidden;">
            <img style="width:0.8rem;height:0.8rem;border-radius:50%;float:left;margin-right:0.2rem;" :src="item.imgUrl" alt="">
            <span class="left">{{item.departmentName}}</span>
            <span
              class="right"
              style="font-weight:900;font-size:0.3rem;"
              @click="jxq(item.id,item.departmentName,item.departmentId)"
            >查看详情</span>
          </p>
          <p
            v-if="false"
            style="line-height:0.4rem;font-size:0.3rem;color:#999;font-weight:300;overflow:hidden;"
          >
            <span style="width:28%;float:left;">
              <span>销售额</span>
              <span :class="item.saleNo<3?'red':'cheng'">no{{item.saleNo}}</span>
            </span>
            <span style="width:39%;float:left;">
              <span>标准销售额</span>
              <span :class="item.standSaleNo<3?'red':'cheng'">no{{item.standSaleNo}}</span>
            </span>
            <span style="width:33%;float:left;">
              <span>完成率</span>
              <span :class="item.rateNo<3?'red':'cheng'">no{{item.rateNo}}</span>
            </span>
            <span style="width:28%;float:left;overflow:hidden;">
              <span style="text-align-last:justify;width:0.9rem;float:left;text-align:justify;">净利</span>
              <span
                style="float:left;margin-left:0.1rem;"
                :class="item.rateNo<3?'red':'cheng'"
              >no{{item.netNo}}</span>
            </span>
            <span style="width:39%;float:left;">
              <span style="text-align-last:justify;width:1.5rem;float:left;text-align:justify;">净净利</span>
              <span
                style="float:left;margin-left:0.1rem;"
                :class="item.rateNo<3?'red':'cheng'"
              >no{{item.netsNo}}</span>
            </span>
          </p>
        </h3>
      </div>
      <div class="bmcontent" style="display:flex;flex-wrap:wrap;font-weight:900;color:black;">
        <div
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;height:0.6rem;padding:0;border-right:none;"
        >
          <div @click.stop="tantan(alertNr.deptShowExp)"
            style="float:left;width:40%;font-weight:900;color:black;"
          >财务评级：{{item.departmentShow }}</div>
          <div @click.stop="tantan(alertNr.deptLevelExp)"
            style="float:left;width:60%;font-weight:900;color:black;"
          >运营评级：{{item.departmentLevel }}</div>
        </div>
        <!-- <p style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;border-top:none;"></p> -->
        <p @click.stop="tantan(alertNr.deptBusinessExp)"
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;border-top:none;font-weight:900;color:black;"
        >月经营情况：{{item.monthBusiness }}</p>
        <!-- <div>
        <p class="bmqb">{{item.monthMoney}}万</p>
        <p class="bmbt">本月任务</p>
        </div>-->
        <div class="fs" @click.stop="tantan(alertNr.totalDayMoneyExp)">
          <p class="bmbt">今日完成</p>
          <p class="bmqb">{{item.dayMoney}}万</p>
        </div>
        <div class="fs" @click.stop="tantan(alertNr.totalFinishRateExp)">
          <p class="bmbt">实时完成率</p>
          <p class="bmqb">
            {{item.finishRate.split('/')[0]}}
            <span
              :class="item.rateNo<3?'red':'cheng'"
            >no{{item.rateNo}}</span>
          </p>
        </div>
        <div class="noboder fs" @click.stop="tantan(alertNr.totalCompareExp)">
          <p
            style="font-size:0.3rem;width:100%;"
            class="bmbt"
            :class="item.monthCompare>=0?'black':'black'"
          >环比:{{item.monthCompare}}%</p>
          <p
            style="margin-top:0.1rem;font-size:0.3rem;width:100%;"
            class="bmqb"
            :class="item.yearCompare>=0?'black':'black'"
          >同比:{{item.yearCompare}}%</p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;border-top:none;color:black;"
        >
          今日订单来自客户：
          <span v-for="(i,index) in item.customerList" :key="index">{{i}}&nbsp;</span>
        </p>
        <!-- <div class="noboder">
        <p class="bmqb">{{item.monthShouldMoney}}万</p>
        <p class="bmbt">目前应完成</p>
        </div>-->
        <div class="fs" @click.stop="tantan(alertNr.deptSaleMoneyExp)">
          <p class="bmbt">目前销售累计</p>
          <p class="bmqb">
            {{item.finishMoney}}万
            <span :class="item.rateNo<3?'red':'cheng'">no{{item.saleNo}}</span>
          </p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptNetExp)">
          <p class="bmbt">目前月净利</p>
          <p class="bmqb">
            {{item.netProfit}}万
            <span :class="item.netNo<3?'red':'cheng'">no{{item.netNo}}</span>
          </p>
        </div>
        <div class="noboder qgreen" @click.stop="tantan(alertNr.deptGrossExp)">
          <p class="bmbt">目前月毛利</p>
          <p class="bmqb">
            {{item.grossProfitMoney}}万
            <span :class="item.rateNo<3?'red':'cheng'">no{{item.grossMNo}}</span>
          </p>
        </div>
        <div class="fs" @click.stop="tantan(alertNr.deptShouldMoneyExp)">
          <p class="bmbt">目前应完成</p>
          <p class="bmqb">{{item.monthShouldMoney}}万</p>
        </div>
        <div class="lql" @click.stop="tantan(alertNr.deptTargetNetExp)">
          <p class="bmbt">月净利润目标</p>
          <p class="bmqb">{{item.targetNet}}万</p>
        </div>
        <div class="noboder lql" @click.stop="tantan(alertNr.deptTargetGrossExp)">
          <p class="bmbt">月毛利润目标</p>
          <p class="bmqb">{{item.targetProfit}}万</p>
        </div>
        <div class="fs" @click.stop="tantan(alertNr.deptSaleDifExp)">
          <p class="bmbt">距销售目标差额</p>
          <p class="bmqb">{{item.differenceMoney}}万</p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptNetsExp)">
          <p class="bmbt">目前月净净利</p>
          <p class="bmqb">
            {{item.netsProfit}}万
            <span :class="item.netsNo<3?'red':'cheng'">no{{item.netsNo}}</span>
          </p>
        </div>
        <div class="noboder qgreen" @click.stop="tantan(alertNr.deptGrossDifExp)">
          <p class="bmbt">未完成毛利润</p>
          <p class="bmqb">{{item.targetProfitDif}}万</p>
        </div>
        <div class="lql" @click.stop="tantan(alertNr.deptTargetSaleExp)">
          <p class="bmbt">月销售额目标</p>
          <p class="bmqb">{{item.monthMoney}}万</p>
        </div>
        <div class="lql" @click.stop="tantan(alertNr.deptTargetNetsExp)">
          <p class="bmbt">月净净利目标</p>
          <p class="bmqb">{{item.targetNets}}万</p>
        </div>
        <div class="noboder qgreen" @click.stop="tantan(alertNr.deptProfitExp)">
          <p class="bmbt">月平均毛利率</p>
          <p class="bmqb">
            {{item.grossProfit.split('/')[1]}}
            <span
              :class="item.rateNo<3?'red':'cheng'"
            >no{{item.grossPNo}}</span>
          </p>
        </div>
         <div class="fs" @click.stop="tantan(alertNr.deptSaleMoneyExp)">
          <p class="bmbt">年任务</p>
          <p class="bmqb">
            {{item.totalYearPlanMoney}}万
            
          </p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptNetExp)">
          <p class="bmbt">年累计完成</p>
          <p class="bmqb">
            {{item.totalFinishYearMoney}}万
            
          </p>
        </div>
        <div class="noboder"></div>
        
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;border-top:none;color:black;"
        >部门费用</p>
        <div class="qh" @click.stop="tantan(alertNr.deptTargetBearExp)">
          <p class="bmbt">月部门费用预算</p>
          <p class="bmqb">{{item.departmentTargetBear}}万</p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptBearsExp)">
          <p class="bmbt">分摊费用</p>
          <p class="bmqb">{{item.bearsMoney}}万</p>
        </div>
        <div class="noboder qh" @click.stop="tantan(alertNr.deptCountExp)">
          <p class="bmbt">部门人数</p>
          <p class="bmqb">{{item.departmentCount}}个</p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptSalaryExp)">
          <p class="bmbt">部门工资</p>
          <p class="bmqb">{{item.departmentSalary}}万</p>
        </div>
        <div class="qh" @click.stop="tantan(alertNr.deptOtherMoneyExp)">
          <p class="bmbt">月其他费用</p>
          <p class="bmqb">{{item.otherBear}}万</p>
        </div>
        <div class="noboder qh" @click.stop="tantan(alertNr.deptBearMoneyExp)">
          <p class="bmbt">月总费用</p>
          <p class="bmqb">{{item.bearMoney}}万</p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid #ccc;border-left:none;border-right:none;border-top:none;"
        >财务情况</p>
        <div class @click.stop="tantan(alertNr.deptReceiptExp)">
          <p class="bmbt">月收款</p>
          <p class="bmqb">{{item.receipt}}万</p>
        </div>
        <div class @click.stop="tantan(alertNr.deptPaymentExp)">
          <p class="bmbt">月付款</p>
          <p class="bmqb">{{item.payment}}万</p>
        </div>
        <div class="noboder" @click.stop="tantan(alertNr.deptBearExp)">
          <p class="bmbt">月费用</p>
          <p class="bmqb">{{item.bear}}万</p>
        </div>
        <div class="lql" @click.stop="tantan(alertNr.deptTargetReceiptExp)">
          <p class="bmbt">月收款计划</p>
          <p class="bmqb">{{item.receiptPlan}}万</p>
        </div>
        <div class="lql" @click.stop="tantan(alertNr.deptTargetPaymentExp)">
          <p class="bmbt">月付款计划</p>
          <p class="bmqb">{{item.paymentPlan}}万</p>
        </div>
        <div class="noboder" @click.stop="tantan(alertNr.deptUseMoneyExp)">
          <p class="bmbt">部门现金流</p>
          <p class="bmqb">{{item.departmentUseMoney}}万</p>
        </div>
        <div class="" @click.stop="tantan(alertNr.deptUseMoneyExp)">
          <p class="bmbt">期初现金净额</p>
          <p class="bmqb">{{item.departmentUseMoney}}万</p>
        </div>
        <div class="" @click.stop="tantan(alertNr.deptUseMoneyExp)">
          <p class="bmbt">本月现金净额</p>
          <p class="bmqb">{{item.departmentNetCashMoney}}万</p>
        </div>
        <div class="noboder" @click.stop="tantan(alertNr.deptUseMoneyExp)">
          <p class="bmbt">期末现金净额</p>
          <p class="bmqb">{{item.department_month_use_money}}万</p>
        </div>
        <div class @click.stop="tantan(alertNr.deptMonthDebtExp)">
          <p class="bmbt">月提起坏账</p>
          <p class="bmqb">{{item.monthBadDebt}}万</p>
        </div>
        <div class @click.stop="tantan(alertNr.deptQuarterDebtExp)">
          <p class="bmbt">季度坏账</p>
          <p class="bmqb">{{item.quarterBadDebt}}万</p>
        </div>
        <div class="noboder" @click.stop="tantan(alertNr.deptYearDebtExp)">
          <p class="bmbt">年度坏账</p>
          <p class="bmqb">{{item.yearBadDebt}}万</p>
        </div>
        <div class @click.stop="tantan(alertNr.shouldReceiptExp)">
          <p class="bmbt">应收款</p>
          <p class="bmqb">{{item.shouldReceipt}}万</p>
        </div>
        <div class @click.stop="tantan(alertNr.shouldPaymentExp)">
          <p class="bmbt">应付款</p>
          <p class="bmqb">{{item.shouldPayment}}万</p>
        </div>
        <div class="noboder"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabdata1",'jxq','alertNr','zhezhao'],
  data() {
    return {
      box: this.zhezhao
    };
  },
  mounted() {},
  methods: {
    tantan(b){
        var a=  window.event || event
      var apath = a.path||(a.composedPath&&a.composedPath())
      // alert(apath.length)
      if(b){
        console.log(a)
        var  zhezhaoobj = {
          background:'rgba(0,0,0,0.3)',
          width:apath[0].clientWidth+'px',
          height:apath[0].clientHeight+'px',
          position:'absolute',
          top:apath[0].getBoundingClientRect().top+document.documentElement.scrollTop+document.body.scrollTop+'px',
          left:apath[0].offsetLeft+'px',
        }
        
        this.$message.closeAll()
        var obj ={}
        obj.message = b;
        obj.duration = 0
        obj.showClose = true
        obj.onClose = this.closeTc
        this.$message.warning(obj)
        this.box = zhezhaoobj
        this.$emit("confirm", this.box);
        
      }
    },
    closeTc(){
      this.box ={}
      this.$emit("confirm", this.box);
    },
  }
};
</script>
<style scoped>
.menubox {
  border-bottom: 1px solid rgb(220, 223, 230);
}
.menubox > div {
  width: 25%;
  line-height: 40px;
  background: #fff;
  margin-top: 0.2rem;
}
.menubox .act {
  border-bottom: 2px solid #409eff;
  color: #409eff;
}
.bmqb {
  font-size: 0.3rem;
  color: black;
  font-weight: 900;
}
.bmbt {
  font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900;
}
.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}
.bmcontent > div {
  width: 33%;
  /* padding-bottom: 0.3rem; */
}
body,
html {
  background: #f2f2f5;
}
.flex_1 {
  flex-wrap: wrap;
}
.flex_1 > div {
  width: 100%;
  /* padding-bottom: 0.1rem; */
  line-height: 0.6rem;
  height: 0.6rem;
}
.flex_1 > div > span {
  /* display: block; */
  /* width: 100%; */
}
.blue {
  color: black;
  font-weight: 900;
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
  font-weight: 900;
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
.bmcontent > div {
  border-bottom: 1px solid #ccc;
  /* padding-top: 0.2rem; */
  border-right: 1px solid #ccc;
}
.bmcontent > .noboder {
  border-right: none;
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
  font-weight: 900;
}
.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
  font-weight: 900;
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
.bmcontent > div {
  border-bottom: 1px solid black;
  /* padding-top: 0.2rem; */
  border-right: 1px solid black;
}
/* .bmcontent>div:nth-child(3n+0){border-right: none} */
.show {
  display: block;
}
.hidden {
  display: none;
}
</style>