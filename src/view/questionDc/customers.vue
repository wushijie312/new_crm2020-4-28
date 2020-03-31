<template>
  <div class="wrapper" id="customlist" ref="customlist" style="font-size:14px;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="qu_box wrap850" >
        <div class="qu_cuHead">
          <el-input size="small" class="qu_cuHead_search" v-model="keyword" placeholder="请输入内容"></el-input>
          <i
            @click="searchListHandel"
            class="el-icon-search qu_cuHead_icon"
            style="    color: rgb(153, 153, 153);position: absolute;right: 15px;top: 16px;font-size: 20px;width: 32px;"
          ></i>
        </div>
        <div
          class="qu_cuList clearfix"
          v-for="(item,index) in customList"
          ref="chatContainer"
          :key="index"
          @click="gotoDCWJ(item)"
        >
          <img v-if="item.shownew" class="qu_cu_right_new" :src="right_new" alt />
          <div class="qu_cu_a fl">
            <h3 class="qu_cuList_a">{{item.companyName}}</h3>

            <p class="qu_cuList_b">{{item.department_name}}（{{item.user_name}}）</p>
          </div>
          <div class="qu_cu_b fr">
            <el-progress
              class="qu_pro_jd"
              :stroke-width="2"
              :width="40"
              type="circle"
              :percentage="Math.floor(item.wcd*100)"
            ></el-progress>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
// import BScroll from "better-scroll";
import Head from "@/view/common/head";
import { wqcustomers } from "@/api/config";
export default {
  name: "index",
  components: {
    Head
  },
  data() {
    return {
      right_new: require("../../assets/img/normal/right_new.png"),
      customList: [],
      keyword: "",
      act: 2,
      act1: true,
      page: 1,
      loading: true
    };
  },
  mounted() {
    this.getcust(this.page).then(res => {
      if (res.code == "200") {
        this.customList = res.data;
      } else {
        this.$message.error({ message: `${res.msg}` });
      }
    });
    this.getact();
    //
    window.addEventListener("scroll", this.scrollBottom, true);
  },
  methods: {
    getcust(page) {
      // 接口请求
      return wqcustomers({
        userId: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        keyword: this.keyword,
        pageSize: 30,
        page: page
      });
    },
    scrollBottom() {
      // 滚动到页面底部时
      // const el = document.getElementById("customlist");
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      const toBottom = scrollHeight - scrollTop - clientHeight;
      if (toBottom < 10 && this.loading) {
        this.loading = false;
        this.getcust(++this.page).then(res => {
          if (res.code == 200) {
            this.loading = true;
            for (var i in res.data) {
              this.customList.push(res.data[i]);
            }
          } else {
            this.$message.error({ message: `${res.msg}` });
          }
        });
      }
    },
    searchListHandel() {
      // 接口请求
      wqcustomers({
        userId: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        keyword: this.keyword
      }).then(res => {
        if (res.code == "200") {
          this.customList = res.data;
        } else {
          this.$message.error({ message: `${res.msg}` });
        }
      });
    },
    gotoDCWJ(item) {
      this.$router.push({
        path: "/wjdc",
        query: {
          company_id: item.id,
          customerName: item.companyName,
          disabled: true
        }
      });
    },
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("leaderMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/baifang") {
          this.act = index + 1;
        }
      });
    }
  }
};
</script>
<style scoped>
.qu_cu_a {
  width: 80%;
  margin-top: 3px;
}
.qu_cuHead {
  padding: 10px 12px;
  background: #fff;
  border-bottom: 8px solid #f1f1f1;
  position: relative;
}
.qu_cuHead input {
  background: #f3f3f3;
  color: #999;
}

.qu_cuList {
  text-align: left;
  padding: 10px 12px;
  background: #fff;
  border-bottom: 8px solid #f9f9f8;
  position: relative;
}
.qu_cu_right_new {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 20px;
}
.qu_cuList .qu_cuList_a {
  font-weight: normal;
  line-height: 24px;
  font-size: 15px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.qu_cuList .qu_cuList_b {
  font-weight: normal;
  line-height: 18px;
  font-size: 13px;
  color: #999;
}
.qu_cu_b {
  padding-top: 4px;
}
</style>