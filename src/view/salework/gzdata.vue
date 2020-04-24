<!-- A.html -->
<template>
  <div>
    <div class="sale_cont_bg mart8" v-if="gzlist.length">
      <div class="sale_head clearfix">
        <h3 class="sale_head_a fl">工作提醒</h3>
      </div>
      <div class="sale_a">
        <div class="sale_a_one" v-for="(item,index) in gz_list" :key="index">
          <router-link :to="item.url">
            <div class="sale_a_work">
              <img
                class="sale_a_icon"
                :src="item.desc_info.indexOf('派单')>-1?pd:item.desc_info.indexOf('销售')>-1?rb:item.desc_info.indexOf('拜访')>-1?bf:item.desc_info.indexOf('KPI')>-1?kpi:item.desc_info.indexOf('问卷')>-1?wj:''"
                alt
              />
              <p class="sale_a_tit">{{item.desc_info}}</p>
              <span class="sale_a_number">{{item.result}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="sale_cont_bg mart8">
      <div class="sale_head clearfix">
        <h3 class="sale_head_a fl">
          销售数据
          <span class="sale_head_money">(单位:万)</span>
        </h3>
        <div class="fr sale_head_b">
          <span class="rate_red mar_r5 rate_bold">NO.{{salerlist.saleNo}}</span>
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
              <img v-if="salerlist.saleNo>9&&salerlist.saleNo<=11" class="tabs_ld_img" :src="ku" />
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
      <div class="saleb">
        <ul class="sale_mouthyear">
          <li
            :class="item==tabact1?'act':''"
            v-for="(item,index) in mylists"
            :key="index"
            @click="salehandle('tabact1',item)"
          >{{item}}</li>
        </ul>
        <div class="saleb_one">
          <div class="saleb_one_li">
            <h3
              class="saleb_one_money"
            >{{tabact1==mylists[0]?(salerlist.finishMoney||'-'):tabact1==mylists[1]?(salerlist.finishQuarterMoney||'-'):tabact1==mylists[2]?(salerlist.finishYearMoney||'-'):''}}</h3>
            <p class="saleb_one_tit">累计完成</p>
          </div>
          <div class="saleb_one_li">
            <h3
              class="saleb_one_money"
            >{{tabact1==mylists[0]?(salerlist.standardFinishMoney||'-'):tabact1==mylists[1]?(salerlist.standardQuarterFinishMoney||'-'):tabact1==mylists[2]?(salerlist.standardYearFinishMoney||'-'):''}}</h3>
            <p class="saleb_one_tit">标准销售额</p>
          </div>
          <div class="saleb_one_li">
            <h3
              class="saleb_one_money"
            >{{tabact1==mylists[0]?(salerlist.finishRates||'-'):tabact1==mylists[1]?(salerlist.finishQuarterRates||'-'):tabact1==mylists[2]?(salerlist.finishYearRates||'-'):''}}%</h3>
            <p class="saleb_one_tit">实时完成率</p>
          </div>
        </div>
        <div class="saleb_two clearfix">
          <span
            class="saleb_two_renwu"
          >{{tabact1==mylists[0]?'月任务：'+(salerlist.monthmoney||'-'):tabact1==mylists[1]?'季任务：'+(salerlist.quartermoney||'-'):tabact1==mylists[2]?'年任务：'+(salerlist.yearmoney||'-'):''}}(万)</span>
          <span class="saleb_two_details fr" @click="detailshandel">查看详情</span>
        </div>
      </div>
    </div>
    <div class="sale_cont_bg mart8" style="display:none;">
      <div class="sale_head clearfix">
        <h3 class="sale_head_a fl">客户数据</h3>
      </div>
      <div class="saleb padd_b30">
        <ul class="sale_mouthyear">
          <li
            :class="item==tabact2?'act':''"
            v-for="(item,index) in mylists"
            :key="index"
            @click="salehandle('tabact2',item)"
          >{{item}}</li>
        </ul>
        <div class="saleb_one">
          <div class="saleb_one_li">
            <h3 class="saleb_one_money">50.0</h3>
            <p class="saleb_one_tit">已确认回款</p>
          </div>
          <div class="saleb_one_li">
            <h3 class="saleb_one_money">100.12</h3>
            <p class="saleb_one_tit">销售额</p>
          </div>
          <div class="saleb_one_li">
            <h3 class="saleb_one_money">500.33</h3>
            <p class="saleb_one_tit">未确认回款</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Head = () => import("@/view/common/head");
export default {
  components: {
    Head
  },
  props: ["salerlist", "gzlist", "value1"],
  data() {
    return {
      tabact1: "本月",
      tabact2: "本月",
      mylists: ["本月", "本季度", "本年度"],
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      bf: require("@/assets/img/salework/bf.png"),
      kpi: require("@/assets/img/salework/KPI.png"),
      pd: require("@/assets/img/salework/pd.png"),
      rb: require("@/assets/img/salework/rb.png"),
      wj: require("@/assets/img/salework/wj.png")
    };
  },
  created() {},
  mounted() {},
  computed: {
    gz_list: function() {
      return this.gzlist.filter(item => {
        return item.result;
      });
    }
  },
  methods: {
    detailshandel() {
      this.$router.push({ path: "/gzdetails", query: { value1: this.value1 } });
    },
    salehandle(type, val) {
      if (type == "tabact1") {
        this.tabact1 = val;
      } else if (type == "tabact2") {
        this.tabact2 = val;
      }
    }
  }
};
</script>
<style lang="stylus"  scoped>
.sale_head_b {
  position: absolute;
  display: flex;
  right: 15px;
  top: 10px;
}

.tabs_ld_img {
  width: 15px;
  vertical-align: text-top;
  line-height: 15px;
}

.saleb_two {
  line-height: 20px;
  padding: 10px 15px;
  font-size: 13px;
  text-align: center;
  position: relative;
  border-top: 1px solid #f0f0f0;
  margin-top: 18px;
}

.saleb_two_details {
  color: $color409eff;
  position: absolute;
  font-size: 14px;
  right: 15px;
  top: 11px;
  cursor: pointer;
}

.saleb_two_renwu {
  color: $color333;
}

.saleb_one {
  display: flex;
  text-align: center;
  margin-top: 20px;
}

.saleb_one_li {
  width: 33.333333%;
}

.saleb_one_money {
  font-size: 16px;
  color: $color333;
  line-height: 16px;
}

.saleb_one_tit {
  line-height: 12px;
  font-size: 12px;
  color: $color545454;
  margin-top: 8px;
}

.saleb {
  padding-top: 10px;
}

.sale_mouthyear {
  font-size: 14px;
  color: $color909399;
  text-align: center;
  display: flex;
  width: 175px;
  margin: 0 auto;
  padding: 0px 5px;
  border: 1px solid $colorf0f0f0;
  border-radius: 18px;
  box-shadow: 0 0 5px rgba(63, 158, 255, 0.28);
}

.sale_mouthyear li {
  width: 33.333333%;
  border-right: 1px solid $colore5e5e5;
  box-sizing: border-box;
  line-height: 16px;
  margin: 9px 0;
  cursor: pointer;
}

.sale_mouthyear li:last-child {
  border-right: none;
}

.sale_mouthyear .act {
  color: $color409eff;
}

.sale_cont_bg {
  background: $colorfff;
}

.sale_head {
  line-height: 22px;
  padding: 9px 15px;
  border-bottom: 1px solid $colorf0f0f0;
  position: relative;
}

.sale_head_a {
  color: $color333;
  font-size: 15px;
}

.sale_head_money {
  display: inline-block;
  color: $color909399;
  font-size: 12px;
  font-weight: normal;
}

.sale_a {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 15px 0;
}

.sale_a_icon {
  width: 45px;
}

.sale_a_one {
  width: 25%;
  text-align: center;
  margin-bottom: 15px;
}

.sale_a_work {
  position: relative;
  display: inline-block;
  width: 75px;
}

.sale_a_tit {
  color: $color545454;
  font-size: 12px;
  line-height: 14px;
  margin-top: 4px;
}

.sale_a_number {
  position: absolute;
  top: -5px;
  right: 6px;
  border: 1px solid $colorfff;
  min-width: 10px;
  border-radius: 18px;
  line-height: 12px;
  text-align: center;
  background: $colorff5c61;
  display: inline-block;
  color: $colorfff;
  font-size: 12px;
  padding: 2px 3px;
}
</style>