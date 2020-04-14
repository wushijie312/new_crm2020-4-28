<template>
  <div class="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content csgogogo" ref="wrapper">
      <div class="menu-head-top50"></div>
      <div style="width:98%;margin-left:1%;">
        <el-input placeholder="请输入内容" v-model="input2">
          <el-button slot="append" icon="el-icon-search" @click="zhongjian"></el-button>
        </el-input>
      </div>
      <h3 style="text-align:right;font-size:0.3rem;padding-right:0.3rem;margin-top:0.2rem;">
        <span style="text-decoration: underline;" @click="qhbb">{{zhuan}}</span>
      </h3>
      <div
        v-for="(a,b) in data1"
        :key="b"
        style="font-size:0.3rem;margin:0.2rem auto; width:98%;background:#fff;"
      >
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
          <div>联系人：{{o.contact_person}}</div>
          <div>职务：{{o.position}}</div>
          <div>对接人：{{o.correlation_person}}</div>
          <div>关系：{{o.relation}}</div>
        </div>
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
    </div>
    <!-- <div
      v-show="showbackTop"
      @click="gotop"
      style="position:fixed;bottom:20px;right:20px;width:1rem;height:1rem;background:skyblue;border-radius:1rem;color:#fff;font-size:0.6rem;line-height:1rem;opacity:0.8;"
    >
      <i class="el-icon-top"></i>
    </div> -->
    <!-- <ShowbackTop ></ShowbackTop> -->
    <Addcreate v-if="!act1"></Addcreate>
  </div>
</template>
<script>
import { getkehu } from "@/api/config";
import { getisread } from "@/api/configWu";
import BScroll from "better-scroll";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";
// import ShowbackTop from "@/components/showbackTop";

export default {
  name: "index",
  components: {
    Head,
    Addcreate,
    // ShowbackTop
  },
  data() {
    return {
      zhuan: "切换至文字版",
      isread: false,
      loading: true,
      pageSize: 20,
      loadingConnecting: false,
      arr: [],
      pagenum: 1,
      data1: {},
      act: 3,
      act1: this.$route.query.id == 2 ? false : true,
      input2: "",
      ty: true,
      status: []
    };
  },
  mounted() {
    this.getdata(this.pagenum).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.status.push(true);
      }
      this.data1 = res.data;
    });
    this.handleScroll();
    this.getact();
    //
    window.addEventListener("scroll", this.scrollKehuGuanLi, true);
    this.gethong();
  },
   destroyed() {
    window.removeEventListener("scroll", this.scrollKehuGuanLi, true);
  },
  methods: {
    getact() {
      var lodata =
        this.$route.query.id == 1
          ? JSON.parse(sessionStorage.getItem("leaderMenus"))
          : JSON.parse(sessionStorage.getItem("userMenus"));
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
        this.zhuan = "切换至文字版";
      }
    },
    tableRowClassName({ row, rowIndex }) {
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
        this.isread = res.data.isread;
      });
    },
    scrollKehuGuanLi() {
      // 滚动到页面底部时
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      const toBottom = scrollHeight - scrollTop - clientHeight;

      if (toBottom <= 30 && this.loading&&this.data1.length == this.pagenum * this.pageSize) {
        this.loading = false;
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.getdata(++this.pagenum).then(res => {
          if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
              this.status.push(true);
            }
            this.data1 = this.data1.concat(res.data);
            this.loading = true;
          }
        });
      }
     
    },

   
    handleScroll() {
      if (this.$route.query.id == 2) {
        this.ty = false;
      } else {
        this.ty = true;
      }
    },
    clishou(a, b, c) {
      if (this.status[c] == true) {
        this.status.splice(c, 1, false);
      } else {
        this.status.splice(c, 1, true);
      }
    },
    zhongjian() {
      this.pagenum = 1;
      this.getdata(this.pagenum);
    },
    getdata(curPage) {
      return getkehu({
        curPage: curPage,
        pageSize: this.pageSize,
        search: this.input2,
        role: localStorage.getItem("role"),
        userid: localStorage.getItem("userid"),
        level: localStorage.getItem("level")
      });
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


</style>