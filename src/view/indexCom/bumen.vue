<template>
  <div class="tabs_lists mart8" style="min-height:300px;">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">部门负责人</div>
      <div class="tabs_normal tabs_lc">{{searchValue1}}{{searchValue1=='实时完成率'||searchValue1=='部门费用率'||searchValue1=='人力成本费用率'||searchValue1=='年销售完成率'?'':'(万)'}}</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div class="tabs_two_box" v-for="(item,len1) in tabdata1" :key="len1">
      <div class="tabs_info">
        <div v-if="item.is_act" class="tabs_info_line"></div>
        <div :class="item.is_act?'tabs_two act':'tabs_two'" @click="details_handle(item,len1)">
          <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
          <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.departmentName}}</div>
          <div
            class="tabs_normal_cont tabs_lc tabs_lmoney"
          >{{searchValue1=="实际销售额"?item.finishMoney:searchValue1=="标准销售额"?item.standardFinishMoney:searchValue1=="实时完成率"?item.finishRate.split('/')[0]:searchValue1=="净利"?item.netProfit:searchValue1=="净净利"?item.netsProfit:searchValue1=="部门费用率"?item.netsProfit:searchValue1=="人力成本费用率"?item.netsProfit:searchValue1=="年销售完成率"?item.netsProfit:''}}</div>
          <div class="tabs_normal_cont tabs_ld">
            <div v-if="item.saleNo<=4">
              <img
                class="tabs_ld_img"
                v-for="(itemNo,len2) in 4-item.saleNo"
                :key="len2"
                :src="hua"
              />
              <img class="tabs_ld_img" :src="zan" />
            </div>
            <div v-if="item.saleNo<=7&&item.saleNo>4">
              <img
                class="tabs_ld_img"
                v-for="(itemNo,len2) in 8-item.saleNo"
                :key="len2"
                :src="xiao"
              />
            </div>
            <div v-if="item.saleNo>7&&item.saleNo<=15">
              <img class="tabs_ld_img" :src="ku" />
              <img v-if="item.saleNo>9&&item.saleNo<=11" class="tabs_ld_img" :src="ku" />
              <span v-if="item.saleNo>11&&item.saleNo<=15">
                <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
              </span>
            </div>
            <div v-if="item.saleNo>15">
              <span>
                <img class="tabs_ld_img" v-for="(itemNo,len2) in 3" :key="len2" :src="ku" />
              </span>
            </div>
          </div>
        </div>
        <div
          v-show="item.is_act && zhuan"
          :id="'textcopy'+len1"
          class="wztabs_details tabs_details border_bf0f0f0"
        >
          <div class="padd_b12 border_bf0f0f0">
            <div class="tabs_thr paddb3">
              <h3>{{item.departmentName}}</h3>
              <span @click="boxOrtextChange">
                <i class="tabs_thr_img"></i> 表格版
              </span>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a">
                年任务：
                <span class="color333">{{item.totalYearPlanMoney}}万</span>
              </p>
            </div>
            <div class="tabs_four mart8">
              <div class="tabs_four_a pos">
                本月任务：
                <span class="color333">{{item.monthMoney}}万</span>
                <p
                  data-clipboard-action="copy"
                  :data-clipboard-target="'#textcopy'+len1"
                  class="tabs_four_copy"
                  @click="oneclickcopy"
                >一键复制</p>
              </div>
            </div>
          </div>
          <div class="padd_bt12 border_bf0f0f0">
            <div class="tabs_four wztabs_pc_all">
              <p class="tabs_four_a mart8">
                今日完成：
                <span :class="item.dayMoney>=0?'color333':'rate_green'">{{item.dayMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                今日毛利率：
                <span class="color333">{{item.grossProfit.split('/')[0]}}</span>
              </p>
              <p class="tabs_four_a mart8">
                目前应完成：
                <span
                  :class="item.monthShouldMoney>=0?'color333':'rate_green'"
                >{{item.monthShouldMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                累计毛利率：
                <span class="color333">{{item.grossProfit.split('/')[1]}}</span>
              </p>
              <p class="tabs_four_a mart8">
                实际累计完成：
                <span
                  :class="item.finishMoney>=0?'color333':'rate_green'"
                >{{item.finishMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                实时完成率：
                <span class="color333">{{item.finishRate.split('/')[0]}}</span>
              </p>
              <p class="tabs_four_a wztabs_pcdifmoney mart8">
                年累计完成：
                <span
                  :class="item.totalFinishYearMoney>=0?'color333':'rate_green'"
                >{{item.totalFinishYearMoney}}万</span>
              </p>
              <p class="tabs_four_a wztabs_pcdifmoney mart8">
                超额/差额：
                <span
                  :class="item.differenceMoney>0?'rate_red':item.differenceMoney==0?'color333':'rate_green'"
                >{{item.differenceMoney}}万</span>
              </p>
            </div>
            <div class="wztabs_a mart8">
              上月环比
              <span
                :class="item.monthCompare>0?'rate_red paddlr5':item.monthCompare==0?'color333 paddlr5':'rate_green paddlr5'"
              >{{item.monthCompare}}%</span> ，去年同比
              <span
                :class="item.yearCompare>0?'rate_red paddlr5':item.yearCompare==0?'color333 paddlr5':'rate_green paddlr5'"
              >{{item.yearCompare}}%</span>
            </div>
          </div>
          <div class="padd_bt12 border_bf0f0f0">
            <div class="tabs_four wztabs_pc_all">
              <p class="tabs_four_a mart8">
                本月目标实现毛利：
                <span
                  :class="item.targetProfit>=0?'color333':'rate_green'"
                >{{item.targetProfit}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                目前毛利润：
                <span
                  :class="item.grossProfitMoney>=0?'color333':'rate_green'"
                >{{item.grossProfitMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月费用：
                <span :class="item.deptBear>=0?'color333':'rate_green'">{{item.deptBear}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月净利润：
                <span :class="item.netProfit>=0?'color333':'rate_green'">{{item.netProfit}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月分摊及财务费用：
                <span
                  :class="item.bearsMoney>=0?'color333':'rate_green'"
                >{{item.bearsMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月净净利：
                <span :class="item.netsProfit>=0?'color333':'rate_green'">{{item.netsProfit}}万</span>
              </p>
              <p class="tabs_four_a wztabs_pcdifmoney mart8">
                距离实现本月目标毛利：
                <span
                  :class="item.targetProfitDif>0?'rate_red ':item.targetProfitDif==0?'color333 ':'rate_green '"
                >{{item.targetProfitDif}}万</span>
              </p>
            </div>
          </div>
          <div class="padd_bt12 border_bf0f0f0">
            <div class="tabs_four wztabs_pc_all">
              <p class="tabs_four_a mart8">
                年净利：
                <span :class="item.yearNet>=0?'color333':'rate_green'">{{item.yearNet}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                年净净利：
                <span :class="item.yearNets>=0?'color333':'rate_green'">{{item.yearNets}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                实现目标月净利：
                <span :class="item.targetNet>=0?'color333':'rate_green'">{{item.targetNet}}万</span>
              </p>
            </div>
          </div>
          <div class="padd_bt12">
            <div class="tabs_four wztabs_pc_all">
              <p class="tabs_four_a mart8">
                TB线索：
                <span
                  :class="item.tbClueMoney>=0?'color333':'rate_green'"
                >{{item.tbClueMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月开标：
                <span
                  :class="item.openTenderMoney>=0?'color333':'rate_green'"
                >{{item.openTenderMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                本月中标：
                <span
                  :class="item.getTenderMoney>=0?'color333':'rate_green'"
                >{{item.getTenderMoney}}万</span>
              </p>
              <p class="tabs_four_a mart8">
                已中标未下单：
                <span
                  :class="item.getTenderNotMoney>=0?'color333':'rate_green'"
                >{{item.getTenderNotMoney}}万</span>
              </p>
            </div>
            <div class="tabs_four mart8">
              <p class="tabs_four_a"></p>
              <span class="tabs_four_b" @click="TBzhankai(2,item.departmentId)">查看TB详情</span>
            </div>
          </div>
        </div>
        <div v-show="item.is_act && !zhuan" class="border_bf0f0f0 tabs_details">
          <div class="tabs_thr paddb3">
            <h3>{{item.departmentName}}</h3>
            <span @click="boxOrtextChange">
              <i class="tabs_thr_img"></i> 文字版
            </span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              财务评级：
              <span class="color333">{{item.departmentShow}}</span>
            </p>
            <span
              class="tabs_four_b"
              @click="jxq(item.id,item.departmentName,item.departmentId)"
            >查看详情</span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              运营评级：
              <span class="color333">{{item.departmentLevel}}</span>
            </p>
            <span class="tabs_four_c">NO.{{item.saleNo}}</span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              月经营情况：
              <span class="color333">{{item.monthBusiness}}</span>
            </p>
            <div class="tabs_four_d">
              <div v-if="item.saleNo<=4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 4-item.saleNo"
                  :key="len2"
                  :src="hua"
                />
                <img class="tabs_ld_img" :src="zan" />
              </div>
              <div v-if="item.saleNo<=7&&item.saleNo>4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 8-item.saleNo"
                  :key="len2"
                  :src="xiao"
                />
              </div>
              <div v-if="item.saleNo>7">
                <img class="tabs_ld_img" :src="ku" />
                <img v-if="item.saleNo>9&&item.saleNo<=11" class="tabs_ld_img" :src="ku" />
                <span v-if="item.saleNo>11&&item.saleNo<=15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                </span>
              </div>
            </div>
          </div>
          <div class="tabs_five mart6">
            <div class="tabs_biaoge_all tabs_six_color_a">
              <div class="tabs_five_a">
                <h3>{{item.dayMoney}}万</h3>
                <p>今日完成</p>
              </div>
            </div>
            <div class="tabs_biaoge_all tabs_six_color_a">
              <div class="tabs_five_a">
                <h3>
                  {{item.finishRate.split('/')[0]}}
                  <!-- <span class="tabs_five_arate">NO.{{item.rateNo}}</span> -->
                </h3>
                <p>实时完成率</p>
              </div>
            </div>
            <div class="tabs_rate_pc tabs_biaoge_all tabs_six_color_a">
              <div class="tabs_five_a">
                <h3
                  :class="item.monthCompare>0?'rate_red ':item.monthCompare==0?'color333 ':'rate_green '"
                >{{item.monthCompare}}%</h3>
                <p>环比</p>
              </div>
            </div>
            <div class="tabs_rate_pc tabs_biaoge_all tabs_six_color_a">
              <div class="tabs_five_a">
                <h3
                  :class="item.yearCompare>0?'rate_red ':item.yearCompare==0?'color333 ':'rate_green '"
                >{{item.yearCompare}}%</h3>
                <p>同比</p>
              </div>
            </div>
            <div class="tabs_rate_mobile tabs_six_color_a tabs_biaoge_all">
              <div class="tabs_five_b">
                <p>
                  环比：
                  <span
                    :class="item.monthCompare>0?'rate_red ':item.monthCompare==0?'color333 ':'rate_green '"
                  >{{item.monthCompare}}%</span>
                </p>
                <p>
                  同比：
                  <span
                    :class="item.yearCompare>0?'rate_red ':item.yearCompare==0?'color333 ':'rate_green '"
                  >{{item.yearCompare}}%</span>
                </p>
              </div>
            </div>
          </div>
          <div class="tabs_six">
            <h3 class="tabs_six_a">
              <img :src="dd" />今日订单来自客户：
              <span v-for="(i,index) in item.customerList" :key="index">{{i}}&nbsp;</span>
            </h3>
            <div class="tabs_five">
              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">
                    {{item.finishMoney}}万
                    <!-- <span class="tabs_five_arate">NO.{{item.saleNo}}</span> -->
                  </h3>
                  <p>目前销售累计</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.differenceMoney}}万</h3>
                  <p>距销售目标差额</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.totalFinishYearMoney}}万</h3>
                  <p>年累计完成</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.monthShouldMoney}}万</h3>
                  <p>目前应完成</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.monthMoney}}万</h3>
                  <p>月销售额目标</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_b">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.totalYearPlanMoney}}万</h3>
                  <p>年任务</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">
                    {{item.netProfit}}万
                    <!-- <span class="tabs_five_arate">NO.{{item.netNo}}</span> -->
                  </h3>
                  <p>目前月净利</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">
                    {{item.netsProfit}}万
                    <!-- <span class="tabs_five_arate">NO.{{item.netsNo}}</span> -->
                  </h3>
                  <p>目前月净净利</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.grossProfitMoney}}万</h3>
                  <p>目前月毛利</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.targetNet}}万</h3>
                  <p>月净利目标</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.targetNets}}万</h3>
                  <p>月净净利目标</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_c">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.targetProfit}}万</h3>
                  <p>月毛利目标</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 :class="item.tbClueMoney>=0?'color333':'rate_green'">
                    {{item.tbClueMoney}}
                    <!-- <span
                      class="tabs_five_arate"
                    >NO.{{item.grossPNo}}</span>-->
                  </h3>
                  <p>TB线索</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">
                    {{item.grossProfit.split('/')[1]}}
                    <!-- <span
                      class="tabs_five_arate"
                    >NO.{{item.grossPNo}}</span>-->
                  </h3>
                  <p>月平均毛利率</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.targetProfitDif}}万</h3>
                  <p>未完成毛利</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs_six">
            <h3 class="tabs_six_a">
              <img :src="bmys" />月部门费用
            </h3>
            <div class="tabs_five">
              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.bearMoney}}万</h3>
                  <p>总费用</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.departmentTargetBear}}万</h3>
                  <p>部门费用</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.departmentSalary}}万</h3>
                  <p>部门工资</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.departmentCount}}人</h3>
                  <p>部门人数</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.bearsMoney}}万</h3>
                  <p>分摊费用</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_d">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.otherBear}}万</h3>
                  <p>其他费用</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs_six">
            <h3 class="tabs_six_a">
              <img :src="cwqk" />财务情况
            </h3>
            <div class="tabs_five">
              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.receipt}}万</h3>
                  <p>月收款</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.receiptPlan}}万</h3>
                  <p>月收款计划</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.shouldReceipt}}万</h3>
                  <p>应收款</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.payment}}万</h3>
                  <p>月付款</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.paymentPlan}}万</h3>
                  <p>月付款计划</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_e">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.shouldPayment}}万</h3>
                  <p>应付款</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_a">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.departmentUseMoney}}万</h3>
                  <p>期初现金净额</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.departmentNetCashMoney}}万</h3>
                  <p>本月现金净额</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.department_month_use_money}}万</h3>
                  <p>期末现金净额</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_f">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.monthBadDebt}}万</h3>
                  <p>月提起坏账</p>
                </div>
              </div>

              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_f">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.quarterBadDebt}}万</h3>
                  <p>季度坏账</p>
                </div>
              </div>
              <div class="tabs_biaoge_all tabs_six_color_a tabs_six_color_f">
                <div class="tabs_five_a">
                  <h3 class="color333">{{item.yearBadDebt}}万</h3>
                  <p>年度坏账</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      qh: require("@/assets/img/bangdan/qh.png"),
      qh1: require("@/assets/img/bangdan/qh1.png"),
      bmys: require("@/assets/img/bangdan/bmys.png"),
      caidan: require("@/assets/img/bangdan/caidan.png"),
      cwqk: require("@/assets/img/bangdan/cwqk.png"),
      dd: require("@/assets/img/bangdan/dd.png"),
      zhuan: false
    };
  },
  props: ["tabdata1", "searchValue1", "value1", "jxq", "alertNr", "zhezhao"],

  methods: {
    boxOrtextChange() {
      this.zhuan = !this.zhuan;
    },
    details_handle(row, len) {
      this.zhuan = false;
      this.tabdata1.map((item, index) => {
        if (len == index) {
          row.is_act = !row.is_act;
          this.$set(this.tabdata1, len, row);
        } else {
          item.is_act = false;
        }
      });
    },
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    TBzhankai(a, b) {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      if (a == 1) {
        this.$router.push({ path: "/tanchujh/jrwc", query: { date: date1 } });
      } else if (a == 2) {
        this.$router.push({
          path: "/zbwxd",
          query: { date: date1, type: 2, role: b }
        });
      }
    },
    oneclickcopy() {
      var clipboard = new Clipboard(".tabs_four_copy");
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        // this.toast('copy success');
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        //console.log('该浏览器不支持自动复制')
        // 释放内存
        this.$message.success("暂时无法复制");
        clipboard.destroy();
      });
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/bangdan.styl';
</style>