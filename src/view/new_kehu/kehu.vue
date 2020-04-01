<template>
  <div>
      <div style="overflow:auto">
          <div
            v-for="(itemSon,indexSon) in dataSon"
            :key="indexSon"
            style="background: #fff;margin-bottom:6px;"
          >
            <div class="bmcontent" style="display:flex;flex-wrap:wrap;">
              <div>
                <p class="bmbt">客户体量</p>
                <p class="bmqb">{{itemSon.customerVol}}万</p>
              </div>
              <!--<div>
                <p class="bmbt">最终实现收入</p>
                <p class="bmqb">{{itemSon.customerReceipt}}万</p>
              </div>-->
              <div>
                <p class="bmbt">今年目标额</p>
                <p class="bmqb">{{itemSon.customerTargetMoney}}万</p>
              </div>
              <div>
                <p class="bmbt">目前应完成</p>
                <p class="bmqb">{{itemSon.monthShouldMoney}}万</p>
              </div>
              <div>
                <p class="bmbt">本月任务</p>
                <p class="bmqb">{{itemSon.monthMoney}}万</p>
              </div>
              <!--<div class="noboder">
                <p class="bmbt">要求毛利率</p>
                <p class="bmqb">-</p>
              </div>-->
              <div>
                <p class="bmbt">自报月完成</p>
                <p class="bmqb">{{itemSon.finishMoney}}万</p>
              </div>
              <!--<div>
                <p class="bmbt">系统月完成</p>
                <p class="bmqb">-</p>
              </div>
              <div class="noboder">
                <p class="bmbt">财务月完成</p>
                <p class="bmqb">-</p>
              </div>-->

              <div>
                <p class="bmbt">自报年累计</p>
                <p class="bmqb">{{itemSon.yearFinish}}万</p>
              </div>
              <!--<div>
                <p class="bmbt">系统年累计</p>
                <p class="bmqb">-</p>
              </div>
              <div class="noboder">
                <p class="bmbt">财务年累计</p>
                <p class="bmqb">-</p>
              </div>-->
              <div>
                <p class="bmbt">自报毛利率</p>
                <p class="bmqb">{{itemSon.avgGrossProfit}}%</p>
              </div>
              <!--<div>
                <p class="bmbt">系统毛利率</p>
                <p class="bmqb">-</p>
              </div>
              <div class="noboder">
                <p class="bmbt">财务毛利率</p>
                <p class="bmqb">-</p>
              </div>-->
              <div>
                <p class="bmbt">自报毛利润</p>
                <p class="bmqb">{{itemSon.avgGrossProfitMoney}}万</p>
              </div>
              <!--<div>
                <p class="bmbt">系统毛利润</p>
                <p class="bmqb">-</p>
              </div>
              <div class="noboder">
                <p class="bmbt">财务毛利润</p>
                <p class="bmqb">-</p>
              </div>-->
              <!--<div></div>-->
              <!--<div class="noboder"></div>-->
            </div>
          </div>
          <div v-show="!dataSon || !dataSon.length">
			      <p style="text-indent:150px;line-height:100px;">暂无记录</p>
			    </div>
        </div>
  </div>
</template>

<script>
export default {
    props: ["dataSon"],
    data() {
        return {
        box: ""
        };
    },
    mounted() {
    },
    methods: {}
}
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
  text-align: center;
}
.bmbt {
  font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900;
  text-align: center;
}
.bmcontent {
  background: #fafafa;
  padding:0px 10px;
  font-size: 0.3rem;
}
.bmcontent > div {
  width: 33%;
  /* padding-bottom: 0.3rem; */
}
.bmcontent > div:nth-child(n+4):before{
	content: "";display: block;
	height: 6px;width: 100%;box-shadow: 0px 6px 6px #C1C1C1;
}
.bmcontent > div:nth-child(3n+4):before{
	background: #FFDF25;
}
.bmcontent > div:nth-child(3n+5):before{
	background: #36A9CE;
}
.bmcontent > div:nth-child(3n+6):before{
	background: #EF5AA1;
}
.bmcontent >div:nth-child(3n){
	border-right: none;
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