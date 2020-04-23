<!-- A.html -->
<template>
  <div style="text-align:left;">
    <template v-if="gzlist.length">
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="saleindexhandle(1)" :class="soit===1?'act':''">
          <span class="menu_border">
            待处理({{gzlist.length}})
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div
          class="left"
          style="display:none;"
          @click="saleindexhandle(2)"
          :class="soit===2?'act':''"
        >
          <span class="menu_border">
            我的发起
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div
          class="left"
          style="display:none;"
          @click="saleindexhandle(3)"
          :class="soit===3?'act':''"
        >
          <span class="menu_border">
            我参与的
            <span class="menu_border_line"></span>
          </span>
        </div>
      </div>
      <div class="pend_box marb8" v-for="(item,index) in gzlist" :key="index">
        <h3 class="pend_head">销售数据</h3>
        <div class="pend_one mart10">
          <span class="pend_one_tit">任务时间：</span>
          <p class="pend_one_cont">{{item.start_time.slice(0,10)}} ～ {{item.end_time.slice(0,10)}}</p>
        </div>
        <div class="pend_one mart10">
          <span class="pend_one_tit">任务内容：</span>
          <p class="pend_one_cont">{{item.msg}}</p>
        </div>
        <div class="saleb_two clearfix">
          <span class="pend_two_time fl">2020-03-28 . 创建</span>
          <router-link class="saleb_two_details fr" :to="item.url">查看详情</router-link>
          <span class="saleb_two_details pend_two_borderr fr marr20" style="display:none;">转发</span>
        </div>
      </div>
    </template>
    <div v-else class="empty">
      <img :src="empty" alt />
    </div>
  </div>
</template>
<script>
import Head from "@/view/common/head";

export default {
  components: {
    Head
  },
  props: ["gzlist"],
  data() {
    return {
      empty: require("@/assets/img/salework/empty.png"),
      soit: 1
    };
  },
  created() {},
  mounted() {},
  methods: {
    saleindexhandle(len) {
      this.soit = len;
    }
  }
};
</script>
<style lang="stylus"  scoped>
.empty {
  text-align: center;
  padding-top: 50px;
}

.empty img {
  width: 200px;
}

.pend_box {
  padding: 16px 15px 0px;
  background: $colorfff;
}

.pend_head {
  line-height: 15px;
  font-size: 15px;
  font-weight: bold;
  color: $color333;
}

.pend_two_time {
  color: $colorc0c4cc;
  font-size: 12px;
}

.pend_two_borderr {
  border-right: 1px solid $colore5e5e5;
  padding-right: 20px;
}

.pend_one {
  position: relative;
  line-height: 17px;
  font-size: 13px;
}

.pend_one_tit {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  color: $color909399;
}

.pend_one_cont {
  color: $color555;
  margin-left: 65px;
}

.saleb_two {
  line-height: 16px;
  padding: 10px 0;
  font-size: 13px;
  text-align: center;
  position: relative;
  border-top: 1px solid $colorf0f0f0;
  margin-top: 18px;
}

.saleb_two_details {
  color: $color409eff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}

.saleb_two_renwu {
  color: $color333;
}

.saleb {
  padding-top: 10px;
}

.menubox {
  border-bottom: 1px solid $colorf0f0f0;
  margin-top: 8px;
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
  cursor: pointer;
  color: #333;
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

.sale_cont_bg {
  background: $colorfff;
}
</style>