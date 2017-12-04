<template>
    <div id="shop-car">
      <div class="car-wrapper">
        <span class="car ion ion-ios-cart" :class="{carIn:carlist.number}" @click="carlistShow = !carlistShow"><em class="carNum" v-if="carlist.number">{{ carlist.number }}</em></span>
        <div class="allprice">
          <span class="nedp">￥{{ carlist.price }}</span>
          <span class="psf">另需配送费4元</span>
        </div>
        <span class="button" :class="{send: send}"><span v-if="carlist.price<20">还差￥{{20-carlist.price}}元起送</span><span v-else>提交订单</span></span>
      </div>
      <div class="car-list" v-if="carlistShow">
        <div class="car-main">
          <div class="title-wrapper">
            <span class="text">购物车</span>
            <span class="delete">清空</span>
          </div>
          <div class="none-car" v-if="!carlist">什么都没有！去选择商品吧！</div>
          <ul class="list" v-if="carlist">
            <li class="list-item" v-for="item in carlist.list">
              <span class="title">{{ item.title }}</span>
              <div class="car-choose">
                <span class="price">￥{{ item.price }}</span>
                <span class="sub ion ion-ios-minus-outline"></span>
                <span class="number">{{ item.number }}</span>
                <span class="add ion ion-plus-circled"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        carlist: {}
      },
      data () {
        return {
          carlistShow: false
        };
      },
      computed: {
        send () {
          return this.carlist.price >= 20;
        }
      }
    };
</script>

<style lang="less">
@import "../../common/less/resetFun";
#shop-car{overflow: hidden;; width: 100%; height: 46px; padding-top: 10px; position: fixed; left: 0; bottom: 0; z-index: 99;
  .car-wrapper{  display:flex;width: 100%; background-color: #141d27; height: 100%;color: rgba(255,255,255,0.4);
    .car{ flex: 0 0 44px; width: 44px; height: 44px; border-radius: 44px; border: 6px solid #141d27; background-color: #2b333b; font-size: 24px; line-height: 44px; text-align: center; margin: -10px 12px 8px 12px;position: relative;
      .carNum{ display: block; background-color: rgb(240,20,20); height: 12px; text-align: center; line-height: 12px; font-size: 9px; color: #fff; padding: 5px 7px; border-radius: 20px; position: absolute; right: -5px; top: -5px;}
      &.carIn{ background-color: rgb(0,160,220); color: #fff;}
    }
    .allprice{ flex: 1; padding-top: 6px;
      .nedp{ font-size: 14px; display: block; font-weight: 700;}
      .psf{ font-size: 12px;}
    }
    .dist{ font-weight: normal; font-size: 12px;}
    .button{ flex: 0 0 115px; text-align: center; width: 115px; border: none; font-size: 12px; font-weight: 700;color: rgba(255,255,255,0.4); outline: none; background-color: #2b333b; height: 100%; display: inline-block; float: right; line-height: 44px;padding: 0 8px; margin-left: 12px;
      &.send{ background-color: rgb(240,20,20); color: #fff}
    }
  }
  .car-list{ position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(7,17,27,0.6); z-index: -1;
    .car-main{ position: absolute; left: 0; bottom: 0; padding-bottom: 60px; background-color: #fff; width: 100%; max-width: 100%;
      .title-wrapper{ overflow: hidden; padding: 0 13px; height: 40px; line-height: 40px; background-color: #f3f5f7;.border-1px();
        .text{ font-size: 14px; float: left; color: rgb(7,17,27)}
        .delete{ font-size: 12px; color: rgb(0,160,220); float: right}
      }
      .none-car{ width: 100%; height: 100px; text-align: center; line-height: 100px; font-size: 14px; color: rgba(7,17,27,0.6);}
      .list{ padding: 0 13px;
        .list-item{ width: 100%; padding: 12px 0;line-height: 24px; height: 24px;.border-1px();
          .title{ float: left; font-size: 14px; color: rgb(7,17,27);}
          .car-choose{ float: right;
            .price{ font-size: 14px; color: rgb(240,20,20); margin-right: 12px; display: inline-block; position: relative; top: -4px;}
            .sub,.add{font-size: 24px; color: #00a0dc;}
            .number{ display: inline-block; width: 24px; text-align: center; font-size: 10px; color: rgb(147,153,159); position: relative; top: -4px}
          }
        }
      }
    }
  }
}
</style>
