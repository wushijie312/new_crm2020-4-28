<template>
  <div>
    
    <div
      style="padding: 15px;background: #fff;border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;font-size:0.3rem;"
      v-for="(item,index) in tabdata1"
      :key="index"
    >
      <div>
        <h3 style="text-align:left;line-height:0.8rem;">
          <p style="overflow:hidden;">
            <span style="float:left;">{{departmentName}}</span>
            <span
              style="float:right;font-size:0.3rem;font-weight:900;"
              @click="$router.push({path:'/xiaoshou',query:{top:$route.query.top,search:$route.query.search,iswzb:$route.query.iswzb}})"
            >返回首页</span>
          </p>
          <!-- <p>{{$route.query.date}}</p> -->
          <span
              id="sobox"
              style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                ref="timechoose"
                v-model="routerData.date"
                type="date"
                placeholder="选择日期"
                style="border:none;font-size:0.4rem!importment;font-weight:900;width:45%;"
                :clearable="false"
                :picker-options="pickerOptions0"
                value-format = 'yyyy-MM-dd'
                @change="changetime"
                class="el-icon-arrow-down1"
                :editable = 'false'
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
        </h3>
      </div>
      <Menu1 :indexnum.sync="indexnum" :routerData.sync="routerData"></Menu1>
      <AllEchars :date.sync="routerData.date" :departId.sync="routerData.departid" style="margin-top:0.3rem;margin-bottom:0.5rem;"></AllEchars>
      <div class="bmcontent" style="display:flex;flex-wrap:wrap;overflow:hidden;text-align:center;">
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid black;border-left:none;border-right:none;"
        >盈利：【{{item.departmentShow}}】</p>
        <!-- <div>
        <p class="bmqb">{{item.monthMoney}}万</p>
        <p class="bmbt">本月任务</p>
        </div>-->
        <div >
          <p class="bmbt">月净净利</p>
          <p class="bmqb">
            {{item.monthNetsMoney}}万
            <span
              :class="item.monthNetsNo<3?'red':'cheng'"
            >no{{item.monthNetsNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季净净利</p>
          <p class="bmqb">
            {{item.quarterNetsMoney}}万
            <span
              :class="item.quarterNetsNo<3?'red':'cheng'"
            >no{{item.quarterNetsNo}}</span>
          </p>
        </div>
        <div class="noboder" @click="showchars('nets')" >
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年净净利</p>
          <p class="bmqb">
            {{item.yearNetsMoney}}万
            <span
              :class="item.yearNetsNo<3?'red':'cheng'"
            >no{{item.yearNetsNo}}</span>
          </p>
        </div>
        <div class="lql">
          <p class="bmbt">月净净利目标</p>
          <p class="bmqb">{{item.monthNetsPlan}}万</p>
        </div>
        <div  class="lql">
          <p class="bmbt">季净净利目标</p>
          <p class="bmqb">{{item.quarterNetsPlan}}万</p>
        </div>
        <div class="noboder lql" >
          <p class="bmbt">年净净利目标</p>
          <p class="bmqb">{{item.yearNetsPlan}}万</p>
        </div>
        <div >
          <p class="bmbt">月净利</p>
          <p class="bmqb">
            {{item.monthNetMoney}}万
            <span
              :class="item.monthNetNo<3?'red':'cheng'"
            >no{{item.monthNetNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季净利</p>
          <p class="bmqb">
            {{item.quarterNetMoney}}万
            <span
              :class="item.quarterNetNo<3?'red':'cheng'"
            >no{{item.quarterNetNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('net')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年度净利</p>
          <p class="bmqb">
            {{item.yearNetMoney}}万
            <span :class="item.yearNetNo<3?'red':'cheng'">no{{item.yearNetNo}}</span>
          </p>
        </div>
        <div class="lql">
          <p class="bmbt">月净利目标</p>
          <p class="bmqb">{{item.monthNetPlan}}万</p>
        </div>
        <div class="lql" >
          <p class="bmbt">季净利目标</p>
          <p class="bmqb">{{item.quarterNetPlan}}万</p>
        </div>
        <div class="noboder lql" >
          <p class="bmbt">年净利目标</p>
          <p class="bmqb">{{item.yearNetPlan}}万</p>
        </div>
        <div >
          <p class="bmbt">月毛利润</p>
          <p class="bmqb">
            {{item.monthGrossMoney}}万
            <span
              :class="item.monthGrossNo<3?'red':'cheng'"
            >no{{item.monthGrossNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季毛利润</p>
          <p class="bmqb">
            {{item.quarterGrossMoney}}万
            <span
              :class="item.quarterGrossNo<3?'red':'cheng'"
            >no{{item.quarterGrossNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('gross')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年毛利润</p>
          <p class="bmqb">
            {{item.yearGrossMoney}}万
            <span
              :class="item.yearGrossNo<3?'red':'cheng'"
            >no{{item.yearGrossNo}}</span>
          </p>
        </div>
        <div  class="lql">
          <p class="bmbt">月毛利润目标</p>
          <p class="bmqb">{{item.monthGrossPlan}}万</p>
        </div>
        <div  class="lql">
          <p class="bmbt">季毛利润目标</p>
          <p class="bmqb">{{item.quarterGrossPlan}}万</p>
        </div>
        <div class="noboder lql" >
          <p class="bmbt">年毛利润目标</p>
          <p class="bmqb">{{item.yearGrossPlan}}万</p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid black;border-left:none;border-right:none;"
        >费用</p>
        <!-- <div class="noboder">
        <p class="bmqb">{{item.monthShouldMoney}}万</p>
        <p class="bmbt">截止今日应完成</p>
        </div>-->
        <div >
          <p class="bmbt">月部门费用</p>
          <p class="bmqb">
            {{item.monthBear}}万
            <span
              :class="item.monthBearNo<3?'red':'cheng'"
            >no{{item.monthBearNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季部门费用</p>
          <p class="bmqb">{{item.quarterBear}}万
            <span
              :class="item.quarterBearNo<3?'red':'cheng'"
            >no{{item.quarterBearNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('bear')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年部门费用</p>
          <p class="bmqb">{{item.yearBear}}万
            <span
              :class="item.yearBearNo<3?'red':'cheng'"
            >no{{item.yearBearNo}}</span>
          </p>
        </div>
        <div  class="lql">
          <p class="bmbt">月部门分摊</p>
          <p class="bmqb">{{item.monthBears}}万
            <span
              :class="item.monthBearsNo<3?'red':'cheng'"
            >no{{item.monthBearsNo}}</span>
          </p>
        </div>
        <div  class="lql">
          <p class="bmbt">季部门分摊</p>
          <p class="bmqb">{{item.quarterBears}}万
            <span
              :class="item.quarterBearsNo<3?'red':'cheng'"
            >no{{item.quarterBearsNo}}</span>
          </p>
        </div>
        <div class="noboder lql"  @click="showchars('bears')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年部门分摊</p>
          <p class="bmqb">{{item.yearBears}}万
            <span
              :class="item.yearBearsNo<3?'red':'cheng'"
            >no{{item.yearBearsNo}}</span>
          </p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid black;border-left:none;border-right:none;"
        >销售额</p>
        <div >
          <p class="bmbt">月销售额</p>
          <p class="bmqb">
            {{item.monthSaleMoney}}万
            <span
              :class="item.monthSaleNo<3?'red':'cheng'"
            >no{{item.monthSaleNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季销售额</p>
          <p class="bmqb">
            {{item.quarterSaleMoney}}万
            <span
              :class="item.quarterSaleNo<3?'red':'cheng'"
            >no{{item.quarterSaleNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('sale')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年销售额</p>
          <p class="bmqb">
            {{item.yearSaleMoney}}万
            <span
              :class="item.yearSaleNo<3?'red':'cheng'"
            >no{{item.yearSaleNo}}</span>
          </p>
        </div>
        <div  class="lql">
          <p class="bmbt">月销售目标</p>
          <p class="bmqb">{{item.monthSalePlan}}万</p>
        </div>
        <div  class="lql">
          <p class="bmbt">季销售目标</p>
          <p class="bmqb">{{item.quarterSalePlan}}万</p>
        </div>
        <div class="noboder lql" >
          <p class="bmbt">年销售目标</p>
          <p class="bmqb">{{item.yearSalePlan}}万</p>
        </div>
        <div >
          <p class="bmbt">月标准销售额</p>
          <p class="bmqb">
            {{item.monthStandardMoney}}万
            <span
              :class="item.monthStandardNo<3?'red':'cheng'"
            >no{{item.monthStandardNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季标准销售额</p>
          <p class="bmqb">
            {{item.quarterStandardMoney}}万
            <span
              :class="item.quarterStandardNo<3?'red':'cheng'"
            >no{{item.quarterStandardNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('stand')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年标准销售额</p>
          <p class="bmqb">
            {{item.yearStandardMoney}}万
            <span
              :class="item.yearStandardNo<3?'red':'cheng'"
            >no{{item.yearStandardNo}}</span>
          </p>
        </div>
        <div  class="lql">
          <p class="bmbt">月标准销售额目标</p>
          <p class="bmqb">{{item.monthStandardPlan}}万</p>
        </div>
        <div  class="lql">
          <p class="bmbt">季标准销售额目标</p>
          <p class="bmqb">{{item.quarterStandardPlan}}万</p>
        </div>
        <div class="noboder lql" >
          <p class="bmbt">年标准销售额目标</p>
          <p class="bmqb">{{item.yearStandardPlan}}万</p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid black;border-left:none;border-right:none;"
        >运营【{{item.bussineslevel}}】</p>
        <div >
          <p class="bmbt">月人均标准销售额</p>
          <p class="bmqb">{{item.monthPerStandard}}万
            <span
              :class="item.monthPerStandNo<3?'red':'cheng'"
            >no{{item.monthPerStandNo}}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季人均标准销售额</p>
          <p class="bmqb">{{item.quarterPerStandard}}万
            <span
              :class="item.quarterPerStandNo<3?'red':'cheng'"
            >no{{item.quarterPerStandNo}}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('perStand')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年人均标准销售额</p>
          <p class="bmqb">{{item.yearPerStandard}}万
            <span
              :class="item.yearPerStandNo <3?'red':'cheng'"
            >no{{item.yearPerStandNo }}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">月人均净利润</p>
          <p class="bmqb">{{item.monthPerNet}}万
            <span
              :class="item.monthPerNetNo <3?'red':'cheng'"
            >no{{item.monthPerNetNo }}</span>
          </p>
        </div>
        <div >
          <p class="bmbt">季人均净利润</p>
          <p class="bmqb">{{item.quarterPerNet}}万
            <span
              :class="item.quarterPerNetNo <3?'red':'cheng'"
            >no{{item.quarterPerNetNo }}</span>
          </p>
        </div>
        <div class="noboder"  @click="showchars('perNet')">
          <p class="bmbt" style="color:#21aefb;text-decoration:underline">年人均净利润</p>
          <p class="bmqb">{{item.yearPerNet}}万
            <span
              :class="item.yearPerNetNo  <3?'red':'cheng'"
            >no{{item.yearPerNetNo  }}</span>
          </p>
        </div>
        <p
          style="width:100%;text-align:left;line-height:0.6rem;border:1px solid black;border-left:none;border-right:none;"
        >工资</p>
        <div class="fs">
          <p class="bmbt">月部门工资</p>
          <p class="bmqb">
            {{item.monthDepMoney}}万
            <span
              :class="item.monthDepMoneyNo<3?'red':'cheng'"
            >no{{item.monthDepMoneyNo}}</span>
          </p>
        </div>
        <div class="fs">
          <p class="bmbt">季部门工资</p>
          <p class="bmqb">
            {{item.quarterDepMoney}}万
            <span
              :class="item.quarterDepMoneyNo<3?'red':'cheng'"
            >no{{item.quarterDepMoneyNo}}</span>
          </p>
        </div>
        <div class="noboder fs" >
          <p class="bmbt">年部门工资</p>
          <p class="bmqb">
            {{item.yearDepMoney}}万
            <span
              :class="item.yearDepMoneyNo<3?'red':'cheng'"
            >no{{item.yearDepMoneyNo}}</span>
          </p>
        </div>
        <div class="fs">
          <p class="bmbt">月人均工资</p>
          <p class="bmqb">
            {{item.monthPerMoney}}万
            <span
              :class="item.monthPerMoneyNo<3?'red':'cheng'"
            >no{{item.monthPerMoneyNo}}</span>
          </p>
        </div>
        <div class="fs">
          <p class="bmbt">季人均工资</p>
          <p class="bmqb">
            {{item.quarterPerMoney}}万
            <span
              :class="item.quarterPerMoneyNo<3?'red':'cheng'"
            >no{{item.quarterPerMoneyNo}}</span>
          </p>
        </div>
        <div class="noboder fs" >
          <p class="bmbt">年人均工资</p>
          <p class="bmqb">
            {{item.yearPerMoney}}万
            <span
              :class="item.yearPerMoneyNo<3?'red':'cheng'"
            >no{{item.yearPerMoneyNo}}</span>
          </p>
        </div>
      </div>
    </div>
    <Echars :show.sync="dialogHandler" @confirm="handlerConfirm" :projectId.sync="toall"></Echars>
    
  </div>
</template>

<script>
import Echars from "@/components/echars";
import Menu1 from "@/components/menu1";
import AllEchars from "@/components/echasrsAll";
import { bumenxq, getechars } from "@/api/config";

let ybs = 5;
export default {
  name: "leadzong",
  components: {
    Echars,
    Menu1,
    AllEchars
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      yss: ["yl", "ql", "lql", "fs", "qh"],
      routerData: {
        date:''
      },
      indexnum: "1",
      tabdata1: [],
      allchars: {fy:[],jjl:[],xse:[]},
      dialogHandler: false,
      toall: [
        { mouth: 1, money: 10 },
        { mouth: 2, money: 100 },
        { mouth: 3, money: 300 },
        { mouth: 4, money: 30 }
      ],
      departmentName: ""
    };
  },
  mounted() {
    this.fuzhi()
    this.getdata();
  },
  methods: {
    changetime(){
      console.log(111)
      this.getdata()
    },
    getcolor() {
      var num = Math.random() * 10;
      // console.log(num.toString().slice(0,1))
      if (num.toString().slice(0, 1) > 4) {
        this.getcolor();
        ybs--;
        if (this.ybs < 0) {
          ybs = 5;
        }
        return ybs;
      } else {
        return num.toString().slice(0, 1);
      }
    },
    fuzhi(){
      this.routerData.date = this.$route.query.date;
      this.routerData.departid = this.$route.query.departid;
      this.routerData.id = this.$route.query.id;
      this.routerData.name = this.$route.query.name;
      this.routerData.top = this.$route.query.top;
      var date1 = this.$route.query.date;
      this.departmentName = this.$route.query.name;
      this.routerData.iswzb = this.$route.query.iswzb;
    },
    getdata() {
      
      bumenxq({
        submitTime: this.routerData.date,
        departmentId: this.routerData.departid
      }).then(res => {
        console.log(res);
        this.tabdata1 = []
        this.tabdata1.push(res)
      });
    },
    allch(){
      var date1 = this.routerData.date;
      getechars({
        submitTime: date1,
        type:'bear' ,
        departmentId: this.$route.query.departid
      }).then(res=>{

      })
    },
    showchars(a) {
      var date1 = this.routerData.date;
      getechars({
        submitTime: date1,
        type: a,
        departmentId: this.routerData.departid
      }).then(res => {
        console.log(res);
        this.toall = [];
        res.departmentYearList.forEach(e => {
          var obj = {};
          obj.mouth = e.month;
          obj.money = e.money;
          if (a == "nets") {
            obj.name = this.$route.query.name + " 月净净利";
          } else if (a == "net") {
            obj.name = this.$route.query.name + " 月净利";
          } else if (a == "gross") {
            obj.name = this.$route.query.name + " 月毛利润";
          } else if (a == "bear") {
            obj.name = this.$route.query.name + " 月部门费用";
          } else if (a == "bears") {
            obj.name = this.$route.query.name + " 月部门分摊费用";
          } else if (a == "sale") {
            obj.name = this.$route.query.name + " 月销售额";
          } else if (a == "stand") {
            obj.name = this.$route.query.name + " 月标准销售额";
          } else if (a == "perStand") {
            obj.name = this.$route.query.name + " 月人均标准销售额";
          } else if (a == "perNet") {
            obj.name = this.$route.query.name + " 月人均净利润";
          }
          this.toall.push(obj);
        });
        this.dialogHandler = true;
      });
      // this.dialogHandler = true
    },
    handlerConfirm() {
      console.log();
    }
  }
};
</script>

<style scoped>
.Menu1 >>> .el-radio-group>label{width:33%;}
.left {
  float: left;
  font-weight: 300;
}
.right {
  float: right;
  width: 50%;
  text-align: center;
  font-weight: 300;
}
.bmqb {
  font-size: 0.3rem;
  color: black;
  font-weight: 900
}
.bmbt {
  font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900
}
.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}
.bmcontent > div {
  width: 33%;
  /* padding-bottom: 0.3rem; */
  float: left;
}
body,
html {
  background: #f5f5f7;
}
.flex_1 {
  flex-wrap: wrap;
}
.flex_1 > div {
  width: 100%;
  /* padding-bottom: 0.1rem; */
  line-height: 0.6rem;
}
.flex_1 > div > span {
  /* display: block; */
  /* width: 100%; */
}
.blue {
  color: #999;
  /* width: 30%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.3rem;
}
.black {
  color: black;
  /* width: 40%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-select-dropdown {
  width: 98%;
}
#maincontent1 p {
  padding-left: 20px;
  text-align: left;
}
#maincontent p {
  padding-left: 20px;
  text-align: left;
}
.head {
  height: 1rem;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #21aefb;
  color: #fff;
}
.tap {
  font-size: 0.3rem;
  background: #21aefb;
  height: 0.7rem;
  line-height: 0.7rem;
}
.tap .act {
  background: #fff;
  color: #333;
}
.tap .act a {
  color: #333;
}
.tap a {
  color: #fff;
  text-decoration: none;
}
.maincontent {
  font-size: 0.3rem;
  /* height: 5.5rem; */
  overflow: hidden;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nianBt {
  line-height: 4.2rem;
  width: 20%;
  background: red;
  color: #fff;
}
table,
tbody,
thead {
  width: 100% !important;
}

.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0;
  text-align: center;
}
.red {
  color: #f16c5d;
}
.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
}
.newxin {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: none;
  color: #ccc;
  font-size: 0.24rem;
}
.bmcontent > div {
  border-bottom: 1px solid black;
  /* padding-top: 0.2rem; */
  border-right: 1px solid black;
}
.bmcontent > .noboder {
  border-right: none;
}
</style>