<template>
  <div style="min-height:300px;">
    <div style="background:#f2f2f5;">
      <div
        style="border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;font-size:0.3rem;"
        v-for="(item,index) in tabdata2"
        :key="index"
      >
        <div>
          <h3 style="text-align:left;line-height:1.2rem;background:#fff;text-indent:15px;">
            <p style="line-height:0.6rem;">{{item.customerName}}</p>
          </h3>
        </div>
        <div class="bmcontent" style="display:flex;flex-wrap:wrap;">
          <div>
            <p class="bmqb">{{item.monthMoney}}W</p>
            <p class="bmbt">本月任务</p>
          </div>
          <div @click="tankuang(item,'今日完成(万)',index)">
            <p class="bmqb" style="color:red;">{{item.dayMoney}}W</p>
            <p class="bmbt">今日完成</p>
          </div>
          <div>
            <p class="bmqb">{{item.monthShouldMoney}}W</p>
            <p class="bmbt">截止今日应完成</p>
          </div>
          <div>
            <p class="bmqb">{{item.finishMoney}}W</p>
            <p class="bmbt">实际累计完成</p>
          </div>
          <div @click="tankuang(item,'今日毛利率',index)">
            <p class="bmqb" style="color:red;">{{item.grossProfit.split('/')[0]}}</p>
            <p class="bmbt">今日毛利率</p>
          </div>
          <div>
            <p class="bmqb">{{item.grossProfit.split('/')[1]}}</p>
            <p class="bmbt">累计毛利率</p>
          </div>
          <div>
            <p class="bmqb">{{item.finishRate.split('/')[1]}}</p>
            <p class="bmbt">计划完成率</p>
          </div>
          <div>
            <p class="bmqb">{{item.finishRate.split('/')[0]}}</p>
            <p class="bmbt">实时完成率</p>
          </div>
          <div>
            <p class="bmqb">{{item.differenceMoney}}W</p>
            <p class="bmbt">超额/差额</p>
          </div>
          <div>
            <p class="bmqb">{{item.netProfit}}</p>
            <p class="bmbt">净利</p>
          </div>
          <div>
            <p class="bmqb">{{item.netsProfit}}</p>
            <p class="bmbt">净净利</p>
          </div>

          <div>
            <p class="bmqb">{{item.monthYearCompare.split('/')[0]}}</p>
            <p class="bmbt">上月环比</p>
          </div>
          <div>
            <p class="bmqb">{{item.monthYearCompare.split('/')[1]}}</p>
            <p class="bmbt">去年同比</p>
          </div>
          <div>
            <p class="bmqb">{{item.standardFinishMoney}}W</p>
            <p class="bmbt">标准销售额</p>
          </div>
          <div>
            <p class="bmqb">{{item.tbClueMoney}}W</p>
            <p class="bmbt">TB线索</p>
          </div>
          <div>
            <p class="bmqb">{{item.openTenderMoney}}W</p>
            <p class="bmbt">本月开标</p>
          </div>
          <div>
            <p class="bmqb">{{item.getTenderMoney}}W</p>
            <p class="bmbt">截止今日中标</p>
          </div>
          <div>
            <p class="bmqb">{{item.loseTenderMoney}}W</p>
            <p class="bmbt">丢标</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改" :visible.sync="centerDialogVisible" width="80%" center>
      <span>
        <el-input v-model="value2" placeholder="请输入修改值" type="number"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="xiugaidata()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updata } from "@/api/config";
export default {
  props: ["tabdata2", "value1"],
  data() {
    return {
      centerDialogVisible: false,
      value2: ""
    };
  },
  mounted() {},
  methods: {
    tankuang(a, b, len) {
      this.centerDialogVisible = true;
      var data = a;
      data.label = b;
      data.len = len;
      localStorage.setItem("xiugaiData", JSON.stringify(data));
    },
    xiugaidata() {
      let a = JSON.parse(localStorage.getItem("xiugaiData"));

      if (!this.value2) {
        this.$message.error("请填写完整信息");
        return;
      }
      if (a.label == "今日完成(万)") {
        if (this.value2 > 1000) {
          this.open("修改金额不可以超过1000万");
          this.value2 = "";
          return;
        }
        updata({
          customerId: a.customerId,
          customerName: a.customerName,
          dayMoney: this.value2,
          grossProfit: a.grossProfit,
          submitTime: this.value1,
          role: ""
        })
          .then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              a.dayMoney=this.value2;
              this.$set(this.tabdata2, a.len, a);
              this.value2 = "";
              this.pagenum = 1;
                console.log(res);
             
              this.centerDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
          });
      } else {
     
        updata({
          customerId: a.customerId,
          customerName: a.customerName,
          dayMoney: a.dayMoney,
          grossProfit: this.value2,
          submitTime: this.value1
        })
          .then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              a.grossProfit=this.value2+"%";
              this.$set(this.tabdata2, a.len, a);
              this.value2 = "";
              this.pagenum = 1;
            

              this.centerDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {});
      }
      this.centerDialogVisible = true;
    }
  }
};
</script>

<style scoped>
.menubox {
  border-bottom: 1px solid rgb(220, 223, 230);
}
.menubox > div {
  width: 25%;
  line-height: 40px;
  background: #fff;
  margin-top: 0.2rem;
}
.menubox .act {
  border-bottom: 2px solid #409eff;
  color: #409eff;
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
  /* padding-bottom: 0.3rem; */
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
  height: 0.6rem;
}
.flex_1 > div > span {
  /* display: block; */
  /* width: 100%; */
}
.blue {
  color: black;
  font-weight: 900;
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
  font-weight: 900;
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
.bmcontent > div {
  border-bottom: 1px solid #ccc;
  /* padding-top: 0.2rem; */
  border-right: 1px solid #ccc;
}
.bmcontent > .noboder {
  border-right: none;
}
#pxcord > span {
  text-decoration: underline;
  color: black;
}
#pxcord > .xuanzhong {
  color: #ccc;
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
  font-weight: 900;
}
.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
  font-weight: 900;
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
/* .bmcontent>div:nth-child(3n+0){border-right: none} */
.show {
  display: block;
}
.hidden {
  display: none;
}
</style>