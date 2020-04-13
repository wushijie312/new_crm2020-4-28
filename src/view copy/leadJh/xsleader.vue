<template>
  <div class="wrapper xslead sobig" ref="wrapper" id="wrap">
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
              <el-date-picker
                ref="timechoose"
                v-model="value1"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
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

          <div style="overflow:hidden;">
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
                <span style="text-decoration: underline;float:right;" @click="zhankai(1)">展开</span>
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
                <span
                  :class="alldata.totalMonthCompare>=0?'red':'green'"
                >{{alldata.totalMonthCompare>0?alldata.totalMonthCompare:-alldata.totalMonthCompare}}%</span>
              </div>
              <div
                class="black"
                style="border-bottom:1px solid #ccc;"
                @click.stop="tantan(alertNr.totalCompareExp)"
              >
                去年同比
                <span
                  :class="alldata.totalYearCompare>=0?'red':'green'"
                >{{alldata.totalYearCompare>0?alldata.totalYearCompare:-alldata.totalYearCompare}}%</span>
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

              <div ref="bumenbang" @click.stop="tantan(alertNr.totalTbClueExp)">
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
                <span style="text-decoration: underline;float:right;" @click="zhankai(2)">展开</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="zhongjiedata({index:1})" :class="indexnum===1?'act':''">
          <span class="menu_border">
            部门榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:4})" :class="indexnum===4?'act':''">
          <span class="menu_border">
            战队榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:2})" :class="indexnum===2?'act':''">
          <span class="menu_border">
            客户榜
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="zhongjiedata({index:3})" :class="indexnum===3?'act':''">
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
      <div :style="{display:indexnum===1?'block':'none'}">
        <div v-if="tabdata1.length">
          <div class="qu_bumobile">
            <div class="fl qu_bmmobile_b">筛选：</div>
            <div class="fr clearfix">
              <div class="qu_bmmobile_a fl">
                <el-select
                  class="qu_bmmobile_select"
                  v-model="searchValue1"
                  placeholder="请选择"
                  @change="search_change"
                >
                  <el-option
                    v-for="item in searchType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="search_px search_px_pc">
            <p v-for="(itemSearch,len3) in searchType" :key="len3">
              <span
                :class="searchValue1==itemSearch.label?'search_px_tit act':'search_px_tit'"
                @click="bumenbanghandle(itemSearch.label)"
              >{{itemSearch.label}}</span>
            </p>
          </div>
          <Bumen
            v-show="indexnum===1&&zhuan=='切换至文字版'"
            :tabdata1.sync="tabdata1"
            :jxq.sync="jxq"
            :searchValue1="searchValue1"
            :value1.sync="value1"
            :alertNr.sync="alertNr"
          ></Bumen>
        </div>
        <div v-else class="nothing">暂无数据</div>
      </div>
      <!-- <el-tab-pane ref="zdb" label="战队榜" @tab-click="aler(4)"> -->
      <div :style="{display:indexnum===4?'block':'none'}">
        <div v-if="tabdata4.length">
          <h3
            style="text-align:right;font-size:0.3rem;padding-right:0.3rem;line-height:0.6rem;"
            v-show="indexnum===4"
          >
            <span style="text-decoration: underline;" @click="qhbb2">{{zhuan2}}</span>
          </h3>
          <Zhandui v-show="indexnum===4&&zhuan2=='切换至文字版'" :tabdata4.sync="tabdata4"></Zhandui>
          <ZhanduiWzb
            v-show="indexnum===4&&zhuan2=='切换至表格版'"
            :value1.sync="value1"
            :tabdata4.sync="tabdata4"
            style="background:#fff;"
          ></ZhanduiWzb>
        </div>
        <div v-else class="nothing">暂无数据</div>
      </div>
      <div :style="{display:indexnum===2?'block':'none'}">
        <div v-if="tabdata2.length">
          <div class="bd_search">
            <div class="bd_search_a">
              <el-input
                size="small"
                placeholder="请输入销售名称"
                v-model="khkword"
                class="qu_cuHead_search"
              ></el-input>
              <i class="el-icon-search bd_search_btn" @click="zhongjiedata"></i>
            </div>
          </div>
          <Kehu :tabdata2.sync="tabdata2"></Kehu>
        </div>
        <div v-else class="nothing">暂无数据</div>
      </div>
      <div :style="{display:indexnum===3?'block':'none'}">
        <div v-if="tabdata3.length">
          <div class="bd_search">
            <div class="bd_search_a">
              <el-input
                size="small"
                placeholder="请输入销售名称"
                v-model="xskword"
                class="qu_cuHead_search"
              ></el-input>
              <i class="el-icon-search bd_search_btn" @click="zhongjieuserdata"></i>
            </div>
          </div>
          <div class="search_pxbox">
            <div class="search_px">
              <p v-for="(itemSearch,len3) in searchType3" :key="len3">
                <span
                  :class="searchValue3==itemSearch.label?'search_px_tit act':'search_px_tit'"
                  @click="bumenbanghandle(itemSearch.label)"
                >{{itemSearch.label}}</span>
              </p>
            </div>
            <div class="search_px_btn" @click="XiaoSouListChange">{{showOrHide?'展开全部':'收起全部'}}</div>
          </div>
          <User :pagenum="pagenum" :tabdata3.sync="tabdata3" :searchValue3="searchValue3"></User>
        </div>
        <div v-else class="nothing">暂无数据</div>
      </div>
    </div>

    <!-- <ShowbackTop/> -->
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
  gettc
} from "@/api/config";
import { getisread } from "@/api/configWu";

