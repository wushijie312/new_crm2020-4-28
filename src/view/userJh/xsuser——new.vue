<template>
  <div class="wrapper" ref="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content" ref="others">
      <div class="menu-head-top50"></div>
      <div class="wrap850">
        <div class="menubox sale_tab_head" style="overflow:hidden;font-size:0.3rem;">
          <div class="left" @click="saleindexhandle(1)" :class="salesoit===1?'act':''">
            <span class="menu_border">
              首页
              <span class="menu_border_line"></span>
            </span>
          </div>
          <div class="left" @click="saleindexhandle(2)" :class="salesoit===2?'act':''">
            <span class="menu_border">
              待办事项
              <span class="menu_border_line"></span>
            </span>
          </div>
        </div>

        <div v-show="salesoit==1">
          <SaleWorkIndex :alldata="alldata" :tabdata2="tabdata2" />

          <div
            id="sobox"
            style="    color: #333;
    width: 5rem;
    font-size: 0.3rem;
    display: flex;
    padding: 5px 12px;
    line-height:0.8rem;
    margin-top: 8px;
    background: rgb(255, 255, 255);
    text-align: left;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;"
            class="clearfix"
          >
            <div style="width:3rem;">当前日期：</div>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="border:none;top:0.15rem;"
              value-format="yyyy-MM-dd"
              :editable="false"
              :clearable="false"
              class="el-icon-arrow-down1"
            >
              <template>
                <i class="el-icon-arrow-down"></i>
              </template>
            </el-date-picker>
          </div>
          <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
            <div class="left" @click="zhongjiedata({index:1})" :class="indexnum===1?'act':''">
              <span class="menu_border">
                部门榜
                <span class="menu_border_line"></span>
              </span>
            </div>

            <div class="left" @click="zhongjiedata({index:3})" :class="indexnum===3?'act':''">
              <span class="menu_border">
                全体销售
                <span class="menu_border_line"></span>
              </span>
            </div>
            <div class="left" @click="zhongjiedata({index:2})" :class="indexnum===2?'act':''">
              <span class="menu_border">
                本月销售客户
                <span class="menu_border_line"></span>
              </span>
            </div>
          </div>

          <div v-show="indexnum==1">
            <div v-if="tabdata1&&tabdata1.length">
              <div class="qu_bumobile">
                <div class="fl qu_bmmobile_b">筛选：</div>
                <div class="fr clearfix">
                  <div class="qu_bmmobile_a fl">
                    <el-select
                      class="qu_bmmobile_select"
                      v-model="searchValue1"
                      placeholder="请选择"
                      @change="search_change"
                    >
                      <el-option
                        v-for="item in searchType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="search_px search_px_pc">
                <p v-for="(itemSearch,len3) in searchType" :key="len3">
                  <span
                    :class="searchValue1==itemSearch.label?'search_px_tit act':'search_px_tit'"
                    @click="bumenbanghandle(itemSearch.value,itemSearch.label)"
                  >{{itemSearch.label}}</span>
                </p>
              </div>
              <Bumen :tabdata1.sync="tabdata1" :searchValue1="searchValue1" :value1.sync="value1" />
            </div>
            <div v-else class="nothing">暂无数据</div>
          </div>
          <div v-show="indexnum==2">
            <div v-if="tabdata2&&tabdata2.length">
              <Kehu :pagenum="pagenum" :tabdata2="tabdata2" :value1="value1" />
            </div>
            <div v-else class="nothing">暂无数据</div>
          </div>
          <div v-show="indexnum==3">
            <div v-if="tabdata3&&tabdata3.length">
              <div class="bd_search">
                <div class="bd_search_a">
                  <el-input
                    size="small"
                    placeholder="请输入销售名称"
                    v-model="xskword"
                    class="qu_cuHead_search"
                  ></el-input>
                  <i class="el-icon-search bd_search_btn" @click="zhongjiedata"></i>
                </div>
              </div>
              <div class="search_pxbox">
                <div class="search_px">
                  <p v-for="(itemSearch,len3) in searchType3" :key="len3">
                    <span
                      :class="searchValue3==itemSearch.label?'search_px_tit act':'search_px_tit'"
                      @click="bumenbanghandle(itemSearch.value,itemSearch.label)"
                    >{{itemSearch.label}}</span>
                  </p>
                </div>
                <div class="search_px_btn" @click="XiaoSouListChange">{{showOrHide?'展开全部':'收起全部'}}</div>
              </div>
              <User
                :pagenum="pagenum"
                :searchValue3="searchValue3"
                :tabdata3="tabdata3"
                :tabdata3xskword="tabdata3xskword"
                :value1="value1"
              />
            </div>
            <div v-else class="nothing">暂无数据</div>
          </div>
        </div>
        <div v-show="salesoit==2">
          <SalePending />
        </div>
      </div>
    </div>
    <Addcreate></Addcreate>
  </div>
