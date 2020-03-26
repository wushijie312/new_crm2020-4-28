<template>
  <div style="font-size:0.3rem;">
    <h3 style="position:relative;line-height:1rem;">
      <span style="position:absolute;left:0.5rem;" @click="goback">返回</span>任务详情
      <span style="position:absolute;right:0.5rem;" @click="qiehun">
        <span>时间</span>
        <img style="width:0.3rem;" :src="act==1?zx:fx" alt />

        <!-- <router-link :to="{path:'/create'}" style="width:100%;display:block;">新增</router-link> -->
      </span>
    </h3>
    <!-- <p style="text-align:right;line-height:0.6rem;">
      <span :class="act==1?'act':''" @click="qiehun(1)">时间正序</span>
      <span style="margin:0 0.3rem;" @click="qiehun(2)" :class="act==2?'act':''">时间倒序</span>
    </p>-->
    <div class="nrbo" v-for="(item,index) in datalist" :key="index" style="padding:0.2rem;">
      <h3 style="text-align:left;line-height:0.4rem;margin-bottom:0.2rem;font-size:0.24rem;">
        <span
          style="width:0.4rem;height:0.4rem;background:#3b99fd;border-radius:50%;float:left;text-align:center;color:#fff;line-height:0.4rem;"
        >{{act==1?index+1:datalist.length-index}}</span>
        &nbsp;{{item.create_time.slice(0,10)}}
      </h3>
      <div
        style="box-shadow: #ccc;width:90%;margin:0 auto;padding:0.2rem 0.2rem 0.4rem;box-shadow: 0px 0px 5px #888888;border-radius:5px;"
        :class="item.to_user_id ==userid?'myself':''"
      >
        <div style="overflow:hidden;width:100%;margin:0 auto;">
          <div class="left over" style="width:30%;">
            <img
              class="left"
              style="height:0.6rem;width:0.6rem;border-radius:50%;float:left;margin-top:0.05rem;margin-right:0.1rem;"
              :src="item.create_id_pic"
              alt
            />
            <div class="left" style="text-align:left;">
              <p>{{item.create_name}}</p>
              <p class="hui" style="font-size:0.2rem;">发送者</p>
            </div>
          </div>
          <img style="width:40%;float:left;margin-top:0.2rem;" :src="fs" alt />
          <div class="right over">
            <img
              class="left"
              style="height:0.6rem;width:0.6rem;border-radius:50%;float:left;margin-top:0.05rem;margin-right:0.1rem;"
              :src="item.to_user_id_pic"
              alt
            />
            <div class="left" style="text-align:left;">
              <p>{{item.to_user_name}}</p>
              <p class="hui" style="font-size:0.2rem;">接收者</p>
            </div>
          </div>
        </div>
        <div style="text-align:left;overflow:hidden;margin-top:0.2rem;">
          <h3 class="khname left">{{item.customername}}</h3>
          <img :src="rw" style="height:0.4rem;float:right;margin-right:0.4rem;" alt />
        </div>
        <p style="padding:0.1rem;box-sizing:border-box;text-align:left;">{{item.msginfo}}</p>
        <p style="text-align:left;overflow:hidden;font-size:0.28rem;">
          <span style="float:left;" :class="item.timeout==1?'red':'green'">
            <img v-show="item.timeout==1" :src="yuqi" alt style="width:0.24rem;" />
            <img v-show="item.timeout==0" :src="weidao" alt style="width:0.24rem;" />
            {{item.create_time.slice(0,10)}}&nbsp;-&nbsp;{{item.end_time.slice(0,10)}}
          </span>
        </p>
        <div style="line-height:0.6rem;height:0.6rem;">
          <span style="float:left;margin-top:0.1rem;" >
            <el-rate
              v-if="item.create_id !=userid"
              v-model="item.dzan"
              :colors="colors"
              disabled
              @change="dafen(item)"
            ></el-rate>
            <el-rate
              v-if="item.create_id ==userid"
              v-model="item.dzan"
              :colors="colors"
              @change="dafen(item)"
            ></el-rate>
          </span>
          <p
            class="iconJh"
            v-show="true"
            style="text-align:right;float:right;margin-top:0.2rem;"
            
          >
            <img
              v-show="item.status!=9&&(item.to_user_id ==userid||item.create_id ==userid)"
              style="width:0.5rem;display:block;float:right;margin-right:0.3rem;"
              @click="guanbi1(item)"
              :src="gb"
              alt
            />

            <img
              style="width:0.5rem;display:block;float:right;margin-right:0.3rem;"
              v-show="item.status!=9&&(item.to_user_id !=userid&&item.create_id !=userid)"
              :src="wgb"
              alt
            />
            <img
              style="width:0.5rem;display:block;float:right;margin-right:0.3rem;"
              v-show="item.status===9"
              :src="wgb"
              alt
            />
            <img
              v-show="item.status!=9&&item.to_user_id ==userid"
              style="width:0.5rem;display:block;float:right;margin-right:0.3rem;"
              @click="zhuan(item)"
              :src="zhuanfa"
              alt
            />
            <img
              v-show="item.status===9"
              style="width:0.5rem;display:block;float:right;margin-right:0.3rem;"
              :src="yizhuanfa"
            />
          </p>
        </div>
        <div v-if='item.status===9' @click.stop="jzmp" style="border-top:1px solid #f2f2f2;margin-top:0.2rem;color:#ccc;font-size:0.24rem;">
              <div v-show="item.tagpath==null" style="width:100%;height:0.6rem;line-height:0.6rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:left;padding-right:0.5rem;box-sizing:border-box;position:relative;">{{item.resultinfo}}<img @click="item.tagpath=true" :src="down" style="position:absolute;top:0;right:0;width:0.5rem;"></div>
              <div v-show="item.tagpath!=null" style="width:100%;line-height:0.6rem;padding-right:0.5rem;box-sizing:border-box;position:relative;text-align:left;">{{item.resultinfo}}<img @click="item.tagpath=null" :src="up" style="position:absolute;top:0;right:0;width:0.5rem;"></div>
              <p style="text-align:left;">{{item.close_time?item.close_time.slice(0,10):''}}</p>
          </div>
      <div style="margin-top:0.3rem;" v-show="item.pageSize==true">
        <el-input placeholder="请输入结果" v-model="input2">
          <template slot="append" ><span @click="guanbi(item)">回复</span></template>
        </el-input>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createRw, getRwList, setxiugai, getxqlist } from "@/api/configWu";
