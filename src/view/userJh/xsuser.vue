<template>
  <div class="wrapper" ref="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content">
      <div class="menu-head-top50"></div>
      <div class="maincontent" id="maincontent1" style="position:relative;margin-top:0.2rem;">
        <div style="text-align:left;">
          <h3 style="text-align:left;position:relative;padding-bottom:0.2rem;">
            <span style="line-height:1rem;display:block;">汇总销售日报</span>
            <span
              id="sobox"
              style="position:absolute;right:10px;font-size:1.1em;color:#999;width:45%;font-size:0.4rem;top:-0;line-height:1rem;"
            >
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="el-icon-arrow-down1"
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
          </h3>
          <div
            class="left flex_1"
            style="width:100%;font-size:0.3rem;display:flex;padding-top:0.2rem;border-top:1px solid #f2f2f5;"
          >
            <div>
              <span class="blue">本月任务：</span>
              <span class="black">{{xsdata.totalMthPlanMoney}}万</span>
            </div>
            <div>
              <span class="blue">今日完成：</span>
              <span class="black">
                <span
                  :class="xsdata.totalDayPlanMoney>=0?'red':'green'"
                >{{xsdata.totalDayPlanMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">截止今日应完成：</span>
              <span class="black">
                <span
                  :class="xsdata.totalMonthShouldMoney>=0?'red':'green'"
                >{{xsdata.totalMonthShouldMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">实际累计完成：</span>
              <span class="black">
                <span
                  :class="xsdata.totalFinishMthMoney>=0?'red':'green'"
                >{{xsdata.totalFinishMthMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">今日毛利率：</span>
              <span class="black">
                <span
                  :class="xsdata.dayTotalGrossProfit>=0?'red':'green'"
                >{{xsdata.dayTotalGrossProfit}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">累计毛利率：</span>
              <span class="black">
                <span
                  :class="xsdata.totalMthGrossProfit>=0?'red':'green'"
                >{{xsdata.totalMthGrossProfit}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">实时完成率：</span>
              <span class="black">
                <span
                  :class="xsdata.totalFinishMthRate>=0?'red':'green'"
                >{{xsdata.totalFinishMthRate}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">超额/差额：</span>
              <span class="black">
                <span :class="xsdata.moneyDifference>=0?'red':'green'">{{xsdata.moneyDifference}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净利：</span>
              <span class="black">
                <span :class="jingli>=0?'red':'green'">{{jingli}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净净利：</span>
              <span class="black">
                <span :class="jingjingli>=0?'red':'green'">{{jingjingli}}万</span>
              </span>
            </div>
            <div style="color:#999999;width:100%;font-size:0.3rem;">
              <span style>
                上月环比
                <span
                  :class="xsdata.totalMonthCompare>=0?'red':'green'"
                >{{xsdata.totalMonthCompareb>=0?xsdata.totalMonthCompare:-xsdata.totalMonthCompare}}%</span>,去年同比
                <span
                  :class="xsdata.totalYearCompare>=0?'red':'green'"
                >{{xsdata.totalYearCompare>=0?xsdata.totalYearCompare:-xsdata.totalYearCompare}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">TB线索：</span>
              <span class="black">
                <span :class="xsdata.totalTBClueMoney>=0?'red':'green'">{{xsdata.totalTBClueMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月开标：</span>
              <span class="black">
                <span
                  :class="xsdata.totalOpenTenderMoney>=0?'red':'green'"
                >{{xsdata.totalOpenTenderMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月中标：</span>
              <span class="black">
                <span
                  :class="xsdata.totalGetTenderMoney>=0?'red':'green'"
                >{{xsdata.totalGetTenderMoney}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月丢标：</span>
              <span class="black">
                <span
                  :class="xsdata.totalLoseTenderMoney>=0?'red':'green'"
                >{{xsdata.totalLoseTenderMoney}}万</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="zhongjiedata({index:1})" :class="soit===1?'act':''">
          <span class="menu_border">
            标准销售额
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:4})" :class="soit===4?'act':''">
          <span class="menu_border">
            累计完成
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:2})" :class="soit===2?'act':''">
          <span class="menu_border">
            实时完成率
            <span class="menu_border_line"></span>
          </span>
        </div>
      </div>
      <div
        v-for="(item,index) in tabdata1"
        :key="index"
        class="wztabs_details xstabs_details tabs_details border_bf0f0f0"
      >
        <div class="padd_b12 border_bf0f0f0">
          <div class="tabs_thr paddb3">
            <h3>{{item.departmentName}}</h3>
            <span class="tabs_four_c">NO.{{item.saleNo}}</span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月任务：
              <span>{{item.departmentLevel}}</span>
            </p>
            <div class="tabs_four_d">
              <div v-if="item.saleNo<=4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 4-item.saleNo"
                  :key="len2"
                  :src="hua"
                />
                <img class="tabs_ld_img" :src="zan" />
              </div>
              <div v-if="item.saleNo<=7&&item.saleNo>4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 8-item.saleNo"
                  :key="len2"
                  :src="xiao"
                />
              </div>
              <div v-if="item.saleNo>7">
                <img class="tabs_ld_img" :src="ku" />
                <img v-if="item.saleNo>9&&item.saleNo<=11" class="tabs_ld_img" :src="ku" />
                <span v-if="item.saleNo>11&&item.saleNo<=15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                </span>
              </div>
            </div>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月已完成：
              <span>{{item.finishMoney}}</span>
            </p>
          </div>
        </div>
        <div class="padd_bt12">
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
              <span :class="item.monthCompare>=0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
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
              <span :class="item.yearCompare>=0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              超额/差额：
              <span
                :class="item.differenceMoney>=0?'rate_red':'rate_green'"
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
                :class="item.differenceMoney>=0?'rate_red':'rate_green'"
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
              <span :class="item.monthCompare>=0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              目前中标：
              <span class="color333">{{item.getTenderMoney}}万</span>
            </p>

            <p class="tabs_four_a mart8">
              同比：
              <span :class="item.yearCompare>=0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
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
      </div>
    </div>
    <Addcreate></Addcreate>
  </div>
</template>

<script>
import CreateData from "@/view/userJh/xsuserdata/index";
import Addcreate from "@/components/addcreate";
import { adddata, chakehu, needdata, chabumen, chakh } from "@/api/config";
import { getisread } from "@/api/configWu";
import Head from "@/view/common/head";
export default {
  components: {
    Head,
    Addcreate
  },
  name: "index",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      isread: false,
      span: 7,
      value: "",
      xsdata: [],
      jingli: 0,
      jingjingli: 0,
      pagenum: 1,
      act: 1,
      act1: false,
      value1: "",
      initdate: "",
      tabdata1: []
    };
  },
  created() {},
  mounted() {
    this.aler();
    this.getallData();
    this.gethong();
    this.getact();
  },
  watch: {
    value1() {
      this.pagenum = 1;
      this.getallData();
    }
  },
  methods: {
    zhongjiedata(a) {},
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("userMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/xiaoshou1") {
          this.act = index + 1;
        }
      });
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        this.isread = res.data.isread;
      });
    },
    aler() {
      var date = new Date();
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      this.value1 = date1;
    },

    getallData() {
      var scrollTop = document.documentElement.scrollTop;
      needdata({
        submitTime: this.value1,
        page: this.pagenum,
        role: ""
      })
        .then(res => {
          this.xsdata = res;
          if (this.pagenum == 1) {
            this.tabdata1 = res.saleInfoList;
          } else {
            for (var i = 0; i < res.saleInfoList.length; i++) {
              this.tabdata1.push(res.saleInfoList[i]);
            }
            document.scrollTop = scrollTop;
          }
          this.jingli = 0;
          this.jingjingli = 0;
          this.tabdata1.forEach(element => {
            this.jingli += Number(element.netProfit);
            this.jingjingli += Number(element.netsProfit);
          });
          this.jingli = this.jingli.toFixed(2);
          this.jingjingli = this.jingjingli.toFixed(2);
        })
        .catch(error => {});
    },
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/bangdan.styl';

.menubox {
  border-bottom: 1px solid #f0f0f0;
  margin-top: 8px;
}

.menubox > div {
  width: 33.333333%;
  background: #fff;
}

.menubox .menu_border {
  line-height: 42px;
  font-size: 14px;
  display: inline-block;
}

.menubox .act {
  position: relative;
}

.menubox .act .menu_border {
  position: relative;
  color: #409eff;
}

.menubox .act .menu_border_line {
  border-bottom: 2px solid #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.xstabs_details {
  background: $colorfff;
  text-align: left;
}

.el-input__inner {
  border: none;
}

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
}

body, html {
  background: #f2f2f5;
}

.flex_1 {
  flex-wrap: wrap;
}

.flex_1 > div {
  width: 100%;
  margin-bottom: 0.2rem;
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

table, tbody, thead {
  width: 100% !important;
}

.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
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

.bmcontent > div {
  border-bottom: 1px solid #ccc;
  padding-top: 0.2rem;
  border-right: 1px solid #ccc;
}

.bmcontent > div:nth-child(3n + 0) {
  border-right: none;
}
</style>