</template>

<script>
import CreateData from "@/view/userJh/xsuserdata/index";
import Addcreate from "@/components/addcreate";
import { getNowDate } from "@/untils/common";
// import BScroll from "better-scroll";
import {
  adddata,
  chakehu,
  saleneeddata,
  needdata,
  salechabumen
} from "@/api/config";
import { getisread } from "@/api/configWu";
import Head from "@/view/common/head";
import Kehu from "@/view/userCom/kehu";
import Bumen from "@/view/userCom/bumen";
import User from "@/view/userCom/user";
// 销售工作台 start
import SaleWorkIndex from "@/view/salework/sale.vue";
import SalePending from "@/view/salework/pending.vue";
export default {
  components: {
    Head,
    Addcreate,
    Kehu,
    Bumen,
    User,
    SaleWorkIndex,
    SalePending
  },
  name: "index",
  data() {
    return {
      salesoit: 1,
      xskword: "",
      showOrHide: true,
      pagenum: 1,
      searchValue1: "实际销售额",
      searchValue3: "累计完成",
      searchType: [
        {
          label: "实际销售额"
        },
        {
          label: "标准销售额"
        },
        {
          label: "实时完成率"
        },
        {
          label: "净利"
        },
        {
          label: "净净利"
        }
      ],
      searchType3: [
        {
          label: "累计完成"
        },
        {
          label: "实时完成率"
        },
        {
          label: "标准销售额"
        }
      ],
      indexnum: 1,
      loading: true,

      isread: false,
      restaurants: [],
      arr: [],
      jingli: 0,
      jingjingli: 0,
      act: 1,
      act1: false,
      value1: getNowDate(),
      pageSize2: 10,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata3xskword: [],
      // is_xskword:false,
      alldata: ""
    };
  },
  mounted() {
    this.chakehu();
    this.getallData();
    //
    window.addEventListener("scroll", this.scrollBottom, true);
    this.gethong();
    this.getact();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollBottom, true);
  },
  watch: {
    value1() {
      this.getallData();
    }
  },
  methods: {
    saleindexhandle(len) {
      this.salesoit = len;
    },
    scrollBottom() {
      // 滚动到页面底部时
      if (this.indexnum == 2) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        const toBottom = scrollHeight - scrollTop - clientHeight;
        if (
          toBottom < 30 &&
          this.loading &&
          this.tabdata2.length == this.pagenum * this.pageSize2
        ) {
          this.loading = false;
          needdata({
            submitTime: this.value1,
            page: ++this.pagenum,
            pageSize: this.pageSize2,
            role: ""
          }).then(res => {
            if (res.code == 200) {
              this.loading = true;
              this.alldata = res;
              this.tabdata2 = this.tabdata2.concat(res.saleInfoList);
              this.getjingli(this.tabdata2);
            } else {
              this.$message.error({ message: `${res.message}` });
            }
          });
        }
      }
    },
    search_change(val) {
      this.getallData();
    },
    bumenbanghandle(len, name) {
      if (this.indexnum == 1) {
        this.searchValue1 = name;
      } else if (this.indexnum == 3) {
        this.searchValue3 = name;
      }
      this.getallData();
    },
    XiaoSouListChange() {
      this.showOrHide = !this.showOrHide;
      this.pagenum = this.showOrHide ? -1 : 1;
      this.getallData();
    },
    zhongjiedata(val) {
      if (val.index) {
        this.pagenum = 1;
        this.indexnum = val.index;
        // this.is_xskword=false;
        this.getallData();
      } else {
        if (this.xskword) {
          // this.is_xskword=true;
          this.tabdata3 = this.tabdata3xskword.filter((item, index) => {
            return item.userName.indexOf(this.xskword) > -1;
          });
        } else {
          this.tabdata3 = this.tabdata3xskword;
        }
      }
    },
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("userMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/xiaoshou1") {
          this.act = index + 1;
        }
      });
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        this.isread = res.data.isread;
      });
    },

    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          this.restaurants = res.data;
        })
        .catch(error => {});
    },

    getallData() {
      if (this.indexnum == 1) {
        salechabumen({
          keyword: "",
          submitTime: this.value1,
          page: 1,
          sortname: this.searchValue1,
          sort: 1
        }).then(res => {
          if (res.code == 200) {
            // this.alldata = res;
            this.tabdata1 = res.saleInfoList;
            // this.getjingli(this.tabdata1);
          } else {
            this.$message.error({ message: `${res.message}` });
          }
          // this.jingli = 0;
          // this.jingjingli = 0;
          // var jsid = 0;
          // this.tabdata1.forEach(element => {
          //   element.is_act = false;
          //   element.id = jsid;
          //   jsid++;
          //   this.jingli += Number(element.netProfit);
          //   this.jingjingli += Number(element.netsProfit);
          // });
          // this.jingli = this.jingli.toFixed(2);
          // this.jingjingli = this.jingjingli.toFixed(2);
        });
      } else if (this.indexnum == 2) {
        needdata({
          submitTime: this.value1,
          page: this.pagenum,
          pageSize: this.pageSize2,
          role: ""
        }).then(res => {
          if (res.code == 200) {
            this.alldata = res;
            this.tabdata2 = res.saleInfoList;
            this.getjingli(this.tabdata2);
          } else {
            this.$message.error({ message: `${res.message}` });
          }
        });
      } else if (this.indexnum == 3) {
        this.pagenum = this.showOrHide ? -1 : 1;
        this.xskword = "";
        saleneeddata({
          keyword: "",
          submitTime: this.value1,
          sortname: this.searchValue3,
          sort: 1,
          page: this.pagenum
        }).then(res => {
          if (res.code == 200) {
            // this.alldata = res;
            this.tabdata3 = res.saleInfoList;
            this.tabdata3xskword = res.saleInfoList;
            // this.getjingli(this.tabdata3);
          } else {
            this.$message.error({ message: `${res.message}` });
          }
        });
      }
    },
    getjingli(tabsdata) {
      this.jingli = 0;
      this.jingjingli = 0;
      tabsdata.forEach(element => {
        this.jingli += Number(element.netProfit);
        this.jingjingli += Number(element.netsProfit);
      });
      this.jingli = this.jingli.toFixed(2);
      this.jingjingli = this.jingjingli.toFixed(2);
    }
  }
};
</script>
<style lang="stylus"  scoped>
.tabs_lb {
  width: 37%;
}

