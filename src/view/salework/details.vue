<!-- A.html -->
<template>
  <div class="wrapper wrapwhite" id="customlist" ref="customlist" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="saleindexhandle(1)" :class="soit===1?'act':''">
          <span class="menu_border">
            待处理（1）
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="saleindexhandle(2)" :class="soit===2?'act':''">
          <span class="menu_border">
            我的发起
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="saleindexhandle(3)" :class="soit===3?'act':''">
          <span class="menu_border">
            我参与的
            <span class="menu_border_line"></span>
          </span>
        </div>
      </div>
      <div class="details_one padd_bt6" v-for="(item,index) in datalists" :key="index">
        <div class="usertabspc tabs_four wztabs_pc_all">
          <p class="tabs_four_a mart8">
            标准销售额：
            <span class="color333">{{item.standardFinishMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            实时完成率：
            <span class="color333">{{item.finishRate.split('/')[0]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            今日完成：
            <span class="color333">{{item.dayMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            环比：
            <span
              :class="item.monthCompare>0?'rate_red':item.monthCompare==0?'color333':'rate_green'"
            >{{item.monthCompare}}%</span>
          </p>
          <p class="tabs_four_a mart8">
            累计毛利率：
            <span class="color333">{{item.grossProfit.split('/')[1]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            计划完成率：
            <span class="color333">{{item.finishRate.split('/')[1]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            今日毛利率：
            <span class="color333">{{item.grossProfit.split('/')[0]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            同比：
            <span
              :class="item.yearCompare>0?'rate_red':item.yearCompare==0?'color333':'rate_green'"
            >{{item.yearCompare}}%</span>
          </p>
          <p class="tabs_four_a mart8">
            超额/差额：
            <span
              :class="item.differenceMoney>0?'rate_red':item.differenceMoney==0?'color333':'rate_green'"
            >{{item.differenceMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            TB线索：
            <span class="color333">{{item.tbClueMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            目前中标：
            <span class="color333">{{item.getTenderMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            本月开标：
            <span class="color333">{{item.openTenderMoney}}万</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            丢标：
            <span class="color333">{{item.differenceMoney}}万</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            实际季累计完成：
            <span class="color333">{{item.finishQuarterMoney}}万</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            实际年累计完成：
            <span class="color333">{{item.finishYearMoney}}万</span>
          </p>
        </div>
        <div class="usertabsmobile tabs_four wztabs_pc_all">
          <p class="tabs_four_a mart8">
            标准销售额：
            <span class="color333">{{item.standardFinishMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            实时完成率：
            <span class="color333">{{item.finishRate.split('/')[0]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            今日完成：
            <span class="color333">{{item.dayMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            今日毛利率：
            <span class="color333">{{item.grossProfit.split('/')[0]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            超额/差额：
            <span
              :class="item.differenceMoney>0?'rate_red':item.differenceMoney==0?'color333':'rate_green'"
            >{{item.differenceMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            累计毛利率：
            <span class="color333">{{item.grossProfit.split('/')[1]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            TB线索：
            <span class="color333">{{item.tbClueMoney}}万</span>
          </p>

          <p class="tabs_four_a mart8">
            计划完成率：
            <span class="color333">{{item.finishRate.split('/')[1]}}</span>
          </p>
          <p class="tabs_four_a mart8">
            本月开标：
            <span class="color333">{{item.openTenderMoney}}万</span>
          </p>
          <p class="tabs_four_a mart8">
            环比：
            <span
              :class="item.monthCompare>0?'rate_red':item.monthCompare==0?'color333':'rate_green'"
            >{{item.monthCompare}}%</span>
          </p>
          <p class="tabs_four_a mart8">
            目前中标：
            <span class="color333">{{item.getTenderMoney}}万</span>
          </p>

          <p class="tabs_four_a mart8">
            同比：
            <span
              :class="item.yearCompare>0?'rate_red':item.yearCompare==0?'color333':'rate_green'"
            >{{item.yearCompare}}%</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            丢标：
            <span class="color333">{{item.differenceMoney}}万</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            实际季累计完成：
            <span class="color333">{{item.finishQuarterMoney}}万</span>
          </p>
          <p class="tabs_four_a wztabs_pcdifmoney mart8">
            实际年累计完成：
            <span class="color333">{{item.finishYearMoney}}万</span>
          </p>
        </div>
      </div>
      <div class="details_back">
        返回
      </div>
    </div>
  </div>
</template>
<script>
import Head from "@/view/common/head";

export default {
  components: {
    Head
  },
  data() {
    return {
      soit: 1,
      act: 2,
      act1: true,
      datalists: [
        {
          id: null,
          createTime: null,
          enable: 0,
          page: null,
          pageSize: 10,
          start: 0,
          userId: "30843",
          userName: "吴世界",
          customerId: "1027",
          customerName: "当当网",
          departmentId: "1022",
          departmentName: "北京事业一部",
          yearMoney: null,
          totalYearPlanMoney: null,
          totalFinishYearMoney: null,
          monthMoney: 0,
          dayMoney: 0,
          cost: 0,
          yearCost: null,
          totalCost: 291.7,
          grossProfit: "0%/20%",
          finishMoney: 365,
          finishQuarterMoney: 365,
          finishYearMoney: 365,
          finishRate: "0%/0%",
          submitTime: "2020-04-08",
          role: null,
          monthFirstDay: null,
          quarterFirstDay: null,
          yearFirstDay: null,
          monthShouldMoney: 0,
          tbClueMoney: 0,
          openTenderMoney: 0,
          getTenderMoney: 0,
          getTenderNotMoney: 0,
          planToDaysMoney: "0/0",
          loseTenderMoney: 0,
          loseTenderReason: null,
          lastMonthToday: null,
          lastMonthFirstDay: null,
          lastYearToday: null,
          lastYearFirstDay: null,
          monthlastDay: null,
          quarterlastDay: null,
          yearlastDay: null,
          monthCompare: 0,
          yearCompare: 0,
          monthDays: null,
          days: null,
          netProfit: "0",
          netProfitQuarter: "0",
          netProfitYear: "0",
          netsProfit: "0",
          netsProfitYear: "0",
          standardFinishMoney: 365,
          differenceMoney: 365,
          monthYearCompare: "0.0%/0.0%",
          bearMoney: null,
          bearsMoney: null,
          quarterBearsMoney: null,
          yearBearsMoney: null,
          saleNo: 1,
          grossPNo: null,
          rateNo: null,
          netNo: null,
          netsNo: null,
          grossMNo: null,
          standSaleNo: null,
          targetNo: null,
          sort: null,
          sortname: null,
          leaderName: null,
          targetProfit: null,
          lastNet: null,
          targetNet: null,
          lastName: null,
          targetName: null,
          grossProfitMoney: 73.3,
          targetNets: null,
          targetProfitDif: null,
          lastNets: null,
          departmentCount: null,
          departmentShow: null,
          departmentLevel: null,
          bear: null,
          quarterBear: null,
          yearBear: null,
          receipt: null,
          payment: null,
          receiptPlan: null,
          paymentPlan: null,
          monthBadDebt: null,
          quarterBadDebt: null,
          yearBadDebt: null,
          firstCustomer: null,
          secondCustomer: null,
          thirdCustomer: null,
          departmentTargetBear: null,
          departmentNetCashMoney: null,
          departmentUseMoney: null,
          department_month_use_money: null,
          departmentSalary: null,
          quarterDepartmentSalary: null,
          monthBusiness: null,
          otherBear: null,
          deptBear: null,
          yearNet: null,
          yearNets: null,
          shouldReceipt: null,
          shouldPayment: null,
          customerList: null,
          type: null,
          imgUrl: null,
          keyword: null,
          customerVol: null,
          customerReceipt: null,
          customerTargetMoney: null,
          yearFinish: null,
          avgGrossProfit: null,
          avgGrossProfitMoney: null,
          quarterCost: null,
          yearDepartmentSalary: null
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    saleindexhandle(len) {
      this.soit = len;
    }
  }
};
</script>
<style lang="stylus"  scoped>
@import '../../assets/css/bangdan.styl';
.details_back{
  line-height :44px;
  border-top:1px solid $colorf0f0f0;
  text-align:center;
  color:$color409eff;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 850px;
    margin: 0 auto;
}
.details_one {
  background: $colorfff;
  padding: 0 15px 20px;
}

.menubox {
  border-bottom: 1px solid $colorf0f0f0;
  text-align: center;
  background: $colorfff;
}

.menubox > div {
  width: 33.333333%;
}

.menubox .menu_border {
  line-height: 42px;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
}

.menubox .act {
  position: relative;
}

.menubox .act .menu_border {
  position: relative;
  color: $color409eff;
}

.menubox .act .menu_border_line {
  border-bottom: 2px solid $color409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>