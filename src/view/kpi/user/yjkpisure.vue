<!-- A.html -->
<template>
  <div class="wrapper" @click="is_yj=false" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="sale_head bg_cfff  clearfix">
        <h3 class="sale_head_a fl">2020-04关键业绩指标(KPI)确认单</h3>
        <span class="fr rate_blue" @click.stop="PFBZ_SURE(true)">评分标准</span>
      </div>
      <div class="yj_user mart8">
        <p>
          姓名：
          <span>李斯</span>
        </p>
        <p>
          工作地点：
          <span>北京</span>
        </p>
        <p>
          工号：
          <span>yg26265</span>
        </p>
        <p>
          入职时间：
          <span>2019-01-01</span>
        </p>
        <p>
          职位：
          <span>销售</span>
        </p>
        <p style="width:100%;">
          部门：
          <span>一级部门-二级部门</span>
        </p>
      </div>
      <div class="yj_cont mart8">
        <div class="yj_head clearfix">
          <h3 class="fl">KPI</h3>
          <p class="fr">
            <span style="color:#545454;">总计得分：</span>
            <span class="rate_red rate_bold fontsize_16 yj_fen_width">2</span>
          </p>
        </div>
        <div class="yj_main ">
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
              <span class="rate_red yj_fen_width">2.2</span>
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
              <span class="rate_red yj_fen_width">1.2</span>
            </div>
          </div>
          <div class="yj_main_a yj_main_border clearfix">
            <div class="fl yj_main_al">
              客户交付与满意度占比：
              <span class="yj_main_a_bold">20%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red yj_fen_width">1</span>
            </div>
          </div>
        </div>
        <div class="yj_tishi ">KPI确认单如有疑问可咨询HR，如无误请点击“确认无误”按钮进行确认</div>
        <div class="yj_sure_btn">
          <el-button style="width:50%;" size="small" @click.stop="goback">返回</el-button>
          <el-button style="width:50%;" size="small" type="primary" @click.stop="kpibtnsure">确认无误</el-button>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" :tiplist="tiplist" />
    <Ok v-if="is_ok" tit="KPI确认成功" />
  </div>
</template>
<script>
import { salechabumen } from "@/api/config";
import { mapState, mapMutations } from "vuex";
const Head = () => import("@/view/common/head");
const Ok = () => import("@/components/ok");
const Pfbz = () => import("@/components/pfbz");
export default {
  components: {
    Head,
    Ok,
    Pfbz
  },
  data() {
    return {
      is_yj: false,
      act: 1,
      act1: false,
      zs: require("@/assets/img/bangdan/zs.png"),
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
      ]
    };
  },
  created() {},
  mounted() {},
  watch: {
    is_pfbz() {
      console.log(11);
    }
  },
  computed: {
    ...mapState({
      is_ok: state => state.param.is_ok,
      is_pfbz: state => state.param.is_pfbz
    })
  },
  methods: {
    ...mapMutations(["TIP_SURE", "PFBZ_SURE"]),
    kpibtnsure() {
      this.TIP_SURE(true);
      var timer = setTimeout(() => {
        this.TIP_SURE(false);
        clearTimeout(timer);
        timer = null;
      }, 1000);
    },
    goback() {
      this.$router.go(-1);
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


.yj_tishi {
  font-size: 13px;
  color: $color909399;
  line-height: 24px;
  background: #f2f2f5;
  padding: 8px 15px 55px;
}



.sale_head {
  line-height: 16px;
  padding: 12px 15px;
  border-bottom: 1px solid $colorf0f0f0;
  position: relative;
}

.sale_head_a {
  color: $color333;
  font-size: 15px;
}

.rate_blue {
  color: $color409eff;
  cursor: pointer;
}

.bg_cfff {
  background: $colorfff;
}

</style>