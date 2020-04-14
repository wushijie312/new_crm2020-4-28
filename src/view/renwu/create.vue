<template>
  <div style="font-size:0.3rem;">
    <h3 v-show="status" style="line-height:1rem;">转发任务</h3>
    <h3 v-show="!status" style="line-height:1rem;">新建任务</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="客户名称" prop="options">
        <el-col :span="20">
          <!-- <el-select style="width:100%;" v-model="ruleForm.options" placeholder="请选择活动区域"> -->
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.options"
            :fetch-suggestions="querySearch"
            placeholder="请客户名称"
            @select="handleSelect"
            value-key="companyName"
            style="width:100%;"
          ></el-autocomplete>
          <!-- </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="选择类型" required>
        <el-col :span="20">
          <el-select v-model="ruleForm.tagcode" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in optionsCs"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-col :span="20">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="任务内容" prop="desc">
        <el-col :span="20">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发送给" prop="desc">
        <el-col :span="20">
          <div
            v-for="(item,index) in list"
            :key="index"
            style="width:1.5rem;float:left;text-align:center;"
          >
            <div v-if="item.name==='点击添加'">
              <img
                style="width:1rem;height:1rem;display:block;margin:0 auto;border-radius:50%;"
                @click="addpeo"
                :src="item.url"
                alt
              />
              <!-- <i style="width:1rem;height:1rem;display:block;" v-show="item.name=='点击添加'" :class="item.url"></i> -->
              <p>{{item.name}}</p>
            </div>
            <div v-if="item.name!='点击添加'">
              <img
                style="width:1rem;height:1rem;display:block;margin:0 auto;border-radius:50%;"
                @click="removePeo(index)"
                :src="item.url"
                alt
              />
              <!-- <i style="width:1rem;height:1rem;display:block;" v-show="item.name=='点击添加'" :class="item.url"></i> -->
              <p>{{item.name}}</p>
            </div>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="负责人" prop="desc" v-show="!status">
        <el-col :span="20">
          <div
            v-for="(item,index) in list1"
            :key="index"
            style="width:1.5rem;float:left;text-align:center;"
          >
            <div v-if="item.name==='点击添加'">
              <img
                style="width:1rem;height:1rem;display:block;margin:0 auto;border-radius:50%;"
                @click="addpeo1"
                :src="item.url"
                alt
              />
              <!-- <i style="width:1rem;height:1rem;display:block;" v-show="item.name=='点击添加'" :class="item.url"></i> -->
              <p>{{item.name}}</p>
            </div>
            <div v-if="item.name!='点击添加'">
              <img
                style="width:1rem;height:1rem;display:block;margin:0 auto;border-radius:50%;"
                @click="removePeo1(index)"
                :src="item.url"
                alt
              />
              <!-- <i style="width:1rem;height:1rem;display:block;" v-show="item.name=='点击添加'" :class="item.url"></i> -->
              <p>{{item.name}}</p>
            </div>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{status?'立即转发':'立即创建'}}</el-button>
        <el-button @click="()=>{this.$router.go(-1)}">返回</el-button>
      </el-form-item>
    </el-form>

    <contact :show.sync="dialogClient" @confirm="clientConfirm" />
    <contact :show.sync="dialogClient1" @confirm="clientConfirm1" />
  </div>
</template>

<script>
import contact from "@/components/choose";

