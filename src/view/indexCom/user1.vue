<template>
  <div class="tabs_lists mart8">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">部门负责人</div>
      <div class="tabs_normal tabs_lc">实际销售额(万)</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div class="tabs_two_box" v-for="(item,len1) in tabdata1" :key="len1">
      <div class="tabs_info">
        <div v-if="item.is_act" class="tabs_info_line"></div>
        <div :class="item.is_act?'tabs_two act':'tabs_two'" @click="details_handle(item,len1)">
          <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
          <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.departmentName}}</div>
          <div class="tabs_normal_cont tabs_lc tabs_lmoney">{{item.finishMoney}}</div>
          <div class="tabs_normal_cont tabs_ld">
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
        <div v-show="item.is_act " class="wztabs_details tabs_details border_bf0f0f0">
          <div class="padd_b12 border_bf0f0f0">
            <div class="tabs_thr paddb3">
              <h3>{{item.departmentName}}</h3>
              <span class="usertabs_paidan" @click="gotoPaiDan(item.userId)">
                <i class="el-icon-s-promotion" style="color:#333;"></i>派单
              </span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                本月任务：
                <span>{{item.departmentLevel}}</span>
              </p>
              <span class="tabs_four_c">NO.{{item.saleNo}}</span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                本月已完成：
                <span>{{item.finishMoney}}</span>
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
          </div>
          <div class="padd_bt12 ">
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
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";

export default {
  props: ["tabdata1"],
  data() {
    return {
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png")
    };
  },
  methods: {
    gotoPaiDan(id) {
      this.$router.push({ path: "/create", query: { userid: id } });
    },
    details_handle(row, len) {
      this.tabdata1.map((item, index) => {
        if (len == index) {
          row.is_act = !row.is_act;
          this.$set(this.tabdata1, len, row);
        } else {
          item.is_act = false;
        }
      });
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../assets/css/bangdan.styl";
</style>