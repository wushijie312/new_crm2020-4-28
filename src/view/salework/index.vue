<!-- A.html -->
<template>
  <div>
     
      <Sale></Sale>
      <Pending v-if="false"></Pending>
      <Details  v-if="false"></Details>
  </div>
</template>
<script>
import Sale from "@/view/salework/sale";
import Pending from "@/view/salework/pending";
import Details from "@/view/salework/details";

export default {
  components: {
    Sale,
    Pending,
    Details
  },
  data() {
    return {
      soit: 1,
      act: 2,
      act1: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    saleindexhandle(len) {
      this.soit = len;
    }
  }
};
</script>
<style lang="stylus"  scoped>
@import '../../assets/css/salework.styl';
</style>