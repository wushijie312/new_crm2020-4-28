<template>
  <div class="wrapper" id="customlist" ref="customlist" style="font-size:14px;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="qu_box wrap850">
      <div class="qu_cuHead">
        <el-input size="small" class="qu_cuHead_search" v-model="keyword" placeholder="请输入内容"></el-input>
        <i
          @click="searchListHandel"
          class="el-icon-search qu_cuHead_icon"
          style="color: rgb(153, 153, 153);position: absolute;right: 15px;top: 16px;font-size: 20px;width: 32px;"
        ></i>
      </div>
      <div class="qu_bmBox qu_bupc">
        <div class="qu_bmSearch">
          <div class="qu_bmSearch_a">部门：</div>
          <div class="qu_bmSearch_b">
            <span
              @click="bmSelectHandel(item, index)"
              :class="item.is_act? 'qu_bmleft act':'qu_bmleft'"
              v-for="(item,index) in departList"
              :key="index"
            >{{item.departmentName}}</span>
          </div>
        </div>
        <div class="qu_bmSearch bordertop1">
          <div class="qu_bmSearch_a">客户类型：</div>
          <div class="qu_bmSearch_b">
            <span
              @click="khSelectHandel(item, index)"
              :class="item.is_act? 'qu_bmleft act':'qu_bmleft'"
              v-for="(item,index) in khtags"
              :key="index"
            >{{item.result}}</span>
          </div>
        </div>
      </div>
      <div class="qu_bumobile">
        <div class="fl qu_bmmobile_b">筛选：</div>
        <div class="fr clearfix">
          <div class="qu_bmmobile_a fl">
            <el-select
              :class="kehu_act?'qu_bmmobile_select act':'qu_bmmobile_select'"
              v-model="level"
              @visible-change="kehuSelectChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in khtags"
                :key="item.result"
                :label="item.result"
                :value="item.result"
              ></el-option>
            </el-select>
          </div>
          <div class="qu_bmmobile_a fl">
            <el-select
              :class="bumen_act?'qu_bmmobile_select act':'qu_bmmobile_select'"
              @visible-change="bumenSelectChange"
              v-model="dept_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in departList"
                :key="item.departmentName"
                :label="item.departmentName"
                :value="item.departmentId"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="padd_b30">
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
      <div :class="is_totheend?'to_the_end act':'to_the_end'">已经到底了</div>
    </div>
  </div>
