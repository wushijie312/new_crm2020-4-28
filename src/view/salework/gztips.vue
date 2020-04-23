<!-- A.html -->
<template>
  <div>
    <div class="sale_cont_bg mart8" v-if="gzlist.length">
      <div class="sale_head clearfix">
        <h3 class="sale_head_a fl">工作提醒</h3>
      </div>
      <div class="sale_a">
        <div class="sale_a_one" v-for="(item,index) in gz_list" :key='index'>
          <router-link :to="item.url">
            <div class="sale_a_work">
              <img
                class="sale_a_icon"
                :src="item.desc_info.indexOf('派单')>-1?pd:item.desc_info.indexOf('销售')>-1?rb:item.desc_info.indexOf('拜访')>-1?bf:item.desc_info.indexOf('KPI')>-1?kpi:item.desc_info.indexOf('问卷')>-1?wj:''"
                alt
              />
              <p class="sale_a_tit">{{item.desc_info}}</p>
              <span class="sale_a_number">{{item.result}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Head = () => import("@/view/common/head");
export default {
  components: {
    Head
  },
  props: ["gzlist", "salerlist"],
  data() {
    return {
      bf: require("@/assets/img/salework/bf.png"),
      kpi: require("@/assets/img/salework/KPI.png"),
      pd: require("@/assets/img/salework/pd.png"),
      rb: require("@/assets/img/salework/rb.png"),
      wj: require("@/assets/img/salework/wj.png")
    };
  },
  computed: {
    gz_list: function() {
      return this.gzlist.filter(item => {
        return item.result;
      });
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus"  scoped>
.sale_cont_bg {
  background: $colorfff;
}

.sale_head {
  line-height: 22px;
  padding: 9px 15px;
  border-bottom: 1px solid $colorf0f0f0;
  position: relative;
}

.sale_head_a {
  color: $color333;
  font-size: 15px;
}

.sale_a {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 15px 0;
}

.sale_a_icon {
  width: 45px;
}

.sale_a_one {
  width: 25%;
  text-align: center;
  margin-bottom: 15px;
}

.sale_a_work {
  position: relative;
  display: inline-block;
  width: 75px;
}

.sale_a_tit {
  color: $color545454;
  font-size: 12px;
  line-height: 14px;
  margin-top: 4px;
}

.sale_a_number {
  position: absolute;
  top: -5px;
  right: 6px;
  height: 18px;
  border: 1px solid $colorfff;
  min-width: 10px;
  padding: 0 4px;
  border-radius: 18px;
  line-height: 18px;
  text-align: center;
  background: $colorff5c61;
  color: $colorfff;
  font-size: 12px;
}
</style>