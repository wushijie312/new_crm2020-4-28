<template>
  <div class="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content csgogogo" ref="wrapper">
      <div class="menu-head-top50"></div>

      <div class="filter" @click="drawer = true"></div>
      <el-drawer
        size="80%"
        :visible.sync="drawer"
        :with-header="false"
        :show-close="false"
        @close="closeDrawer"
      >
        <div style="width:98%;margin-left:1%;padding: 0px 10px;">
          <el-form ref="form" label-width="100px" style="padding:0.3rem;">
            <el-form-item label="擅长供应品类">
              <el-input placeholder="请输入擅长供应品类" v-model="searchData.wellCate"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input placeholder="请输入部门" v-model="searchData.departmentName"></el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-input placeholder="请输入岗位" v-model="searchData.position"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名" v-model="searchData.name"></el-input>
            </el-form-item>
            <el-form-item label="从业年限">
              <el-input placeholder="请输入从业年限" v-model="searchData.cateJobSum"></el-input>
            </el-form-item>
            <div style="text-align: center;">
              <el-button type="info" @click="zhongjian(false)">重置</el-button>
              <el-button type="primary" @click="zhongjian(true)">搜索</el-button>
            </div>
          </el-form>
        </div>
      </el-drawer>
      <el-card class="box-card">
        <el-table
          :data="data1"
          :row-class-name="tableRowClassName"
          cell-class-name="selfCell"
          :cell-style="cellClass"
          :header-cell-style="cellClass"
          border
          style="width: 100%"
          @row-click="goxq"
        >
          <el-table-column prop="name" label="姓名" fixed>
            <template v-slot="scope">{{scope.row.name?scope.row.name:'/'}}</template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" class-name="selfColumn" width="125">
            <template v-slot="scope">{{scope.row.departmentName?scope.row.departmentName:'/'}}</template>
          </el-table-column>
          <el-table-column prop="position" label="岗位" class-name="selfColumn" width="155">
            <template v-slot="scope">{{scope.row.position?scope.row.position:'/'}}</template>
          </el-table-column>
          <el-table-column prop="wellCate" label="擅长品类" class-name="selfColumn" width="130">
            <template v-slot="scope">{{scope.row.wellCate?scope.row.wellCate:'/'}}</template>
          </el-table-column>
          <el-table-column prop="cateName" label="品类" class-name="selfColumn" width="100">
            <template v-slot="scope">
              <!--<router-link :to='{path:"/talentd",query:{providerCode:scope.row.providerCode}}' style="text-align:center;"></router-link>-->
              {{scope.row.cateName}}
            </template>
          </el-table-column>
          <el-table-column prop="cateJobSum" label="从业年限" class-name="selfColumn" width="95">
            <template v-slot="scope">{{scope.row.cateJobSum?scope.row.cateJobSum:'/'}}</template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div
      v-show="showbackTop"
      @click="gotop"
      style="position:fixed;bottom:20px;right:20px;width:1rem;height:1rem;background:skyblue;border-radius:1rem;color:#fff;font-size:0.6rem;line-height:1rem;opacity:0.8;"
    >
      <i class="el-icon-top"></i>
    </div>
    <Addcreate v-if="!act1"></Addcreate>
  </div>
</template>
<script>
import { talent } from "@/api/configWu";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";

export default {
  components: {
    Head,
    Addcreate
  },
  data() {
    return {
     
      drawer: false,
      loading: true,
      pageSize: 50,
      dataNumber:0,
      pagenum: 1,
      data1: [],
      act: 3,
      act1: this.$route.query.id == 2 ? false : true,
      ty: true,
      restaurants: [],
      showbackTop: false,
      searchData: {}
    };
  },
  mounted() {
    this.getdata(this.pagenum).then(res => {
      if (res.code == 200) {
        this.dataNumber=res.data;
        this.data1 = res.dataList;
      }
    });
    this.getact();
    //
    window.addEventListener("scroll", this.scrollTalent, true);
  },
  methods: {
    getact() {
      var lodata =
        this.$route.query.id == 1
          ? JSON.parse(sessionStorage.getItem("leaderMenus"))
          : JSON.parse(sessionStorage.getItem("userMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/talent?id=1" || e.path == "/talent?id=2") {
          this.act = index + 1;
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    cellClass(row, column) {
      //  	return 'text-align: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: table-cell!important;'
    },
    goxq(row) {
      this.$router.push({
        path: "/talentd",
        query: { id: row.id }
      });
    },
    gotop() {
      this.showbackTop = false;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    scrollTalent() {
      
      // 滚动到页面底部时
      // const el = document.getElementById("customlist");
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      const toBottom = scrollHeight - scrollTop - clientHeight;
      console.log(this.dataNumber ,this.data1.length);
      if (
        toBottom <= 30 &&
        this.loading &&
        this.dataNumber > this.data1.length
      ) {
        this.loading = false;
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.getdata(++this.pagenum).then(res => {
          if (res.code == 200) {
            this.dataNumber=res.data;
            this.data1 = this.data1.concat(res.dataList);
            if (this.data1.length == this.pagenum * this.pageSize) {
              document.documentElement.scrollTop = scrollTop - 10;
            }
            if(this.dataNumber<this.pagenum * this.pageSize){
              this.$message.success("已经到底部了");
            }
            this.loading = true;
          }
        });
      }
      if (scrollTop > 1000) {
        this.showbackTop = true;
      } else {
        this.showbackTop = false;
      }
    },


    zhongjian(status) {
      if (!status) {
        this.searchData = {};
      } else {
        this.drawer = false;
      }
    },
    closeDrawer() {
      this.zhongjian(true);
      this.pagenum = 1;
      this.getdata(this.pagenum);
    },
    getdata(page) {
      return talent({
        page: page,
        pageSize: this.pageSize,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userid"),
        level: localStorage.getItem("level"),
        wellCate: this.searchData.wellCate,
        cateJobSum: this.searchData.cateJobSum
          ? this.searchData.cateJobSum
          : null,
        departmentName: this.searchData.departmentName,
        name: this.searchData.name,
        position: this.searchData.position
      });
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    }
  }
};
</script>

<style  type="text/css" scoped >
.filter {
  height: 30px;
  padding: 10px;
}
.filter::after {
  content: "";
  display: block;
  float: right;
  width: 30px;
  height: 100%;
  background: url(../../assets/img/normal/filter.png) no-repeat center;
  background-size: 100%;
}
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
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
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

.el-table .cell {
  white-space: nowrap;
  padding: 0px 6px;
}
</style>