import Wzb from "@/view/indexCom/indexwzb";
import Bumen from "@/view/indexCom/bumen";
import Wzb1 from "@/view/indexCom/indexwzb1";
import Zhandui from "@/view/indexCom/zhandui";
import ZhanduiWzb from "@/view/indexCom/zhanduiwzb";
import Kehu from "@/view/indexCom/kehu";
import User from "@/view/indexCom/user";
import Head from "@/view/common/head";
// import ShowbackTop from "@/components/showbackTop";
export default {
  components: {
    Wzb,
    Bumen,
    Wzb1,
    Zhandui,
    Kehu,
    User,
    Head,
    ZhanduiWzb
    // ShowbackTop
  },
  name: "index",
  data() {
    return {
      showOrHide: true,
      searchValue1: "实际销售额",
      searchValue3: "累计完成",
      searchType: [
        {
          label: "实际销售额"
        },
        {
          label: "标准销售额"
        },
        {
          label: "实时完成率"
        },
        {
          label: "净利"
        },
        {
          label: "净净利"
        }
      ],
      searchType3: [
        {
          label: "累计完成"
        },
        {
          label: "实时完成率"
        },
        {
          label: "标准销售额"
        }
      ],
      isread: false,
      zhuan: "切换至文字版",
      zhuan1: "切换至表格版",
      zhuan2: "切换至文字版",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      alldata: {},
      bmkword: "",
      xskword: "",
      khkword: "",
      pagenum: 1,
      indexnum: 1,
      act: 1,
      act1: true,
      value1: this.aler(),
      initdate: "",
      pageSize2: 10,
      pageSize4: 30,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata3xskword: [],
      tabdata4: [],
      isscroll: true,
      alertNr: {},
      loading: true
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
    // this.aler();
    this.getallData();
    this.gettc();
    //
    window.addEventListener("scroll", this.scrollBottom, true);
    this.gethong();
    this.getact();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollBottom, true);
  },
  watch: {
    indexnum() {
      this.$nextTick(() => {
        this.$refs.bumenbang.scrollIntoView();
      });
    },
    value1() {
      this.pagenum = 1;
      this.getallData();
    }
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
  },

  methods: {
    scrollBottom() {
      // 滚动到页面底部时
      // const el = document.getElementById("customlist");
      if (this.indexnum == 2) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        const toBottom = scrollHeight - scrollTop - clientHeight;
        if (
          toBottom < 30 &&
          this.loading &&
          this.tabdata2.length == this.pageSize2 * this.pagenum
        ) {
          this.loading = false;
          chakh({
            keyword: this.khkword,
            submitTime: this.value1,
            page: ++this.pagenum,
            pageSize: this.pageSize2,
            role: localStorage.getItem("role")
          }).then(res => {
            if (res.code == 200) {
              this.loading = true;
              this.tabdata2 = this.tabdata2.concat(res.saleInfoList);
            } else {
              this.$message.error({ message: `${res.message}` });
            }
          });
        }
      }
    },
    getis_act(tabsdata) {
      tabsdata.forEach(element => {
        element.is_act = false;
      });
    },
    bumenbanghandle(name) {
      if (this.indexnum == 1) {
        this.searchValue1 = name;
      } else if (this.indexnum == 3) {
        this.searchValue3 = name;
      }
      this.getallData();
    },
    XiaoSouListChange() {
      this.showOrHide = !this.showOrHide;
      this.pagenum = this.showOrHide ? -1 : 1;
      this.getallData();
    },
    search_change(val) {
      this.getallData();
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
          }, 300);
        }
      }
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        this.isread = res.data.isread;
      });
    },
    zhankai(a) {
      if (a == 1) {
        this.$router.push({
          path: "/tanchujh/jrwc",
          query: { date: this.value1 }
        });
      } else if (a == 2) {
        this.$router.push({
          path: "/zbwxd",
          query: { date: this.value1, type: 1 }
        });
      }
    },

    tantan(b) {
      if (b) {
        this.$message.closeAll();
        var obj = {};
        obj.message = b;
        obj.duration = 0;
        obj.showClose = true;
        this.$message.warning(obj);
      }
    },
    gettc() {
      gettc().then(res => {
        this.alertNr = res;
      });
    },

    qhbb2() {
      this.$message.closeAll();
      if (this.zhuan2 == "切换至文字版") {
        this.zhuan2 = "切换至表格版";
      } else {
        this.zhuan2 = "切换至文字版";
      }
    },

    jxq(a, b, c) {
      this.$router.push({
        path: "/leadbmjy",
        query: {
          id: a,
          date: this.value1,
          name: b,
          departid: c,
          top: document.body.scrollTop + document.documentElement.scrollTop,
          search: this.bmkword,
          iswzb: this.zhuan === "切换至表格版"
        }
      });
    },

    aler() {
      let date = new Date();
      let dates =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      return dates;
    },

    zhongjiedata(a) {
      this.$message.closeAll();
      this.isscroll = false;
      if (a.index) {
        this.indexnum = Number(a.index);
      }
      this.pagenum = 1;
      this.getallData();
    },
    zhongjieuserdata(val) {
      if (this.xskword) {
        this.tabdata3 = this.tabdata3xskword.filter((item, index) => {
          return item.userName.indexOf(this.xskword) > -1;
        });
      } else {
        this.tabdata3 = this.tabdata3xskword;
      }
    },
    getallData() {
      if (this.indexnum == 1) {
        chabumen({
          keyword: this.bmkword,
          submitTime: this.value1,
          page: this.pagenum,
          sortname: this.searchValue1,
          sort: 1,
          role: localStorage.getItem("role")
        }).then(res => {
          if (res.code == 200) {
            this.alldata = res;
            this.tabdata1 = res.saleInfoList;
            this.getis_act(this.tabdata1);
          } else {
            this.$message.error({ message: `${res.message}` });
          }
        });
      } else if (this.indexnum == 2) {
        chakh({
          keyword: this.khkword,
          submitTime: this.value1,
          pageSize: this.pageSize2,
          page: this.pagenum,
          role: localStorage.getItem("role")
        }).then(res => {
          if (res.code == 200) {
            this.alldata = res;
            this.tabdata2 = res.saleInfoList;
          } else {
            this.$message.error({ message: `${res.message}` });
          }
        });
      } else if (this.indexnum == 3) {
        let page = this.showOrHide ? -1 : 1;
        this.xskword = "";
        needdata({
          keyword: "",
          submitTime: this.value1,
          sortname: this.searchValue3,
          sort: 1,
          page: page,
          role: localStorage.getItem("role")
        }).then(res => {
          if (res.code == 200) {
            this.alldata = res;
            this.tabdata3 = res.saleInfoList;
            this.tabdata3xskword = res.saleInfoList;
            this.getis_act(this.tabdata3);
          } else {
            this.$message.error({ message: `${res.message}` });
          }
        });
      } else {
        chazhandui({
          submitTime: this.value1,
          page: this.pagenum,
          pageSize: this.pageSize4,
          role: localStorage.getItem("role")
        }).then(res => {
          if (res.code == 200) {
            this.alldata = res;
            this.tabdata4 = res.saleInfoList;
          } else {
            this.$message.error({ message: `${res.message}` });
          }
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
    }
  }
};
</script>
<style lang="stylus"  scoped>
.qu_bmmobile_select {
  width: 130px;
}

.qu_bupc {
  display: none;
}

.qu_bumobile {
  height: 38px;
  background: #fff;
  margin-bottom: 8px;
  padding: 0 15px;
  line-height: 38px;
}

.bd_search {
  display: flex;
  padding: 10px 12px;
  background: #fff;
}

.bd_search_a {
  width: 100%;
  position: relative;
}

.bd_search_btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: $colorb4b9bf;
  font-size: 20px;
}

