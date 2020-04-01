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
        <div v-show="item.is_act " class="wztabs_details tabs_details">
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
          <div class="padd_bt12 border_bf0f0f0">
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
                <span :class="item.monthCompare>0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
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
                <span :class="item.yearCompare>0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
              </p>
              <p class="tabs_four_a mart8">
                超额/差额：
                <span
                  :class="item.differenceMoney>0?'rate_red':'rate_green'"
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
                  :class="item.differenceMoney>0?'rate_red':'rate_green'"
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
                <span :class="item.monthCompare>0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
              </p>
              <p class="tabs_four_a mart8">
                目前中标：
                <span class="color333">{{item.getTenderMoney}}万</span>
              </p>

              <p class="tabs_four_a mart8">
                同比：
                <span :class="item.yearCompare>0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
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
.tabs_rate_pc {
  display: none;
}

.wztabs_a {
  line-height: 20px;
  color: $color333;
}

.tabs_four_copy {
  line-height: 24px;
  font-size: $fs13;
  width: 65px;
  text-align: center;
  background: $colorfff;
  border-radius: 4px;
  color: $color909399;
  border: 1px solid $colorf0f0f0;
  position: absolute;
  right: 0;
  bottom: 3px;
  cursor: pointer;
}

.tabs_five {
  display: flex;
  border-left: 1px solid $colorf0f0f0;
  border-top: 1px solid $colorf0f0f0;
  flex-wrap: wrap;
}

.tabs_biaoge_all {
  box-sizing: border-box;
  width: 33.333333%;
  padding: 12px 0;
  text-align: center;
  border-bottom: 1px solid $colorf0f0f0;
}

.tabs_biaoge_all:nth-child(3n) {
  border-right: 1px solid $colorf0f0f0;
}

.tabs_biaoge_all:nth-child(3n)>div {
  border-right: none;
}

.tabs_details {
  padding: 12px 15px;
}

.tabs_four {
  display: flex;
}

.tabs_four .tabs_four_a {
  font-size: $fs14;
  color: $color909399;
  width: 100%;
  line-height: 20px;
}

.wztabs_pc_all {
  flex-wrap: wrap;
}

.wztabs_pc_all>.tabs_four_a {
  width: 50%;
}

.wztabs_pc_all>.tabs_four_a:nth-child(2n) {
  text-align: right;
}

.wztabs_pc_all>.tabs_four_a.wztabs_pcdifmoney {
  width: 100%;
  text-align: left;
}

.tabs_four .tabs_four_b {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs14;
  color: $color409eff;
  line-height: 16px;
}

.tabs_four .tabs_four_c {
  display: block;
  font-size: $fs14;
  min-width: 80px;
  text-align: right;
  color: $colorff5c61;
  line-height: 16px;
}

.tabs_four .tabs_four_d {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs14;
  color: $colorff5c61;
  line-height: 16px;
}

.usertabsmobile {
  display: flex;
}

.usertabspc {
  display: none;
}

.tabs_thr {
  display: flex;
  position: relative;
}

.tabs_thr h3 {
  font-size: $fs16;
  color: $color333;
  width: 100%;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_thr span {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs13;
  line-height: 20px;
  cursor: pointer;
}

.tabs_thr span img {
  height: 12px;
  vertical-align: middle;
}

span.usertabs_paidan {
  text-align: center;
  min-width: 55px;
  line-height: 22px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  color: #409eff;
  position: absolute;
  right: 0;
}

.tabs_info {
  position: relative;
}

.tabs_info_line {
  height: 100%;
  z-index: 1;
  border-left: 2px solid #409eff;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom:0;
}

.tabs_lists {
  background: $colorfff;
  text-align: left;
}

.tabs_one, .tabs_two {
  display: flex;
  padding: 0 $padd15;
}

.tabs_two {
  cursor: pointer;
  user-select: none;
}

.tabs_one {
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 5px;
}

.tabs_two.act, .tabs_two:hover {
  background: #f5f7fa;
}

.tabs_normal {
  font-size: $fs13;
  line-height: 20px;
  padding: 8px 0;
  color: $color909399;
}

.tabs_normal_cont {
  font-size: $fs13;
  line-height: 20px;
  padding: 10px 0;
  color: $color909399;
}

.tabs_la {
  width: 12%;
  text-align: left;
  font-size: $fs12;
}

.tabs_lb {
  width: 34%;
}

.tabs_lc {
  width: 32%;
  text-align: right;
}

.tabs_ld {
  width: 22%;
  padding-left: 10px;
  text-align: right;
}

.tabs_lname {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_lmoney {
  color: #333;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_ld_img {
  width: 15px;
}

@media screen and (min-width: 850px) {
  .usertabsmobile {
    display: none;
  }

  .usertabspc {
    display: flex;
  }

  .tabs_rate_pc {
    display: block;
  }

  .tabs_rate_mobile {
    display: none;
  }

  .tabs_biaoge_all {
    width: 25%;
  }

  .tabs_biaoge_all:nth-child(3n) {
    border-right: none;
  }

  .tabs_biaoge_all:nth-child(4n) {
    border-right: 1px solid $colorf0f0f0;
  }

  .tabs_biaoge_all:nth-child(3n)>div {
    border-right: 1px solid $colorf0f0f0;
  }

  .tabs_biaoge_all:nth-child(4n)>div {
    border-right: none;
  }

  .wztabs_pc_all>.tabs_four_a {
    width: 25%;
  }

  .wztabs_pc_all>.tabs_four_a:nth-child(2n) {
    text-align: left;
  }

  .wztabs_pc_all>.tabs_four_a:nth-child(4n) {
    text-align: right;
  }

  .wztabs_pc_all>.tabs_four_a.wztabs_pcdifmoney {
    width: 25%;
  }
}
</style>