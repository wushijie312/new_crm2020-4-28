<template>
  <div>
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
      </h3>
      <Menu1 :indexnum.sync="indexnum" :routerData.sync="routerData"></Menu1>
      <div>
        <h3 style="font-size:0.3rem;text-align:left;line-height:0.8rem;">
          重点大客户
          <span style="color:red;">(可左右拖动)</span>
        </h3>
        <!-- <div >
          <div  class="bmcontent" v-for="(item,index) in listdata" :key="index" style="display:flex;flex-wrap:wrap;overflow:hidden;font-size:0.3rem;">
            <div :class="yss[0]">
              <p class="bmbt">重点大客户</p>
              <p class="bmqb">{{item.customerName}}</p>
            </div>
            <div :class="yss[1]">
              <p class="bmbt">客户体量</p>
              <p class="bmqb">{{item.customerVol}}</p>
            </div>
            <div class="noboder" :class="yss[2]">
              <p class="bmbt">最终实现收入</p>
              <p class="bmqb">{{item.customerReceipt}}万</p>
            </div>
            <div :class="yss[3]">
              <p class="bmbt">今年目标销售额</p>
              <p class="bmqb">{{item.customerTargetMoney}}万</p>
            </div>
            <div :class="yss[4]">
              <p class="bmbt">截止本月完成额</p>
              <p class="bmqb">{{item.customerLastMoney}}万</p>
            </div>
            <div class="noboder" :class="yss[1]">
              <p class="bmbt">完成率</p>
              <p class="bmqb">{{item.finishRate}}%</p>
            </div>
            <div :class="yss[2]">
              <p class="bmbt">当月完成额</p>
              <p class="bmqb">{{item.monthSaleMoney}}万</p>
            </div>
          </div>
        </div>-->
        <el-table :data="listdata" border style="width: 100%">
          <el-table-column width="120" fixed style="width:20%" prop="customerName" label="重点大客户">
            <template v-slot="scope">
              <router-link
                :to="{path:'/create',query:{customerName:scope.row.customerName,customerId:scope.row.customerId}}"
                
              >{{scope.row.customerName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="customerVol" label="客户体量">
            <template v-slot="scope">{{Number(scope.row.customerVol).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="120" style="width:20%" prop="customerReceipt" label="最终实现收入">
            <template v-slot="scope">{{Number(scope.row.customerReceipt).toFixed(1)}}万</template>
          </el-table-column>

          <el-table-column width="120" style="width:20%" prop="customerTargetMoney" label="今年目标销售额">
            <template v-slot="scope">{{Number(scope.row.customerTargetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="120" style="width:20%" prop="customerLastMoney" label="年累计完成额">
            <template v-slot="scope">{{Number(scope.row.customerLastMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column style="width:20%" prop="finishRate" label="完成率">
            <template v-slot="scope">{{scope.row.finishRate}}%</template>
          </el-table-column>
          <el-table-column style="width:20%" prop="monthSaleMoney" label="当月完成额">
            <template v-slot="scope">{{Number(scope.row.monthSaleMoney).toFixed(1)}}万</template>
          </el-table-column>
        </el-table>
      </div>
      <div style="font-size:0.3rem;margin-top:0.3rem;font-weight:900;">
        <h3 style="font-size:0.3rem;text-align:left;line-height:0.8rem;">全部客户</h3>
        <div style="overflow:hidden;font-size:0.3rem;text-align:left;">
          <div style="width:50%;float:left;">
            下单客户数:
            <span style="color:red;">{{alldata.saleNum}}</span>
          </div>
          <div style="width:50%;float:left;">
            未下单客户数：
            <span style="color:red;">{{alldata.noSaleNum}}</span>
          </div>
        </div>
        <div style="overflow:hidden;font-size:0.3rem;text-align:left;">
          <div style="width:50%;float:left;">
            客户下单率：
            <span style="color:red;">{{alldata.saleRate}}%</span>
          </div>
          <div style="width:50%;float:left;">
            评级:
            <span style="color:red;">{{alldata.grade}}</span>
          </div>
        </div>

        <el-table :data="wxdlist" border style="width: 100%">
          <el-table-column style="width:20%" prop="customerName" label="客户名称">
            <template v-slot="scope">
              <router-link
                :to="{path:'/create',query:{customerName:scope.row.customerName,customerId:scope.row.customerId}}"
                
              >{{scope.row.customerName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column style="width:20%" prop="userName" label="负责销售"></el-table-column>
          <el-table-column style="width:20%" prop="customerLastMoney" label="年累计完成额">
            <template v-slot="scope">{{Number(scope.row.customerLastMoney).toFixed(1)}}万</template>
          </el-table-column>

          <el-table-column style="width:20%" prop="monthSaleMoney" label="当月完成额">
            <template v-slot="scope">{{Number(scope.row.monthSaleMoney).toFixed(1)}}万</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Menu1 from "@/components/menu1";
import { getkhqk } from "@/api/config";
let ybs = 5;
export default {
  name: "khqk",
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
      indexnum: "3",
      routerData: { date: "" },
      alldata: {},
      listdata: [],
      wxdlist: []
    };
  },
  mounted() {
    this.fuzhi();
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
    changetime() {
      console.log(111);
      this.getdata();
    },
    fuzhi() {
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
      getkhqk({
        departmentId: this.routerData.departid,
        submitTime: this.routerData.date
      }).then(res => {
        console.log(res);
        this.alldata = res;
        this.listdata = res.bigCustomerList;
        this.wxdlist = res.allCustomerList;
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
  background: #f2f2f5;
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