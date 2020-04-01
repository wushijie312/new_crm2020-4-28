<template>
  <div>
    <el-table
      :data="tabdata1"
      border
      style="width: 100%;font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900"
    >
      <el-table-column :width="needwidth" prop="userName" label="姓名"></el-table-column>
      <el-table-column :width="needwidth" prop="departmentName" label="部门"></el-table-column>

      <!-- <el-table-column  :width="needwidth"  prop="position" label="职位"></el-table-column> -->

      <el-table-column :width="needwidth" prop="monthMoney" label="本月任务"></el-table-column>
      <el-table-column :width="needwidth" sortable prop="finishMoney" label="月累计完成">
          <template v-slot="scope">{{Number(scope.row.finishMoney).toFixed(1)}}万</template>
      </el-table-column>
      <el-table-column :width="needwidth" sortable prop="lastStandMoney" label="季累计完成">
        <template v-slot="scope">{{Number(scope.row.lastStandMoney).toFixed(1)}}万</template>
      </el-table-column>
      <el-table-column :width="needwidth" sortable prop="finishQuarterMoney" label="季累计销售额">
        <template v-slot="scope">{{Number(scope.row.finishQuarterMoney).toFixed(1)}}万</template>
      </el-table-column>
      <el-table-column :width="needwidth" sortable prop="finishYearMoney" label="年累计销售额">
        <template v-slot="scope">{{Number(scope.row.finishYearMoney).toFixed(1)}}万</template>
      </el-table-column>
    </el-table>

    <div style="overflow:auto" v-show="false" >
      <div
        v-for="(item,index) in tabdata1"
        :key="index"
        style="padding: 15px;background: #fff;margin-bottom:0.2rem;"
      >
        <div>
          <h3 style="text-align:left;line-height:0.8rem;font-size:0.4rem;">
            <p style="line-height:0.8rem;">{{item.departmentName}}--{{item.userName}}</p>
            <!-- <p style="line-height:0.4rem;font-size:0.2rem;color:#999;font-weight:300;"></p> -->
          </h3>
        </div>
        <div class="bmcontent" style="display:flex;flex-wrap:wrap;margin-top:0.2rem;">
          <div>
            <p class="bmbt">本月任务</p>
            <p class="bmqb">{{item.monthMoney}}万</p>
          </div>
          <div>
            <p class="bmbt">今日完成</p>
            <p class="bmqb">{{item.dayMoney}}万</p>
          </div>
          <div class="noboder">
            <p class="bmbt">目前应完成</p>
            <p class="bmqb">{{item.monthShouldMoney}}万</p>
          </div>
          <div>
            <p class="bmbt">实际月累计完成</p>
            <p class="bmqb">
              {{item.finishMoney}}万
              <span :class="item.saleNo<3?'red':'cheng'">no{{item.saleNo}}</span>
            </p>
          </div>

          <div>
            <p class="bmbt">今日毛利率</p>
            <p class="bmqb">{{item.grossProfit.split('/')[0]}}</p>
          </div>
          <div class="noboder">
            <p class="bmbt">累计毛利率</p>
            <p class="bmqb">{{item.grossProfit.split('/')[1]}}</p>
          </div>
          <div>
            <p class="bmbt">计划完成率</p>
            <p class="bmqb">{{item.finishRate.split('/')[1]}}</p>
          </div>
          <div>
            <p class="bmbt">实时完成率</p>
            <p class="bmqb">
              {{item.finishRate.split('/')[0]}}
              <span :class="item.rateNo<3?'red':'cheng'">no{{item.rateNo}}</span>
            </p>
          </div>
          <div class="noboder">
            <p class="bmbt">超额/差额</p>
            <p class="bmqb">{{item.differenceMoney}}万</p>
          </div>

          <div>
            <p class="bmbt">环比</p>
            <p class="bmqb">{{item.monthCompare}}%</p>
          </div>
          <div>
            <p class="bmbt">同比</p>
            <p class="bmqb">{{item.yearCompare}}%</p>
          </div>
          <div class="noboder">
            <p class="bmbt">标准销售额</p>
            <p class="bmqb">
              {{item.standardFinishMoney}}万
              <span :class="item.standSaleNo<3?'red':'cheng'">no{{item.standSaleNo}}</span>
            </p>
          </div>
          <div>
            <p class="bmbt">TB线索</p>
            <p class="bmqb">{{item.tbClueMoney}}万</p>
          </div>
          <div>
            <p class="bmbt">本月开标</p>
            <p class="bmqb">{{item.openTenderMoney}}万</p>
          </div>
          <div class="noboder">
            <p class="bmbt">目前中标</p>
            <p class="bmqb">{{item.getTenderMoney}}万</p>
          </div>
          <div>
            <p class="bmbt">丢标</p>
            <p class="bmqb">{{item.loseTenderMoney}}万</p>
          </div>
          <div>
            <p class="bmbt">实际季累计完成</p>
            <p class="bmqb">
              {{item.finishQuarterMoney}}万
              <!-- <span
                :class="item.saleNo<3?'red':'cheng'"
              >no{{item.saleNo}}</span>-->
            </p>
          </div>
          <div class="noboder">
            <p class="bmbt">实际年累计完成</p>
            <p class="bmqb">
              {{item.finishYearMoney}}万
              <!-- <span
                :class="item.saleNo<3?'red':'cheng'"
              >no{{item.saleNo}}</span>-->
            </p>
          </div>
          <!-- <div></div>
          <div class="noboder"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabdata1"]
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