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
      <Sale v-if="false"></Sale>
      <Pending v-if="false"></Pending>
      <Details ></Details>
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
.saleb_two{
  line-height :36px;
  padding:0 15px;
  font-size:13px;
  text-align :center;
  position: relative;
  border-top:1px solid $colorf0f0f0;
  margin-top:22px;
}
.saleb_two_details{
  color:$color409eff;
  position :absolute;
  right:15px;
  top:0;
}
.saleb_two_renwu{
  color:$color333;
}
.saleb_one {
  display: flex;
  text-align :center;
  margin-top:20px;
}
.saleb_one_li{
  width:33.333333%;
}
.saleb_one_money{
  font-size:15px;
  color:$color333;
  line-height :15px;
}
.saleb_one_tit{
  line-height :12px;
  font-size:12px;
  color: $color545454;
  margin-top:8px;
}
.saleb {
  padding-top: 10px;
}

.sale_mouthyear {
  font-size: 13px;
  line-height: 30px;
  color: $color909399;
  text-align: center;
  display: flex;
  width: 175px;
  margin: 0 auto;
  padding:0px 5px;
  border:1px solid $colore5e5e5;
  border-radius:15px;
  box-shadow:0 0 3px  $colord8eafc;
}

.sale_mouthyear li {
  width: 33.333333%;
  border-right: 1px solid $colore5e5e5;
  box-sizing: border-box;
  line-height 15px;
  margin:7px 0;

}

.sale_mouthyear li:last-child {
  border-right: none;
}

.sale_mouthyear .act {
  color: $color409eff;
}

.menubox {
  border-bottom: 1px solid $colorf0f0f0;
  margin-top: 8px;
  text-align: center;
  background: $colorfff;
}

.menubox > div {
  width: 50%;
}

.menubox .menu_border {
  line-height: 42px;
  font-size: 14px;
  display: inline-block;
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

.sale_cont_bg {
  background: $colorfff;
}

.sale_head {
  line-height: 36px;
  padding: 0 15px;
  border-bottom: 1px solid $colorf0f0f0;
}

.sale_head_a {
  color: $color333;
  font-size: 14px;
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
  margin-bottom: 20px;
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
  margin-top: 2px;
}

.sale_a_number {
  position: absolute;
  top: -5px;
  right: 6px;
  height: 18px;
  border: 1px solid $colorfff;
  min-width: 10px;
  padding: 0 4px;
  border-radius: 18px;
  line-height: 18px;
  text-align: center;
  background: $colorff5c61;
  color: $colorfff;
  font-size: 12px;
}
</style>