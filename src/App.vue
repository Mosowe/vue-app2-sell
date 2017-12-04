<template>
  <div id="app">
    <vheader :seller="seller"></vheader>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from 'components/header/header.vue';
const ERR_OK = 0;
export default {
    components: {
      vheader
    },
  data () {
    return {
      seller: {
        typy: Object
      }
    };
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  }
};
</script>

<style lang="less">
  @import "common/css/ionicons.css";
  .tab {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      display: block;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