.tabs_lc {
  width: 29%;
}

/* 筛选 start */
.qu_bmmobile_select {
  width: 130px;
}

.qu_bupc {
  display: none;
}

.qu_bumobile {
  height: 38px;
  background: #fff;
  margin-bottom: 8px;
  padding: 0 15px;
  line-height: 38px;
}

.bd_search {
  display: flex;
  padding: 10px 12px;
  background: #fff;
}

.bd_search_a {
  width: 100%;
  position: relative;
}

.bd_search_btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: $colorb4b9bf;
  font-size: 20px;
}

.search_px {
  font-size: 13px;
  padding: 0px 0 10px;
  width: 100%;
  line-height: 20px;
  box-sizing: border-box;
  display: flex;
  background: #fff;
}

.search_px p {
  width: 20%;
  color: #333;
  position: relative;
}

.search_px_tit {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 0 20px 0 0;
}

.search_px_tit:after {
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 4px solid #999;
  border-right: 3px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 3px solid transparent;
  position: absolute;
  top: 8px;
  right: 6px;
  content: ' ';
}

.search_px_tit.act {
  color: #409eff;
}

.search_px_pc {
  display: none;
  font-size: 13px;
  padding: 10px 8px 10px;
}

.search_px_pc p {
  text-align: center;
  width: 20%;
}

