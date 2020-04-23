<!-- A.html -->
<template>
  <div class="ok_open" >
    <i class="el-icon-circle-check"></i>
    <p>{{tit}}</p>
  </div>
</template>
<script>
const Head = () => import("@/view/common/head");
import { salechabumen } from "@/api/config";
export default {
  components: {
    Head
  },
  props: ["tit"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style lang="stylus"  scoped>
.ok_open {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}

.ok_open i {
  font-size: 24px;
  color: $colorfff;
}

.ok_open p {
  padding-top: 5px;
  color: $colorfff;
  font-size: 14px;
}
</style>