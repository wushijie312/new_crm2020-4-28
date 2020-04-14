<template>
  <transition name="el-zoom-in-center">
    
    <el-form ref="form"  label-width="100px" style="padding:0.3rem;">
      <el-form-item label="客户名称" required>
      <el-autocomplete
        class="inline-input"
        v-model="value"
        :fetch-suggestions="querySearch"
        placeholder="请客户名称"
        @select="handleSelect"
        value-key="companyName"
        style="width:100%;"
      ></el-autocomplete>
      </el-form-item>
      <el-form-item label="开始时间" required>
      
        <el-date-picker
          v-model="sendData.start_time"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH-mm"
          style="width:100%;"
        ></el-date-picker>
      </el-form-item>
        <el-form-item label="结束时间" required>
        <el-date-picker
          v-model="sendData.end_time"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH-mm"
          style="width:100%;"
        ></el-date-picker>
        <!-- <el-date-picker
            v-model="sendData.end_time"
            type="daterange"
            unlink-panels = 'true'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>-->
      
      </el-form-item>
      <el-form-item label="拜访方式" required style="margin-bottom:0;">
      <el-select
        clearable
        v-model="sendData.visit_way"
        placeholder="请选择拜访方式"
        style="width:100%;"
        @change="choosebftype"
      >
        <el-option label="当面拜访" value="当面拜访">当面拜访</el-option>
        <el-option label="电话拜访" value="电话拜访">电话拜访</el-option>
      </el-select>
      </el-form-item>
      <div v-show="isdz">
        <el-select
          ref="sheng"
          clearable
          v-model="sendData.province"
          placeholder="请选择省份"
          style="width:47%;margin:0 auto;"
          @change="shengChange"
        >
          <el-option
            v-for="item in shengs"
            :key="item.area_id"
            :label="item.name"
            :value="item.area_id"
          ></el-option>
        </el-select>
        <el-select
          clearable
          v-model="sendData.city"
          placeholder="请选择市区"
          style="width:47%;margin:0px auto;"
        >
          <el-option v-for="item in shis" :key="item.area_id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-input
          placeholder="输入详细地址"
          v-model="sendData.addr"
          clearable
          style="width:98%;margin:10px auto;"
        ></el-input>
      </div>
      <el-form-item label="姓名" required style="margin-top:10px;">
          <el-autocomplete
        class="inline-input"
        v-model="sendData.to_person"
        :fetch-suggestions="querySearch1"
        placeholder="被拜访人姓名"
        @select="bfrchange"
        value-key="contactPerson"
        style="width:100%;"
      ></el-autocomplete>
      <!-- <el-select
        clearable
        v-model="sendData.to_person"
        placeholder="被拜访人姓名"
        style="width:98%;margin:0px auto;"
        @change="bfrchange"
        filterable
        allow-create
      >
        <el-option
          v-for="item in gxtprys"
          :key="item.id"
          :label="item.contactPerson"
          :value="item.contactPerson"
        ></el-option>
      </el-select> -->
      </el-form-item>
      <el-form-item label="职务" required style="margin-top:10px;">
      <el-input
        placeholder="被拜访人职务"
        v-model="sendData.to_level"
        clearable
        style="width:98%;margin:0px auto;"
      ></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  >
      <el-input
        placeholder="被拜访人联系方式"
        v-model="sendData.person_phone"
        clearable
        style="width:98%;margin:0px auto;"
      ></el-input>
      </el-form-item>
      <el-form-item label="交流事宜" required >
      <el-input
        placeholder="请输入交流事宜"
        v-model="sendData.talk_main"
        clearable
        style="width:98%;margin:0px auto;"
      ></el-input>
      </el-form-item>
      <el-form-item label="拜访结果" required >
      <el-input
        placeholder="请输入拜访结果"
        v-model="sendData.visit_process"
        clearable
        style="width:98%;margin:0px auto;"
      ></el-input>
      </el-form-item>

      <!-- <el-select clearable
          v-model="value11"
          placeholder="请选择是否需要高管支持"
          style="width:98%;margin:10px auto;"
          @change="changeLocationValue1"
        >
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          ></el-option>
      </el-select>-->
      <div>
        <el-button type="primary" @click="adddata">添加</el-button>
        <el-button type="info" @click="returnGo">返回</el-button>
      </div>
    </el-form>
    
  </transition>
