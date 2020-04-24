<template>
  <div class="wrapper wrapwhite">
    <Head :act.sync="act" :ty.sync="act1"></Head>

    <div class="content" style="font-size:0.3rem;padding:0 15px;color:black;">
      <div class="menu-head-top50"></div>
      <h3 style="text-align:left;line-height:0.8rem;">
        <p style="overflow:hidden;">
          <span
            id="sobox"
            style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;"
          >
            <!-- {{value1}} -->
            <el-date-picker
              ref="timechoose"
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="border:none;font-size:0.4rem!importment;font-weight:900;width:45%;"
              :clearable="false"
              :picker-options="pickerOptions0"
              value-format="yyyy-MM-dd"
              @change="changetime"
              class="el-icon-arrow-down1"
              :editable="false"
            >
              <template>
                <!-- <i class="el-icon-arrow-down"></i> -->
              </template>
            </el-date-picker>
          </span>
        </p>
      </h3>
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;" v-show="false">
        <div class="left" @click="zhongjiedata({index:1})" :class="soit===1?'act':''">月度</div>

        <div class="left" @click="zhongjiedata({index:2})" :class="soit===2?'act':''">年度</div>
      </div>

      <div
        v-for="(item,index) in listdata"
        :key="index"
        style="border:1px solid #ccc;margin-bottom:0.2rem;padding:0.2rem;"
      >
        <h3
          style="font-size:0.3rem;text-align:left;line-height:0.8rem;height:0.8rem;border-bottom:1px solid #ccc;"
        >
          <span style="float:left;">{{item.deptname1}}</span>
          <span style="float:right;">
            总得分：
            <span style="color:red;">{{item.total}}</span>
          </span>
        </h3>
        <div
          v-for="(i,d) in item.kpiItem"
          :key="d"
          style="text-align:left;border-bottom:1px solid #ccc;padding-bottom:0.2rem;"
        >
          <h3>{{i.item_name}}</h3>
          <p v-show="i.item_name!='现金流'">{{i.remark}}</p>
          <p>{{i.result}}</p>
          <p>
            评分标准：
            <span style="color:#ccc;">{{i.rulesinfo}}</span>
          </p>
          <p style="margin-top:0.2rem;overflow:hidden;">
            <span style="margin-right:1rem;float:left;">占比{{i.weight*100}}%</span>
            <span style="float:right;">
              单项得分
              <span style="color:red;">{{Number(i.score).toFixed(1)}}</span>
            </span>
          </p>
        </div>
        <p style>
          <el-button type="primary" style="width:100%;" @click="xiazai(item.docsrc)">本部门KPI下载</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { salkpi } from "@/api/configWu";
import Head from "@/view/common/head";
import {getNowDate} from "@/untils/common";

let ybs = 5;
export default {
  name: "khqk",
  components: {
    Head
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      indexnum: "3",
      value1: getNowDate(),
      alldata: {},
      listdata: [],
      wxdlist: [],
      soit: 1,
      act: 4,
      act1: true
    };
  },
  mounted() {
    this.getdata();
    this.getact();
  },
  watch: {
    value1() {
      this.getdata();
    }
  },
  methods: {
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("leaderMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/kpi") {
          this.act = index + 1;
        }
      });
    },
    xiazai(a) {
      window.location.href = a;
    },
    zhongjiedata(a) {
      if (a.index == 1) {
        this.soit = 1;
      } else if (a.index == 2) {
        this.soit = 2;
      }

      this.datalist = [];

      this.getdata();
    },
    changetime() {
      console.log(111);
      this.getdata();
    },
    getdata() {
      salkpi({
        role: localStorage.getItem("role"),
        submitTime: this.value1,
        submitTimeType: this.soit == 1 ? "m" : "y"
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.listdata = res.data;
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

<style scoped>
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
  font-weight: 900;
}
.bmbt {
  font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900;
}
.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}
.bmcontent > div {
  width: 33%;
  padding-bottom: 0.3rem;
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
  border-bottom: 1px solid #ccc;
  padding-top: 0.2rem;
  border-right: 1px solid #ccc;
}
.bmcontent > .noboder {
  border-right: none;
}
.menubox {
  border-bottom: 1px solid rgb(220, 223, 230);
}
.menubox > div {
  width: 50%;
  line-height: 30px;
  background: #fff;
}
.menubox .act {
  border-bottom: 2px solid #409eff;
  color: #409eff;
}
</style>