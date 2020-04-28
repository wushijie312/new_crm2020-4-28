<template>
  <div>
    <transition name="el-zoom-in-center">
      <el-form ref="form" label-width="100px" style="padding:0.3rem;">
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
        <el-form-item label="今日完成" required>
          <el-input
            placeholder="请输入今日完成"
            v-model="input10"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
            type="number"
            :max="1000"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预估毛利率" required>
          <el-input
            placeholder="请输入预估毛利率"
            v-model="input11"
            clearable
            style="width:98%;margin:0.05rem auto;"
            type="number"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="TB线索">
          <el-input
            placeholder="请输入TB线索"
            v-model="input101"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
            type="number"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="本月开标">
          <el-input
            placeholder="请输入本月开标"
            v-model="input102"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
            type="number"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="本月中标">
          <el-input
            placeholder="请输入本月中标"
            v-model="input103"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
            type="number"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="中标未下单金额">
          <el-input
            placeholder="请输入中标未下单金额"
            v-model="input106"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
            type="number"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="丢标金额">
          <el-input
            placeholder="请输入本月丢标金额"
            v-model="input104"
            clearable
            style="width:98%;margin:0 auto;position:relative;"
            type="number"
          >
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="丢标原因">
          <el-input
            placeholder="请输入丢标原因"
            v-model="input105"
            clearable
            style="width:98%;margin:0.05rem auto;position:relative;"
          ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="adddata">添加</el-button>
          <el-button type="info" @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </transition>
    <Ok v-if="is_ok" style="font-size:14px;" tit="添加成功" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { chakehu } from "@/api/configWu";
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
      input106: "",
      choose: {},
      isdz: true,
      sendData: {
        dayMoney: "",
        grossProfit: "",
        customerId: "",
        customerName: "",
        tbClueMoney: "",
        openTenderMoney: "",
        getTenderMoney: "",
        loseTenderMoney: "",
        loseTenderReason: ""
      },
      options: [],
      shengs: [],
      shis: [],
      gxtprys: []
    };
  },
  computed: {
    ...mapState({
      is_ok: state => state.param.is_ok
    })
  },
  mounted() {
    this.chakehu();
  },
  methods: {
    ...mapMutations(["TIP_SURE"]),

    handleSelect(item) {
      // console.log(this.ruleForm.options)
      console.log(item);
      this.choose = item;
      // this.ruleForm.options = item.companyName
      // this.ruleForm.optionsId = item.id
    },
    querySearch(queryString, cb) {
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
          restaurant.companyName
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
    adddata() {
      if (this.input10 && this.input11 && this.choose.id) {
        adddata({
          dayMoney: this.input10,
          grossProfit: this.input11,
          customerId: this.choose.id,
          customerName: this.choose.companyName,
          tbClueMoney: this.returnZero(this.input101),
          openTenderMoney: this.returnZero(this.input102),
          getTenderMoney: this.returnZero(this.input103),
          loseTenderMoney: this.returnZero(this.input104),
          loseTenderReason: this.input105,
          getTenderNotMoney: this.returnZero(this.input106)
        }).then(res => {
          if (res.code == 200) {
            this.TIP_SURE(true);
            var timer = setTimeout(() => {
              this.TIP_SURE(false);
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        this.$message.error("客户、今日完成、预估毛利率为必填项");
      }
    },
    chakehu() {
      chakehu({ role: "" })
        .then(res => {
          this.restaurants = res.data;
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
</style>