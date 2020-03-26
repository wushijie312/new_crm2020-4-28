<template>
  <div class="wrapper" ref="wrapper">
     <Head :act.sync='act' :ty.sync='act1'></Head>
    <div class="content">
     
 <div class="menu-head-top50"></div>
      <div class="maincontent" id="maincontent1" style="position:relative;margin-top:0.2rem;">
        <div style="overflow:hidden;width:100%;float:left;text-align:left;">
          <h3 style="text-align:left;position:relative;padding-bottom:0.2rem;">
            <span style="line-height:1rem;display:block;">汇总销售日报</span>
            <span
              id="sobox"
              style="position:absolute;right:10px;font-size:1.1em;color:#999;width:45%;font-size:0.4rem;top:-0;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;"
                :editable="false"
                :clearable="false"
                class="el-icon-arrow-down1"
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
          </h3>
          <div
            class="left flex_1"
            style="width:100%;font-size:0.3rem;display:flex;padding-top:0.2rem;border-top:1px solid #f2f2f5;"
          >
            <div>
              <span class="blue">本月任务：</span>
              <span class="black">{{yuejihua}}万</span>
            </div>
            <div>
              <span class="blue">今日完成：</span>
              <span class="black">
                <span :class="yiwancheng>=0?'red':'green'">{{yiwancheng}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">截止今日应完成：</span>
              <span class="black">
                <span :class="zhijinjihua>=0?'red':'green'">{{zhijinjihua}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">实际累计完成：</span>
              <span class="black">
                <span :class="zhijinwancheng>=0?'red':'green'">{{zhijinwancheng}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">今日毛利率：</span>
              <span class="black">
                <span :class="dayTotalGrossProfit>=0?'red':'green'">{{dayTotalGrossProfit}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">累计毛利率：</span>
              <span class="black">
                <span :class="yuemaoli>=0?'red':'green'">{{yuemaoli}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">实时完成率：</span>
              <span class="black">
                <span :class="biao2>=0?'red':'green'">{{biao2}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">超额/差额：</span>
              <span class="black">
                <span :class="chaoe>=0?'red':'green'">{{chaoe}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净利：</span>
              <span class="black">
                <span :class="jingli>=0?'red':'green'">{{jingli}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净净利：</span>
              <span class="black">
                <span :class="jingjingli>=0?'red':'green'">{{jingjingli}}万</span>
              </span>
            </div>
            <div style="color:#999999;width:100%;font-size:0.3rem;">
              <span style>
                上月环比
                <span :class="hb>=0?'red':'green'">
                  <!-- <i v-if="hb>=0" class="el-icon-top"></i>
                  <i v-if="hb<0" class="el-icon-bottom"></i>-->
                  {{hb>0?hb:-hb}}%
                </span>,去年同比
                <span :class="tb>=0?'red':'green'">
                  <!-- <i v-if="tb>=0" class="el-icon-top"></i>
                  <i v-if="tb<0" class="el-icon-bottom"></i>-->
                  {{tb>0?tb:-tb}}%
                </span>
              </span>
            </div>
            <div>
              <span class="blue">TB线索：</span>
              <span class="black">
                <span :class="TBxiansuo>=0?'red':'green'">{{TBxiansuo}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月开标：</span>
              <span class="black">
                <span :class="kaibiao>=0?'red':'green'">{{kaibiao}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月中标：</span>
              <span class="black">
                <span :class="zhongbiao>=0?'red':'green'">{{zhongbiao}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月丢标：</span>
              <span class="black">
                <span :class="totalLoseTenderMoney>=0?'red':'green'">{{totalLoseTenderMoney}}万</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#f2f2f5;">
        <div
          style="border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;font-size:0.3rem;margin-top:0.2rem;"
          v-for="(item,index) in tabdata1"
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
            <div @click="tankuang(item,'今日完成(万)')">
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
            <div @click="tankuang(item,'今日毛利率')">
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
    </div>

    
    
    <!-- <el-backtop target=".el-scrollbar__wrap">
        <i class="el-icon-top"></i>
    </el-backtop>-->
    
    <el-dialog title="修改" :visible.sync="centerDialogVisible" width="80%" center>
      <span>
        <el-input v-model="value2" placeholder="请输入修改值" type="number"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="xiugaidata()">确 定</el-button>
      </span>
    </el-dialog>
    <div
      v-show="topshow"
      @click="gotop"
      style="position:fixed;bottom:20px;right:20px;width:1rem;height:1rem;background:skyblue;border-radius:1rem;color:#fff;font-size:0.6rem;line-height:1rem;opacity:0.8;"
    >
      <i class="el-icon-top"></i>
    </div>
    <Addcreate></Addcreate>
  </div>
</template>

<script>
import CreateData from "@/view/userJh/xsuserdata/index"
import Addcreate from "@/components/addcreate";
// import BScroll from "better-scroll";
import {
  adddata,
  chakehu,
  updata,
  needdata,
  chabumen,
  chakh
} from "@/api/config";
import { getisread } from "@/api/configWu";
import Head from "@/view/common/head";
export default {
  components: {
    Head,
    Addcreate
  },
  name: "index",
  data() {
    return {
      isread:false,
      restaurants: [],
      topshow: false,
      dayTotalGrossProfit: "",
      span: 7,
      value: "",
      options: [],
      input101: "",
      input102: "",
      input103: "",
      input104: "",
      input105: "",
      centerDialogVisible: false,
      type: false,
      hb: "",
      tb: "",
      loadingConnecting: false,
      down: false,
      up: true,
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        textup: "上拉加载更多", // 松开立即刷新
        rotate: "" // icon-rotate
      },
      arr: [],
      jingli: 0,
      jingjingli: 0,
      tzshow: false,
      // scroll:true,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      urlA: "",
      nianjihua: "",
      nianleiji: "",
      nianmaoli: "",
      yuejihua: "",
      yueleiji: "",
      totalTBClueMoney: "",
      yuemaoli: "",
      act: 1,
      act1: false,
      box: "100",
      value1: "",
      totalLoseTenderMoney: "",
      value2: "",
      state2: "",
      input10: "",
      input11: "",
      show2: false,
      biao1: 0,
      biao2: 0,
      chaoe: "",
      TBxiansuo: "",
      yiwancheng: "",
      kaibiao: "",
      zhongbiao: "",
      zhijinjihua: "",
      zhijinwancheng: "0",
      choose: {},
      tableData5: [],
      tableData6: [],
      tableData7: [],
      isshow: 1,
      su: [],
      su1: [],
      su2: [],
      su3: [],
      initdate: "",
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
    };
  },
  created() {},
  mounted() {
    this.chakehu();
    this.aler();
    this.getallData();
    setTimeout(() => {
      console.log(this.BS);
      this.BS();
    }, 20);
    this.gethong()
    this.getact()
  },
  watch: {
    value1() {
      this.pagenum = 1;
      this.getallData();
    }
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    // data() {
    //   setTimeout(() => {
    //     this.BS();
    //   }, this.refreshDelay);
    // }
  },
  methods: {
   
    getact(){
      var lodata = JSON.parse(sessionStorage.getItem('userMenus'))
      console.log(lodata)
      lodata.forEach((e,index)=>{
        if(e.path=="/xiaoshou1"){
          this.act = index+1
        }
      })
    },
    gethong(){
      getisread({userid:localStorage.getItem('userid')}).then(res=>{
        // console.log()
        this.isread = res.data.isread
      })
    },
     handleSelect(item) {
      // console.log(this.ruleForm.options)
      console.log(item);
      this.choose = item
      // this.ruleForm.options = item.companyName
      // this.ruleForm.optionsId = item.id
    },
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        // console.log(this.restaurants)
        // console.log(this.createFilter(queryString))
        var results = queryString.length>0 ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
            // console.log(restaurant)
          return (restaurant.companyName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    gotop() {
      this.scroll.stop();
      console.log(this.scroll.scrollBy);
      this.scroll.scrollTo(0, 0, 0.5);
      this.topshow = false;
    },
 
    BS() {
      //     console.log(1112)
      // if (!this.$refs.wrapper) {
      //   return;
      // }
      // // better-scroll的初始化
      // this.scroll = new BScroll(this.$refs.wrapper, {
      //   probeType: this.probeType,
      //   click: this.click,
      //   scrollX: this.scrollX
      // });
      // this.scroll.on("scroll", pos => {
      //   // console.log(pos.y);
      //   //如果下拉超过50px 就显示下拉刷新的文字
      //   if (pos.y > 50) {
      //     this.pulldownTip.text = "放手刷新";
      //     this.down = true;
      //   } else {
      //     this.down = false;
      //   }
      // });
      // //touchEnd 通过这个方法来监听下拉刷新
      // this.scroll.on("touchEnd", pos => {
      //   // 下拉动作
      //   if (pos.y > 50) {
      //     console.log("下拉刷新成功");
      //     console.log("这里执行你方法");
      //     // alert(111)
      //     this.down = false;
      //   }
      //   console.log(this.scroll);
      //   if (this.scroll.maxScrollY > pos.y - 1000) {
      //     console.log("加载更多");
      //     // if(this.scroll){
      //     this.getallData();
      //     // }
      //     //使用refresh 方法 来更新scroll  解决无法滚动的问题
      //     this.scroll.refresh();
      //   }
      //   if(pos.y<-500){
      //     this.topshow = true
      //   }else{
      //     this.topshow = false
      //   }
      //   console.log(this.scroll.maxScrollY + "总距离----下拉的距离" + pos.y);
      // });
      // console.log(this.scroll.maxScrollY);
    },
    getdata() {
      if (this.input10 && this.input11 && this.choose.id) {
        adddata({
          dayMoney: this.input10,
          grossProfit: this.input11,
          customerId: this.choose.id,
          customerName: this.choose.companyName,
          tbClueMoney: this.returnZero(this.input101),
          openTenderMoney: this.returnZero(this.input102),
          getTenderMoney: this.returnZero(this.input103),
          loseTenderMoney: this.returnZero(this.input104),
          loseTenderReason: this.input105
        })
          .then(res => {
            console.log(res);
            if(res.code==200){
              this.$message.success("添加成功");
              this.show2 = false;
              this.input10 = "";
              this.input11 = "";
              this.input101 = "";
              this.input102 = "";
              this.input103 = "";
              this.input104 = "";
              this.input105 = "";
              this.choose = {};
              this.value = "";
              this.pagenum = 1;
              this.getallData();
            }
            
            
          })
          .catch(error => {
            console.log(error);
            this.$message.error("添加失败");
          });
      } else {
        this.$message.error("客户、今日完成、预估毛利率为必填项");
      }
    },
    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          console.log(res);
          this.restaurants = res.data;
        })
        .catch(error => {});
    },
    changeLocationValue(val) {
      //locations是v-for里面的也是datas里面的值
      console.log(this.value);
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });
      this.choose = obj;
    },
    tankuang(a, b) {
      this.centerDialogVisible = true;
      console.log(a);
      var data = a;
      data.label = b;
      localStorage.setItem("xiugaiData", JSON.stringify(data));
    },
    returnZero(a) {
      if (a == "") {
        return -1;
      } else {
        return a;
      }
    },
    xiugaidata() {
      let a = JSON.parse(localStorage.getItem("xiugaiData"));

      if (!this.value2) {
        this.$message.error("请填写完整信息");
        return;
      }
      if (a.label == "今日完成(万)") {
        console.log(this.value1);
        var date = new Date(this.value1);
        var date1 =
          date.getFullYear() +
          "-" +
          this.getnum(Number(date.getMonth()) + 1) +
          "-" +
          this.getnum(date.getDate());
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
          submitTime: date1,
          role: ""
        })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.message);
              this.value2 = "";
              this.pagenum = 1;
              this.getallData();
              this.centerDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        var date = new Date(this.value1);
        var date1 =
          date.getFullYear() +
          "-" +
          this.getnum(Number(date.getMonth()) + 1) +
          "-" +
          this.getnum(date.getDate());
        updata({
          customerId: a.customerId,
          customerName: a.customerName,
          dayMoney: a.dayMoney,
          grossProfit: this.value2,
          submitTime: date1
        })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.message);
              this.value2 = "";
              this.pagenum = 1;
              this.getallData();
              this.centerDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.centerDialogVisible = true;
    },
    setdate() {
      this.$picker.show({
        type: "datePicker",
        date: this.initdate,
        endTime: "2099-01-01", //截至时间
        startTime: "2010-02-11", //开始时间
        onOk: date => {
          console.log(date);
          this.value1 = date; // birthday就是所需字段，在data 里定义下
          this.initdate = date;
          this.pagenum = 1;
          this.getallData();
        }
      });
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = this.su;

      return sums;
    },
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = this.su1;

      return sums;
    },
    getSummaries2(param) {
      const { columns, data } = param;
      const sums = this.su2;
      return sums;
    },
    setechart: function() {},
    aler() {
      //   alert(111)
      var type = localStorage.getItem("type");
      if (type == 3) {
        this.span = 7;
        this.type = true;
      }
      var inittime = new Date();
      function jiazero(a) {
        if (a < 10) {
          return "0" + a;
        } else {
          return a;
        }
      }
      this.initdate =
        inittime.getFullYear() +
        "-" +
        jiazero(Number(inittime.getMonth()) + 1) +
        "-" +
        jiazero(Number(inittime.getDate()));
      this.value1 = this.initdate;
    },
    goA() {
      this.urlA =
        "http://wxtest1.98ep.com/khgx/khgx.html?userid=" +
        localStorage.getItem("userid");
      location.href = this.urlA;
    },
    setbiaogeWid(a, b) {
      this.box = (a - 30) / b;
    },
    zhongjiedata(a) {
      console.log(a);
      this.pagenum = 1;
      //   this.pulldownTip.textup = '上拉加载更多'
      this.indexnum = Number(a.index) + 1;
      console.log(this.indexnum);
      this.getallData();
    },
    timechange() {
      this.pagenum = 1;
      this.getallData();
    },
    getallData() {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      var scrollTop = document.documentElement.scrollTop;
      // alert(this.indexnum)

      needdata({
        submitTime: date1,
        page: this.pagenum,
        role: ""
      })
        .then(res => {
          console.log(res.totalMthPlanMoney);
          // this.tabdata1 = res.saleInfoList;
          this.yuejihua = res.totalMthPlanMoney;
          // console.log(this.yuejihua)
          this.totalLoseTenderMoney = res.totalLoseTenderMoney;
          console.log(res.totalMonthCompare);
          this.hb = res.totalMonthCompare;
          this.tb = res.totalYearCompare;

          this.nianjihua = res.yearPlanMoney;
          this.nianleiji = res.yearFinishMoney;
          this.nianmaoli = res.yearGrossProfit;

          this.yueleiji = res.totalFinishMthMoney;
          this.yuemaoli = res.totalMthGrossProfit;
          this.biao1 = res.yearFinishRate;
          this.biao2 = res.totalFinishMthRate;
          this.yiwancheng = res.totalDayPlanMoney;
          this.zhijinjihua = res.totalMonthShouldMoney;
          this.zhijinwancheng = res.totalFinishMthMoney;
          this.chaoe = res.moneyDifference;
          this.TBxiansuo = res.totalTBClueMoney;
          this.kaibiao = res.totalOpenTenderMoney;
          this.zhongbiao = res.totalGetTenderMoney;
          this.dayTotalGrossProfit = res.dayTotalGrossProfit;

          if (this.pagenum == 1) {
            this.tabdata1 = res.saleInfoList;
          } else {
            for (var i = 0; i < res.saleInfoList.length; i++) {
              this.tabdata1.push(res.saleInfoList[i]);
            }
            console.log(scrollTop);
            document.scrollTop = scrollTop;
          }
          this.jingli = 0;
          this.jingjingli = 0;
          this.tabdata1.forEach(element => {
            this.jingli += Number(element.netProfit);
            this.jingjingli += Number(element.netsProfit);
          });
          this.jingli = this.jingli.toFixed(2);
          this.jingjingli = this.jingjingli.toFixed(2);

          if (res.saleInfoList.length > 0) {
            this.pagenum++;
            // alert(this.pagenum)
            // this.scroll = true;
          } else {
            this.pulldownTip.textup = "我是有底线的";
          }
          this.setechart();
        })
        .catch(error => {
          // console.log(error)
          // open('添加失败')
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
    hastype() {
      if (localStorage.getItem("type") == 3) {
        return true;
      } else {
        return false;
      }
    }
  },
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  }
};
</script>
<style scoped>

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
body,
html {
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
.bmcontent > div:nth-child(3n + 0) {
  border-right: none;
}

</style>