.search_px {
  font-size: 13px;
  padding: 0px 0 10px;
  width: 100%;
  line-height: 20px;
  box-sizing: border-box;
  display: flex;
  background: #fff;
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
  padding: 0 20px 0 0;
}

.search_px_tit:after {
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 4px solid #999;
  border-right: 3px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 3px solid transparent;
  position: absolute;
  top: 8px;
  right: 6px;
  content: ' ';
}

.search_px_tit.act {
  color: #409eff;
}


.search_px_pc {
  display: none;
  font-size: 13px;
  padding: 10px 8px 10px;
}

.search_px_pc p {
  text-align: center;
  width: 20%;
}
  .search_px_pc p:nth-child(1) {
    text-align: left;
  }
  .search_px_pc p:nth-child(3) {
    width: 28%;
  }
  .search_px_pc p:nth-child(5) {
    text-align: right;
  }
.search_px_pc .search_px_tit {
  padding-right: 0;
}
.search_px_pc .search_px_tit {
  padding-right: 0;
}

.search_px_pc .search_px_tit:after {
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 4px solid #999;
  border-right: 3px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 3px solid transparent;
  position: absolute;
  top: 8px;
  right: -8px;
  content: ' ';
}

.search_px_tit.act:after {
  border-top: 4px solid #409eff;
}

