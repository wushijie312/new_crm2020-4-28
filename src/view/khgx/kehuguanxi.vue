<template>
  <div class="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content csgogogo" ref="wrapper">
      <div class="menu-head-top50"></div>
      <div class="newxin" v-if="down"></div>
      <div style="width:98%;margin-left:1%;">
        <el-input placeholder="请输入内容" v-model="input2">
          <el-button slot="append" icon="el-icon-search" @click="zhongjian"></el-button>
        </el-input>
      </div>
      <h3 style="text-align:right;font-size:0.3rem;padding-right:0.3rem;margin-top:0.2rem;">
        <span style="text-decoration: underline;" @click="qhbb">{{zhuan}}</span>
      </h3>
      <!--  <div
        v-for="(a,b) in data1"
        :key="b"
        style="font-size:0.3rem;margin:0.2rem auto; width:98%;padding-bottom:0.2rem;background:#fff;"
        v-show="false"
      >
      <span>{{a.company_name}}</span>
      <el-table :data="a.relations" border style="width: 100%">
        <el-table-column prop="level" label="层级"></el-table-column>
        <el-table-column fixed prop="contact_person" label="联系人" >
         
        </el-table-column>
        
        <el-table-column prop="correlation_person" label="对接人"></el-table-column>
        <el-table-column prop="position" label="职务"></el-table-column>
        <el-table-column prop="relation" label="关系"></el-table-column>
        
      </el-table> 
      </div>-->
      <div
        v-for="(a,b) in data1"
        :key="b"
        style="font-size:0.3rem;margin:0.2rem auto; width:98%;background:#fff;"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align:left;font-size:0.3rem;color:black;">
            <router-link
              :to="{path:'/create',query:{customerName:a.company_name,customerId:a.company_id}}"
              style
            >
              <span>{{a.company_name}}</span>
            </router-link>
            <el-button
              v-show="!status[b]"
              style="float: right; padding: 3px 0;color:#999;"
              type="text"
              icon="el-icon-arrow-right"
              @click="((val)=>{clishou(val, a ,b)})"
            ></el-button>
            <el-button
              v-show="status[b]"
              style="float: right; padding: 3px 0;color:#999;"
              type="text"
              icon="el-icon-arrow-down"
              @click="((val)=>{clishou(val, a ,b)})"
            ></el-button>
          </div>
          <el-table
            v-show="status[b]&&zhuan==='切换至文字版'"
            :data="a.relations"
            :row-class-name="tableRowClassName"
            border
            style="width: 100%"
            @row-click="goxq(a)"
          >
            <el-table-column width="30" prop="level" label="级">
              <template v-slot="scope">{{scope.row.level}}</template>
            </el-table-column>
            <el-table-column prop="contact_person" label="联系人">
              <template v-slot="scope">{{scope.row.contact_person?scope.row.contact_person:'/'}}</template>
            </el-table-column>
            <el-table-column prop="position" label="职务">
              <template v-slot="scope">{{scope.row.position?scope.row.position:'/'}}</template>
            </el-table-column>
            <el-table-column prop="correlation_person" label="对接人">
              <template
                v-slot="scope"
              >{{scope.row.correlation_person?scope.row.correlation_person:'/'}}</template>
            </el-table-column>

            <el-table-column prop="relation" label="关系">
              <template v-slot="scope">{{scope.row.relation?scope.row.relation:'/'}}</template>
            </el-table-column>
          </el-table>
          <div
            v-for="(o,c) in a.relations"
            :key="c"
            class="text item"
            style="overflow:hidden;border-bottom:2px solid #ccc;font-size:0.28rem;"
            v-show="status[b]&&zhuan==='切换至表格版'"
            @click="goxq(a)"
          >
            <!-- <div>层级：{{o.level}}</div> -->
            <div>联系人：{{o.contact_person}}</div>

            <div>职务：{{o.position}}</div>
            <!-- <div>电&nbsp;&nbsp;&nbsp;话：{{o.phone}}</div> -->
            <div>对接人：{{o.correlation_person}}</div>
            <!-- <div style="width:50%;">生&nbsp;&nbsp;&nbsp;日：{{o.birthday}}</div> -->
            <div>关系：{{o.relation}}</div>
            <!-- <div style="width:50%;">关系程度：{{o.customer_position}}</div> -->
            <!-- <div style="width:100%;">地&nbsp;&nbsp;&nbsp;点：{{o.addr}}</div>
            <div style="width:100%;">备&nbsp;&nbsp;&nbsp;注：{{o.remark}}</div>-->
          </div>
        </el-card>
        <div
          v-show="status[b]"
          style="line-height:0.8rem;background:#21aefb;width:98%;margin:0 auto;"
        >
          <router-link
            :to="{path:'/kehuedit',query:{id:a.relations[0].supplier_id,type:2}}"
            style="color:#fff;text-decoration:none;width:100%;display:block;"
          >编 辑</router-link>
        </div>
      </div>
      <!-- <div class="newxin" v-if="up">{{pulldownTip.textup}}</div> -->
    </div>
      <Addcreate v-if="!act1"></Addcreate>

  </div>
</template>
<script>
import { getkehu } from "@/api/config";
import { getisread } from "@/api/configWu";
import BScroll from "better-scroll";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";

