<!-- A.html -->
<template>
  <div class="wrapper" id="customlist" ref="customlist" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div :class="is_date?'date_a act':'date_a'">
        <el-date-picker
          v-model="value1"
          type="date"
          :editable="false"
          :clearable="false"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @focus="is_date=!is_date"
              @blur="is_date=!is_date"
        ></el-date-picker>
      </div>
      <div class="details_minheight">
        <div class="mart8 menubox" style="overflow:hidden;font-size:0.3rem;">
          <div
            class="left"
            v-for="(item,index) in delists"
            :key="index"
            @click="dehandle(item)"
            :class="item==deact?'act':''"
          >
            <span class="menu_border">
              {{item}}
              <span class="menu_border_line"></span>
            </span>
          </div>
        </div>
        <div class="details_one padd_bt6">
          <div class="detais_one_head" v-if="deact==delists[0]">
            <div class="tabs_thr paddb3">
              <h3>{{departmentName}}</h3>
              <span class="tabs_four_c">NO.{{salerlist.saleNo}}</span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                {{delists[0]}}：
                <span class="color333">{{salerlist.standardFinishMoney}}</span>
              </p>
              <div class="tabs_four_d">
                <div v-if="salerlist.saleNo<=4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 4-salerlist.saleNo"
                    :key="len2"
                    :src="hua"
                  />
                  <img class="tabs_ld_img" :src="zan" />
                </div>
                <div v-if="salerlist.saleNo<=7&&salerlist.saleNo>4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 8-salerlist.saleNo"
                    :key="len2"
                    :src="xiao"
                  />
                </div>
                <div v-if="salerlist.saleNo>7&&salerlist.saleNo<=15">
                  <img class="tabs_ld_img" :src="ku" />
                  <img
                    v-if="salerlist.saleNo>9&&salerlist.saleNo<=11"
                    class="tabs_ld_img"
                    :src="ku"
                  />
                  <span v-if="salerlist.saleNo>11&&salerlist.saleNo<=15">
                    <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                  </span>
                </div>
                <div v-if="salerlist.saleNo>15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
                </div>
              </div>
            </div>
          </div>
          <div class="detais_one_head" v-if="deact==delists[1]">
            <div class="tabs_thr paddb3">
              <h3>{{departmentName}}</h3>
              <span class="tabs_four_c">NO.{{salerlist.saleNo}}</span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                {{delists[1]}}：
                <span class="color333">{{salerlist.finishMoney}}</span>
              </p>
              <div class="tabs_four_d">
                <div v-if="salerlist.saleNo<=4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 4-salerlist.saleNo"
                    :key="len2"
                    :src="hua"
                  />
                  <img class="tabs_ld_img" :src="zan" />
                </div>
                <div v-if="salerlist.saleNo<=7&&salerlist.saleNo>4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 8-salerlist.saleNo"
                    :key="len2"
                    :src="xiao"
                  />
                </div>
                <div v-if="salerlist.saleNo>7&&salerlist.saleNo<=15">
                  <img class="tabs_ld_img" :src="ku" />
                  <img
                    v-if="salerlist.saleNo>9&&salerlist.saleNo<=11"
                    class="tabs_ld_img"
                    :src="ku"
                  />
                  <span v-if="salerlist.saleNo>11&&salerlist.saleNo<=15">
                    <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                  </span>
                </div>
                <div v-if="salerlist.saleNo>15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
                </div>
              </div>
            </div>
          </div>
          <div class="detais_one_head" v-if="deact==delists[2]">
            <div class="tabs_thr paddb3">
              <h3>{{departmentName}}</h3>
              <span class="tabs_four_c">NO.{{salerlist.saleNo}}</span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                {{delists[2]}}：
                <span class="color333">{{salerlist.finishRates}}</span>
              </p>
              <div class="tabs_four_d">
                <div v-if="salerlist.saleNo<=4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 4-salerlist.saleNo"
                    :key="len2"
                    :src="hua"
                  />
                  <img class="tabs_ld_img" :src="zan" />
                </div>
                <div v-if="salerlist.saleNo<=7&&salerlist.saleNo>4">
                  <img
                    class="tabs_ld_img"
                    v-for="(itemNo,len2) in 8-salerlist.saleNo"
                    :key="len2"
                    :src="xiao"
                  />
                </div>
                <div v-if="salerlist.saleNo>7&&salerlist.saleNo<=15">
                  <img class="tabs_ld_img" :src="ku" />
                  <img
                    v-if="salerlist.saleNo>9&&salerlist.saleNo<=11"
                    class="tabs_ld_img"
                    :src="ku"
                  />
                  <span v-if="salerlist.saleNo>11&&salerlist.saleNo<=15">
                    <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                  </span>
                </div>
                <div v-if="salerlist.saleNo>15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
                </div>
              </div>
            </div>
          </div>

          <div class="tabs_four wztabs_pc_all">
            <p class="tabs_four_a mart8">
              本月任务：
              <span class="color333">{{alldata.totalMthPlanMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              今日完成：
              <span class="color333">{{alldata.totalDayPlanMoney}}</span>
            </p>
            <p class="tabs_four_a mart8">
              截止今日应完成：
              <span class="color333">{{alldata.totalMonthShouldMoney}}万</span>
            </p>

            <p class="tabs_four_a mart8">
              今日毛利率：
              <span class="color333">{{alldata.dayTotalGrossProfit}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              累计毛利率：
              <span class="color333">{{alldata.totalMthGrossProfit}}</span>
            </p>

            <p class="tabs_four_a mart8">
              超额/差额：
              <span
                :class="alldata.moneyDifference>0?'rate_red':alldata.moneyDifference==0?'color333':'rate_green'"
              >{{alldata.moneyDifference}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              净利：
              <span class="color333">{{jingli}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              净净利：
              <span class="color333">{{jingjingli}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              上月环比：
              <span
                :class="alldata.totalMonthCompare>0?'rate_red':alldata.totalMonthCompare==0?'color333':'rate_green'"
              >{{alldata.totalMonthCompare>0?alldata.totalMonthCompare:-alldata.totalMonthCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              去年同比：
              <span
                :class="alldata.totalYearCompare>0?'rate_red':alldata.totalYearCompare==0?'color333':'rate_green'"
              >{{alldata.totalYearCompare>0?alldata.totalYearCompare:-alldata.totalYearCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              TB线索：
              <span class="color333">{{alldata.totalTBClueMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              本月开标：
              <span class="color333">{{alldata.totalOpenTenderMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              本月丢标：
              <span class="color333">{{alldata.totalGetTenderMoney}}万</span>
            </p>
          </div>
        </div>
      </div>
      <div class="all_go_back" @click="$router.go(-1)">返&nbsp;回</div>
    </div>
  </div>
</template>
<script>
import Head from "@/view/common/head";
import {
  adddata,
  chakehu,
  saleneeddata,
  getSalerIndex,
  needdata,
  salechabumen
} from "@/api/config";
export default {
  components: {
    Head
  },
  data() {
    return {
      is_date:false,

      deact: "标准销售额",
      delists: ["标准销售额", "累计完成", "实时完成率"],
      value1: this.$route.query.value1,
      pagenum: 1,
      act: 1,
      act1: false,
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      jingli: 0,
      jingjingli: 0,
      alldata: [],
      salerlist: [],
      departmentName: ""
    };
  },
  created() {},
  mounted() {
    this.departmentName =
      localStorage.getItem("departmentName") +
      "--" +
      localStorage.getItem("userName");
    this.getdata();
    this.getSalerIndex();
  },
  watch: {
    value1() {
      this.getdata();
      this.getSalerIndex();
    }
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
  },
  methods: {
    dehandle(val) {
      this.deact = val;
      this.getSalerIndex();
    },
    getSalerIndex() {
      getSalerIndex({
        userId: localStorage.getItem("userid"),
        submitTime: this.value1,
        sortname:
          this.deact == "标准销售额"
            ? "standardFinishMoney"
            : this.deact == "累计完成"
            ? "finishMoney"
            : this.deact == "实时完成率"
            ? "finishRates"
            : ""
      }).then(res => {
        if (res.code == 200) {
          this.salerlist = res;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getdata() {
      needdata({
        submitTime: this.value1,
        page: this.pagenum,
        role: ""
      }).then(res => {
        if (res.code == 200) {
          this.alldata = res;
          this.getjingli(res.saleInfoList);
        } else {
          this.$message.error({ message: `${res.message}` });
        }
      });
    },
    getjingli(tabsdata) {
      this.jingli = 0;
      this.jingjingli = 0;
      tabsdata.forEach(element => {
        this.jingli += Number(element.netProfit);
        this.jingjingli += Number(element.netsProfit);
      });
      this.jingli = this.jingli.toFixed(2);
      this.jingjingli = this.jingjingli.toFixed(2);
    }
  }
};
</script>
<style lang="stylus"  scoped>
@import '../../assets/css/bangdan.styl';

.details_minheight {
  height: 'calc(100vh - %s)' % 125px;
  background: $colorfff;
}

.detais_one_head {
  padding: 12px 0;
  margin-top: 8px;
  border-bottom: 1px solid $colorf0f0f0;
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
  color: #333;
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