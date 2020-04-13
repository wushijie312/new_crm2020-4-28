<template>
  <div class="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content csgogogo" ref="wrapper">
      <div class="menu-head-top50"></div>
      <div class="newxin" v-if="down"></div>
      <!--<el-button @click="drawer = true" type="primary" style="margin-left: 16px;" >
		  搜索
      </el-button>-->
      <div class="filter" @click="drawer = true">
        <!-- <span
	            style="float:left;font-size:0.3rem;font-weight:900;line-height:0.6rem;margin-right:0.3rem; text-decoration: underline;color:blue;"
	            @click="$router.go(-1)"
        >返回</span>-->
      </div>
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

    <!-- <ShowbackTop/> -->
      <Addcreate v-if="!act1"></Addcreate>

  </div>
</template>
<script>
import { talent } from "@/api/configWu";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";

// import ShowbackTop from "@/components/showbackTop";
export default {
  components: {
    Head,
    Addcreate,
    // ShowbackTop
  },
  data() {
    return {
      act: 1,
      act1: this.$route.query.id == 2 ? false : true,
      drawer: false,
      isscroll: false,
      isread: false,
      loadingConnecting: false,
      down: false,
      up: true,
      tzshow: false,
      pulldownTip: {
        text: "", // 松开立即刷新
        textup: "", // 松开立即刷新
        rotate: "" // icon-rotate
      },
      arr: [],
      biao: 0,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      data1: [],
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
      tableData6: [],
      options: [],
      searchData: {}
    };
  },
  mounted() {
    this.getdata();
    this.handleScroll();
    this.getact();
    document.addEventListener("scroll", this.BS);
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
          this.isscroll = false;
          this.getdata();
        }
       
      } catch (err) {
        // //console.log(err);
      }
    },

    handleScroll() {
     
      try {
        if (this.$refs.content.clientHeight) {
          var boxnum = this.$refs.content.clientHeight;
        }
        if (
          window.outerHeight + window.pageYOffset + 1000 >= boxnum &&
          this.isscroll
        ) {
          this.isscroll = false;
          this.getdata();
        }
      } catch (err) {
        // //console.log(err);
      }
    },

    zhongjian(status) {
      console.log(status);
      if (!status) {
        this.searchData = {};
      } else {
        this.drawer = false;
      }
    },
    closeDrawer() {
      this.zhongjian(true);
      this.pagenum = 1;
      this.getdata();
    },
    getdata() {
      // this.scroll = false;
      talent({
        page: this.pagenum,
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
      }).then(res => {
        if (res.code == 200) {
          if (this.pagenum == 1) {
            this.data1 = res.dataList;
          } else {
            for (var i = 0; i < res.dataList.length; i++) {
              this.data1.push(res.dataList[i]);
            }
          }
          if (res.dataList.length > 0 && res.data > this.data1.length) {
            this.pagenum++;
            this.isscroll = true;
          } else {
            if (this.data1.length) {
              this.isscroll = false;
              this.pulldownTip.textup = "-已经到底了-";
            }
          }

          if (this.pagenum == 2) {
            this.isscroll = false;
            this.getdata();
          }
        }
        console.log(this.status);
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
  },
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: true
    },
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
<style type="text/css">
.selfCell {
  padding: 8px 0px !important;
}
.selfCell > .cell {
  padding-left: 0px !important;
}
.selfCell.selfColumn > .cell {
  /*white-space: nowrap!important;
		padding: 0px 4px !important;*/
}
</style>
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