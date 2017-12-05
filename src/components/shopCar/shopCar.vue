<template>
    <div id="shop-car">
      <div class="car-wrapper">
        <span class="car ion ion-ios-cart" :class="{highlight: totalCount>0}" @click="listShow"><em class="carNum" v-if="totalCount>0">{{totalCount}}</em></span>
        <div class="allprice">
          <span class="nedp" :class="{highlight: totalPrice>0}">￥{{totalPrice}}</span>
          <span class="psf">另需配送费{{deliveryprice}}元</span>
        </div>
        <span class="button" :class="payclass">{{payDesc}}</span>
      </div>
      <transition name="bg">
        <div class="bg" v-show="fold"></div>
      </transition>
      <transition name="showlist">
        <div class="shopcart-list" v-show="fold">
          <div class="list-header">
            <h1 class="list-title">购物车</h1>
            <span class="empty" @click="emptylist">清空</span>
          </div>
          <div class="list-content" ref="list">
            <ul>
              <li v-for="food in selectFoods" class="food">
                <span class="name">{{food.name}}</span>
                <div class="fr">
                  <div class="price">
                    <span class="">￥{{food.price * food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';

export default {
  components: {
    cartcontrol
  },
  props: {
    deliveryprice: {
      type: Number,
      default: 0
    },
    minprice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      carlistShow: false,
      fold: false
    };
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minprice}元起送`;
      } else if (this.totalPrice < this.minprice) {
        let diff = this.minprice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return `提交订单`;
      }
    },
    payclass () {
      if (this.totalPrice < this.minprice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.list, {
        click: true
      });
    });
  },
  methods: {
    listShow () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    emptylist () {}
  }
  };
</script>

<style lang="less">
@import "../../common/less/resetFun";
#shop-car{ width: 100%; height: 46px; position: fixed; left: 0; bottom: 0; z-index: 99;
  .car-wrapper{  display:flex;width: 100%; background-color: #141d27; height: 100%;color: rgba(255,255,255,0.4);
    .car{ flex: 0 0 44px; width: 44px; height: 44px; border-radius: 44px; border: 6px solid #141d27; background-color: #2b333b; font-size: 24px; line-height: 44px; text-align: center; margin: -10px 12px 8px 12px;position: relative;
      .carNum{ display: block; background-color: rgb(240,20,20); height: 12px; text-align: center; line-height: 12px; font-size: 9px; color: #fff; padding: 5px 7px; border-radius: 20px; position: absolute; right: -5px; top: -5px;}
      &.highlight{ background-color: rgb(0,160,220); color: #fff;}
    }
    .allprice{ flex: 1; padding-top: 6px;
      .nedp{ font-size: 14px; display: block; font-weight: 700;
        &.highlight{ color: #fff;}
      }
      .psf{ font-size: 12px;}
    }
    .dist{ font-weight: normal; font-size: 12px;}
    .button{ flex: 0 0 115px; text-align: center; width: 115px; border: none; font-size: 12px; font-weight: 700;color: rgba(255,255,255,0.4); outline: none; background-color: #2b333b; height: 100%; display: inline-block; float: right; line-height: 44px;padding: 0 8px; margin-left: 12px;
      &.not-enough{ background-color: #2b333b;}
      &.enough { background-color: #00b43c; color: #fff;}
    }
  }
  .shopcart-list{ overflow: hidden;transition:  all 0.5s; width: 100%; position: absolute;transform: translateY(-100%); z-index: -1; top: 0; left: 0; background-color: #fff;
    &.showlist-enter-active{transform: translateY(0);}
    .list-header{ overflow: hidden; padding: 0 18px; height: 40px; line-height: 40px; background-color: #f3f5f7;.border-1px();
      .list-title{ font-size: 14px; color: rgb(7,17,27); font-weight: normal; float: left;}
      .empty{ float: right; font-size: 12px; color: rgb(0,160,220)}
    }
    .list-content{ overflow: hidden; background-color: #fff; max-height: 217px;padding: 0 18px;
      .food{ overflow: hidden; width: 100%; padding: 12px 0; .border-1px();
        .name{ float: left; font-size: 14px; color: rgb(7,17,27);}
        .price{ display: inline-block; font-size: 12px; color: rgb(240,20,20); font-weight: 700; position: relative; top: -5px;}
        .cartcontrol-wrapper{ display: inline-block}
      }
    }
  }
  .bg{ position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(7,17,27,0.6); z-index: -2;transition:  all 0.5s;
    &.bg-enter-active,.bg-leave-active{ opacity: 1;}
    &.bg-enter,.bg-leave-to{ opacity: 0;}
  }
}
</style>
