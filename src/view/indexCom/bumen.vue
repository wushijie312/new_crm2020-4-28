<template>
  <div class="tabs_lists">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">部门负责人</div>
      <div class="tabs_normal tabs_lc">实际销售额(万)</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div
      class="tabs_two_box"
      v-for="(item,len1) in tabdata1"
      :key="len1"
      @click="details_handle(item,len1)"
    >
      <div :class="item.is_act?'tabs_two act':'tabs_two'">
        <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
        <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.departmentName}}</div>
        <div class="tabs_normal_cont tabs_lc tabs_lmoney">{{item.finishMoney}}</div>
        <div class="tabs_normal_cont tabs_ld">
          <div v-if="item.saleNo<=4">
            <img class="tabs_ld_img" v-for="(itemNo,len2) in 4-item.saleNo" :key="len2" :src="hua" />
            <img class="tabs_ld_img" :src="zan" />
          </div>
          <div v-if="item.saleNo<=7&&item.saleNo>4">
            <img class="tabs_ld_img" v-for="(itemNo,len2) in 8-item.saleNo" :key="len2" :src="xiao" />
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
      <div class="tabs_details">
        <div class="tabs_thr">
          <h3>{{item.departmentName}}</h3>
          <span>
            <img :src="qh" alt="转换" /> 文字版
          </span>
        </div>
        <div class="tabs_four">
          <p class="tabs_four_a">{{item.departmentName}}</p>
          <span class="tabs_four_b">查看详情</span>
        </div>
        <div class="tabs_four">
          <p class="tabs_four_a">{{item.departmentName}}</p>
          <span class="tabs_four_c">NO.{{item.saleNo}}</span>
        </div>
        <div class="tabs_four">
          <p class="tabs_four_a">{{item.departmentName}}</p>
          <div class="tabs_four_d">
            <div v-if="item.saleNo<=4">
              <img class="tabs_ld_img" v-for="(itemNo,len2) in 4-item.saleNo" :key="len2" :src="hua" />
              <img class="tabs_ld_img" :src="zan" />
            </div>
            <div v-if="item.saleNo<=7&&item.saleNo>4">
              <img class="tabs_ld_img" v-for="(itemNo,len2) in 8-item.saleNo" :key="len2" :src="xiao" />
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
    </div>
  </div>
</template>

<script>
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
      dd: require("@/assets/img/bangdan/dd.png")
    };
  },
  props: ["tabdata1", "jxq", "alertNr", "zhezhao"],
  mounted() {
    setTimeout(() => {
      console.log("1", this.tabdata1);
      console.log("2", this.jxq);
      console.log("3", this.alertNr);
      console.log("4", this.zhezhao);
    }, 1000);
  },
  methods: {
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
<style  lang="less" rel="stylesheet/less" scoped>
@import "../../assets/css/base.less";

.tabs_details {
  padding: @padd15;
}

.tabs_four {
  display: flex;
  margin-top:10px;
}
.tabs_four  .tabs_four_a{
  font-size: @fs14;
  color: @color333;
  width: 100%;
  line-height: 16px;
}
.tabs_four .tabs_four_b {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: @fs14;
  line-height: 16px;
}
.tabs_four .tabs_four_c {
  display: block;
  font-size: @fs14;
   min-width: 80px;
  text-align: right;
  color: @colorff5c61;
  line-height: 16px;
}
.tabs_four .tabs_four_d {
  display: block;
   min-width: 80px;
  text-align: right;
  font-size: @fs14;
  color: @colorff5c61;
  line-height: 16px;
}
.tabs_thr {
  display: flex;
}
.tabs_thr h3 {
  font-size: @fs16;
  color: @color333;
  width: 100%;
  line-height: 20px;
}
.tabs_thr span {
  display: block;
   min-width: 80px;
  text-align: right;
  font-size: @fs13;
  line-height: 20px;
}
.tabs_thr span img {
  height: 12px;
  vertical-align: middle;
}
.tabs_lists {
  background: @colorfff;
  text-align: left;
}

.tabs_one,
.tabs_two {
  display: flex;
  padding: @paddlr15;
}
/* .tabs_two{
  position: relative;
} */
.tabs_one {
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 5px;
}
.tabs_two.act,
.tabs_two:hover {
  background: #f5f7fa;
}

.tabs_normal {
  font-size: @fs13;
  line-height: 20px;
  padding: 8px 0;
  color: @color909399;
}
.tabs_normal_cont {
  font-size: @fs13;
  line-height: 20px;
  padding: 10px 0;
  color: @color909399;
}
.tabs_la {
  width: 12%;
  text-align: left;
  font-size: @fs12;
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
</style>