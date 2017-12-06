<template>
  <transition name="moveLR">
    <div class="food" v-show="showflag">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <span class="ion ion-ios-arrow-back ion-size28" @click="backPage"></span>
        </div>
        <div class="food-info">
          <h1 class="name">{{ food.name }}</h1>
          <div class="sell-info">
            <span>月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}%</span>
          </div>
          <div class="sell-price">
            <span class="np">￥{{ food.price }}</span>
            <span class="op" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="addCart">
            加入购物车
          </div>
        </div>
        <div class="goods-info"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showflag: false
    };
  },
  methods: {
    show () {
      this.showflag = true;
    },
    backPage () {
      this.showflag = false;
    }
  }
};
</script>

<style lang="less">
.food{ position: fixed; width: 100%; left: 0; top: 0; bottom: 48px; z-index: 30; background-color: #fff; transition: all 0.15s linear;
  &.moveLR-enter-active,&.moveLR-leave-active{ transform: translate3d(0,0,0);}
  &.moveLR-enter,&.moveLR-leave-to{transform: translate3d(100%,0,0);}
  .img-header{ width: 100%; position: relative; height: 0;padding-top: 100%;
    img{ position: absolute; left: 0; top: 0; width: 100%; height: 100%}
    .ion{ position: absolute; z-index: 1; left: 10px; top: 10px; padding:0 10px;}
  }
  .food-info{ overflow: hidden; padding: 18px; border-bottom: 16px solid #f3f5f7; position: relative;
    .name{ font-size: 14px; color: rgb(7,17,27); font-weight: 700; line-height: 14px;}
    .sell-info{ font-size: 10px; color: rgb(147,153,159); line-height: 10px; margin: 8px 0 18px 0;
      span:first-child{ margin-right: 12px;}
    }
    .sell-price{ overflow: hidden;
      .np{ font-size: 14px; color: rgb(240,20,20); font-weight: 700; line-height: 28px; margin-right: 12px;}
      .op{ font-size: 10px; color: rgb(147,153,159);line-height: 28px; font-weight: 700; text-decoration: line-through}
    }
    .addCart{ width: 124px; height: 24px; text-align: center; line-height: 24px; font-size: 10px; color: #fff; background-color: rgb(0,160,220); border-radius: 30px; padding: 6px 0; position: absolute; right: 18px; bottom: 18px;}
  }

}
</style>

