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
      <div class="yj_main mart8" style="padding-bottom:55px;">
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
            <span class="rate_red">2.2</span>
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
            <p>
              <span class="rate_red">*</span>月实际回款金额：
              <el-input size="small" style="width:160px;" v-model="input" placeholder="请填写金额"></el-input>&nbsp;万
            </p>
            <p class="mart10">
              <span class="rate_red">*</span>月到期应收：
              <el-input size="small" style="width:160px;" v-model="input" placeholder="请填写金额"></el-input>&nbsp;万
            </p>
          </div>
        </div>
        <div class="yj_main_a clearfix">
          <div class="fl yj_main_al">
            到期回款率占比：
            <span class="yj_main_a_bold">30%</span>
          </div>
          <div class="fr yj_main_ar">
            单项得分：
            <span class="rate_red">1.2</span>
          </div>
        </div>
        <div class="yj_main_a yj_main_border clearfix">
          <div class="fl yj_main_ar">
            <p class="">
              <span class="rate_red">*</span>得分：
              <el-input
                size="small"
                style="width:160px;"
                v-model="input"
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
    <Pfbz v-if="is_pfbz" :tiplist="tiplist" />
    <div class="yj_sure_btn">
      <el-button style="width:50%;" @click.stop="$router.go(-1)">返回</el-button>
      <el-button style="width:50%;" type="primary" @click.stop="kpibtnsure">确认无误</el-button>
    </div>
  </div>
</template>
<script>
import { editkpi } from "@/api/config";
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
      value1: getNowDate(),
      input: "删掉我",
      is_yj: false,
      act: 1,
      act1: false,
      bmlist: [
        { name: "北京事业一部-潘博" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-洪亮" },
        { name: "北京事业一部-屈文博" }
      ],
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

  mounted() {
    console.log(JSON.parse(this.$route.query.item));
    // this.getdata();
  },
  methods: {
    ...mapMutations(["PFBZ_SURE"]),
    bmhandle(item, index) {
      this.bmlist.map((row, len) => {
        if (index == len) {
          row.is_bm = !row.is_bm;
          this.$set(this.bmlist, index, row);
        } else {
          row.is_bm = false;
        }
      });
    },
    kpisurehandle() {
      this.$router.push({ path: "/yjkpisure" });
    },
    yjhandle() {
      this.$message.closeAll();
      this.is_yj = !this.is_yj;
    },
    getdata() {
      editkpi({
        user_id: "",
        user_name: "",
        department_id: "",
        department_name: "",
        receipt: "",
        should_receipt: "",
        satisfactory: "",
        total_sorce: "",
        submit_time: "",
        status: ""
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