export default {
  name: "index",
  components: {
    Head,
    Addcreate
  },
  data() {
    return {
      zhuan: "切换至文字版",
      isscroll: false,
      isread: false,
      loadingConnecting: false,
      down: false,
      up: true,
      tzshow: false,
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        textup: "上拉加载更多", // 松开立即刷新
        rotate: "" // icon-rotate
      },
      arr: [],
      biao: 0,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      data1: {},
      act: 3,
      act1: this.$route.query.id == 2 ? false : true,
      box: "100",
      value1: "",
      value2: "",
      value: "",
      value11: "",
      state2: "",
      input10: "",
      input2: "",
      ty: true,
      defaultProps: {
        children: "children",
        label: "label"
      },
      status: [],
      show2: false,
      restaurants: [],
      urlA: "",
      centerDialogVisible: false,
      choose: {},
      choose1: {},
      restaurants: [],
      su1: [],
      su2: [],
      headData: {
        jihua1: 0,
        jihua2: 0
      },
      options: [],
      options1: [
        {
          id: "1",
          companyName: "是"
        },
        {
          id: "0",
          companyName: "否"
        }
      ],

      tableData5: [],
      tableData6: []
    };
  },
  mounted() {
    this.getdata();
    this.handleScroll();
    this.getact();

    document.addEventListener("scroll", this.BS);
    this.gethong();
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      // setTimeout(() => {
      //   this.BS();
      // }, this.refreshDelay);
    }
  },
  methods: {
    getact() {
      var lodata =
        this.$route.query.id == 1
          ? JSON.parse(sessionStorage.getItem("leaderMenus"))
          : JSON.parse(sessionStorage.getItem("userMenus"));
      console.log(lodata);
      lodata.forEach((e, index) => {
        if (e.path == "/kehu?id=1" || e.path == "/kehu?id=2") {
          this.act = index + 1;
        }
      });
    },
    qhbb() {
      this.$message.closeAll();
      if (this.zhuan == "切换至文字版") {
        this.zhuan = "切换至表格版";
      } else {
        // alert(111)
        this.zhuan = "切换至文字版";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(rowIndex)
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    goxq(a) {
      this.$router.push({
        path: "/khgxXq",
        query: { id: a.relations[0].supplier_id, type: 1 }
      });
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        // console.log()
        this.isread = res.data.isread;
      });
    },
    BS() {
      // console.log(222)
      try {
        if (this.$refs.wrapper.clientHeight) {
          var boxnum = this.$refs.wrapper.clientHeight;
        }
        if (
          window.outerHeight + window.pageYOffset + 1000 >= boxnum &&
          this.isscroll
        ) {
          // console.log(111);

          this.isscroll = false;
          this.getdata();
        }
      } catch (err) {
        // //console.log(err);
      }
    },

    handleScroll() {
      if (this.$route.query.id == 2) {
        this.ty = false;
        // alert(this.ty)
      } else {
        this.ty = true;
      }
      // alert(this.ty)
    },
    clishou(a, b, c) {
      console.log(c);

      // vm.list.splice(c,1,true)
      if (this.status[c] == true) {
        // a.path[0].className = "el-icon-arrow-right";
        // b.laqu = true;
        this.status.splice(c, 1, false);
      } else {
        // a.path[0].className = "el-icon-arrow-down";
        // b.laqu = false;
        this.status.splice(c, 1, true);
      }
      console.log(this.data1);
      console.log(this.status);
    },
    goA() {
      this.urlA =
        "http://wxtest1.98ep.com/khgx/khgx.html?userid=" +
        localStorage.getItem("userid");
      location.href = this.urlA;
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

    open(a) {
      this.$message(a);
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
    changeLocationValue1(val) {
      //locations是v-for里面的也是datas里面的值
      console.log(this.value);
      let obj = {};
      obj = this.options1.find(item => {
        return item.id === val;
      });
      this.choose1 = obj;
    },
    zhongjian() {
      this.pagenum = 1;
      this.getdata();
      console.log(this.value2);
    },
    getdata() {
      // this.scroll = false;

      getkehu({
        curPage: this.pagenum,
        search: this.input2,
        role: localStorage.getItem("role"),
        userid: localStorage.getItem("userid"),
        level: localStorage.getItem("level")
      }).then(res => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          this.status.push(true);
        }
        if (this.pagenum == 1) {
          this.data1 = res.data;
        } else {
          for (var i = 0; i < res.data.length; i++) {
            this.data1.push(res.data[i]);
          }
        }
        if (res.data.length > 0) {
          // this.scroll = true
          this.pagenum++;
          this.isscroll = true;
        } else {
          // this.pulldownTip.textup = "我是有底线的";
        }
        // alert(this.pagenum)
        for (var i = 0; i < res.data; i++) {
          // this.data[i].laqu = true
          this.status.push(true);
        }
        console.log(this.status);
      });
    },
    adddata() {},
    chakehu() {},
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    aler() {
      this.value1 = new Date();
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

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
.content {
  background: #f2f2f5;
}
.el-card__header {
  background: #21aefb;
}
.item > div {
  width: 50%;
  float: left;
  text-align: left;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  height: 2.5rem;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nianBt {
  height: 1.3rem;
  width: 20%;
  background: red;
  padding-top: 0.6rem;
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
</style>