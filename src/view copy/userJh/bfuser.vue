<template>
  <div class="wrapper el-scrollbar__wrap" ref="wrapper">
     <Head :act.sync='act' :ty.sync='act1'></Head>
    <div class="content">
     
       <div class="menu-head-top50"></div>
      <h3
        style="text-align:left;position:relative;font-size:0.3rem;line-height:0.8rem;background:#fff;margin-top:0.2rem;text-indent:0.2rem;border-bottom:1px solid #f2f2f2;"
      >
        本周拜访数据
        <span
              id="sobox"
              style="position:absolute;right:10px;font-size:1.1em;color:#999;width:45%;font-size:0.4rem;top:-0;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                ref="timechoose"
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;font-size:0.4rem!importment;font-weight:900;"
                :clearable="false"
                class="el-icon-arrow-down1"
                
                :editable='false'
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
      </h3>
      <div class="maincontent" id="maincontent" style="position:relative;">
        <div style="overflow:hidden;height: 100%;border-bottom:1px solid #ccc;">
          <div class="left nianBt">个人</div>
          <div class="right btxq" style="width:75%;font-size:0.3rem;">
            <p>
              <span class="blue">拜访客户：</span>
              <span class="black">{{this.biaotou_new.customer_count}}个</span>
            </p>
            <p>
              <span class="blue">总拜访次数：</span>
              <span class="black">{{this.biaotou_new.count}}次</span>
            </p>
          </div>
        </div>
      </div>

      <div style="font-size:0.3rem;background:#f2f2f2">
        <div v-for="(item,index) in tabdata2" :key="index" style="background:#fff;text-align:left;font-size:0.3rem;padding:0.3rem;">
          <div >
              <div v-show="item.visit_way!=='暂无记录'">
                    <p>{{item.start_time}}--{{item.end_time}}</p>
                    <p style="color:#1c9ad2;margin-top:0.2rem;">{{item.visit_way}}<span style="color:red;">&nbsp;{{item.customer}}</span>&nbsp;{{item.to_person}}({{item.person_phone}})</p>
                    <p style="color:#1c9ad2;margin-top:0.2rem;">主要交流事宜:</p>
                    <p>{{item.talk_main}}</p>
                    <p style="color:#1c9ad2;margin-top:0.2rem;">拜访结果:</p>
                    <p>{{item.visit_process}}</p>
                  </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- <CreateData v-show="show2"></CreateData> -->
    <!-- <el-backtop target=".el-scrollbar__wrap">
        <i class="el-icon-top"></i>
    </el-backtop>-->
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
// import BScroll from "better-scroll";
import CreateData from "@/view/userJh/bfuserdata/createUse"
import { biaotou1, needdata, adddata, chakehu,infobyUser,getisread} from "@/api/configWu";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";

export default {
  name: "index",
  components:{
    CreateData,
    Head,
    Addcreate
  },
  data() {
    return {
      isread:false,
      gxcd:'',
      khzw:'',
      shengri:'',
      beizhu:'',
      topshow: false,
      click: true,
      biaotou_new: {},
      tzshow: false,
      tabdata2: [],
      loadingConnecting: false,
      down: false,
      up: true,

      arr: [],
      biao: 0,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      act: 2,
      act1: false,
      box: "100",
      value1: "",
      value2: "",
      value: "",
      value2: "",
      value11: "",
      state2: "",
      input10: "",
      show2: false,
      restaurants: [],
      centerDialogVisible: false,
      choose: {},
      choose1: {},
      restaurants: [],
      su1: [],
      su2: [],
      su3: [],
      
      options: []
    };
  },
  mounted() {
    this.getact()
    this.aler();
    // this.setechart();
    this.getdata();
    // this.shouci();
    this.chakehu();
    this.gethong()
    // setTimeout(() => {
    //   this.BS();
    // }, 20);
  },
  watch: {
    
    value1(){
      var inittime = new Date(this.value1);
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
      this.getdata()
    }
  },

  methods: {
    getact(){
      var lodata = JSON.parse(sessionStorage.getItem('userMenus'))
      console.log(lodata)
      lodata.forEach((e,index)=>{
        if(e.path=="/baifang1"){
          this.act = index+1
        }
      })
    },
    gethong(){
      getisread({userid:localStorage.getItem('userid')}).then(res=>{
        this.isread = res.data.isread
      })
    },
    gotop() {
      console.log(this.scroll.scrollBy);
      this.scroll.scrollTo(0, 0, 0.5);
      this.topshow = false;
    },
   
    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          this.options = res.data;
        })
        .catch(error => {});
    },
    changeLocationValue(val) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });

      this.choose = obj;
    },
    zhiding() {},
   
  

    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    aler() {
     
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

    getdata(a) {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      var scrollTop = document.documentElement.scrollTop;
      biaotou1({
        userid: localStorage.getItem("userid"),
        role: "",
        submitTime:this.value1
      }).then(res => {
        console.log(res);
        this.biaotou_new = res.data;
      });
      infobyUser({
        userid: localStorage.getItem("userid"),
        role: "",
        curPage: this.pagenum,
        submitTime:this.value1
      }).then(res => {
        console.log(res);
        this.tabdata2 = res.data;
        // var num = 0;
        // this.tabdata2.forEach(item => {
        //   item.index = num;
        //   item.zhankai = false;
        //   num++;
        // });
      });

      if (a == 6) {
        this.indexnum = 1;
      }
    },
   
  }
};
</script>
<style scoped>
#maincontent1 p {
  padding-left: 20px;
  text-align: left;
}
#maincontent p {
  padding-left: 20px;
  text-align: left;
  box-sizing: border-box;
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
  height: 3rem;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nianBt {
  height: 100%;
  width: 20%;
  /* background: red; */
  padding-top: 0.8rem;
  color: black;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
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

/* 刷新 */

.newxin {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: none;
  color: #ccc;
  font-size: 0.24rem;
}
.btxq {
  display: flex;
  flex-wrap: wrap;
}
.btxq > p {
  overflow: hidden;
  width: 100%;
  display: block;
  /* padding-bottom: 0.1rem; */
  border-bottom: 1px solid #ccc;
  padding-top: 0.1rem;
  height: 1.2rem;
  box-sizing: border-box;
}
.btxq > p:nth-child(2) {
  border-bottom: none;
}
.btxq > p:nth-child(4) {
  border-bottom: none;
}
.btxq > p {
  border-right: 1px solid #ccc;
}
.btxq > p:nth-child(2n) {
  border-right: none;
}
.btxq > p:nth-child(1) {
  border-right: none;
}
.blue {
  color: #808080;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  width: 100%;
}
.black {
  color: red;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.28rem;
  width: 100%;
  margin-top: 0.1rem;
}
.bmcontent > div {
  border-bottom: 1px solid #ccc;
  padding-top: 0.2rem;
  border-right: 1px solid #ccc;
}
.bmcontent > div:nth-child(3n + 0) {
  border-right: none;
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
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-select-dropdown {
  width: 98%;
}
</style>