<template>
  <div class="wrapper xslead sobig" ref="wrapper" id="wrap" @click="mousedownFunc">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content wrap850" ref="content">
      <div class="menu-head-top50"></div>
      <div class="maincontent" id="maincontent1" style="position:relative;margin-top:0.2rem;">
        <div style="overflow:hidden;width:100%;float:left;text-align:left;">
          <h3 style="text-align:left;position:relative;">
            <span style="line-height:1rem;display:block;">汇总销售日报</span>
            <span
              id="sobox"
              style="position:absolute;right:10px;font-size:1.1em;color:#999;width:45%;font-size:0.4rem;top:-0;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                ref="timechoose"
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;font-size:0.4rem!importment;font-weight:900;"
                :clearable="false"
                class="el-icon-arrow-down1"
                :picker-options="pickerOptions0"
                :editable="false"
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
          </h3>

          <div style="overflow:hidden;" v-show="ladzd">
            <div
              style="width:18%;float:left;height:100%;border-right:1px solid #ccc;box-sizing:border-box;margin-right:2%;"
            >
              <div
                style="width:100%;height:1.3rem;border-bottom:1px solid #ccc;text-align:center;line-height:1.3rem;"
              >任务</div>
              <div
                style="width:100%;height:4.1rem;border-bottom:1px solid #ccc;text-align:center;padding-top:1.9rem;"
              >收入</div>
              <div
                style="width:100%;height:2.6rem;border-bottom:1px solid #ccc;text-align:center;padding-top:1.6rem;"
              >月利润</div>
              <div
                style="width:100%;height:1rem;border-bottom:1px solid #ccc;text-align:center;padding-top:0.8rem;"
              >年利润</div>
              <div
                style="width:100%;height:1.3rem;border-bottom:1px solid #ccc;text-align:center;padding-top:1.1rem;"
              >TB</div>
            </div>

            <div
              class="left flex_1"
              style="width:80%;font-size:0.3rem;display:flex;padding-top:0.1rem;"
            >
              <div style>
                <span class="blue" @click.stop>年任务：</span>
                <span class="black" @click.stop>{{alldata.totalYearPlanMoney}}万</span>
              </div>
              <div style="border-bottom:1px solid #ccc;margin-bottom:1px solid #ccc;">
                <span class="blue" @click.stop="tantan(alertNr.totalMonthMoneyExp)">本月任务：</span>
                <span
                  class="black"
                  @click.stop="tantan(alertNr.totalMonthMoneyExp)"
                >{{alldata.totalMthPlanMoney}}万</span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalDayMoneyExp)">今日完成：</span>
                <span class="black" @click.stop="tantan(alertNr.totalDayMoneyExp)">
                  <span
                    :class="alldata.totalDayPlanMoney>=0?'red':'green'"
                  >{{alldata.totalDayPlanMoney}}万</span>
                </span>
                <span style="text-decoration: underline;float:right;" @click="zhankai(1)">
                  <!-- <router-link :to="{path:'/tanchujh/jrwc',query:{date:value1}}"></router-link> -->
                  展开
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalShouleMoneyExp)">目前应完成：</span>
                <span class="black" @click.stop="tantan(alertNr.totalShouleMoneyExp)">
                  <span
                    :class="alldata.totalMonthShouldMoney>=0?'red':'green'"
                  >{{alldata.totalMonthShouldMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalFinishMoneyExp)">实际累计完成：</span>
                <span class="black" @click.stop="tantan(alertNr.totalFinishMoneyExp)">
                  <span
                    :class="alldata.totalFinishMthMoney>=0?'red':'green'"
                  >{{alldata.totalFinishMthMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop>年累计完成：</span>
                <span class="black" @click.stop>
                  <span
                    :class="alldata.totalFinishYearMoney>=0?'red':'green'"
                  >{{alldata.totalFinishYearMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalDayProfitExp)">今日毛利率：</span>
                <span class="black" @click.stop="tantan(alertNr.totalDayProfitExp)">
                  <span
                    :class="alldata.dayTotalGrossProfit>=0?'red':'green'"
                  >{{alldata.dayTotalGrossProfit}}%</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalFinishProfitExp)">累计毛利率：</span>
                <span class="black" @click.stop="tantan(alertNr.totalFinishProfitExp)">
                  <span
                    :class="alldata.totalMthGrossProfit>=0?'red':'green'"
                  >{{alldata.totalMthGrossProfit}}%</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalFinishRateExp)">实时完成率：</span>
                <span class="black" @click.stop="tantan(alertNr.totalFinishRateExp)">
                  <span
                    :class="alldata.totalFinishMthRate>=0?'red':'green'"
                  >{{alldata.totalFinishMthRate}}%</span>
                </span>
              </div>
              <div style>
                <span class="blue" @click.stop="tantan(alertNr.totalMoneyDifExp)">超额/差额：</span>
                <span class="black" @click.stop="tantan(alertNr.totalMoneyDifExp)">
                  <span
                    :class="alldata.moneyDifference>=0?'red':'green'"
                  >{{alldata.moneyDifference}}万</span>
                </span>
              </div>
              <div class="black" @click.stop="tantan(alertNr.totalCompareExp)">
                上月环比
                <span :class="alldata.totalMonthCompare>=0?'red':'green'">
                  <!-- <i v-if="hb>=0" class="el-icon-top"></i>
                  <i v-if="hb<0" class="el-icon-bottom"></i>-->
                  {{alldata.totalMonthCompare>0?alldata.totalMonthCompare:-alldata.totalMonthCompare}}%
                </span>
              </div>
              <div
                class="black"
                style="border-bottom:1px solid #ccc;"
                @click.stop="tantan(alertNr.totalCompareExp)"
              >
                去年同比
                <span :class="alldata.totalYearCompare>=0?'red':'green'">
                  <!-- <i v-if="tb>=0" class="el-icon-top"></i>
                  <i v-if="tb<0" class="el-icon-bottom"></i>-->
                  {{alldata.totalYearCompare>0?alldata.totalYearCompare:-alldata.totalYearCompare}}%
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalTargetGrossExp)">本月目标实现毛利：</span>
                <span class="black" @click.stop="tantan(alertNr.totalTargetGrossExp)">
                  <span
                    :class="alldata.totalTargetProfit>=0?'red':'green'"
                  >{{alldata.totalTargetProfit}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalFinishGrossExp)">目前毛利润：</span>
                <span class="black" @click.stop="tantan(alertNr.totalFinishGrossExp)">
                  <span
                    :class="alldata.totalGrossProfitMoney>=0?'red':'green'"
                  >{{alldata.totalGrossProfitMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalBearMoneyExp)">本月费用：</span>
                <span class="black" @click.stop="tantan(alertNr.totalBearMoneyExp)">
                  <span :class="alldata.totalBearMoney>=0?'red':'green'">{{alldata.totalBearMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalMonthNetExp)">本月净利润：</span>
                <span class="black" @click.stop="tantan(alertNr.totalMonthNetExp)">
                  <span :class="alldata.totalNetProfit>=0?'red':'green'">{{alldata.totalNetProfit}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalBearsMoneyExp)">本月分摊及财务费用：</span>
                <span class="black" @click.stop="tantan(alertNr.totalBearsMoneyExp)">
                  <span
                    :class="alldata.totalBearsMoney>=0?'red':'green'"
                  >{{alldata.totalBearsMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalMonthNetsExp)">本月净净利：</span>
                <span class="black" @click.stop="tantan(alertNr.totalMonthNetsExp)">
                  <span
                    :class="alldata.totalNetsProfit>=0?'red':'green'"
                  >{{alldata.totalNetsProfit}}万</span>
                </span>
              </div>
              <div style="border-bottom:1px solid #ccc;">
                <span class="blue" @click.stop="tantan(alertNr.totalGrossDifExp)">距离实现本月目标毛利：</span>
                <span class="black" @click.stop="tantan(alertNr.totalGrossDifExp)">
                  <span
                    :class="alldata.totalTargetProfitDif>=0?'red':'green'"
                  >{{alldata.totalTargetProfitDif}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalYearNetExp)">年净利：</span>
                <span class="black" @click.stop="tantan(alertNr.totalYearNetExp)">
                  <span :class="alldata.totalYearNet>=0?'red':'green'">{{alldata.totalYearNet}}万</span>
                </span>
              </div>
              <div>
                <span class="blue" @click.stop="tantan(alertNr.totalYearNetsExp)">年净净利：</span>
                <span class="black" @click.stop="tantan(alertNr.totalYearNetsExp)">
                  <span :class="alldata.totalYearNets>=0?'red':'green'">{{alldata.totalYearNets}}万</span>
                </span>
              </div>
              <div style="border-bottom:1px solid #ccc;">
                <span
                  class="blue"
                  @click.stop="tantan(alertNr.totalTargetNetExp)"
                >实现目标月{{alldata.targetName?alldata.targetName:'净利'}}：</span>
                <span class="black" @click.stop="tantan(alertNr.totalTargetNetExp)">
                  <span :class="alldata.totalTargetNet>=0?'red':'green'">{{alldata.totalTargetNet}}万</span>
                </span>
              </div>

              <div @click.stop="tantan(alertNr.totalTbClueExp)">
                <span class="blue">TB线索：</span>
                <span class="black">
                  <span
                    :class="alldata.totalTBClueMoney>=0?'red':'green'"
                  >{{alldata.totalTBClueMoney}}万</span>
                </span>
              </div>
              <div @click.stop="tantan(alertNr.totalOpenTenderExp)">
                <span class="blue">本月开标：</span>
                <span class="black">
                  <span
                    :class="alldata.totalOpenTenderMoney>=0?'red':'green'"
                  >{{alldata.totalOpenTenderMoney}}万</span>
                </span>
              </div>
              <div @click.stop="tantan(alertNr.totalGetTenderExp)">
                <span class="blue">本月中标：</span>
                <span class="black">
                  <span
                    :class="alldata.totalGetTenderMoney>=0?'red':'green'"
                  >{{alldata.totalGetTenderMoney}}万</span>
                </span>
              </div>
              <div style="border-bottom:1px solid #ccc;">
                <span class="blue">已中标未下单：</span>
                <span class="black">
                  <span
                    :class="alldata.totalGetTenderNotMoney>=0?'red':'green'"
                  >{{alldata.totalGetTenderNotMoney}}万</span>
                </span>
                <span style="text-decoration: underline;float:right;" @click="zhankai(2)">
                  <!-- <router-link :to="{path:'/tanchujh/jrwc',query:{date:value1}}"></router-link> -->
                  展开
                </span>
              </div>
              <!-- <div>
              <span class="blue" @click.stop="$message.warning(alertNr.totalDayMoneyExp)">本月丢标：</span>
              <span class="black" @click.stop="$message.warning(alertNr.totalDayMoneyExp)"><span :class="totalLoseTenderMoney>=0?'red':'green'">{{totalLoseTenderMoney}}万</span></span>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="zhongjiedata({index:1})" :class="soit===1?'act':''">
          <span class="menu_border">
            部门榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:4})" :class="soit===4?'act':''">
          <span class="menu_border">
            战队榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:2})" :class="soit===2?'act':''">
          <span class="menu_border">
            客户榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:3})" :class="soit===3?'act':''">
          <span class="menu_border">
            全体销售
            <span class="menu_border_line"></span>
          </span>
        </div>
      </div>
      <!-- <el-tabs
        style="border:1px solid #fff;box-shadow:none;font-size:0.3rem;text-align:left;"
        @tab-click="zhongjiedata"
        ref="tabs"
      >-->
      <div :style="{display:soit===1?'block':'none'}">
        <div class="bd_search">
          <div class="bd_search_a">
            <el-input
              size="small"
              placeholder="请输入部门名称"
              v-model="bmkword"
              class="qu_cuHead_search "
            ></el-input>
            <i class="el-icon-search bd_search_btn" @click="zhongjiedata"></i>
            <input type="text" id="ceshiinput" style="display:none;" />
          </div>
          <div class="bd_search_b">
            <el-select
              size="small"
              v-model="searchValue"
              placeholder="请选择"
              @change="search_change(paixunum)"
            >
              <el-option
                v-for="item in searchType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="search_px search_px_pc">
          <p v-for="(itemSearch,len3) in searchType" :key="len3">
            <span
              :class="paixunum==itemSearch.value?'search_px_tit act':'search_px_tit'"
              @click="paixu(itemSearch.value)"
            >{{itemSearch.label}}</span>
          </p>
        </div>

        <Bumen
          v-show="soit===1&&zhuan=='切换至文字版'"
          :tabdata1.sync="tabdata1"
          :jxq.sync="jxq"
          :value1.sync="value1"
          :alertNr.sync="alertNr"
          :zhezhao.sync="zhezhao"
          @confirm="confirm"
        ></Bumen>
      </div>
      <!-- <el-tab-pane ref="zdb" label="战队榜" @tab-click="aler(4)"> -->
      <div :style="{display:soit===4?'block':'none'}">
        <h3
          style="text-align:right;font-size:0.3rem;padding-right:0.3rem;line-height:0.6rem;"
          v-show="soit===4"
        >
          <span style="text-decoration: underline;" @click="qhbb2">{{zhuan2}}</span>
        </h3>
        <Zhandui v-show="soit===4&&zhuan2=='切换至文字版'" :tabdata1.sync="tabdata4"></Zhandui>
        <ZhanduiWzb
          v-show="soit===4&&zhuan2=='切换至表格版'"
          :value1.sync="value1"
          :tabdata1.sync="tabdata4"
          style="background:#fff;"
        ></ZhanduiWzb>
      </div>
      <div :style="{display:soit===2?'block':'none'}">
        <div style="background:#fff;">
          <el-input placeholder="请输入客户名称" v-model="khkword" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="zhongjiedata"></el-button>
          </el-input>
        </div>
        <Kehu :tabdata1.sync="tabdata2"></Kehu>
      </div>
      <div :style="{display:soit===3?'block':'none'}">
        <div class="bd_search">
          <div class="bd_search_a">
            <el-input
              size="small"
              placeholder="请输入销售名称"
              v-model="xskword"
              class="qu_cuHead_search "
            ></el-input>
            <i class="el-icon-search bd_search_btn" @click="zhongjiedata"></i>
          </div>
        </div>
        <div class="search_pxbox">
          <div class="search_px">
            <p v-for="(itemSearch,len3) in searchType3" :key="len3">
              <span
                :class="paixunum1==itemSearch.value?'search_px_tit act':'search_px_tit'"
                @click="paixu1(itemSearch.value)"
              >{{itemSearch.label}}</span>
            </p>
          </div>
          <div class="search_px_btn" @click="XiaoSouListChange">{{showOrHide?'展开全部':'收起全部'}}</div>
        </div>

       
        <User1 :tabdata1.sync="tabdata3"></User1>
      </div>
      <!-- </el-tabs> -->
    </div>

    <div
      v-show="topshow"
      @click="gotop"
      style="position:fixed;bottom:20px;right:20px;width:1rem;height:1rem;background:skyblue;border-radius:1rem;color:#fff;font-size:0.6rem;line-height:1rem;opacity:0.8;"
    >
      <i class="el-icon-top"></i>
    </div>
    <div :style="zhezhao"></div>
  </div>
