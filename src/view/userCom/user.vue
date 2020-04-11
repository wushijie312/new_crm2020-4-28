<template>
  <div class="tabs_lists mart8" style="min-height:300px;">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">销售</div>
      <div class="tabs_normal tabs_lc">{{searchValue3}}{{searchValue3=="实时完成率"?'':'(万)'}}</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div class="tabs_two_box" v-for="(item,len1) in tabdata3" :key="len1">
      <div class="tabs_info">
        <div v-if="item.is_act" class="tabs_info_line"></div>
        <div :class="item.is_act?'tabs_two act':'tabs_two'">
          <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
          <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.userName}}.{{item.departmentName}}</div>
          <div
            v-if="item.saleNo<=3 &&searchValue3!='实时完成率'"
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >{{searchValue3=="累计完成"?item.finishMoney:searchValue3=="实时完成率"?item.finishRate.split('/')[0]:searchValue3=="标准销售额"?item.standardFinishMoney:''}}</div>
          <div v-if="item.saleNo>3&&searchValue3!='实时完成率' &&item.saleNo<=tabdata3.length-2" class="tabs_normal_cont tabs_lc tabs_lmoney">***</div>
          <div v-if="item.saleNo>tabdata3.length-2&&searchValue3!='实时完成率'" class="tabs_normal_cont tabs_lc tabs_lmoney">{{searchValue3=="累计完成"?item.finishMoney:searchValue3=="实时完成率"?item.finishRate.split('/')[0]:searchValue3=="标准销售额"?item.standardFinishMoney:''}}</div>
          <div
            v-if="searchValue3=='实时完成率'"
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
            <div v-if="item.saleNo==5">
              <img class="tabs_ld_img" :src="zan" />
            </div>
            <div v-if="item.saleNo<=10&&item.saleNo>5">
              <img class="tabs_ld_img" v-for="(itemNo,len2) in 1" :key="len2" :src="xiao" />
            </div>
            <div v-if="item.saleNo>10&&item.saleNo<=15 &&pagenum==1">
              <img class="tabs_ld_img" :src="xiao" />
            </div>
            <div v-if="item.saleNo>15 &&pagenum==1">
              <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
            </div>
            <div v-if="item.saleNo>10 &&pagenum==-1">
              <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
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
  props: ["tabdata3", "pagenum", "searchValue3"],
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
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/bangdan.styl';

.tabs_two {
  cursor: auto;
}

@media screen and (min-width: 850px) {
  .tabs_la {
    width: 25%;
  }

  .tabs_lb {
    width: 25%;
  }

  .tabs_lc {
    width: 25%;
  }

  .tabs_ld {
    width: 25%;
  }
}
</style>