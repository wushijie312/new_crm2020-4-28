<template>
  <div class="tabs_lists mart8" style="min-height:300px;">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">部门负责人</div>
      <div
        class="tabs_normal tabs_lc"
      >{{searchValue1}}{{searchValue1=='实时完成率'||searchValue1=='部门费用率'||searchValue1=='人力成本费用率'||searchValue1=='年销售完成率'?'':'(万)'}}</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div class="tabs_two_box" v-for="(item,len1) in tabdata1" :key="len1">
      <div class="tabs_info">
        <div class="tabs_two">
          <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
          <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.departmentName}}</div>
          <div
            v-if="item.saleNo<=3 &&searchValue1!='实时完成率'"
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >{{searchValue1=="实际销售额"?item.finishMoney:searchValue1=="标准销售额"?item.standardFinishMoney:searchValue1=="实时完成率"?item.finishRate.split('/')[0]:searchValue1=="净利"?item.netProfit:searchValue1=="净净利"?item.netsProfit:searchValue1=="部门费用率"?item.netsProfit:searchValue1=="人力成本费用率"?item.netsProfit:searchValue1=="年销售完成率"?item.netsProfit:''}}</div>
          <div
            v-if="item.saleNo>3 &&searchValue1!='实时完成率' &&item.saleNo<=tabdata1.length-2"
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >***</div>
          <div
            v-if="item.saleNo>tabdata1.length-2 &&searchValue1!='实时完成率'"
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >{{searchValue1=="实际销售额"?item.finishMoney:searchValue1=="标准销售额"?item.standardFinishMoney:searchValue1=="实时完成率"?item.finishRate.split('/')[0]:searchValue1=="净利"?item.netProfit:searchValue1=="净净利"?item.netsProfit:searchValue1=="部门费用率"?item.netsProfit:searchValue1=="人力成本费用率"?item.netsProfit:searchValue1=="年销售完成率"?item.netsProfit:''}}</div>
          <div
            v-if="searchValue1=='实时完成率'"
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >{{item.finishRate.split('/')[0]}}</div>
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
            <div v-if="item.saleNo>7&&item.saleNo<=15">
              <img class="tabs_ld_img" :src="ku" />
              <img v-if="item.saleNo>9&&item.saleNo<=11" class="tabs_ld_img" :src="ku" />
              <span v-if="item.saleNo>11&&item.saleNo<=15">
                <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
              </span>
            </div>
            <div v-if="item.saleNo>15">
              <span>
                <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
              </span>
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
  data() {
    return {
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      qh: require("@/assets/img/bangdan/qh.png"),
      qh1: require("@/assets/img/bangdan/qh1.png"),
      bmys: require("@/assets/img/bangdan/bmys.png"),
      caidan: require("@/assets/img/bangdan/caidan.png"),
      cwqk: require("@/assets/img/bangdan/cwqk.png"),
      dd: require("@/assets/img/bangdan/dd.png"),
      zhuan: false
    };
  },
  props: ["tabdata1", "searchValue1", "value1"],

  methods: {

  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/bangdan.styl';

.tabs_two {
  cursor: auto;
}
</style>