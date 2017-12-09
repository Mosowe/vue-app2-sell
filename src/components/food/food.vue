<template>
  <transition name="moveLR">
    <div class="food" v-show="showflag" ref="fooddetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <span class="ion ion-ios-arrow-back ion-size28" @click="backPage"></span>
        </div>
        <div class="food-info pd18">
          <h1 class="name">{{ food.name }}</h1>
          <div class="sell-info">
            <span>月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}%</span>
          </div>
          <div class="sell-price">
            <span class="np">￥{{ food.price }}</span>
            <span class="op" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="addCart" @click="addCart">
            加入购物车
          </div>
        </div>
        <div class="food-goods-info pd18">
          <div class="title">商品介绍</div>
          <p class="content">{{food.info}}</p>
        </div>
        <div class="food-goods-ratings pd18">
          <div class="title">商品评价</div>
          <!--<ul class="ratenum">-->
            <!--<li :class="{active:rateActive===index}" v-for="(item,index) in rateMenu" @click="rateActive = index">{{item}} <span>{{rate[index]}}</span></li>-->
          <!--</ul>-->
          <!--<div class="rateChoose">-->
            <!--<div @click="rateChoose">-->
              <!--<span class="ion ion-checkmark-circled" :class="{checked:checked}"></span>-->
              <!--只看有内容的评价-->
            <!--</div>-->
          <!--</div>-->
          <slipt :splits="splits" :ratings="food.ratings"></slipt>
          <ul class="rateContent">
            <li class="rateItem" v-for="(item, index) in sliptrates">
              <div class="top">
                <div class="time fl">{{rateT[index]}}</div>
                <div class="username fr">
                  {{item.username}}
                  <img :src="item.avatar" width="12" height="12" class="userPhoto">
                </div>
              </div>
              <div class="rateText">
                <span class="ion" :class="[ item.rateType ? 'ion-thumbsdown' : 'ion-thumbsup' ]" :style="{color: [item.rateType ?'rgb(147,153,159)' :  'rgb(0,160,220)']}"></span>
                <span class="text">{{item.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/myPlug';
  import slipt from '../slipt/slipt.vue';

  export default {
    components: {
      slipt
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showflag: false,
        splits: {
          rateActive: 0,
          checked: false
        }
      };
    },
    methods: {
      show () {
        this.showflag = true;
        this.splits.rateActive = 0;
        this.splits.checked = false;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.fooddetail, {
            click: true
          });
        });
      },
      backPage () {
        this.showflag = false;
      },
      addCart () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
      }
    },
    computed: {
      rate () {
        let num = 0;
        let ratenum = [];
        if (this.showflag) {
          ratenum.push(this.food.ratings.length);
          this.food.ratings.forEach((type) => {
            if (!type.rateType) {
              num++;
            }
          });
          ratenum.push(num);
          num = 0;
          this.food.ratings.forEach((type) => {
            if (type.rateType) {
              num++;
            }
          });
          ratenum.push(num);
          num = 0;
        }
        return ratenum;
      },
      rateT () {
        if (this.showflag) {
          let times = [];
          this.food.ratings.forEach((time) => {
            time = new Date(time.rateTime);
            time = formatDate(time, 'yyyy-MM-dd hh:mm');
            times.push(time);
          });
          return times;
        }
      },
      sliptrates () {
        let ratebox = [];
        if (this.showflag) {
          if (this.splits.rateActive === 0) {
            if (!this.splits.checked) {
              ratebox = this.food.ratings;
            } else {
              this.food.ratings.forEach((text) => {
                if (text.text) {
                  ratebox.push(text);
                }
              });
            }
          }
          if (this.splits.rateActive === 1) {
            if (!this.splits.checked) {
              this.food.ratings.forEach((type) => {
                if (!type.rateType) {
                  ratebox.push(type);
                }
              });
            } else {
              this.food.ratings.forEach((type) => {
                if (!type.rateType && type.text) {
                  ratebox.push(type);
                }
              });
            }
          }
          if (this.splits.rateActive === 2) {
            if (!this.splits.checked) {
              this.food.ratings.forEach((type) => {
                if (type.rateType) {
                  ratebox.push(type);
                }
              });
            } else {
              this.food.ratings.forEach((type) => {
                if (type.rateType && type.text) {
                  ratebox.push(type);
                }
              });
            }
          }
        }
        return ratebox;
      }
    }
  };
</script>
<style lang="less">
@import "../../common/less/resetFun";
.food{ position: fixed; width: 100%; left: 0; top: 0; bottom: 46px; z-index: 30; background-color: #fff; transition: all 0.15s linear;
  &.moveLR-enter-active,&.moveLR-leave-active{ transform: translate3d(0,0,0);}
  &.moveLR-enter,&.moveLR-leave-to{transform: translate3d(100%,0,0);}
  .img-header{ width: 100%; position: relative; height: 0;padding-top: 100%;
    img{ position: absolute; left: 0; top: 0; width: 100%; height: 100%}
    .ion{ position: absolute; z-index: 1; left: 10px; top: 10px; padding:0 10px; color: #fff}
  }
  .food-info{ overflow: hidden; position: relative;
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
  .pd18{ padding: 18px; border-bottom: 16px solid #f3f5f7;}
  .title{ font-size: 14px; color: rgb(7,17,27); margin-bottom: 6px;}
  .food-goods-info{
    .content{ font-size: 12px; color: rgb(77,85,93); line-height: 24px;}
  }
  .food-goods-ratings{
    .ratenum{ padding: 12px 0 18px 0; .border-1px(); overflow: hidden;
      li{ float: left; margin-right: 8px; color: rgb(77,85,93); font-size: 14px; padding: 8px 12px; background-color: rgba(0,160,220,0.2);
      &.active{ background-color: rgb(0,160,220); color: #fff;}
        span{ font-size: 10px;}
      }
    }
  }
  .rateChoose{ overflow: hidden; width: 100%; padding: 12px 18px; margin-left: -18px; .border-1px(); font-size: 12px; color: rgb(147,153,159); line-height: 24px;
    .checked{ color: rgb(0,160,220)}
  }
  .rateContent{ overflow: hidden;
    .rateItem{ width: 100%; padding: 16px 0;.border-1px();
      .top{ overflow: hidden; margin-bottom: 6px; font-size: 10px; color: rgb(147,153,159);line-height: 12px;
        .userPhoto{ border-radius: 6px; margin-left: 6px;}
      }
      .rateText{ display: flex; width: 100%; font-size: 12px;
        .ion{ flex: 0 0 20px; vertical-align: top;}
        .text{ flex: 1; color: rgb(7,17,27); line-height: 16px;}
      }
    }
  }
}
</style>