export default {
  name: "lcxq",
  data() {
    return {
      
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      input2:'',
      yuqi: require("../../assets/yuqi.png"),
      weidao: require("../../assets/weiyuqi.png"),
      fs: require("../../assets/fs.png"),
      zf: require("../../assets/zf.png"),
      weidu: require("../../assets/wd.png"),
      rw: require("../../assets/rw.png"),
      jy: require("../../assets/jy.png"),
      bz: require("../../assets/bz.png"),
      gb: require("../../assets/hf.png"),
      wgb: require("../../assets/yiguanbi.png"),
      gb: require("../../assets/hf.png"),
      up: require("../../assets/up.png"),
      down: require("../../assets/down.png"),
      zhuanfa: require("../../assets/zhuanfa.png"),
      yizhuanfa: require("../../assets/weizhuanfa.png"),
      zx: require("../../assets/zx.png"),
      fx: require("../../assets/fx.png"),
      act: 2,
      userid: "",
      datalist: [
        {
          id: "",
          status: "",
          level: "",
          dzan: "",
          type: "",
          customerid: "",
          dept_id: "",
          userid: "",
          create_id: "",
          to_user_id: "",
          to_user_name: "延安",
          look_user_id: "",
          msginfo: "拜访京东，商量合同细节，争取早日下单",
          create_time: "2019-12-12",
          end_time: "",
          resultinfo: "",
          customername: "京东物流",
          dept_name: "",
          create_id_pic: require("../../assets/add.png"),
          to_user_id_pic: require("../../assets/add.png"),
          user_name: "李"
        }
      ]
    };
  },
  mounted() {
    this.getdata(2);
    // document.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    zhuan(a) {
      console.log(a);
      this.$router.push({ path: "/create", query: a });
    },
    goback() {
      this.$router.go(-1);
    },
    qiehun() {
      this.act == 1 ? (this.act = 2) : (this.act = 1);

      this.getdata(this.act);
    },

    guanbi(a) {
      setxiugai({ id: a.id, status: 9,resultinfo:this.input2,create_id:a.create_id }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("关闭成功");
          this.getdata(2);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    guanbi1(a) {
      a.pageSize = true
    },
    getdata(a) {
      this.userid = localStorage.getItem("userid");
      getxqlist({
        line_code: this.$route.query.id,
        userid: this.userid,
        sort: a
      }).then(res => {
        console.log(res);
        this.datalist = res.data;
      });
    }
  }
};
</script>

<style  scoped>
.iconJh img {
  float: right;
}
.act {
  color: #ccc;
}
.nrbo {
  /* border: 1px solid #ccc; */
  /* box-shadow: #ccc */
}
.myself {
  border-left: 3px solid #3999fd;
}
.khname {
  text-indent: 0.3rem;
  background: url("../../assets/kh.png") no-repeat 0 0.05rem;
  background-size: 0.2rem 0.2rem;
  font-size: 0.2rem;
  color: #ccc;
  font-weight: 100;
}
</style>