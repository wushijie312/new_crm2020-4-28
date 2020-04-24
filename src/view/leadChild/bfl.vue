<template>
  <div>
    <!-- <Menu1 :indexnum.sync="indexnum" :routerData.sync="routerData"></Menu1> -->
    <div style="padding:15px;font-size:0.3rem;color:black;">
      <h3 style="text-align:left;line-height:0.8rem;">
        <p style="overflow:hidden;">
          <span style="float:left;">{{routerData.name}}</span>
          <span
            style="float:right;font-size:0.3rem;font-weight:900;"
            @click="$router.push({path:'/xiaoshou',query:{top:$route.query.top,search:$route.query.search,iswzb:$route.query.iswzb}})"
          >返回首页</span>
        </p>
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
                  <!-- <i class="el-icon-arrow-down"></i> -->
                </template>
              </el-date-picker>
            </span>
      </h3>
      <Menu1 :indexnum.sync="indexnum" :routerData.sync="routerData"></Menu1>
      <!-- <div>
          <div v-for="(item,index) in listdata" :key="index" class="bmcontent"  style="display:flex;flex-wrap:wrap;overflow:hidden;font-size:0.3rem;">
              <div :class="yss[1]">
              <p class="bmbt">姓名</p>
              <p class="bmqb">{{item.user_name}}</p>
            </div>
            <div :class="yss[2]">
              <p class="bmbt">本周拜访客户数量</p>
              <p class="bmqb">{{item.week_customer_count}}</p>
            </div>
            <div class="noboder" :class="yss[3]">
              <p class="bmbt">本周拜访次数</p>
              <p class="bmqb">{{item.week_count}}万</p>
            </div>
            <div :class="yss[4]">
              <p class="bmbt">本月拜访客户数量</p>
              <p class="bmqb">{{item.month_customer_count}}</p>
            </div>
            <div :class="yss[0]">
              <p class="bmbt">本月拜访次数</p>
              <p class="bmqb">{{item.month_count}}万</p>
            </div>
            <div class="noboder" :class="yss[1]">
              <p class="bmbt">等级</p>
              <p class="bmqb">{{item.result}}</p>
            </div>
          </div>
      </div> -->
      <h3 style="font-size:0.3rem;text-align:left;line-height:0.8rem;">客户拜访量<span style="color:red;">(可左右拖动)</span></h3>
      <el-table :data="listdata" border style="width: 100%">
        <el-table-column fixed prop="user_name" label="姓名" >
          <template v-slot="scope">
                <!-- <div @click="ccc(scope.row)">{{scope.row.user_name}}</div> -->
                <router-link :to='{path:"/create",query:{userid:scope.row.user_id}}' style="text-align:center;">{{scope.row.user_name}}</router-link>
              </template>
        </el-table-column>
        <el-table-column prop="week_customer_count" label="本周拜访客户数量"></el-table-column>
        <el-table-column prop="week_count" label="本周拜访次数"></el-table-column>
        <el-table-column prop="month_customer_count" label="本月拜访客户数量"></el-table-column>
        <el-table-column prop="month_count" label="本月拜访次数"></el-table-column>
        <el-table-column prop="result" label="等级">
            <template v-slot="scope">
                <span :style="{color:scope.row.result=='差'?'red':'black'}">{{scope.row.result}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Menu1 from "@/components/menu1";
import { getbfl } from "@/api/configWu";
let ybs = 5

export default {
  name: "cyyj",
  components: {
    Menu1
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
    yss: ["yl", "ql", "lql", "fs", "qh"],
      indexnum: "4",
      routerData: {date:''},
      listdata: []
    };
  },
  mounted() {
    this.fuzhi()
    this.getdata();
  },
  methods: {
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
    changetime(){
      console.log(111)
      this.getdata()
    },
    fuzhi(){
     var routdata = {};
      routdata.date = this.$route.query.date;
      routdata.departid = this.$route.query.departid;
      routdata.id = this.$route.query.id;
      routdata.name = this.$route.query.name;
      this.routerData = routdata;
      this.routerData.top = this.$route.query.top;
      this.routerData.iswzb = this.$route.query.iswzb;
    },
    getdata() {
      
      getbfl({
        dept_id:  this.routerData.departid,
        date:  this.routerData.date
      }).then(res => {
        console.log(res);
        this.listdata = res.data;
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
</style>