</template>
<script>


// import BScroll from "better-scroll";
import {
  adddata,
  chakehu,
  updata,
  needdata,
  chabumen,
  chakh,
  chazhandui,
  getXSuser,
  gettc
} from "@/api/config";
import { getisread } from "@/api/configWu";

let ybs = 5;
import Wzb from "@/view/indexCom/indexwzb";
import Bumen from "@/view/indexCom/bumen";
import Wzb1 from "@/view/indexCom/indexwzb1";
import Zhandui from "@/view/indexCom/zhandui";
import ZhanduiWzb from "@/view/indexCom/zhanduiwzb";
import Kehu from "@/view/indexCom/kehu";
import User from "@/view/indexCom/user";
import User1 from "@/view/indexCom/user1";
import Head from "@/view/common/head";
export default {
  components: {
    Wzb,
    Bumen,
    Wzb1,
    Zhandui,
    Kehu,
    User,
    User1,
    Head,
    ZhanduiWzb
  },
  name: "index",
  data() {
    return {
      showOrHide:false,
      searchValue: "",
      searchType: [
        {
          value: "5",
          label: "实际销售额"
        },
        {
          value: "4",
          label: "标准销售额"
        },
        {
          value: "1",
          label: "实时完成率"
        },
        {
          value: "2",
          label: "净利"
        },
        {
          value: "3",
          label: "净净利"
        }
      ],
      searchType3: [
        {
          value: "1",
          label: "累计完成"
        },
        {
          value: "2",
          label: "实时完成率"
        },
        {
          value: "3",
          label: "标准销售额"
        }
      ],
      isread: false,
      paixunum1: 1,
      zhezhao: {},
      zhuan: "切换至文字版",
      zhuan1: "切换至表格版",
      zhuan2: "切换至文字版",
      rqkj: false,
      soit: 1,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      alldata: {},
      istop: true,
      bmkword: "",
      xskword: "",
      khkword: "",
      ladzd: true,
      // ybs:4,
      iszdz: false,
      iszdzs: [
        "0130396025886468",
        "5126312424152546",
        "51206852656521",
        "30929",
        "4412580523473075"
      ],
      yss: ["yl", "ql", "lql", "fs", "qh", "qgreen"],
      tabdata4: [],
      topshow: false,
      dayTotalGrossProfit: "",
      span: 7,
      type: false,
      hb: "",
      tb: "",
      loadingConnecting: false,
      down: false,
      up: true,
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        textup: "上拉加载更多", // 松开立即刷新
        rotate: "" // icon-rotate
      },
      arr: [],
      jingli: 0,
      jingjingli: 0,
      tzshow: false,
      // scroll:true,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      urlA: "",
      nianjihua: "",
      nianleiji: "",
      nianmaoli: "",
      yuejihua: "",
      yueleiji: "",
      totalTBClueMoney: "",
      yuemaoli: "",
      act: 1,
      act1: true,
      box: "100",
      value1: "",
      totalLoseTenderMoney: "",
      value2: "",
      state2: "",
      input10: "",
      input11: "",
      show2: false,
      choose: {},
      tableData5: [],
      tableData6: [],
      tableData7: [],
      isshow: 1,
      initdate: "",
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      alldata: {},
      jinzhi: false,
      scrollY: 0,
      isscroll: true,
      paixunum: 1,
      paixulist: ["rateNo", "netNo", "netsNo"],
      paixulist1: ["saleNo", "rateNo", "standSaleNo"],
      alertNr: {}
    };
  },

  created() {
    if (this.$route.query.search != "") {
      this.bmkword = this.$route.query.search;
    }
    if (this.$route.query.iswzb == true) {
      this.zhuan = "切换至表格版";
    }
  },
  mounted() {
    this.getcolor();
    this.aler();
    var that = this;
    this.gettc();
    document.removeEventListener("scroll", this.listenerFunction);
    this.gethong();
    this.getact();
    // document.addEventListener("mousedown", this.mousedownFunc);
  },
  watch: {
    value1() {
      this.pagenum = 1;
      this.getallData();
    }

    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
  },

  methods: {
    XiaoSouListChange(){
      this.showOrHide=!this.showOrHide;
      var page= this.showOrHide?1:0;
      getXSuser({page}).then((res)=>{
        if(res=="success"){
          this.tabdata3=res.saleInfoList;
        }
      });
      
    },
    search_change(paixunum) {
      this.paixu(paixunum);
    },
    getact() {
      var that = this;
      getnew();
      function getnew() {
        var lodata = JSON.parse(sessionStorage.getItem("leaderMenus"));
        if (lodata) {
          lodata.forEach((e, index) => {
            if (e.path == "/xsleader") {
              that.act = index + 1;
            }
          });
        } else {
          setTimeout(function() {
            getnew();
            // alert(111)
          }, 300);
        }
      }
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        // //console.log()
        this.isread = res.data.isread;
      });
    },
    confirm(a) {
      //console.log(a)
      this.zhezhao = a;
    },
    zhankai(a) {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      if (a == 1) {
        this.$router.push({ path: "/tanchujh/jrwc", query: { date: date1 } });
      } else if (a == 2) {
        this.$router.push({ path: "/zbwxd", query: { date: date1, type: 1 } });
      }
    },
    tantan1(a) {
      //console.log(a)
      return a;
    },
    tantan(b) {
      // alert(111)
      var a = window.event || event;
      var apath = a.path || (a.composedPath && a.composedPath());
      // alert(apath.length)
      if (b) {
        //console.log(a)
        var zhezhaoobj = {
          background: "rgba(0,0,0,0.3)",
          width: apath[0].clientWidth + "px",
          height: apath[0].clientHeight + "px",
          position: "absolute",
          top:
            apath[0].getBoundingClientRect().top +
            document.documentElement.scrollTop +
            document.body.scrollTop +
            "px",
          left: apath[0].offsetLeft + "px"
        };

        //console.log(this.zhezhao)
        // alert('aaa'+a.path[0].offsetLeft)
        this.$message.closeAll();
        this.zhezhao = zhezhaoobj;
        var obj = {};
        obj.message = b;
        obj.duration = 0;
        obj.showClose = true;
        obj.onClose = this.closeTc;
        // obj.iconClass = '1111'
        this.$message.warning(obj);
      }
    },
    closeTc() {
      this.zhezhao = {};
    },
    gettc() {
      gettc().then(res => {
        //console.log(res)
        this.alertNr = res;
      });
    },
    paixu(a) {
      this.searchValue =
        a == 5
          ? "实际销售额"
          : a == 4
          ? "标准销售额"
          : a == 3
          ? "净净利"
          : a == 2
          ? "净利"
          : a == 1
          ? "实时完成率"
          : "";
      this.paixunum = a;
      this.sort(this.paixulist[a - 1]);
    },
    paixu1(a) {
      this.paixunum1 = a;
      this.sort1(this.paixulist1[a - 1]);
    },
    sort1(type) {
      this.sortType = type;
      this.tabdata1.sort(this.compare(type));
      // //console.log(type)
      switch (type) {
        case "saleNo":
          this.sortType = "saleNo";
          this.tabdata3.sort(this.compare("saleNo"));
          // //console.log(this.tabdata1)
          break;
        case "rateNo":
          // //console.log('净利')
          this.sortType = "rateNo";
          this.tabdata3.sort(this.compare("rateNo"));
          break;
        case "standSaleNo":
          // //console.log('净利利')
          this.sortType = "standSaleNo";
          this.tabdata3.sort(this.compare("standSaleNo"));
          break;
      }
    },
    sort(type) {
      this.sortType = type;
      this.tabdata1.sort(this.compare(type));
      // //console.log(type)
      switch (type) {
        case "rateNo":
          this.sortType = "rateNo";
          this.tabdata1.sort(this.compare("rateNo"));
          // //console.log(this.tabdata1)
          break;
        case "netNo":
          // //console.log('净利')
          this.sortType = "netNo";
          this.tabdata1.sort(this.compare("netNo"));
          break;
        case "netsNo":
          // //console.log('净利利')
          this.sortType = "netsNo";
          this.tabdata1.sort(this.compare("netsNo"));
          break;
      }
    },
    compare(attr) {
      return function(a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        //console.log(a.attr)
        return val1 - val2;
      };
    },

    qhbb2() {
      this.$message.closeAll();
      console.log(this.zhuan2);
      if (this.zhuan2 == "切换至文字版") {
        this.zhuan2 = "切换至表格版";
      } else {
        // alert(111)
        this.zhuan2 = "切换至文字版";
      }
    },
  
    mousedownFunc(e) {
      try {
        this.$refs.timechoose.blur();
      } catch (error) {}
    },
    listenerFunction(e) {
      document.addEventListener("scroll", this.handleScroll);
    },

    handleScroll() {
      if (window.pageYOffset > 1000) {
        this.topshow = true;
      } else {
        this.topshow = false;
      }

      // //console.log(this.$refs)
      try {
        if (this.$refs.content.clientHeight) {
          var boxnum = this.$refs.content.clientHeight;
        }
        if (
          window.outerHeight + window.pageYOffset + 1000 >= boxnum &&
          this.isscroll
        ) {
          //console.log(111);

          this.isscroll = false;
          this.getallData();
        }
      } catch (err) {
        // //console.log(err);
      }
    },

    ceshi() {
      //console.log(111);
    },
    getcolor() {
      this.iszdzs.forEach(e => {
        if (e === localStorage.getItem("userid")) {
          this.iszdz = true;
          return;
        }
      });
      if (!this.iszdz) {
      }

      var num = Math.random() * 10;
      // //console.log(num.toString().slice(0,1))
      if (num.toString().slice(0, 1) > 4) {
        this.getcolor();
        ybs--;
        if (this.ybs < 0) {
          ybs = 5;
        }
        return ybs;
      } else {
        return num.toString().slice(0, 1);
      }
    },
    jxq(a, b, c) {
      // //console.log(a)
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      // //console.log(this.scroll.absStartY);
      // alert(document.body.scrollTop+document.documentElement.scrollTop)
      this.$router.push({
        path: "/leadbmjy",
        query: {
          id: a,
          date: date1,
          name: b,
          departid: c,
          top: document.body.scrollTop + document.documentElement.scrollTop,
          search: this.bmkword,
          iswzb: this.zhuan === "切换至表格版"
        }
      });
    },
    gotop() {
      // this.scroll.stop();
      // //console.log( this.scroll.scrollBy)
      // //console.log(111)
      this.topshow = false;
      //console.log(this.topshow);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    setdate() {
      this.$picker.show({
        type: "datePicker",
        date: this.initdate,
        endTime: "2099-01-01", //截至时间
        startTime: "2010-02-11", //开始时间
        onOk: date => {
          // //console.log(date);
          this.value1 = date; // birthday就是所需字段，在data 里定义下
          this.initdate = date;
          this.pagenum = 1;
          this.getallData();
        }
      });
    },

    aler() {
      //   alert(111)
      var type = localStorage.getItem("type");
      if (type == 3) {
        this.span = 7;
        this.type = true;
      }
      var inittime = new Date();
      function jiazero(a) {
        if (a < 10) {
          return "0" + a;
        } else {
          return a;
        }
      }
      this.initdate =
        inittime.getFullYear() +
        "-" +
        jiazero(Number(inittime.getMonth()) + 1) +
        "-" +
        jiazero(Number(inittime.getDate()));
      this.value1 = this.initdate;
    },
    goA() {
      this.urlA =
        "http://wxtest1.98ep.com/khgx/khgx.html?userid=" +
        localStorage.getItem("userid");
      location.href = this.urlA;
    },
    setbiaogeWid(a, b) {
      this.box = (a - 30) / b;
    },
    zhongjiedata(a) {
      this.$message.closeAll();
      this.isscroll = false;
      if (a.index) {
        this.soit = a.index;
        if (a.index == 1) {
          this.ladzd = true;
        } else {
          this.ladzd = false;
        }
        this.indexnum = Number(a.index);
      }
      this.pagenum = 1;
      this.getallData();
    },
    timechange() {
      this.pagenum = 1;
      this.getallData();
    },
    getallData() {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      if (this.indexnum == 1) {
        chabumen({
          keyword: this.bmkword,
          submitTime: date1,
          page: this.pagenum,
          sortname: this.searchValue,
          sort: 1,
          role: localStorage.getItem("role")
        })
          .then(res => {

            this.alldata = res;

            if (this.pagenum == 1) {
              this.tabdata1 = res.saleInfoList;
            } else {
            }
            this.jingli = 0;
            this.jingjingli = 0;
            var jsid = 0;
            this.tabdata1.forEach(element => {
              // //console.log(element.monthBadDeb)
              element.id = jsid;
              jsid++;
              this.jingli += Number(element.netProfit);
              this.jingjingli += Number(element.netsProfit);
            });
            this.jingli = this.jingli.toFixed(2);
            this.jingjingli = this.jingjingli.toFixed(2);

            if (res.saleInfoList.length > 0) {
              this.pagenum++;
            } else {
              this.pulldownTip.textup = "我是有底线的";
            }
            //console.log(this.$route.query.top);

            try {
              setTimeout(() => {
                if (this.$route.query.top) {
                  document.body.scrollTop = this.$route.query.top;
                  document.documentElement.scrollTop = this.$route.query.top;
                  this.$route.query.top = 0;
                }
              }, 200);
            } catch (error) {
              // //console.log(error)
            }
            setTimeout(() => {
              this.$nextTick(() => {
                this.listenerFunction();
              });
            }, 200);

            // this.setechart();
          })
          .catch(error => {
            // //console.log(error)
            // open('添加失败')
          });
      } else if (this.indexnum == 2) {
        chakh({
          keyword: this.khkword,
          submitTime: date1,
          page: this.pagenum,
          role: localStorage.getItem("role")
        })
          .then(res => {
            this.alldata = res;
            if (this.pagenum == 1) {
              this.tabdata2 = res.saleInfoList;
            } else {
              for (var i = 0; i < res.saleInfoList.length; i++) {
                this.tabdata2.push(res.saleInfoList[i]);
              }
            }

            if (res.saleInfoList.length > 0) {
              this.isscroll = true;
              this.pagenum++;
            } else {
              this.pulldownTip.textup = "我是有底线的";
            }

            // this.setechart();
            if (this.tabdata2.length > 0) {
            }
          })
          .catch(error => {});
      } else if (this.indexnum == 3) {
        needdata({
          keyword: this.xskword,
          submitTime: date1,
          page: this.pagenum,
          role: localStorage.getItem("role")
        })
          .then(res => {
            this.alldata = res;

            if (this.pagenum == 1) {
              this.tabdata3 = res.saleInfoList;
            } else {
              for (var i = 0; i < res.saleInfoList.length; i++) {
                this.tabdata3.push(res.saleInfoList[i]);
              }
              // //console.log(scrollTop);
              // document.documentElement.scrollTop = scrollTop;
            }

            if (res.saleInfoList.length > 0) {
              this.isscroll = true;
              this.pagenum++;
            } else {
              this.pulldownTip.textup = "我是有底线的";
            }
            // this.setechart();
          })
          .catch(error => {});
      } else {
        chazhandui({
          submitTime: date1,
          page: this.pagenum,
          role: localStorage.getItem("role")
        })
          .then(res => {
            this.alldata = res;
            if (this.pagenum == 1) {
              this.tabdata4 = res.saleInfoList;
            } else {
            }
            //console.log(this.tabdata4);
            this.jingli = 0;
            this.jingjingli = 0;
            this.tabdata1.forEach(element => {
              this.jingli += Number(element.netProfit);
              this.jingjingli += Number(element.netsProfit);
            });
            this.jingli = this.jingli.toFixed(2);
            this.jingjingli = this.jingjingli.toFixed(2);
            this.alldata = res;
            if (res.saleInfoList.length > 0) {
              this.pagenum++;
              // alert(this.pagenum)
              // this.scroll = true;
            } else {
              this.pulldownTip.textup = "我是有底线的";
            }
            // this.setechart();
          })
          .catch(error => {
            // //console.log(error)
            // open('添加失败')
          });
      }
    },
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    hastype() {
      if (localStorage.getItem("type") == 3) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="stylus"  scoped>

.bd_search {
  background: #fff;
}
.search_px {
  font-size: 14px;
  padding: 0px 0 10px;
  width:100%;
  display: flex;
  background: #fff;
}
.search_px_pc {
  display: none;
}
.search_px p {
  width: 20%;
  color: #333;
  position: relative;
}
.search_px_tit {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 0 20px;
}
.search_px_tit:after {
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 4px solid #999;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid transparent;
  position: absolute;
  top: 8px;
  right: 5px;
  content: " ";
}
.search_px_tit.act {
  color: #409eff;
}
.search_px_tit.act:after {
  border-top: 4px solid #409eff;
}

.search_pxbox{
  display: flex;
  background: #fff;
  padding:2px 12px;
  position: relative;
}
.search_pxbox .search_px {
  margin-right:70px;
}
.search_pxbox .search_px p{
  width:33.333333%;
  text-align: left;
}
.search_pxbox .search_px_tit{
  padding:0 15px 0 0;
  font-size:12px;

}
.search_px_btn{
    position: absolute;
    right: 12px;
    font-size: 12px;
    top: -2px;
    padding: 0 10px;
    border: 1px solid #409eff;
    line-height: 24px;
    border-radius: 30px;
    text-align: center;
    color: #409eff;
}
.menubox {
  border-bottom: 1px solid #f0f0f0;
  margin-top: 8px;
}
.menubox > div {
  width: 25%;
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
#pxcord > span {
  text-decoration: underline;
  color: black;
}
#pxcord > .xuanzhong {
  color: #ccc;
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
  font-weight: bold;
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
  
  border-right: 1px solid black;
}

@media screen and (min-width: 850px) {
  .search_px_pc {
    display: flex;
  }
  .bd_search_b {
    display: none;
  }
  .search_pxbox .search_px_tit{
    font-size:14px;

  }
  .search_px_btn{
      position: absolute;
      right: 12px;
      font-size: 14px;
      top: -1px;
      padding: 0 10px;
      border: 1px solid #409eff;
      line-height: 26px;
      border-radius: 30px;
      text-align: center;
      color: #409eff;
  }
}
.show {
  display: block;
}
.hidden {
  display: none;
}


</style>