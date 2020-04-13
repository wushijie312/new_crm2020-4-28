<template>
  <div>
    <h3 style="text-align:left;line-height:0.8rem;width:90%;margin:0 auto;">
      <p style="line-height:1rem;overflow:hidden;">
          <span style="float:left; font-size:0.3rem;">{{$route.query.date}}</span>
        <span
          style="float:right;font-size:0.3rem;font-weight:900;"
          @click="$router.push({path:'/xiaoshou'})"
        >返回首页</span>
      </p>
    </h3>
    <el-table :data="tabdata1" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="userName" label="销售名称"></el-table-column>
      <el-table-column width="120" prop="todaySaleMoney" label="提交金额" sortable="custom">
        <template v-slot="scope">
          {{scope.row.todaySaleMoney?scope.row.todaySaleMoney:'未提交'}}
          <span
            v-show="scope.row.todaySaleMoney!='未提交'"
          >万</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户"></el-table-column>
      <el-table-column width="120"  prop="submitTime" label="提交时间" sortable="custom">
          <template v-slot="scope">{{scope.row.submitTime}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { gettbjl } from "@/api/config";
export default {
  data() {
    return {
      tabdata1: [],
      paixulist: ["ascending", "descending", null],
      jrjefunc: "",
      px1: [],
      px2: [],
      cstbdata: []
    };
  },
  mounted() {
    this.gettbjl();
  },
  methods: {
    sortChange(a, b) {
      this.px1 = [];
      this.px2 = [];
      console.log(a);
      if (a.prop === "todaySaleMoney" && a.order === "descending") {
        this.gettbjl('money',1)
      } else if (a.prop === "todaySaleMoney" && a.order === "ascending") {
        this.gettbjl('money',2)
      } else if (a.prop === "todaySaleMoney" && a.order === null) {
        this.tabdata1 = this.cstbdata;
      } else if (a.prop === "submitTime" && a.order === "ascending") {
        this.gettbjl('time',1)
      } else if (a.prop === "submitTime" && a.order === null) {
        this.tabdata1 = this.cstbdata;
      } else {
        this.gettbjl('time',2)
      }
    },
    
    

    gettbjl(a,b) {
      gettbjl({ submitTime: this.$route.query.date,lastName:a,type:b }).then(res => {
        this.tabdata1 = res.allCustomerList;
        this.cstbdata = this.tabdata1;
        console.log(res);
      });
    }
  }
};
</script>

<style>
</style>