<template>
    <div class="cartcontrol">
      <div class="cart-decrease ion ion-ios-minus-outline" v-show="food.count>0" @click.stop="decCart"></div>
      <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
      <div class="cart-add ion ion-plus-circled" @click.stop="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count ++;
      }
    },
    decCart () {
      if (this.food.count > 0) {
        this.food.count --;
      } else {
        this.food.count = 0;
      }
    }
  }
};
</script>

<style lang="less">
.cartcontrol{font-size: 0;color: #00a0dc;
  .cart-decrease{ display: inline-block; padding: 6px; font-size: 24px; line-height: 24px;}
  .cart-count{ display: inline-block; font-size: 12px; color: #B3B3B3; position: relative; top: -5px;}
  .cart-add{ display: inline-block; font-size: 24px; padding: 6px;}
}
</style>
