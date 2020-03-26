<template>
  <div :class="is_hide?'qu_box wrapper qu_overflow_hide':'qu_box wrapper' " style="font-size:14px;text-align:left;max-width:850px;margin:0 auto;">
    <img class="qu_head_bg" :src="wjdc_head_bg" alt />
    <div class="qu_head_tabs">
      <div class="qu_head_tab_a">
        <div class="qu_head_tab_bg">
          <h3>{{this.depList.company_name}}</h3>
          <p>客户名称</p>
        </div>
      </div>
      <div class="qu_head_tab_a">
        <div class="qu_head_tab_bg">
          <h3>{{this.depList.user_name}}</h3>
          <p>归属销售</p>
        </div>
      </div>
      <div class="qu_head_tab_a">
        <div class="qu_head_tab_bg">
          <h3>{{this.depList.leader_name}}</h3>
          <p>归属Leader</p>
        </div>
      </div>
    </div>
    <div v-if="!drop" class="qu_daohang" @click="changeDrop">
      <span class="qu_daohang_a">
        <i class="el-icon-s-promotion qu_daohang_a_icon"></i>快速导航
      </span>
    </div>
    <div class="qu_ks_fixed" v-show="drop" @click="dropcancel">
      <div class="qu_ks_box">
        <div
          v-for="(item,index) in dropList.depttypes"
          :key="'ks'+index"
          :class="item.result==activeName?'qu_ks_bg active':'qu_ks_bg'"
          @click="dropchangetabs(item.result)"
        >
          <p class="qu_ks_list clearfix">
            <span class="fl">{{item.result}}</span>
            <span class="fr">
              <span class="qu_ks_color">{{Math.floor(item.wcd*100)}}%</span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </p>
        </div>
        <i class="el-icon-circle-close qu_ks_close"></i>
      </div>
    </div>
    <div v-for="(item,index) in depList.depttypes"
        :key="index">
      <p class="qu_tabs_title" v-if="activeName==item.result">{{item.result}}</p>
      <Xiaoshou
          :customerId="$route.query.company_id"
          :tagSource="item.source"
          :customerName="depList.company_name"
          v-if="activeName==item.result"
        ></Xiaoshou>
    </div>
    <!-- <el-tabs class="qu_tabs" ref="qu_tabs" v-model="activeName">
      <el-tab-pane
        v-for="(item,index) in depList.depttypes"
        :key="index"
        :label="item.result"
        :name="item.result"
      >
        <Xiaoshou
          :customerId="$route.query.company_id"
          :tagSource="item.source"
          :customerName="depList.company_name"
          v-if="activeName==item.result"
        ></Xiaoshou>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import { wqtopinfo } from "@/api/config";

import Xiaoshou from "./xiaoshou";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName:"部门销售工作",
      customer: "",
      depList: {},
      dropList: {},
      wjdc_head_bg: require("../../assets/wjdc_head_bg.png"),
      drop: false
    };
  },
  computed: {
    ...mapState({is_hide:state=>state.param.is_hide})
  },
  components: {
    Xiaoshou
  },
  // watch: {
  //   activeName(newval, oldval) {
  //     localStorage.setItem("activeName", newval);
  //   }
  // },
  mounted() {
    // 滚动
    console.log('ss',this.is_hide);
    // this.jtHandleScroll();
    // window.addEventListener("scroll", this.jtHandleScroll);
    // 接口请求
    wqtopinfo({
      customerId: this.$route.query.company_id,
      userId: localStorage.getItem("userid")
    }).then(res => {
      if (res.msg == "success") {
        this.depList = res.data;
      } else {
        this.$message.error({ message: `${res.msg}` });
      }
    });
  },
  methods: {
    changeDrop() {
       this.drop = true;
     
      wqtopinfo({
        customerId: this.$route.query.company_id,
        userId: localStorage.getItem("userid")
      }).then(res => {
        if (res.msg == "success") {
          this.dropList = res.data;
        } else {
          this.$message.error({ message: `${res.msg}` });
        }
      });
    },
    dropcancel() {
      this.drop = false;
    },
    dropchangetabs(activeName) {
      // console.log(0);
      this.$nextTick(()=>{
                  this.drop = false;
                })
      
      this.activeName = activeName;
    }

    // jtHandleScroll() {
    //   var scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // var h =
    //   //   document.documentElement.clientHeight || document.body.clientHeight;
    //   let topH = this.$refs.qu_tabs.$el.offsetTop;
    //   // console.log(topH);
    //   if (scrollTop >= topH) {
    //     // this.searchBarFixed = true;
    //     console.log(1);
    //   } else {
    //     console.log(2);
    //     // this.searchBarFixed = false;
    //   }
    // },
  }
};
</script>