import { createRw, chakehu, getPersonInfo } from "@/api/configWu";
export default {
  components: {
    contact
  },
  data() {
    return {
      socode: "",
      optionsCs: [
        { label: "帮助", value: 1 },
        { label: "任务", value: 3 },
        { label: "建议", value: 2 }
      ],
      restaurants: [],
      status: false,
      list: [
        { url: require("../../assets/img/normal/add.png"), name: "点击添加" }
      ],
      list1: [
        { url: require("../../assets/img/normal/add2.png"), name: "点击添加" }
      ],
      dialogClient: false,
      dialogClient1: false,
      options: [],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        options: "",
        optionsId: "",
        tagcode: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: ["blur", "change"]
          }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写任务内容", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.chakehu();
  },
  methods: {
    handleSelect(item) {
      this.ruleForm.options = item.companyName;
      this.ruleForm.optionsId = item.id;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
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

    submitForm() {
      var toUser = "",
        tozhu = "";
      this.list.forEach((e, index) => {
        if (index <= this.list.length - 2) {
          toUser += e.id + ",";
        }
      });
      this.list1.forEach((e, index) => {
        if (index <= this.list1.length - 2) {
          tozhu += e.id + ",";
        }
      });
      var socode = this.gettypezhi(this.ruleForm.tagcode);
      var senddata = {
        create_id: localStorage.getItem("userid"),
        to_user_id: toUser,
        look_user_id: tozhu,
        msginfo: this.ruleForm.desc,
        end_time: this.ruleForm.date1,
        customerid: this.ruleForm.optionsId,
        customername: this.ruleForm.options,
        tagcode: this.socode
      };
      if (this.$route.query.line_code) {
        senddata = {
          create_id: localStorage.getItem("userid"),
          to_user_id: toUser,
          look_user_id: tozhu,
          msginfo: this.ruleForm.desc,
          end_time: this.ruleForm.date1,
          customerid: this.ruleForm.optionsId,
          customername: this.ruleForm.options,
          line_code: this.$route.query.line_code,
          tagcode: this.socode
        };
      }

      if (
        senddata.to_user_id.length > 0 &&
        senddata.end_time &&
        senddata.msginfo
      ) {
        createRw(senddata).then(res => {
          if (res.code == 200) {
            this.$message.success("创建成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      }
    },
    addpeo() {
      this.dialogClient = true;
    },
    addpeo1() {
      this.dialogClient1 = true;
    },
    removePeo(e) {
      this.list.splice(e, 1);
    },
    removePeo1(e) {
      this.list1.splice(e, 1);
    },
    clientConfirm(node) {
      var box = true;
      this.list.forEach(e => {
        if (e.id == node.id) {
          box = false;
        }
      });
      if (node.id != "" && box) {
        this.list.unshift(node);
      }
    },
    clientConfirm1(node) {
      var box1 = true;
      this.list1.forEach(e => {
        if (e.id == node.id) {
          box1 = false;
        }
      });
      if (node.id != "" && box1) {
        this.list1.unshift(node);
      }
    },
    chushi() {
      if (this.$route.query.line_code) {
        this.status = true;
        this.ruleForm.options = this.$route.query.customerName;
        this.ruleForm.id = this.$route.query.customerid;
        this.ruleForm.date1 = this.$route.query.end_time;
        this.ruleForm.tagcode = this.$route.query.tagname;
      } else if (true) {
        if (this.$route.query.userid) {
          getPersonInfo({ dingdingId: this.$route.query.userid }).then(res => {
            this.list.unshift({
              url: res.data[0].avatar,
              name: res.data[0].name,
              id: res.data[0].dingdingId
            });
            if (res.data[0].leader_avatar) {
              this.list1.unshift({
                url: res.data[0].leader_avatar,
                name: res.data[0].leader_name,
                id: res.data[0].leader_id
              });
            }
          });
          if (this.$route.query.customerId && this.$route.query.userid) {
            this.ruleForm.options = this.$route.query.customerName;
            this.ruleForm.optionsId = this.$route.query.customerId;
          }
        } else if (this.$route.query.customerId) {
          getPersonInfo({ customerId: this.$route.query.customerId }).then(
            res => {
              this.list.unshift({
                url: res.data[0].avatar,
                name: res.data[0].name,
                id: res.data[0].dingdingId
              });
              this.list1.unshift({
                url: res.data[0].leader_avatar,
                name: res.data[0].leader_name,
                id: res.data[0].leader_id
              });
            }
          );
          this.ruleForm.options = this.$route.query.customerName;
          this.ruleForm.optionsId = this.$route.query.customerId;
        }
      }
    },
    gettypezhi(a) {
      this.optionsCs.forEach(e => {
        if (e.label == a) {
          this.socode = e.value;
        }
      });
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