.search_pxbox {
  display: flex;
  background: $colorfff;
  padding: 0px 12px;
  position: relative;
}

.search_pxbox .search_px {
  margin-right: 70px;
}

.search_pxbox .search_px p {
  width: 35%;
  text-align: left;
}

.search_pxbox .search_px p:first-child {
  width: 30%;
  text-align: left;
}

.search_pxbox .search_px_tit {
  padding: 0 15px 0 0;
  font-size: 12px;
}

.search_px_btn {
  position: absolute;
  right: 12px;
  font-size: 12px;
  top: -3px;
  padding: 0 6px;
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
  color:#333;
  cursor: pointer;
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

body, html {
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

table, tbody, thead {
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

.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
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

@media screen and (max-width: 640px) and (min-width: 375px) {
  .search_pxbox .search_px_tit {
    font-size: 13px;
  }

  .search_px_btn {
    font-size: 13px;
  }
}

@media screen and (min-width: 450px) {
  .search_pxbox .search_px_tit {
    font-size: 13px;
  }

  .search_px_btn {
    font-size: 13px;
  }
}

@media screen and (min-width: 850px) {
  .qu_bumobile {
    display: none;
  }

  .search_px_pc {
    display: flex;
    padding: 10px 20px 10px 15px;
  }
  .search_px_btn {
    position: absolute;
    right: 12px;
    font-size: 13px;
    top: -4px;
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