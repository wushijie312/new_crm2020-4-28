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
  props: ["tiplist"],

  data() {
    return {};
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
  padding: 10px 15px 15px;
}

.pf_b h3, .pf_b p {
  line-height: 24px;
  font-size: 14px;
  color: $color333;
}

.pf_a {
  padding: 7px 15px;
  font-size: 15px;
  color: $color333;
  line-height: 24px;
  border-bottom: 1px solid $colorf0f0f0;
}

.pf_a h3 {
  font-weight: normal;
}

.pf_a_close {
  font-size: 24px;
  color: $color545454;
  cursor: pointer;
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