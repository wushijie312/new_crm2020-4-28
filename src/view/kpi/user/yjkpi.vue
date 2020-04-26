<!-- A.html -->
<template>
  <div class="wrapper" @click="is_yj=false" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="sale_head bg_cfff clearfix">
        <h3 class="sale_head_a fl">关键业绩指标（KPI）</h3>
        <span class="fr rate_blue" @click.stop="PFBZ_SURE(true)">评分标准</span>
      </div>
      <div class="yj_cont mart8">
        <div class="yj_head clearfix">
          <h3 class="fl padd_t3" >2020.04</h3>
          <p class="fr">
            <span style="color:#545454;">总计得分：</span>
            <span class="rate_red rate_bold fontsize_16 ">2</span>
          </p>
        </div>
        <div class="yj_main">
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              标准销售收入目标：
              <span class="yj_main_a_bold">800万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              实际完成标准销售额：
              <span class="yj_main_a_bold">800万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              标准销售额占比：
              <span class="yj_main_a_bold">50%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red ">2.2</span>
            </div>
          </div>
          <div class="yj_main_a yj_main_border clearfix">
            <div class="fl yj_main_al">
              到期回款率：
              <span class="yj_main_a_bold">
                20.00%
                <span class="pos">
                  <img :src="zs" @click.stop="yjhandle" class="zs_tips yj_mobile" alt />
                  <img
                    :src="zs"
                    @mouseover.stop="is_yj = true"
                    @mouseout.stop="is_yj = false"
                    class="zs_tips yj_pc"
                    alt
                  />
                  <span class="yj_open_tips" v-if="is_yj">月实际回款总金额/月到期应收</span>
                </span>
              </span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              月实际回款总金额：
              <span class="yj_main_a_bold">20万</span>，月到期应收：
              <span class="yj_main_a_bold">100万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              净利占比：
              <span class="yj_main_a_bold">30%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red ">1.2</span>
            </div>
          </div>
          <div class="yj_main_a yj_main_border clearfix">
            <div class="fl yj_main_al">
              客户交付与满意度占比：
              <span class="yj_main_a_bold">20%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red ">1</span>
            </div>
          </div>
        </div>
        <div class="yj_btn_bg">
          <div class="yj_btn">
            <el-button
              style="width:100%;"
              type="primary"
              @click.stop="kpisurehandle"
            >KPI确认单</el-button>
          </div>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" :tiplist="tiplist" />
  </div>
</template>
<script>
import { salechabumen } from "@/api/config";
import { mapState, mapMutations } from "vuex";
const Head = () => import("@/view/common/head");
const Pfbz = () => import("@/components/pfbz");

export default {
  components: {
    Head,
    Pfbz
  },
  data() {
    return {
      is_yj: false,
      act: 1,
      act1: false,
      tiplist: [
        {
          tit: "标准销售额评分标准：",
          dec:
            "49%<=2.5分；50%-55%=3分；56%-60%=3.5分；61%<-65%=4分；66%<-70%<=4.5分；70%及以上<=5分。（标准销售额=实际完成标准销售额/收入目标）"
        },
        {
          tit: "回款评分标准：",
          dec:
            " 89%<=2.5分；90%-99%<=3分；100%-120%<=3.5分；121%<-130%<=4分；131%<-140%<=4.5分；141%-150%<=5分。"
        }
      ],
      zs: require("@/assets/img/bangdan/zs.png")
    };
  },
  computed: {
    ...mapState({ is_pfbz: state => state.param.is_pfbz })
  },
  methods: {
    ...mapMutations(["PFBZ_SURE"]),
    kpisurehandle() {
      this.$router.push({ path: "/yjkpisure" });
    },
    yjhandle() {
      this.$message.closeAll();
      this.is_yj = !this.is_yj;
    }
  }
};
</script>
<style lang="stylus"  scoped>
@import '../../../assets/css/kpi.styl';

</style>