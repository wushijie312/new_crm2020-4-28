<!-- A.html -->
<template>
  <div class="wrapper" @click="is_yj=false" style="font-size:14px;text-align:left;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="wrap850">
      <div class="bg_cfff clearfix">
        <div :class="is_date?'date_a act fl':'date_a fl'">
          <el-date-picker
            v-model="value1"
            type="date"
            :editable="false"
            :clearable="false"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            @focus="is_date=!is_date"
            @blur="is_date=!is_date"
          ></el-date-picker>
        </div>

        <span class="fr rate_blue xs_pfbz" @click.stop="PFBZ_SURE(true)">评分标准</span>
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
          <span>{{saledata.department_id}}</span>
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
      <div class="yj_main mart8" style="padding-bottom:55px;">
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
            <p>
              <span class="rate_red">*</span>月实际回款金额：
              <el-input
                size="small"
                style="width:140px;"
                v-model="saledata.receipt"
                placeholder="请填写金额"
              ></el-input>&nbsp;万
            </p>
            <p class="mart10">
              <span class="rate_red">*</span>月到期应收：
              <el-input
                size="small"
                style="width:140px;"
                v-model="saledata.should_receipt"
                placeholder="请填写金额"
              ></el-input>&nbsp;万
            </p>
          </div>
        </div>
        <div class="yj_main_a clearfix">
          <div class="fl yj_main_al">
            到期回款率：
            <span class="yj_main_a_bold">
              {{saledata.receipt&&saledata.should_receipt?(saledata.receipt*100/saledata.should_receipt).toFixed(2):0}}%
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
            到期回款率占比：
            <span class="yj_main_a_bold">30%</span>
          </div>
          <div class="fr yj_main_ar">
            单项得分：
            <span class="rate_red">{{saledata.hklkpi_score}}</span>
          </div>
        </div>
        <div class="yj_main_a yj_main_border clearfix">
          <div class="fl yj_main_ar">
            <p class>
              <span class="rate_red">*</span>得分：
              <el-input
                size="small"
                style="width:140px;"
                v-model="saledata.satisfactory"
                placeholder="请填写得分、5分以内，仅数字"
              ></el-input>
            </p>
          </div>
          <div class="fl yj_main_al mart10">
            客户交付与满意度占比：
            <span class="yj_main_a_bold">20%</span>
          </div>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" />
    <div class="yj_sure_btn">
      <el-button style="width:50%;" @click.stop="$router.go(-1)">返回</el-button>
      <el-button style="width:50%;" type="primary" @click.stop="kpibtnsure">确认无误</el-button>
    </div>
  </div>
</template>
<script>
import { editkpi } from "@/api/configWu";
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
      is_date: false,
      value1: this.$route.query.value1,
      is_yj: false,
      act: 1,
      act1: false,
      saledata: [],

      zs: require("@/assets/img/bangdan/zs.png")
    };
  },
  computed: {
    ...mapState({ is_pfbz: state => state.param.is_pfbz })
  },

  mounted() {
    this.saledata = JSON.parse(this.$route.query.item);
    console.log(this.saledata);
    // this.getdata();
  },
  methods: {
    ...mapMutations(["PFBZ_SURE"]),
    kpisurehandle() {
      this.$router.push({ path: "/yjkpisure" });
    },
    yjhandle() {
      this.$message.closeAll();
      this.is_yj = !this.is_yj;
    },
    kpibtnsure() {
      editkpi({
        user_id:item.user_id,
        user_name: item.leader,
        department_id: item.department_id,
        department_name: item.deptname2,
        receipt: item.receipt,
        should_receipt: item.should_receipt,
        satisfactory: item.satisfactory,
        total_sorce: item.total,
        submit_time: this.value1,
        status: item.status
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("提交成功");
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