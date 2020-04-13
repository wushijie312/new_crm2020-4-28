<!-- A.html -->
<template>
  <div class="wrapper" id="customlist" ref="customlist" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div class="left" @click="saleindexhandle(1)" :class="soit===1?'act':''">
          <span class="menu_border">
            首页
            <span class="menu_border_line"></span>
          </span>
        </div>
        <div class="left" @click="saleindexhandle(2)" :class="soit===2?'act':''">
          <span class="menu_border">
            待办事项
            <span class="menu_border_line"></span>
          </span>
        </div>
      </div>
      <Sale></Sale>
      <Pending v-if="false"></Pending>
      <Details  v-if="false"></Details>
    </div>
  </div>
</template>
<script>
import Head from "@/view/common/head";
import Sale from "@/view/salework/sale";
import Pending from "@/view/salework/pending";
import Details from "@/view/salework/details";

export default {
  components: {
    Head,
    Sale,
    Pending,
    Details
  },
  data() {
    return {
      soit: 1,
      act: 2,
      act1: true
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
@import '../../assets/css/salework.styl';
</style>