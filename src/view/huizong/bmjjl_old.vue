<template>
  <div class="wrapper wrapwhite">
    <Head :act.sync='act' :ty.sync='act1'></Head>
    <div class="content">
    <div class="menu-head-top50"></div>

      <div style="padding:0 15px;font-size:0.3rem;color:black;">
      <h3 style="text-align:left;line-height:0.8rem;">
        <p style="overflow:hidden;">
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
         
        </p>
       
      </h3>
      <div>
        <h3 style="font-size:0.3rem;text-align:left;line-height:0.8rem;">部门净净利<span style="color:red;">(可左右拖动)</span></h3>
        <el-table :data="listdata" border style="width: 100%" :summary-method="getSummaries" show-summary>
          
          <el-table-column width=110 fixed style="width:20%" prop="leader" label="leader">
              <template v-slot="scope">
                <!-- <div @click="ccc(scope.row)">{{scope.row.user_name}}</div> -->
                <router-link :to='{path:"/create",query:{userid:scope.row.leader_id}}' style="text-align:center;">{{scope.row.leader}}</router-link>
              </template>
          </el-table-column>
          <el-table-column width=110  style="width:20%" prop="departmentName" label="部门名称"></el-table-column>
          <!-- <el-table-column width=120 prop="customerVol" label="客户体量">
              <template v-slot="scope">
                  {{Number(scope.row.customerVol).toFixed(1)}}万
              </template>
          </el-table-column > -->
          <el-table-column width=110 style="width:20%" prop="yearNetsMoney" label="年净净利" sortable>
            <template v-slot="scope">{{Number(scope.row.yearNetsMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width=110 style="width:20%" prop="quarterNetsMoney" label="季净净利" sortable>
            <template v-slot="scope">{{Number(scope.row.quarterNetsMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width=110 style="width:20%" prop="monthNetsMoney" label="月净净利" sortable>
            <template v-slot="scope">{{Number(scope.row.monthNetsMoney).toFixed(1)}}万</template>
          </el-table-column>

          <!-- <el-table-column width=120 style="width:20%" prop="yearNetMoney" label="年净利" sortable>
            <template v-slot="scope">{{Number(scope.row.yearNetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width=120 style="width:20%" prop="quarterNetMoney" label="季净利" sortable>
            <template v-slot="scope">{{Number(scope.row.quarterNetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width=120 style="width:20%" prop="monthNetMoney" label="月净利" sortable>
            <template v-slot="scope">{{Number(scope.row.monthNetMoney).toFixed(1)}}万</template>
          </el-table-column> -->
          <el-table-column width=110 style="width:20%" prop="quarterGrossMoney" label="年毛利润" sortable>
            <template v-slot="scope">{{Number(scope.row.quarterGrossMoney).toFixed(1)}}万</template>
          </el-table-column>
          <!-- <el-table-column style="width:20%" prop="finishRate" label="完成率">
            <template v-slot="scope">{{scope.row.finishRate}}%</template>
          </el-table-column> -->
          <el-table-column  width=140  prop="yearBear" label="年部门费用" sortable>
            <template v-slot="scope">{{Number(scope.row.yearBear).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column  width=140  prop="yearBears" label="年部门分摊" sortable>
            <template v-slot="scope">{{Number(scope.row.yearBears).toFixed(1)}}万</template>
          </el-table-column>
        </el-table>
      </div>  
    </div>  
    </div>  
  </div>
</template>

<script>

import Head from "@/view/common/head";
import { alldepartmentSale } from "@/api/configWu";
let ybs = 5;
export default {
  name: "khqk",
  components:{
    Head
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
      routerData: {date:new Date()},
      alldata: {},
      listdata: [],
      wxdlist: [],
      act:1,
      act1:true,
    };
  },
  mounted() {
    this.getdata();
    this.getact()
  },
  methods: {
    getact(){
      var lodata = JSON.parse(sessionStorage.getItem('leaderMenus'))
      console.log(lodata)
      lodata.forEach((e,index)=>{
        if(e.path=="/bmjjl"){
          this.act = index+1
          console.log(index)
        }
      })
    },
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = Number(sums[index]).toFixed(2)
            sums[index] += ' 万元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
    changetime(){
      console.log(111)
      this.getdata()
    },
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    getdata() {
      var date = new Date(this.routerData.date);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      alldepartmentSale({
        role:localStorage.getItem('role'),
        submitTime: date1
      }).then(res => {
        console.log(res);
        if(res.code==200){
            this.listdata = res.data;
        }else{
            this.$message.error(res.msg)
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
</style>