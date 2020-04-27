<!-- A.html -->
<template>
  <div class="wrapper" @click="is_yj_a=false;is_yj_b=false" style="font-size:14px;text-align:left;">
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
      <div class="yj_cont">
        <div class="mart8" v-for="(item,index) in bmlist" :key="index">
          <div class="yj_head yj_head_cursor clearfix" @click="bmhandle(item,index)">
            <h3 class="fl">{{item.deptname1}}</h3>
            <p class="fr">
              <span style="color:#545454;">总计得分：</span>
              <span class="rate_red rate_bold fontsize_16">{{item.total}}</span>
            </p>
          </div>
          <div :class="!item.is_bm?'yj_bm':''">
            <div class="yj_main">
              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  销售额完成比例：
                  <span class="yj_main_a_bold">
                    {{item.finance_real_sale&&item.sale_plan?(item.finance_real_sale*100/item.sale_plan).toFixed(2):0}}%
                    <span
                      class="pos"
                    >
                      <img :src="zs" @click.stop="yjhandle('a')" class="zs_tips yj_mobile" alt />
                      <img
                        :src="zs"
                        @mouseover.stop="is_yj_a = true"
                        @mouseout.stop="is_yj_a = false"
                        class="zs_tips yj_pc"
                        alt
                      />
                      <span class="yj_open_tips" v-if="is_yj_a">累计月销售额/预算月销售额</span>
                    </span>
                  </span>
                </div>
              </div>
              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  累计月完成：
                  <span class="yj_main_a_bold">{{item.finance_real_sale}}万</span>，月销售业绩指标
                  <span class="yj_main_a_bold">{{item.sale_plan}}万</span>
                </div>
              </div>
              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  销售额占比：
                  <span class="yj_main_a_bold">{{item.kpiItem[0].weight*100}}%</span>
                </div>
                <div class="fr yj_main_ar">
                  单项得分：
                  <span class="rate_red">{{item.kpiItem[0].score}}</span>
                </div>
              </div>
              <div class="yj_main_a yj_main_border clearfix">
                <div class="fl yj_main_al">
                  净利完成比例：
                  <span class="yj_main_a_bold">
                    {{item.finance_real_net&&item.target_net?(item.finance_real_net*100/item.target_net).toFixed(2):0}}%
                    <span
                      class="pos"
                    >
                      <img :src="zs" @click.stop="yjhandle('b')" class="zs_tips yj_mobile" alt />
                      <img
                        :src="zs"
                        @mouseover.stop="is_yj_b = true"
                        @mouseout.stop="is_yj_b = false"
                        class="zs_tips yj_pc"
                        alt
                      />
                      <span class="yj_open_tips" v-if="is_yj_b">实际月净利/预算月净利</span>
                    </span>
                  </span>
                </div>
              </div>

              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  月净利指标：
                  <span class="yj_main_a_bold">{{item.target_net}}万</span>，实际净利：
                  <span class="yj_main_a_bold">{{item.finance_real_net}}万</span>
                </div>
              </div>
              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  净利占比：
                  <span class="yj_main_a_bold">{{item.kpiItem[1].weight*100}}%</span>
                </div>
                <div class="fr yj_main_ar">
                  单项得分：
                  <span class="rate_red">{{item.kpiItem[1].score}}</span>
                </div>
              </div>
              <div class="yj_main_a yj_main_border clearfix">
                <div class="fl yj_main_al">
                  月现金流：
                  <span class="yj_main_a_bold">{{item.department_use_money}}万</span>
                </div>
              </div>
              <div class="yj_main_a clearfix">
                <div class="fl yj_main_al">
                  现金流占比：
                  <span class="yj_main_a_bold">{{item.kpiItem[2].weight*100}}%</span>
                </div>
                <div class="fr yj_main_ar">
                  单项得分：
                  <span class="rate_red">{{item.kpiItem[2].score}}</span>
                </div>
              </div>
            </div>
            <div class="yj_btn_bg">
              <div class="yj_btn_2" v-if="item.docsrc">
                <el-button
                  style="width:50%;"
                  type="primary"
                  @click.stop="xiazai(item.docsrc)"
                >部门KPI下载</el-button>
                <el-button style="width:50%;" type="primary" @click.stop="kpisurehandle">销售人员KPI详情</el-button>
              </div>
              <div class="yj_btn" v-else>
                <el-button style="width:100%;" type="primary" @click.stop="kpisurehandle">销售人员KPI详情</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pfbz v-if="is_pfbz" />
  </div>
</template>
<script>
import { salkpi } from "@/api/configWu";
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
      is_yj_a: false,
      is_yj_b: false,
      act: 1,
      act1: false,
      bmlist: [],
      zs: require("@/assets/img/bangdan/zs.png")
    };
  },
  mounted() {
    this.getdata();
  },
  computed: {
    ...mapState({ is_pfbz: state => state.param.is_pfbz })
  },
  methods: {
    ...mapMutations(["PFBZ_SURE"]),
    xiazai(a) {
      window.location.href = a;
    },
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
      this.$router.push({ path: "/xskpi", query: { value1: this.value1 } });
    },
    yjhandle(val) {
      this.$message.closeAll();
      if (val == "a") {
        this.is_yj_a = !this.is_yj_a;
        this.is_yj_b = false;
      } else {
        this.is_yj_b = !this.is_yj_b;
        this.is_yj_a = false;
      }
    },
    getdata() {
      salkpi({
        role: localStorage.getItem("role"),
        submitTime: this.value1,
        submitTimeType: "m"
      }).then(res => {
        if (res.code == 200) {
          this.bmlist = res.data;
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