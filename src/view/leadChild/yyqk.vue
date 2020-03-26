<template>
  <div>
    <div style="padding:15px;font-size:0.3rem;color:black;" id="yyqk">
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
      <h6 style="font-size:0.3rem;line-height:0.8rem;text-align:left;">客户运营情况</h6>
      <el-table :data="listdata" border style="width: 100%">
        <el-table-column prop="name" label="来源" ></el-table-column>
        <el-table-column prop="sr" label="收入">
             <template v-slot="scope">{{Number(scope.row.sr).toFixed(1)}}万</template>
        </el-table-column>
        <el-table-column prop="zb" label="占比">
            <template v-slot="scope">
                {{scope.row.zb?scope.row.zb+'%':'--'}}
            </template>
        </el-table-column>
        
      </el-table>

      <h6 style="font-size:0.3rem;line-height:0.8rem;text-align:left;">推荐使用系统客户</h6>
      <el-table :data="syxtlist" border style="width: 100%;">
        <el-table-column prop="companyName" label="公司名称" style="text-align:left;"></el-table-column>
        
        
      </el-table>
    </div>
  </div>
</template>

<script>
import Menu1 from "@/components/menu1";
import { getyyqk } from "@/api/config";
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
      indexnum: "5",
      routerData: {date:''},
      listdata: [],
      syxtlist:[]
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
      this.routerData.date = this.$route.query.date;
      this.routerData.departid = this.$route.query.departid;
      this.routerData.id = this.$route.query.id;
      this.routerData.name = this.$route.query.name;
      this.routerData.top = this.$route.query.top;
      var date1 = this.$route.query.date;
      this.departmentName = this.$route.query.name;
      this.routerData.iswzb = this.$route.query.iswzb;
    },
    getdata() {
     
      getyyqk({
        departmentId: this.routerData.departid,
        submitTime: this.routerData.date
      }).then(res => {
        console.log(res);
        
        var data = [{name:'运营型订单',sr:res.data.customerDetailResponse.oprate_sale,zb:res.data.customerDetailResponse.oprate_rete},{name:'Teambition',sr:res.data.customerDetailResponse.tb_sale,zb:''},{name:'SaaS用户',sr:res.data.customerDetailResponse.saas_sale,zb:res.data.customerDetailResponse.saas_rate}]
        data.forEach(e => {
            this.listdata.push(e)
        });
        
        this.syxtlist = res.data.customers;
        console.log( this.syxtlist)
      });
    }
  }
};
</script>

<style>
</style>