<style scoped>
.qu_overflow_hide{
  overflow: hidden;
}
.qu_tabs_title{
  line-height: 16px;
  margin:20px 12px;
  color: #000;
  font-size: 16px;
  padding-left: 10px;
  border-left:2px solid #409EFF ;
}
.qu_ks_close {
  font-size: 37px;
  margin: 10px 0 0 70px;
  color: #fff;
}
.qu_ks_fixed {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
}
.qu_ks_box {
  position: absolute;
  bottom: 120px;
  width: 180px;
  right: 0;
}
.qu_ks_bg {
  background: #fff;
  border-left: 2px solid #fff;
}
.qu_ks_bg.active {
  border-left: 2px solid #409eff;
  background: #ebf5ff;
}
.qu_ks_list {
    line-height: 30px;
   padding: 6px 4px 3px 0;
    margin: 0px 0 0 10px;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
}
.qu_ks_list i {
  color: #999;
}
.qu_ks_list span{
  display: inline-block;
}
.qu_ks_color {
  color: #409eff;
}
.qu_daohang_a_icon {
  background: #409eff;
  border-radius: 50%;
  padding: 2px;
  margin-right: 2px;
  color: #fff;
}
.qu_daohang {
  position: fixed;
  right: 0;
  top: 80%;
  padding: 2px 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #f1f1f1;
  z-index: 1002;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  color: #409eff;
  font-size: 14px;
  line-height: 30px;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
}
.qu_head_bg {
  width: 100%;
  display: block;
}
.qu_head_tabs {
  padding: 10px 6px 0;
}
.qu_head_tab_bg {
  padding: 8px 10px;
  background: #fafafa;
  margin: 0 6px;
  border-radius: 4px;
}

.qu_head_tab_a {
  width: 30%;
}
.qu_head_tab_a:first-child {
  width: 40%;
}

.qu_head_tab_a h3 {
  font-size: 15px;
  color: #333;
  font-weight: normal;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.qu_head_tab_a p {
  font-size: 13px;
  color: #666;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.qu_head_tabs {
  display: flex;
}
.ggDc_hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.qu_open_bi {
  color: red;
}
.qu_open_box {
  padding: 0 10px;
}
.qu_open_a {
  margin: 5px 0;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  position: relative;
}
.qu_open_a1 {
  width: 72px;
  text-align: right;
  position: absolute;
  left: 0;
  top: 0;
}
.qu_open_a2 {
  margin-left: 75px;
}
.qu_ke_a1 {
  text-align: right;
  width: 120px;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
}
.qu_ke_a2 {
  margin-left: 125px;
}
.qu_body {
  font-size: 14px;
  line-height: 24px;
  text-align: left;
}
/* .qu_box {
  padding: 20px 0px 10px;
} */
.qu_head {
  text-align: center;
  padding: 0px 0 10px;
}
.qu_head h3 {
  font-size: 17px;
  color: #333;
  font-weight: normal;
  line-height: 30px;
}
.qu_head p {
  font-size: 13px;
  color: #999;
  line-height: 16px;
}
</style>