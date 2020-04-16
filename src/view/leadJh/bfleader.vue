<template>
  <div class="wrapper" ref="wrapper">
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
             value-format="yyyy-MM-dd"
            style="border:none;font-size:0.4rem!importment;font-weight:900;"
            :clearable="false"
            class="el-icon-arrow-down1"
            :picker-options="pickerOptions0"
            :editable="false"
          >
            <template>
              <i class="el-icon-arrow-down"></i>
            </template>
          </el-date-picker>
        </span>
      </h3>
      <div class="maincontent" id="maincontent" style="position:relative;">
        <div style="overflow:hidden;height: 100%;border-bottom:1px solid #ccc;">
          <div class="left nianBt">团队</div>
          <div class="right btxq" style="width:75%;font-size:0.3rem;">
            <p>
              <span class="blue">拜访客户：</span>
              <span class="black">{{this.biaotou_new.customer_count}}个</span>
            </p>
            <p>
              <span class="blue">总拜访次数：</span>
              <span class="black">{{this.biaotou_new.count}}次</span>
            </p>
            <p>
              <span class="blue">人均拜访客户</span>
              <span class="black">{{this.biaotou_new.svg_customer_count}}个</span>
            </p>
            <p>
              <span class="blue">人均拜访次数：</span>
              <span class="black">{{this.biaotou_new.svg_count}}次</span>
            </p>
          </div>
        </div>
      </div>
      <div class="maincontent" id="maincontent">
        <div style="overflow:hidden;height: 100%;">
          <div class="left nianBt">leader</div>
          <div class="right btxq" style="width:75%;font-size:0.3rem;">
            <p>
              <span class="blue">拜访客户：</span>
              <span class="black">{{this.biaotou_new.leader_customer_count}}个</span>
            </p>
            <p>
              <span class="blue">总拜访次数：</span>
              <span class="black">{{this.biaotou_new.leader_count}}次</span>
            </p>
            <p>
              <span class="blue">人均拜访客户</span>
              <span class="black">{{this.biaotou_new.leader_svg_customer_count}}个</span>
            </p>
            <p>
              <span class="blue">人均拜访次数：</span>
              <span class="black">{{this.biaotou_new.leader_svg_count}}次</span>
            </p>
          </div>
        </div>
      </div>
      <div style="background:#fff;margin-top:0.3rem;padding-bottom:0.3rem;">
        <el-input
          ref="timechoose1"
          placeholder="部门名称"
          v-model="bmname"
          class="input-with-select"
          style="width:40%;"
        ></el-input>
        <el-input
          ref="timechoose1"
          placeholder="销售姓名"
          v-model="xsname"
          class="input-with-select"
          style="width:50%;"
        >
          <el-button slot="append" icon="el-icon-search" @click="zhongjiedata"></el-button>
        </el-input>

        <input type="text" id="ceshiinput" style="display:none;" />
      </div>
      <div id="pxcord" style="font-size:0.3rem;text-align:right;width:90%;margin:0.2rem auto;">
        排序：
        <span
          style="margin-right:0.2rem;"
          :class="paixunum1===1?'xuanzhong':''"
          @click="paixu1(1)"
        >周拜访次数</span>
        <span
          style="margin-right:0.2rem;"
          :class="paixunum1===2?'xuanzhong':''"
          @click="paixu1(2)"
        >月拜访次数</span>
        <!-- <span :class="paixunum1===3?'xuanzhong':''" @click="paixu1(3)">标准销售额</span> -->
      </div>

      <div style="font-size:0.3rem;background:#f2f2f2">
        <div
          v-for="(item,index) in tabdata2"
          :key="index"
          style="background:#fff;margin-top:0.2rem;"
        >
          <h3
            style="text-align:left;line-height:1rem;text-indent:0.3rem;"
          >{{item.department_name}}--{{item.leadername}}</h3>
          <el-table
            :data="item.listvisit"
            style="width: 100%"
            @expand-change="ceshi"
            @row-click="(a)=>{clickTable(a,index)}"
            ref="tables"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  inline
                  class="demo-table-expand"
                  style="height:300px;overflow:auto;font-size:0.3rem;text-align:left;color:black;font-weight:900;"
                >
                  <div
                    v-for="(item,index) in props.row.id"
                    :width="gowidth"
                    :key="index"
                    :style="{padding:'0.3rem','border-bottom':'1px solid #ccc','box-sizing':'border-box',width:gowidth-20+'px'}"
                  >
                    <div v-show="item.visit_way!=='暂无记录'">
                      <p>{{item.start_time}}--{{item.end_time}}</p>
                      <p style="color:#1c9ad2;margin-top:0.2rem;">
                        {{item.visit_way}}
                        <span style="color:red;">&nbsp;{{item.customer}}</span>
                        &nbsp;{{item.to_person}}({{item.person_phone}})
                      </p>
                      <p style="color:#1c9ad2;margin-top:0.2rem;">主要交流事宜:</p>
                      <p>{{item.talk_main}}</p>
                      <p style="color:#1c9ad2;margin-top:0.2rem;">拜访结果:</p>
                      <p>{{item.visit_process}}</p>
                      <p>填写时间：{{item.create_time}}</p>
                    </div>
                    <div v-show="item.visit_way=='暂无记录'">
                      <p style="text-indent:150px;line-height:200px;">{{item.visit_way}}</p>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="user_name">
              <template v-slot="scope">
                <!-- <div @click="ccc(scope.row)">{{scope.row.user_name}}</div> -->
                <router-link :to='{path:"/create",query:{userid:scope.row.user_id}}' style="">{{scope.row.user_name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="周拜访客户" sortable width="130" prop="week_customer_count"></el-table-column>
            <el-table-column label="周拜访次数" sortable width="130" prop="week_count"></el-table-column>
            <el-table-column label="月拜访客户" sortable width="130" prop="month_customer_count"></el-table-column>
            <el-table-column label="月拜访次数" sortable width="130" prop="month_count"></el-table-column>
            <el-table-column label="拜访等级" width="130" prop="result"></el-table-column>
          </el-table>
          <div style="overflow:hidden;line-height:0.8rem;background:#f2f2f2;">
            <span style="float:left;width:50%;">周人均拜访次数：{{item.week_avg_count}}</span>
            <span style="float:left;width:50%;">月人均拜访次数：{{item.month_avg_count}}</span>
            <span style="float:left;width:50%;">周人均拜访个数：{{item.week_customer_avg_count}}</span>
            <span style="float:left;width:50%;">月人均拜访个数：{{item.month_customer_avg_count }}</span>
            <span style="float:left;width:50%;">周拜访次数：{{item.week_count}}</span>
            <span style="float:left;width:50%;">月拜访次数：{{item.month_count}}</span>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>
<script>
// import BScroll from "better-scroll";
import { biaotou1, needdata, infobyUser, getisread } from "@/api/configWu";
import {getNowDate} from "@/untils/common";
const Head = () => import('@/view/common/head')

export default {
  name: "index",
  components: {
    Head
  },
  data() {
    return {
      isread: false,
      click: true,
      biaotou_new: {},
      tabdata2: [],
      gowidth: 300,
      arr: [],
      biao: 0,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      act: 2,
      act1: true,
      box: "100",
      value1: getNowDate(),
      value: "",
      value11: "",
      state2: "",
      input10: "",
      choose: {},
      paixunum1: 1,
      getd: true,
      paixulist1: ["week_count", "month_count"],
      bmname: "",
      xsname: "",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  mounted() {
    this.aler();
    this.getdata();
    this.gethong();
    this.getact()
  },
  watch: {
    value1() {
      this.getdata();
    }
  },

  methods: {
    getact(){
      var lodata = JSON.parse(sessionStorage.getItem('leaderMenus'))
      lodata.forEach((e,index)=>{
        if(e.path=="/baifang"){
          this.act = index+1
        }
      })
    },
    ccc(a){
      this.$router.push({path:'/create',query:{userid:a.user_id}})
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        // //console.log()
        this.isread = res.data.isread;
      });
    },
    zhongjiedata() {
      needdata({
        userid: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        curPage: this.pagenum,
        departmentName: this.bmname,
        name: this.xsname,
        submitTime: this.value1
      }).then(res => {
        this.tabdata2 = res.data;
        this.paixu1(this.paixunum1);
        this.getd = false;
      });
    },
    clickTable(row, index, e) {
      var box = index;
      this.$refs.tables[index].toggleRowExpansion(row);
    },
    ceshi(a, b) {
      infobyUser({ userid: a.user_id, submitTime: this.value1 }).then(res => {
        if (res.data.length > 0) {
          this.$set((a.id = res.data));
        } else {
          this.$set((a.id = [{ visit_way: "暂无记录" }]));
        }
      });
    },
    aler() {
      this.gowidth =
        document.body.clientWidth || document.documentElement.clientWidth;
    },
    paixu1(a) {
      this.paixunum1 = a;
      this.sort1(this.paixulist1[a - 1]);
    },
    sort1(type) {
      this.sortType = type;
      this.tabdata2.sort(this.compare(type));
      switch (type) {
        case "week_customer_count":
          this.sortType = "week_customer_count";
          this.tabdata2.sort(this.compare("week_customer_count"));
          break;
        case "week_count":
          this.sortType = "week_count";
          this.tabdata2.sort(this.compare("week_count"));
          break;
        case "month_count":
          this.sortType = "month_count";
          this.tabdata2.sort(this.compare("month_count"));
          break;
      }
    },
    compare(attr) {
      return function(a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
      };
    },
    getdata(a) {
      var scrollTop = document.documentElement.scrollTop;
      biaotou1({
        userid: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        submitTime: this.value1
      }).then(res => {
        this.biaotou_new = res.data;
      });
      needdata({
        userid: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        curPage: this.pagenum,
        departmentName: this.bmname,
        name: this.xsname,
        submitTime: this.value1
      }).then(res => {
        this.tabdata2 = res.data;
        this.paixu1(this.paixunum1);
        this.getd = false;
      });

      if (a == 6) {
        this.indexnum = 1;
      }
    },
   
  }
};
</script>
<style scoped>
#pxcord > span {
  text-decoration: underline;
  color: black;
}
#pxcord > .xuanzhong {
  color: #ccc;
}
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
  width: 50%;
  display: block;
  /* padding-bottom: 0.1rem; */
  border-bottom: 1px solid #ccc;
  padding-top: 0.1rem;
  height: 1.2rem;
  box-sizing: border-box;
}
.btxq > p:nth-child(3) {
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
.blue {
  color: black;
  font-weight: 900;
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
  font-size: 0.3rem;
  color: black;
  font-weight: 900;
}
.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
  margin-top: 0.15rem;
  font-weight: 900;
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