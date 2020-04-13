<template>
  <div>
    
    <div id="sobox" style="padding:15px;font-size:0.3rem;color:black;">
      <h3 style="text-align:left;line-height:0.8rem;">
        <p style="overflow:hidden;">
          <span style="float:left;">{{routerData.name}}</span>
          <span
            style="float:right;font-size:0.3rem;font-weight:900;"
           @click="$router.push({path:'/xiaoshou',query:{top:$route.query.top,search:$route.query.search,iswzb:$route.query.iswzb}})"
          >返回首页</span>
        </p>
        <span
              id="sobox"
              style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                ref="timechoose"
                v-model="routerData.date"
                type="date"
                placeholder="选择日期"
                style="border:none;font-size:0.4rem!importment;font-weight:900;width:45%;"
                :clearable="false"
                :picker-options="pickerOptions0"
               value-format = 'yyyy-MM-dd'
               @change="changetime"
               class="el-icon-arrow-down1"
               :editable = 'false'
              >
                <template>
                  <!-- <i class="el-icon-arrow-down"></i> -->
                </template>
              </el-date-picker>
            </span>
      </h3>
      
      <Menu1 :indexnum.sync="indexnum" :routerData.sync="routerData"></Menu1>
      <el-table :data="listdata" border style="width: 100%;font-size: 0.3rem;
  color: black;
  margin-top: 0.15rem;
  font-weight: 900">
        <el-table-column  :width="needwidth" prop="userName" label="姓名" >
          <template v-slot="scope">
                <!-- <div @click="ccc(scope.row)">{{scope.row.user_name}}</div> -->
                <router-link :to='{path:"/create",query:{userid:scope.row.user_id}}' style="text-align:center;">{{scope.row.userName}}</router-link>
              </template>
        </el-table-column>
        
        <!-- <el-table-column  :width="needwidth"  prop="position" label="职位"></el-table-column> -->
        
        <el-table-column  :width="needwidth"  prop="characters" label="职位属性"></el-table-column>
        <el-table-column  :width="needwidth"  prop="grade" label="评级">
            <template v-slot="scope">
                <span :style="{color:scope.row.grade==='转出期销售'||scope.row.grade==='观察期销售'?'red':'black'}">{{scope.row.grade}}</span>
            </template>
        </el-table-column>
        <el-table-column  :width="needwidth" sortable  prop="lastStandMoney" label="上月标准销售额">
            <template v-slot="scope">
                {{Number(scope.row.lastStandMoney).toFixed(1)}}万
            </template>
        </el-table-column>
        <el-table-column  :width="needwidth" sortable  prop="finishQuarterMoney" label="季累计销售额">
            <template v-slot="scope">
                {{Number(scope.row.finishQuarterMoney).toFixed(1)}}万
            </template>
        </el-table-column>
        <el-table-column :width="needwidth" sortable  prop="finishYearMoney" label="年累计销售额">
            <template v-slot="scope">
                {{Number(scope.row.finishYearMoney).toFixed(1)}}万
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Menu1 from "@/components/menu1";
import { getcyyj } from "@/api/config";
export default {
  name: "cyyj",
  components: {
    Menu1
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      indexnum: "2",
      routerData: {date:''},
      listdata: [],
      needwidth:50
    };
  },
  mounted() {
    this.fuzhi()
    this.getdata();
  },
  methods: {
    changetime(){
      console.log(111)
      this.getdata()
    },
    fuzhi(){
      this.needwidth = (window.document.body.clientWidth-31)/4
      var routdata = {};
      routdata.date = this.$route.query.date;
      routdata.departid = this.$route.query.departid;
      routdata.id = this.$route.query.id;
      routdata.name = this.$route.query.name;
      this.routerData = routdata;
      this.routerData.top = this.$route.query.top;
      this.routerData.iswzb = this.$route.query.iswzb;
    },
    getdata() {

      
      getcyyj({
        departmentId: this.routerData.departid,
        submitTime: this.routerData.date
      }).then(res => {
        console.log(res);
        this.listdata = res.userList;
      });
    }
  }
};
</script>

<style scoped>
#sobox .el-table{
    color: 'black'
}
</style>>