</template>

<script>
import {
  biaotou1,
  needdata,
  adddata,
  chakehu,
  getSheng,
  getgxtp
} from "@/api/configWu";
export default {
  name: "createUser",
  data() {
    return {
      restaurants: [],
      value: "",
      input10: "",
      choose: {},
      isdz: true,
      sendData: {
        customer_id: "",
        start_time: "",
        end_time: "",
        visit_way: "当面拜访",
        province: "",
        city: "",
        addr: "",
        to_person: "",
        to_level: "",
        person_phone: "",
        visit_result: "",
        talk_main: "",
        visit_process: "",
        customer: ""
      },
      options: [],
      shengs: [],
      shis: [],
      gxtprys: []
    };
  },
  mounted() {
    this.chakehu();
    this.getSheng();
  },
  methods: {
    handleSelect(item) {
    //   console.log(this.ruleForm.options);
      this.sendData.customer_id = item.id;
      this.sendData.customer = item.companyName;
      getgxtp({ supplierId: this.sendData.customer_id }).then(res => {
        // console.log(res);
        this.gxtprys = res.data;
      })
    //   this.ruleForm.options = item.companyName;
    //   this.ruleForm.optionsId = item.id;
    },
    querySearch(queryString, cb) {
//  	console.log(queryString)
      var restaurants = this.restaurants;
      // console.log(this.restaurants)
      // console.log(this.createFilter(queryString))
      var results =
        queryString.length > 0
          ? restaurants.filter(this.createFilter(queryString,"companyName"))
          : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch1(queryString, cb) {
      var restaurants = this.gxtprys;
//    console.log(restaurants)
      // console.log(this.restaurants)
      // console.log(this.createFilter(queryString))
      var results =
        queryString.length > 0
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString,selfStr) {
    	if(!selfStr) var selfStr = "contactPerson";
      return restaurant => {
        return (
          restaurant[selfStr]
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    bfrchange(a, b) {
      this.gxtprys.forEach(e => {
        // console.log(e)
        if (a.contactPerson == e.contactPerson) {
          this.sendData.to_level = e.position;
          this.sendData.person_phone = e.phone;
          // console.log(this.sendData.to_level)
        }
      });
    },
    choosebftype(a) {
      if (a === "当面拜访") {
        this.isdz = true;
      } else {
        this.isdz = false;
      }
    },
    shengChange(a, b) {
      //   console.log(b)
      getSheng({ pid: a }).then(res => {
        this.sendData.province = this.$refs.sheng.selectedLabel;
        // console.log(this.$refs.sheng.selectedLabel);
        //   console.log(this.sendData)
        this.shis = res.data;
      });
    },
    getSheng() {
      getSheng({ pid: "CN" }).then(res => {
        //   console.log(res)
        this.shengs = res.data;
      });
    },
    returnGo() {
      this.$router.go(-1);
    },
    changeLocationValue(val) {
      //locations是v-for里面的也是datas里面的值
      console.log(this.value);
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });

      this.choose = obj;
      console.log(this.choose);
      
      ;
    },
    adddata() {
      adddata(this.sendData)
        .then(res => {
          if (res.code == 200) {

            this.$message.success("添加成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.$message.error("添加失败");
        });
      //   } else {
      //     this.$message.error("请填写完整信息");
      //   }
    },
     chushi() {
      console.log(this.$route);
      if (this.$route.query.customerName) {
        this.value = this.$route.query.customerName;
//      this.id = this.$route.query.id;
      }
     },
    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          this.restaurants = res.data;
          this.chushi();
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
</style>