</template>
<script>
// import BScroll from "better-scroll";
import Head from "@/view/common/head";
import { wqcustomers, wqdepart, wqtags } from "@/api/config";
export default {
  name: "index",
  components: {
    Head
  },
  data() {
    return {
      is_totheend: false,
      level: "全部客户",
      dept_id: "全部部门",
      right_new: require("../../assets/img/normal/right_new.png"),
      customList: [],
      keyword: "",
      act: 2,
      act1: true,
      page: 1,
      pageSize: 30,
      loading: true,
      departList: [],
      khtags: [],
      kehu_act: false,
      bumen_act: false
    };
  },
  mounted() {
    this.getcust(this.page);
    this.getact();
    //
    window.addEventListener("scroll", this.scrollBottom, true);
    // 获取部门
    wqdepart().then(res => {
      if (res.msg == "success") {
        this.departList = res.dataList;
        this.departList.unshift({ departmentName: "全部部门", is_act: true });
      }
    });
    // 获取标签
    wqtags().then(res => {
      //  console.log(res);
      if (res.msg == "success") {
        this.khtags = res.data;
        this.khtags.unshift({ result: "全部客户", is_act: true });
      }
    });
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollBottom, true);
  },
  methods: {
    khSelectHandel(row, len) {
      this.khtags.map((item, index) => {
        if (item.result == row.result) {
          item.is_act = !row.is_act;
          this.level = row.result;
          // this.$set(this.khtags, len, row);
        } else {
          item.is_act = false;
        }
      });
      this.searchListHandel();
    },
    bmSelectHandel(row, len) {
      this.departList.map((item, index) => {
        if (item.departmentId == row.departmentId) {
          item.is_act = !row.is_act;
          this.dept_id = row.departmentId;

          // this.$set(this.departList, len, row);
        } else {
          item.is_act = false;
        }
      });
      this.searchListHandel();
    },
    kehuSelectChange(val) {
      this.kehu_act = val;
      if (!val) {
        this.khSelectHandel({ result: this.level });
        // this.searchListHandel();
      }
    },
    bumenSelectChange(val) {
      this.bumen_act = val;
      if (!val) {
        this.bmSelectHandel({ departmentId: this.dept_id });
        // this.searchListHandel();
      }
    },

    getcust(page) {
      // 接口请求
      return wqcustomers({
        userId: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        keyword: this.keyword,
        pageSize: this.pageSize,
        page: page,
        dept_id: this.dept_id == "全部部门" ? "" : this.dept_id,
        level: this.level == "全部客户" ? "" : this.level
      }).then(res => {
        if (res.code == "200") {
          if (this.page == 1) {
            this.customList = res.data;
          } else {
            this.loading = true;
            this.customList = this.customList.concat(res.data);
          }
        } else {
          this.$message.error({ message: `${res.msg}` });
        }
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
      if (
        toBottom < clientHeight / 2 &&
        this.loading &&
        this.customList.length == this.pageSize * this.page
      ) {
        this.loading = false;
        this.getcust(++this.page);
      }
      // 加载到所有数据底部提示
      if (
        toBottom <= 0 &&
        this.loading &&
        this.customList.length < this.page * this.pageSize
      ) {
        this.is_totheend = true;
      } else {
        this.is_totheend = false;
      }
    },
    searchListHandel() {
      this.page = 1;
      // 接口请求
      wqcustomers({
        userId: localStorage.getItem("userid"),
        role: localStorage.getItem("role"),
        keyword: this.keyword,
        pageSize: this.pageSize,
        page: this.page,
        dept_id: this.dept_id == "全部部门" ? "" : this.dept_id,
        level: this.level == "全部客户" ? "" : this.level
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
.qu_bmmobile_b{
  color:#545454;
}
.qu_bmmobile_select {
  width: 120px;
  right:-10px;
}
.qu_bupc {
  display: none;
}

.qu_bumobile {
  height: 38px;
  background: #fff;
  margin-bottom: 8px;
  padding: 0 15px;
  line-height: 38px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  line-height: 14px;
  padding: 12px 0;
  display: block;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.qu_bmBox {
  padding: 9px 12px 8px;
  background: #fff;
  margin-bottom: 8px;
}
.qu_bmSearch {
  position: relative;
  padding: 9px 0px 8px;
  text-align: left;
}
.qu_bmSearch_a {
  position: absolute;
  line-height: 28px;
  color: #333;
  font-size: 14px;
  width: 80px;
}
.qu_bmSearch_b {
  margin-left: 75px;
  line-height: 28px;
  color: #595959;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
}
.qu_bmSearch_b span {
  min-width: 99px;
  margin: 0 22px;
  cursor: pointer;
}
.qu_bmSearch_b span.act,
.qu_bmSearch_b span:hover {
  color: #409eff;
}
/* .qu_bmleft:nth-child(5n),
.qu_bmSearch_b span:first-child {
  margin-left: 0;
} */

.bordertop1 {
  border-top: 1px solid #f0f0f0;
}

.qu_cu_a {
  width: 80%;
  margin-top: 3px;
}
.qu_cuHead {
  padding: 10px 12px 0;
  background: #fff;
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
@media screen and (min-width: 850px) {
  .qu_bupc {
    display: block;
  }
  .qu_bumobile {
    display: none;
  }
}
.qu_cu_b {
  padding-top: 4px;
}
</style>