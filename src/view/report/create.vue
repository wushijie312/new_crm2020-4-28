<template>
  <div style="font-size:0.3rem;">
    <el-radio-group v-model="isCollapse" style="margin: 20px auto;">
      <el-radio-button v-for="(item,index) in formdata" :key="index" :label="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        v-for="(item,index) in zhandata.fileds"
        :key="index"
        :label="item.remark"
        v-if="item.dicttype=='nokong'"
        required
      >
        <el-col :span="20">
          <el-input type="textarea" v-model="item.value"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        v-for="(item,index) in zhandata.fileds"
        :key="index"
        :label="item.remark"
        v-if="item.dicttype=='kong'"
      >
        <el-col :span="20">
          <el-input type="textarea" v-model="item.value"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="附件">
        <el-col>
          <el-upload
            class="upload-demo"
            :action="action"
            :on-change="handleChange"
            :on-success="succFunc"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传5M以内，且不超过三个文件</div>
          </el-upload>
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
              <p>{{item.name}}</p>
            </div>
            <div v-if="item.name!='点击添加'">
              <img
                style="width:1rem;height:1rem;display:block;margin:0 auto;border-radius:50%;"
                @click="removePeo(index)"
                :src="item.url"
                alt
              />
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
    <Ok v-if="is_ok" style="font-size:14px;" tit="创建成功" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { createRw, chakehu, getPersonInfo } from "@/api/configWu";
import { templateshow, upload, dailycreate } from "@/api/config";
const Ok = () => import("@/components/ok");
const contact = () => import("@/components/choose");
export default {
  data() {
    return {
      sclist: [],
      action: upload(),
      fileList: [],
      isCollapse: "",
      zhandata: {},
      formdata: {},
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
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
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
  watch: {
    isCollapse(a) {
      this.zhandata = this.formdata[a];
    }
  },
  mounted() {
    this.chakehu();
  },
  components: {
    contact,
    Ok
  },
  computed: {
    ...mapState({
      is_ok: state => state.param.is_ok
    })
  },
  methods: {
    ...mapMutations(["TIP_SURE"]),

    succFunc(file, fileList, c) {
      this.sclist = c;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
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
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
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
      var senddata = {
        create_id: localStorage.getItem("userid"),
        to_user_id: toUser,
        msginfo: this.zhandata.name,
        mainjson: JSON.stringify({
          fileds: this.zhandata.fileds,
          sclist: this.sclist
        })
      };
      if (this.list.length > 1) {
        this.TIP_SURE(true);
        dailycreate(senddata).then(res => {
          if (res.code == 200) {
            var timer = setTimeout(() => {
              this.TIP_SURE(false);
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$message.error(res.msg);
            this.TIP_SURE(false);
          }
        });
      } else {
        this.$message.error("请选择接收人");
      }
    },
    addpeo() {
      this.dialogClient = true;
    },
    removePeo(e) {
      this.list.splice(e, 1);
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
      templateshow({})
        .then(res => {
          this.formdata = res.data;
          this.isCollapse = 0;
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
</style>