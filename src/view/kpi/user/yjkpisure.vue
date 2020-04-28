<!-- A.html -->
<template>
  <div class="wrapper" @click="is_yj=false" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="sale_head bg_cfff clearfix">
        <h3 class="sale_head_a fl">2020-04关键业绩指标(KPI)确认单</h3>
        <span class="fr rate_blue" @click.stop="PFBZ_SURE(true)">评分标准</span>
      </div>
      <div class="yj_user mart8">
        <p>
          姓名：
          <span>{{saledata.leader}}</span>
        </p>

        <p>
          入职时间：
          <span>{{saledata.subtime}}</span>
        </p>
        <p>
          工号：
          <span>{{saledata.job_number}}</span>
        </p>
        <p>
          职位：
          <span>{{saledata.position}}</span>
        </p>
        <p style="width:100%;">
          部门：
          <span>{{saledata.deptname2}}</span>
        </p>
      </div>
      <div class="yj_cont mart8">
        <div class="yj_head clearfix">
          <h3 class="fl">KPI</h3>
          <p class="fr">
            <span style="color:#545454;">总计得分：</span>
            <span class="rate_red rate_bold fontsize_16">{{saledata.total}}</span>
          </p>
        </div>
        <div class="yj_main">
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              标准销售收入目标：
              <span class="yj_main_a_bold">{{saledata.standardMoneymb}}万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              实际完成标准销售额：
              <span class="yj_main_a_bold">{{saledata.standardMoney}}万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              标准销售额完成比例：
              <span
                class="yj_main_a_bold"
              >{{saledata.standardMoneymb&&saledata.standardMoney?(saledata.standardMoney*100/saledata.standardMoneymb).toFixed(2):0}}%</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              标准销售额占比：
              <span class="yj_main_a_bold">50%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red">{{saledata.xskpi_score}}</span>
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
              月实际回款金额：
              <span class="yj_main_a_bold">{{saledata.receipt}}万</span>，月到期应收：
              <span class="yj_main_a_bold">{{saledata.should_receipt}}万</span>
            </div>
          </div>
          <div class="yj_main_a clearfix">
            <div class="fl yj_main_al">
              到期回款率占比：
              <span class="yj_main_a_bold">30%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red">{{saledata.hklkpi_score}}</span>
            </div>
          </div>
          <div class="yj_main_a yj_main_border clearfix">
            <div class="fl yj_main_al">
              客户交付与满意度占比：
              <span class="yj_main_a_bold">20%</span>
            </div>
            <div class="fr yj_main_ar">
              单项得分：
              <span class="rate_red">{{saledata.satisfactory}}</span>
            </div>
          </div>
        </div>
        <div class="yj_tishi">KPI确认单如有疑问可咨询HR，如无误请点击“确认无误”按钮进行确认</div>
        <div class="yj_sure_btn">
          <el-button style="width:50%;" @click.stop="$router.go(-1)">返回</el-button>
          <el-button style="width:50%;" type="primary" @click.stop="kpibtnsure">确认无误</el-button>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" />
    <Ok v-if="is_ok" tit="KPI确认成功" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { editkpi } from "@/api/configWu";
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
      zs: require("@/assets/img/bangdan/zs.png"),
      saledata: []
    };
  },
  created() {},
  mounted() {
    this.saledata = JSON.parse(this.$route.query.item);
  },
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
      let saledata = this.saledata;
      editkpi([
        {
          user_id: saledata.leader_id,
          user_name: saledata.leader,
          department_id: saledata.department_id,
          department_name: saledata.deptname2,
          receipt: saledata.receipt,
          should_receipt: saledata.should_receipt,
          satisfactory: saledata.satisfactory,
          total_sorce:
            saledata.xskpi_score +
            saledata.hklkpi_score +
            saledata.satisfactory,
          subtime: this.$route.query.value1,
          status: 2
        }
      ]).then(res => {
        if (res.code == 200) {
          this.TIP_SURE(true);

          var timer = setTimeout(() => {
            this.TIP_SURE(false);
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
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
  background: #f5f5f7;
  padding: 8px 15px 55px;
}
</style>