<template>
  <transition name="el-zoom-in-center">
    <el-form ref="form" label-width="100px" style="padding:0.3rem;">
      <el-form-item label="客户名称" required>
        <!--<el-autocomplete
          class="inline-input"
          v-model="addData.customerName"
          :fetch-suggestions="querySearch"
          placeholder="请输入客户名称"
          @select="handleSelect"
          value-key="companyName"
          style="width:100%;"
        ></el-autocomplete>-->
        <el-input
          placeholder="请输入客户名称"
          v-model="addData.customerName"
          clearable
          style="width:98%;margin:0.05rem auto;position:relative;"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户体量">
        <el-input
          placeholder="请输入客户体量"
          v-model="addData.customerVol"
          clearable
          style="width:98%;margin:0.05rem auto;position:relative;"
          type="number"
          :max="1000"
        >
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <!--<el-form-item label="最终实现收入" >
        <el-input
          placeholder="请输入最终实现收入"
          v-model="addData.customerReceipt"
          clearable
          style="width:98%;margin:0.05rem auto;"
          type="number"
        >
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>-->
      <el-form-item label="今年目标额" required>
        <el-input
          placeholder="请输入今年目标额"
          v-model="addData.customerTargetMoney"
          clearable
          style="width:98%;margin:0.05rem auto;position:relative;"
          type="number"
        >
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="本月任务">
        <el-input
          placeholder="请输入本月任务"
          v-model="addData.monthMoney"
          clearable
          style="width:98%;margin:0.05rem auto;position:relative;"
          type="number"
        >
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="负责销售" required>
        <el-select
          @focus="showKeybord"
          class="salerForm"
          v-model="addDataUser"
          value-key="userId"
          filterable
          placeholder="选择负责销售"
        >
          <el-option
            v-if="salerOptions.length"
            v-for="salerItem in salerOptions"
            :label="salerItem.userName"
            :key="salerItem.userId"
            :value="salerItem"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="负责销售" required >
    	<el-autocomplete
        class="inline-input"
        v-model="addDataUser.userName"
        :fetch-suggestions="querySearch"
        placeholder="选择负责销售"
        @select="handleSelect"
        value-key="userName"
        style="width:100%;"
      ></el-autocomplete>
      </el-form-item>-->
      <el-form-item label="B系统账号">
        <el-input
          placeholder="请输入B系统账号"
          v-model="addData.bsysAccount"
          clearable
          style="width:98%;margin:0 auto;position:relative;"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select class="customerForm" v-model="addData.tagSource" placeholder="选择类型">
          <el-option
            v-if="tagSourceOptions.length"
            v-for="(tagName,tagIndex) in tagSourceOptions"
            :label="tagName.result"
            :key="tagIndex"
            :value="tagName.source"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          placeholder="备注信息"
          v-model="addData.mark"
          clearable
          style="width:98%;margin:0.05rem auto;position:relative;"
        ></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="addCustomer" :disabled="disabled">提交</el-button>
        <el-button type="info" @click="$router.go(-1)" :disabled="disabled">返回</el-button>
      </div>
    </el-form>
  </transition>
</template>

<script>
import { addCustomer, chakehu, customerTag, salers } from "@/api/configWu";
import { adddata, updata, needdata, chabumen, chakh } from "@/api/config";
export default {
  name: "createUser",
  data() {
    return {
      restaurants: [],
      value: "",
      input10: "",
      input11: "",
      input101: "",
      input102: "",
      input103: "",
      input104: "",
      input105: "",
      choose: {},
      isdz: true,
      options: [],
      shengs: [],
      shis: [],
      gxtprys: [],
      addData: { customerName: "" },
      addDataUser: { userName: "" },
      tagSourceOptions: [], //{source:0,result:"未确定"}
      salerOptions: [],
      disabled: false
    };
  },
  mounted() {
    //  this.chakehu();
    this.getType();
    this.getSalers();
  },
  methods: {
    showKeybord() {
      //		console.log(document.getElementsByClassName("salerForm")[0].scrollTop)
      //		document.getElementsByClassName("salerForm")[0].scrollTop ="300px"
    },
    handleSelect(item) {
      this.addDataUser.userId = item.userId;
      this.addDataUser.userName = item.userName;
      //    this.choose = item;
      // this.ruleForm.options = item.companyName
      // this.ruleForm.optionsId = item.id
    },
    querySearch(queryString, cb) {
      console.log(queryString);
      console.log(this.restaurants);
      var restaurants = this.restaurants;
      // console.log(this.restaurants)
      // console.log(this.createFilter(queryString))
      var results =
        queryString.length > 0
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        // console.log(restaurant)
        return (
          restaurant.userName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    returnZero(a) {
      if (a == "") {
        return -1;
      } else {
        return a;
      }
    },
    addCustomer() {
      this.addData = Object.assign(this.addData, this.addDataUser, {});
      if (
        this.addData.customerName &&
        this.addData.userName &&
        this.addData.customerTargetMoney
      ) {
        var _router = this.$router;
        this.disabled = true;
        addCustomer(this.addData)
          .then(res => {
            console.log(res);
            if (res && res.code == 200) {
              this.$message.success({ message: "添加成功" });
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            } else if (res && res.code != 200) {
              this.$message.error(res.msg);
              this.disabled = false;
            } else {
              this.$message.error("添加失败");
              this.disabled = false;
            }
          })
          .catch(error => {
            this.$message.error("添加失败");
            this.disabled = false;
          });
      } else {
        this.$message.error("客户、今年目标额、负责销售为必填项");
      }
    },
    getSalers() {
      salers({ userid: localStorage.getItem("userid") }).then(res => {
        if (res.code == 200 && res.dataList) {
          this.salerOptions = this.salerOptions.concat(res.dataList);
          //  			this.restaurants = res.dataList;
        }
      });
    },
    getType() {
      customerTag({ userid: localStorage.getItem("userid") }).then(res => {
        if (res.code == 200 && res.dataList) {
          this.tagSourceOptions = this.tagSourceOptions.concat(res.dataList);
          if (this.tagSourceOptions.length)
            this.$set(
              this.addData,
              "tagSource",
              this.tagSourceOptions[0].source
            );
        }
      });
    },
    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          console.log(res);
          if (res && res.code == 200) {
            this.restaurants = res.dataList;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.el-scrollbar {
  display: block !important;
}
</style>