.search_px_pc p:nth-child(1) {
  text-align: left;
}

.search_px_pc p:nth-child(3) {
  width: 28%;
}

.search_px_pc p:nth-child(5) {
  text-align: right;
}

.search_px_pc .search_px_tit {
  padding-right: 0;
}

.search_px_pc .search_px_tit:after {
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 4px solid #999;
  border-right: 3px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 3px solid transparent;
  position: absolute;
  top: 8px;
  right: -8px;
  content: ' ';
}

.search_px_tit.act:after {
  border-top: 4px solid #409eff;
}

.search_pxbox {
  display: flex;
  background: $colorfff;
  padding: 0px 12px;
  position: relative;
}

.search_pxbox .search_px {
  margin-right: 70px;
}

.search_pxbox .search_px p {
  width: 35%;
  text-align: left;
}

.search_pxbox .search_px p:first-child {
  width: 30%;
  text-align: left;
}

.search_pxbox .search_px_tit {
  padding: 0 15px 0 0;
  font-size: 12px;
}

.search_px_btn {
  position: absolute;
  right: 12px;
  font-size: 12px;
  top: -3px;
  padding: 0 6px;
  border: 1px solid #409eff;
  line-height: 24px;
  border-radius: 30px;
  text-align: center;
  color: #409eff;
}

/* menu start */
.menubox {
  border-bottom: 1px solid #f0f0f0;
  margin-top: 8px;
}

.menubox > div {
  width: 33.333333%;
  background: #fff;
}

.sale_tab_head {
  margin-top: 0;
}

.sale_tab_head>div {
  width: 50%;
}

.menubox .menu_border {
  line-height: 42px;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  color: #333;
}

.menubox .act {
  position: relative;
}

.menubox .act .menu_border {
  position: relative;
  color: #409eff;
}

.menubox .act .menu_border_line {
  border-bottom: 2px solid #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.el-input__inner {
  border: none;
}

.bmqb {
  font-size: 0.3rem;
  color: black;
}

.bmbt {
  font-size: 0.26rem;
  color: #999;
  margin-top: 0.15rem;
}

.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}

.bmcontent > div {
  width: 33%;
  padding-bottom: 0.3rem;
}

body, html {
  background: #f2f2f5;
}

.flex_1 {
  flex-wrap: wrap;
}

.flex_1 > div {
  width: 100%;
  margin-bottom: 0.2rem;
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

.nianBt {
  line-height: 4.2rem;
  width: 20%;
  background: red;
  color: #fff;
}

table, tbody, thead {
  width: 100% !important;
}

.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
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

.bmcontent > div:nth-child(3n + 0) {
  border-right: none;
}

@media screen and (max-width: 640px) and (min-width: 375px) {
  .search_pxbox .search_px_tit {
    font-size: 13px;
  }

  .search_px_btn {
    font-size: 13px;
  }
}

@media screen and (min-width: 450px) {
  .search_pxbox .search_px_tit {
    font-size: 13px;
  }

  .search_px_btn {
    font-size: 13px;
  }
}

@media screen and (min-width: 850px) {
  .qu_bumobile {
    display: none;
  }

  .search_px_pc {
    display: flex;
    padding: 10px 20px 10px 15px;
  }

  .search_px_btn {
    position: absolute;
    right: 12px;
    font-size: 13px;
    top: -4px;
    padding: 0 10px;
    border: 1px solid #409eff;
    line-height: 26px;
    border-radius: 30px;
    text-align: center;
    color: #409eff;
  }
}
</style>