<template>
  <div class="tabs_lists mart8">
    <div class="tabs_one">
      <div class="tabs_normal tabs_la">排名</div>
      <div class="tabs_normal tabs_lb">部门负责人</div>
      <div class="tabs_normal tabs_lc">实际销售额(万)</div>
      <div class="tabs_normal tabs_ld">光荣榜</div>
    </div>
    <div class="tabs_two_box" v-for="(item,len1) in tabdata1" :key="len1">
      <div :class="item.is_act?'tabs_two act':'tabs_two'" @click="details_handle(item,len1)">
        <div class="tabs_normal_cont tabs_la">{{item.saleNo}}</div>
        <div class="tabs_normal_cont tabs_lb tabs_lname">{{item.departmentName}}</div>
        <div class="tabs_normal_cont tabs_lc tabs_lmoney">{{item.finishMoney}}</div>
        <div class="tabs_normal_cont tabs_ld">
          <div v-if="item.saleNo<=4">
            <img class="tabs_ld_img" v-for="(itemNo,len2) in 4-item.saleNo" :key="len2" :src="hua" />
            <img class="tabs_ld_img" :src="zan" />
          </div>
          <div v-if="item.saleNo<=7&&item.saleNo>4">
            <img class="tabs_ld_img" v-for="(itemNo,len2) in 8-item.saleNo" :key="len2" :src="xiao" />
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
      <div v-show="item.is_act && zhuan" :id="'textcopy'+len1" class="wztabs_details tabs_details">
        <div class="padd_b12 border_bf0f0f0">
          <div class="tabs_thr paddb3">
            <h3>{{item.departmentName}}</h3>
            <span @click="boxOrtextChange">
              <img :src="qh" alt="转换" /> 表格版
            </span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              年任务：
              <span>{{item.totalYearPlanMoney}}</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <div class="tabs_four_a pos">
              本月任务：
              <span>{{item.monthMoney}}</span>
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
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              今日完成：
              <span>{{item.dayMoney}}</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              今日毛利率：
              <span>{{item.grossProfit.split('/')[0]}}</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              目前应完成：
              <span>{{item.monthShouldMoney}}</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              累计毛利率：
              <span>{{item.grossProfit.split('/')[1]}}</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              实际累计完成：
              <span>{{item.finishMoney}}</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              实时完成率：
              <span>{{item.finishRate.split('/')[0]}}</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              年累计完成：
              <span>{{item.totalFinishYearMoney}}</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              超额/差额：
              <span>{{item.differenceMoney}}</span>
            </p>
          </div>
          <div class="wztabs_a mart8">
            上月环比
            <span class="rate_red paddlr5">{{item.monthCompare}}%</span> ，去年同比
            <span class="rate_green paddlr5">{{item.yearCompare}}%</span>
          </div>
        </div>
        <div class="padd_bt12 border_bf0f0f0">
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月目标实现毛利：
              <span>{{item.targetProfit}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              目前毛利润：
              <span>{{item.grossProfitMoney}}万</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月费用：
              <span>{{item.deptBear}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              本月净利润：
              <span>{{item.netProfit}}万</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月分摊及财务费用：
              <span>{{item.bearsMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              本月净净利：
              <span>{{item.netsProfit}}万</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              距离实现本月目标毛利：
              <span>{{item.targetProfitDif}}万</span>
            </p>
          </div>
        </div>
        <div class="padd_bt12 border_bf0f0f0">
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              年净利：
              <span>{{item.yearNet}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              年净净利：
              <span>{{item.yearNets}}万</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              实现目标月净利：
              <span>{{item.targetNet}}万</span>
            </p>
          </div>
        </div>
        <div class="padd_bt12 border_bf0f0f0">
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              TB线索：
              <span>{{item.tbClueMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              本月开标：
              <span>{{item.openTenderMoney}}万</span>
            </p>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月中标：
              <span>{{item.getTenderMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_two">
              已中标未下单：
              <span>{{item.getTenderNotMoney}}万</span>
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
            <img :src="qh" alt="转换" /> 文字版
          </span>
        </div>
        <div class="tabs_four mart8">
          <p class="tabs_four_a">
            财务评级：
            <span>{{item.departmentShow}}</span>
          </p>
          <span class="tabs_four_b" @click="jxq(item.id,item.departmentName,item.departmentId)">查看详情</span>
        </div>
        <div class="tabs_four mart8">
          <p class="tabs_four_a">
            运营评级：
            <span>{{item.departmentLevel}}</span>
          </p>
          <span class="tabs_four_c">NO.{{item.saleNo}}</span>
        </div>
        <div class="tabs_four mart8">
          <p class="tabs_four_a">
            月经营情况：
            <span>{{item.monthBusiness}}</span>
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
          <div class="tabs_biaoge_all">
            <div class="tabs_five_a">
              <h3>{{item.dayMoney}}万</h3>
              <p>今日完成</p>
            </div>
          </div>
          <div class="tabs_biaoge_all">
            <div class="tabs_five_a">
              <h3>
                {{item.finishRate.split('/')[0]}}
                <span class="tabs_five_arate">NO.{{item.rateNo}}</span>
              </h3>
              <p>实时完成率</p>
            </div>
          </div>
           <div class="tabs_rate_pc tabs_biaoge_all">
            <div class="tabs_five_a">
              <h3>{{item.monthCompare}}%</h3>
              <p>环比</p>
            </div>
          </div>
          <div class="tabs_rate_pc tabs_biaoge_all">
            <div class="tabs_five_a">
              <h3>{{item.yearCompare}}%</h3>
              <p>同比</p>
            </div>
          </div>
          <div class="tabs_rate_mobile tabs_biaoge_all">
            <div class="tabs_five_b">
              <p>
                环比：
                <span>{{item.monthCompare}}%</span>
              </p>
              <p>
                同比：
                <span>{{item.yearCompare}}%</span>
              </p>
            </div>
          </div>
         
        </div>
        <div class="tabs_six">
          <h3 class="tabs_six_a">
            <img :src="dd" />今日订单来自客户
          </h3>
          <div class="tabs_five">
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>
                  {{item.finishMoney}}
                  <span class="tabs_five_arate">NO.{{item.saleNo}}</span>
                </h3>
                <p>目前销售累计</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>
                  {{item.netProfit}}
                  <span class="tabs_five_arate">NO.{{item.netNo}}</span>
                </h3>
                <p>目前月净利</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.grossProfitMoney}}</h3>
                <p>目前月毛利</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.monthShouldMoney}}</h3>
                <p>目前应完成</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.targetNet}}</h3>
                <p>月净利润目标</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.targetProfit}}</h3>
                <p>月毛利润目标</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.differenceMoney}}</h3>
                <p>距销售目标差额</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>
                  {{item.netsProfit}}
                  <span class="tabs_five_arate">NO.{{item.netsNo}}</span>
                </h3>
                <p>目前月净净利</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.targetProfitDif}}</h3>
                <p>未完成毛利率</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.monthMoney}}</h3>
                <p>月销售额目标</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.targetNets}}</h3>
                <p>月净净利目标</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>
                  {{item.grossProfit.split('/')[1]}}
                  <span
                    class="tabs_five_arate"
                  >NO.{{item.grossPNo}}</span>
                </h3>
                <p>月平均毛利率</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.totalYearPlanMoney}}</h3>
                <p>年任务</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.totalFinishYearMoney}}</h3>
                <p>年累计完成</p>
              </div>
            </div>
           
          </div>
        </div>
        <div class="tabs_six">
          <h3 class="tabs_six_a">
            <img :src="bmys" />部门预算
          </h3>
          <div class="tabs_five">
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.departmentTargetBear}}</h3>
                <p>月部门费用预算</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.bearsMoney}}</h3>
                <p>分摊费用</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.departmentCount}}</h3>
                <p>部门人数</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.departmentSalary}}</h3>
                <p>部门工资</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.otherBear}}</h3>
                <p>月其他费用</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.bearMoney}}</h3>
                <p>月总费用</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs_six">
          <h3 class="tabs_six_a">
            <img :src="cwqk" />财务情况
          </h3>
          <div class="tabs_five">
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.receipt}}</h3>
                <p>月收款</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.receiptPlan}}</h3>
                <p>月收款计划</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.shouldReceipt}}</h3>
                <p>应收款</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.payment}}</h3>
                <p>月付款</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.paymentPlan}}</h3>
                <p>月付款计划</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.shouldPayment}}</h3>
                <p>应付款</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.departmentUseMoney}}</h3>
                <p>期初现金净额</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.departmentNetCashMoney}}</h3>
                <p>本月现金净额</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.department_month_use_money}}</h3>
                <p>期末现金净额</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.monthBadDebt}}</h3>
                <p>月提起坏账</p>
              </div>
            </div>

            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.quarterBadDebt}}</h3>
                <p>季度坏账</p>
              </div>
            </div>
            <div class="tabs_biaoge_all">
              <div class="tabs_five_a">
                <h3>{{item.yearBadDebt}}</h3>
                <p>年度坏账</p>
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
  props: ["tabdata1", "value1", "jxq", "alertNr", "zhezhao"],
  mounted() {
    setTimeout(() => {
      console.log("1", this.tabdata1);
      console.log("2", this.jxq);
      console.log("3", this.alertNr);
      console.log("4", this.zhezhao);
    }, 1000);
  },
  methods: {
    boxOrtextChange() {
      console.log("ss");
      this.zhuan = !this.zhuan;
      console.log(this.zhuan);
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
      console.log(clipboard);
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
.tabs_rate_pc {
  display: none;
}

.wztabs_a {
  line-height: 20px;
  color: $color333;
}

.tabs_four_copy {
  line-height: 24px;
  font-size: $fs13;
  width: 65px;
  text-align: center;
  background: $colorfff;
  border-radius: 4px;
  color: $color909399;
  border: 1px solid $colorf0f0f0;
  position: absolute;
  right: 0;
  bottom: 3px;
  cursor: pointer;
}

.tabs_five {
  display: flex;
  border-left: 1px solid $colorf0f0f0;
  border-top: 1px solid $colorf0f0f0;
  flex-wrap: wrap;
}

.tabs_biaoge_all {
  box-sizing: border-box;
  width: 33.333333%;
  padding: 12px 0;
  text-align: center;
  border-bottom: 1px solid $colorf0f0f0;
}
.tabs_biaoge_all:nth-child(3n){
  border-right:1px solid $colorf0f0f0;
}
.tabs_biaoge_all:nth-child(3n)>div {
  border-right: none;
}

.tabs_five .tabs_five_a {
  padding: 0;
  border-right: 1px solid $colorf0f0f0;
}

.tabs_five_arate {
  display: inline-block;
  color: $colorfb942d;
  font-size: $fs12;
  transform: scale(0.9);
  line-height: 14px;
}

.tabs_five .tabs_five_b {
  font-size: $fs14;
  line-height: 17px;
}

.tabs_five .tabs_five_b span {
  color: $colorff5c61;
}

.tabs_details {
  padding: 12px 15px;
}

.tabs_five .tabs_five_a h3 {
  color: $color333;
  line-height: 14px;
  font-size: $fs14;
  font-weight: normal;
}

.tabs_five .tabs_five_a p {
  color: $color909399;
  margin-top: $mar8;
  line-height: 12px;
  font-size: $fs12;
}

.tabs_six_a img {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  vertical-align: sub;
  margin-right: 5px;
}

.tabs_six_a {
  font-size: $fs13;
  padding: 12px 0 8px 0;
  line-height: 16px;
  font-weight: bold;
}

.tabs_four {
  display: flex;
}

.tabs_four .tabs_four_a {
  font-size: $fs14;
  color: $color909399;
  width: 100%;
  line-height: 20px;
}

.tabs_four .tabs_four_a span {
  color: $color333;
}

.tabs_four .tabs_four_b {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs14;
  color: $color409eff;
  line-height: 16px;
}

.tabs_four .tabs_four_c {
  display: block;
  font-size: $fs14;
  min-width: 80px;
  text-align: right;
  color: $colorff5c61;
  line-height: 16px;
}

.tabs_four .tabs_four_d {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs14;
  color: $colorff5c61;
  line-height: 16px;
}

.tabs_thr {
  display: flex;
}

.tabs_thr h3 {
  font-size: $fs16;
  color: $color333;
  width: 100%;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_thr span {
  display: block;
  min-width: 80px;
  text-align: right;
  font-size: $fs13;
  line-height: 20px;
  cursor: pointer;
}

.tabs_thr span img {
  height: 12px;
  vertical-align: middle;
}

.tabs_lists {
  background: $colorfff;
  text-align: left;
}

.tabs_one, .tabs_two {
  display: flex;
  padding: 0 $padd15;
}

.tabs_two {
  cursor: pointer;
  user-select: none;
}

.tabs_one {
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 5px;
}

.tabs_two.act, .tabs_two:hover {
  background: #f5f7fa;
}

.tabs_normal {
  font-size: $fs13;
  line-height: 20px;
  padding: 8px 0;
  color: $color909399;
}

.tabs_normal_cont {
  font-size: $fs13;
  line-height: 20px;
  padding: 10px 0;
  color: $color909399;
}

.tabs_la {
  width: 12%;
  text-align: left;
  font-size: $fs12;
}

.tabs_lb {
  width: 34%;
}

.tabs_lc {
  width: 32%;
  text-align: right;
}

.tabs_ld {
  width: 22%;
  padding-left: 10px;
  text-align: right;
}

.tabs_lname {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_lmoney {
  color: #333;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs_ld_img {
  width: 15px;
}

.wztabs_two {
  text-align: right;
}

@media screen and (min-width: 850px) {
  .tabs_rate_pc {
    display: block;
  }

  .tabs_rate_mobile {
    display: none;
  }

  .tabs_biaoge_all {
    width: 25%;
  }
  .tabs_biaoge_all:nth-child(3n){
  border-right:none;
}
.tabs_biaoge_all:nth-child(4n){
  border-right:1px solid $colorf0f0f0;
}
  .tabs_biaoge_all:nth-child(3n)>div {
    border-right: 1px solid $colorf0f0f0;
  }

  .tabs_biaoge_all:nth-child(4n)>div {
    border-right: none;
  }
}
</style>