<template>
  <div>
    <!-- 新加 start-->
    <div
      style="position:fixed;height:50px;width:100%;left:0;top:0px;border-top: 5px solid #f1f1f1;z-index:1001;background:#fff;border-bottom: 1px solid #f1f1f1;"
    >
      <div style="position:relative; height:50px;">
        <div
          class="clearfix"
          style="font-size: initial;position: absolute;top: 18px;left: 15px;text-align: left;display: inline-block;"
          @click="dialogChange"
        >
          <img class="fl" :src="head_menu" style="width:14px;display:block;margin-right:2px;" />
          <span
            class="fl"
            style="font-size: 14px;line-height: 16px;display: block;color: #409eff;"
          >菜单</span>
        </div>
        <div
          v-if="!ty && (act==1||act==2)"
          style="position:absolute;top:18px;right:15px;line-height:14px;font-size:14px;"
        >
          <router-link
            :to="{path:act==1?'/xsleader':'/baifang'}"
            style="width:100%;display:block;color:black;text-decoration:none"
          >切换至leader版</router-link>
        </div>
        <div
          v-show="ty && (act==1||act==2)"
          style="position:absolute;top:18px;right:15px;line-height:14px;font-size:14px;"
        >
          <router-link
            :to="{path:act==1?'/xiaoshou1':'/baifang1'}"
            style="width:100%;display:block;color:black;text-decoration:none"
          >切换至销售版</router-link>
        </div>
      </div>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="dialog"
      direction="ltr"
      class="menu-drawer"
      custom-class="menu-drawer-1"
      :with-header="false"
      :before-close="dialoghandleClose"
      size="250px"
    >
      <div class="demo-drawer__content" style="padding:15px 0 0 0;text-align:left;">
        <el-menu
          :default-active="$route.fullPath=='/'?'/xiaoshou1':$route.fullPath"
          class="el-menu-vertical-demo"
          text-color="#333"
          active-text-color="#3face8"
          router
          @select="dialoghandleClose"
        >
          <!-- 一级菜单 -->
          <template v-for="item in !ty?userMenus:leaderMenus">
            <el-menu-item v-if="!item.menus" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title" style="position:relative;">
                  <img
                    v-show="item.isshow"
                    :src="newPic"
                    alt
                    style="position:absolute;top: 4px;right: -24px;width: 24px;"
                  />
                  {{item.source}}
                  <span
                    v-show="isread&&item.source=='我的派单'"
                    class="un_read"
                  ></span>
                </span>
              </template>
            </el-menu-item>
            <Submenu v-else :menu-info="item" :key="item.name" :isread="isread" />
          </template>
        </el-menu>
      </div>
      <div 
      @click="gobackHome"
        style="outline: none;background:#fff;text-decoration: none;borderTop:1px solid #eee;padding:15px 0; text-align:center;line-height:20px;fontSize:16px;color:#3face8;display: block;position: absolute;width: 100%;bottom: 0;"
      >
        <img
          :src="back_home"
          style="width: 14px;line-height: 20px;padding-right: 5px;vertical-align:top;display: inline-block;"
        />返回首页
      </div>
    </el-drawer>

    <!-- 新加 -->
    <div class="js" style="position:relative;top:55px;" v-show="iszhanshi&&gdlist.length>0">
      <div style="position:absolute;right:0.1rem;z-index:1;" @click="guanbi">
        <img :src="ygb" style="height:0.5rem;" alt />
      </div>
      <el-carousel
        direction="vertical"
        :autoplay="true"
        style="height:100%;"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item,index) in gdlist" :key="index">
          <h3
            @click="tiaozhuan(item.url)"
            class="medium"
            style="text-align:left;posiiton:relative;width:100%;display:block;color:red;padding-left:0.8rem;"
          >
            <img :src="xlb" style="height:0.5rem;position:absolute;left:0.2rem;" alt />
            {{item.msg }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { pathshow, noticeshow, closenotice } from "@/api/config";
import { getisread } from "@/api/configWu";
import Submenu from "./Submenu";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "headers",
  props: ["act", "ty"],
  data() {
    return {
      dialog: false,
      span: 6,
      tzshow: false,
      isread: false,
      ty1: true,
      iszhanshi: true,
      input: "",
      userMenus: [],
      leaderMenus: [],
      gdlist: [],
      yhd: require("../../assets/img/normal/yhd.png"),
      mhd: require("../../assets/img/normal/mhd.png"),
      ygb: require("../../assets/img/normal/gb.png"),
      newPic: require("../../assets/img/normal/new.png"),
      xlb: require("../../assets/img/normal/xlb.png"),
      back_home: require("../../assets/img/normal/back_home.png"),
      head_menu: require("../../assets/img/normal/menu.png"),
      leftshow: false
      // ty:true
    };
  },
  components: {
    Submenu
  },
  computed: {
    ...mapGetters(["menus"])
  },
  mounted() {
    this.getisread();
    this.pathshow();
    this.noticeshow();
  },
  watch: {
    // $route(){

    // },
    ty() {
      console.log(this.ty);
    }
  },

  methods: {
    gobackHome(){
     this.dialoghandleClose();
     let url= !this.ty?'/xiaoshou1':'/xsleader';
     this.$router.push(url);
    },
    /***滑动限制***/
    stop() {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", this.monormal, { passive: false }); //禁止页面滑动
    },
    monormal(e) {
        e.preventDefault();
      },
    /***取消滑动限制***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", this.monormal, { passive: false });
    },
    ...mapMutations(["CHANGE_OVERFLOW_HIDE"]),
    dialogChange() {
      this.dialog = true;
      this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
    },
    dialoghandleClose() {
      this.dialog = false;
      this.move();
      this.CHANGE_OVERFLOW_HIDE(false);
    },
    tiaozhuan(a) {
      closenotice({ userid: localStorage.getItem("userid") }).then(res => {
        if (res.code == 200) {
          this.$router.push({ path: a });
        }
      });
    },
    noticeshow() {
      if (sessionStorage.getItem("iszhanshi")) {
        this.iszhanshi = false;
      } else {
        noticeshow({ userid: localStorage.getItem("userid") }).then(res => {
          if (res.code == 200) {
            this.gdlist = res.data;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    pathshow() {
      if (sessionStorage.getItem("iszhanshi")) {
        this.iszhanshi = false;
      }

      if (sessionStorage.getItem("userMenus")) {
        this.userMenus = JSON.parse(sessionStorage.getItem("userMenus"));
        this.leaderMenus = JSON.parse(sessionStorage.getItem("leaderMenus"));
      } else {
        pathshow().then(res => {
          if (res.code == 200) {
            res.data.forEach(e => {
              if (e.remark == "销售版") {
                this.userMenus.push(e);
              } else {
                this.leaderMenus.push(e);
              }
              console.log("wwww", this.userMenus, this.leaderMenus);
              sessionStorage.setItem(
                "userMenus",
                JSON.stringify(this.userMenus)
              );
              sessionStorage.setItem(
                "leaderMenus",
                JSON.stringify(this.leaderMenus)
              );
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    guanbi() {
      sessionStorage.setItem("iszhanshi", true);
      sessionStorage.setItem("isshouci", true);
      this.iszhanshi = false;
    },

    dianji() {
      this.$nextTick(() => {
        this.tzshow = !this.tzshow;
      });
    },
    getisread() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        this.isread = res.data.isread;
      });
    }
  }
};
</script>

<style  scoped>
.menu-drawer {
  font-size: 0.25rem;
}
.js {
  font-size: 0.24rem;
  line-height: 0.5rem;
  background: #fff8bf;
  height: 0.5rem;
  width: 98%;
  border-radius: 3px;
  margin: 0 auto;
}
.head {
  height: 1rem;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #21aefb;
  color: #fff;
}
.tap {
  font-size: 0.3rem;
  background: #21aefb;
  /* height: 0.7rem; */
  line-height: 0.7rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: middle;
  -ms-flex-align: middle;
  align-items: middle;
  overflow: auto;
  position: relative;
}
.tap > div {
  text-align: center;
  font-size: 16px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 0 10px;
}
.tap .act {
  background: #fff;
  color: #333;
}
.tap .act a {
  color: #333;
}
.tap a {
  color: #fff;
  text-decoration: none;
}
</style>