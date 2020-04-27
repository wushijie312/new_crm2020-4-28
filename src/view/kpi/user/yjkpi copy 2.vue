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

      <div class="yj_cont" style="padding-bottom:50px;">
        <div class="mart8" v-for="(item,index) in saleslist" :key="index">
          <div class="yj_head yj_head_cursor clearfix">
            <h3 class="fl padd_t3">{{item.subtime.slice(0,7)}}</h3>
            <p class="fr">
              <span style="color:#545454;">总计得分：</span>
              <span class="rate_red rate_bold fontsize_16">{{item.total}}</span>
            </p>
          </div>
          <div class="yj_main">
            <div class="yj_main_a clearfix">
              <div class="fl yj_main_al">
                标准销售收入目标：
                <span class="yj_main_a_bold">{{item.standardMoneymb}}万</span>
              </div>
            </div>
            <div class="yj_main_a clearfix">
              <div class="fl yj_main_al">
                实际完成标准销售额：
                <span class="yj_main_a_bold">{{item.standardMoney}}万</span>
              </div>
            </div>
            <div class="yj_main_a clearfix">
              <div class="fl yj_main_al">
                标准销售额完成占比：
                <span
                  class="yj_main_a_bold"
                >{{item.standardMoneymb&&item.standardMoney?(item.standardMoney*100/item.standardMoneymb).toFixed(2):0}}%</span>
              </div>
            </div>
            <div class="yj_main_a clearfix">
              <div class="fl yj_main_al">
                标准销售额占比：
                <span class="yj_main_a_bold">50%</span>
              </div>
              <div class="fr yj_main_ar">
                单项得分：
                <span class="rate_red">{{item.kpiItem[0].score}}</span>
              </div>
            </div>

            <div class="yj_main_a yj_main_border clearfix">
              <div class="fl yj_main_al">
                到期回款率：
                <span class="yj_main_a_bold">
                  {{item.receipt&&item.should_receipt?(item.receipt*100/item.should_receipt).toFixed(2):0}}%
                  <span
                    class="pos"
                  >
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
                月实际回款金额：
                <span class="yj_main_a_bold">{{item.receipt}}万</span>，月到期应收：
                <span class="yj_main_a_bold">{{item.should_receipt}}万</span>
              </div>
            </div>
            <div class="yj_main_a clearfix">
              <div class="fl yj_main_al">
                到期回款率占比：
                <span class="yj_main_a_bold">30%</span>
              </div>
              <div class="fr yj_main_ar">
                单项得分：
                <span class="rate_red">{{item.kpiItem[1].score}}</span>
              </div>
            </div>
            <div class="yj_main_a yj_main_border clearfix">
              <div class="fl yj_main_al">
                客户交付与满意度占比：
                <span class="yj_main_a_bold">20%</span>
              </div>
              <div class="fr yj_main_ar">
                单项得分：
                <span class="rate_red" v-if="item.status!=0">{{item.satisfactory}}</span>
              </div>
            </div>
          </div>
          <div class="yj_btn_bg" v-if="item.status!=2">
            <div class="yj_btn">
              <el-button style="width:100%;" type="primary" @click.stop="kpisurehandle(item)">KPI审批</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" />
  </div>
</template>
<script>
import { salesman } from "@/api/configWu";
import { mapState, mapMutations } from "vuex";
import { getNowDate } from "@/untils/common";

const Head = () => import("@/view/common/head");
const Pfbz = () => import("@/components/pfbz");

export default {
  components: {
    Head,
    Pfbz
  },
  data() {
    return {
      is_date: false,
      value1: this.$route.query.value1,
      is_yj: false,
      act: 1,
      act1: false,
      saleslist: [],
      zs: require("@/assets/img/bangdan/zs.png")
    };
  },
  computed: {
    ...mapState({ is_pfbz: state => state.param.is_pfbz })
  },

  mounted() {
    this.getdata();
  },
  methods: {
    ...mapMutations(["PFBZ_SURE"]),
    kpisurehandle(item) {
      let info = {
        leader: item.leader,
        leader_id: item.leader_id,
        subtime: item.subtime,
        department_id: item.department_id,
        position: item.position,
        deptname2: item.deptname2,
        standardMoneymb: item.standardMoneymb,
        standardMoney: item.standardMoney,
        standardMoney: item.standardMoney,
        standardMoneymb: item.standardMoneymb,
        xskpi_score: item.kpiItem[0].score,
        hklkpi_score: item.kpiItem[1].score,
        // mydkpi_score: item.kpiItem[2].score,
        receipt: item.receipt,
        should_receipt: item.should_receipt,
        satisfactory: item.satisfactory,
        job_number: item.job_number,
        total: item.total,
        status: item.status
      };
      this.$router.push({
        path: "/yjkpisure",
        query: { value1: this.value1, item: JSON.stringify(info) }
      });
    },
    yjhandle() {
      this.$message.closeAll();
      this.is_yj = !this.is_yj;
    },

    getdata() {
      salesman({
        role: localStorage.getItem("role"),
        submitTime: getNowDate(),
        submitTimeType: "m"
      }).then(res => {
        if (res.code == 200) {
          this.saleslist = res.data;
          console.log(this.saleslist);
        } else {
          this.$message.error(res.msg);
        }

        //     this.listdata = res.bigCustomerList;
        //     this.wxdlist = res.allCustomerList;
      });
    }
  }
};
</script>
<style lang="stylus"  scoped>
@import '../../../assets/css/kpi.styl';
</style>