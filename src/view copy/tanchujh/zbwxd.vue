<template>
  <div>
    <h3 style="text-align:left;line-height:0.8rem;width:90%;margin:0 auto;">
      <p style="overflow:hidden;">
          <span
              style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;float:left;"
            >
              {{value1}}
            </span>
        <span
          style="float:right;font-size:0.3rem;font-weight:900;"
          @click="$router.push({path:'/xiaoshou'})"
        >返回首页</span>
      </p>
    </h3>
    <el-table :data="tabdata1" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="customerName" label="客户名称">
        <template v-slot="scope">
            <router-link :to="{path:'/create',query:{customerName:scope.row.customerName,customerId:scope.row.customerId}}"
              style
            >
              <span>{{scope.row.customerName}}</span>
            </router-link>
        </template>
      </el-table-column>
      
      <el-table-column width="120" prop="openTenderMoney" label="开标金额" sortable>
        <template v-slot="scope">
          
          <span>{{scope.row.openTenderMoney}}万</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="getTenderMoney" label="中标金额" sortable>
          <template v-slot="scope">
          
          <span>{{scope.row.getTenderMoney}}万</span>
        </template>
      </el-table-column>
      <el-table-column prop="getTenderNotMoney" label="中标未下单金额" sortable>
          <template v-slot="scope">
          
          <span>{{scope.row.getTenderNotMoney}}万</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="loseTenderMoney" label="丢标金额" sortable>
          <template v-slot="scope">
          
          <span>{{scope.row.loseTenderMoney}}万</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { tblist } from "@/api/configWu";
export default {
  data() {
    return {
      tabdata1: [],
      paixulist: ["ascending", "descending", null],
      jrjefunc: "",
      px1: [],
      px2: [],
      cstbdata: [],
      value1:''
    };
  },
  mounted() {
    this.gettbjl();
  },
  methods: {
      tableRowClassName({ row, rowIndex }) {
      if (rowIndex%2==0) {
        return "success-row";
      } 
      return "";
    },
    gettbjl() {
        this.value1 = this.$route.query.date
        var senddata = { submitTime: this.$route.query.date}
        if(this.$route.query.type==1){
            senddata.role = localStorage.getItem('role')
        }else if(this.$route.query.type==2){
            senddata.role = this.$route.query.role
        }else{
            senddata.name = this.$route.query.role
        }
      tblist(senddata).then(res => {
        this.tabdata1 = res.data;
      });
    }
  }
};
</script>

<style>
</style>