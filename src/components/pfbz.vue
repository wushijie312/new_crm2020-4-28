<!-- A.html -->
<template>
  <div class="pf_open">
    <div class="pf_box">
      <div class="pf_a clearfix">
        <h3 class="fl">评分标准</h3>
        <i class="fr pf_a_close el-icon-close" @click.stop="PFBZ_SURE(false)" />
      </div>
      <div class="pf_b">
        <template v-for="item in tiplist">
          <h3>{{item.tit}}</h3>
          <p>{{item.dec}}</p>
        </template>
      </div>
      <div class="pf_btn">
        <el-button style="width:50%;" size="small" type="primary" @click.stop="PFBZ_SURE(false)">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
const Head = () => import("@/view/common/head");
import { salechabumen } from "@/api/config";
import { mapMutations } from "vuex";
export default {
  components: {
    Head
  },

  data() {
    return {
       tiplist: [
        {
          tit: "标准销售额评分标准：",
          dec:
            "49%<=2.5分；50%-55%=3分；56%-60%=3.5分；61%<-65%=4分；66%<-70%<=4.5分；70%及以上<=5分。（标准销售额=实际完成标准销售额/收入目标）"
        },
        {
          tit: "回款评分标准：",
          dec:
            " 89%<=2.5分；90%-99%<=3分；100%-120%<=3.5分；121%<-130%<=4分；131%<-140%<=4.5分；141%-150%<=5分。"
        }
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(["PFBZ_SURE"])
  }
};
</script>
<style lang="stylus"  scoped>
.pf_btn {
  text-align: center;
  padding: 0 15px 15px;
}

.pf_b {
  padding: 6px 15px 15px;
}

.pf_b h3, .pf_b p {
  line-height: 24px;
  font-size: 14px;
  color: $color333;
}
.pf_b h3{
  margin-top:4px;
  }

.pf_a {
  padding: 10px 15px;
  line-height: normal;
  position: relative;
  color: $color333;
  border-bottom: 1px solid $colorf0f0f0;
}

.pf_a h3 {
  line-height: normal;
  font-size: 15px;
  font-weight: normal;
}

.pf_a_close {
  font-size: 24px;
  position: absolute;
  color: $color999;
  cursor: pointer;
  right: 12px;
  top: 8px;
}

.pf_open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1001;
}

.pf_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: $colorfff;
  border-radius: 5px;
  width: 310px;
}
</style>