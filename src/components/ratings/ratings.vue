<template>
    <div id="ratings" ref="rating">
      <div>
        <div class="totleScore-wrapper">
          <div class="totlescore">
            <div class="totle">{{seller.score}}</div>
            <div class="title">综合评分</div>
            <small>高于周边商家{{seller.rankRate}}%</small>
          </div>
          <div class="totlestars">
            <div class="s-item">商品描述<div class="inline"><star :size="24" :score="seller.foodScore"></star></div><span>{{seller.foodScore}}</span></div>
            <div class="s-item">服务态度<div class="inline"><star :size="24" :score="seller.serviceScore"></star></div><span>{{seller.serviceScore}}</span></div>
            <div class="s-item">送达时间<div class="inline time">{{seller.deliveryTime}}分钟</div></div>
          </div>
        </div>
        <div class="rateContent">
          <slipt :splits="splits"></slipt>
          <ul>
            <li class="rateList" v-for="(item, index) in sliptrates">
              <div class="userPic"><img :src="item.avatar" width="28" hidden="28"></div>
              <div class="userrate">
                <div class="nameTime">
                  <span class="fl">{{item.username}}</span>
                  <span class="fr">{{rateT[index]}}</span>
                </div>
                <div class="starbox">
                  <star :size="24" :score="item.score" class="star"></star>
                  <span v-if="item.deliveryTime" class="time">{{item.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{item.text}}
                </div>
                <div class="tuijian">
                  <span class="ion" :class="[ item.rateType ? 'ion-thumbsdown' : 'ion-thumbsup' ]" :style="{color: [item.rateType ?'rgb(147,153,159)' :  'rgb(0,160,220)']}"></span>
                  <span>
                  <small v-for="tj in item.recommend">{{tj}}</small>
                </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import slipt from '../slipt/slipt.vue';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/myPlug';

  const ERR_OK = 0;
    export default {
      components: {
        star,
        slipt
      },
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          splits: {
            ratings: {},
            rateActive: 0,
            checked: false
          }
        };
      },
      created () {
        this.$http.get('/api/ratings').then((responce) => {
          responce = responce.body;
          if (responce.errno === ERR_OK) {
            this.splits.ratings = responce.data;
            this.$nextTick(() => {
              this.ratescroll = new BScroll(this.$refs.rating, {
                click: true
              });
            });
          }
        });
      },
      computed: {
        rateT () {
          if (this.splits.ratings.length > 0) {
            let times = [];
            this.splits.ratings.forEach((time) => {
              time = new Date(time.rateTime);
              time = formatDate(time, 'yyyy-MM-dd hh:mm');
              times.push(time);
            });
            return times;
          }
        },
        sliptrates () {
          let ratebox = [];
          if (this.splits.ratings.length > 0) {
            if (this.splits.rateActive === 0) {
              if (!this.splits.checked) {
                ratebox = this.splits.ratings;
              } else {
                this.splits.ratings.forEach((text) => {
                  if (text.text) {
                    ratebox.push(text);
                  }
                });
              }
            }
            if (this.splits.rateActive === 1) {
              if (!this.splits.checked) {
                this.splits.ratings.forEach((type) => {
                  if (!type.rateType) {
                    ratebox.push(type);
                  }
                });
              } else {
                this.splits.ratings.forEach((type) => {
                  if (!type.rateType && type.text) {
                    ratebox.push(type);
                  }
                });
              }
            }
            if (this.splits.rateActive === 2) {
              if (!this.splits.checked) {
                this.splits.ratings.forEach((type) => {
                  if (type.rateType) {
                    ratebox.push(type);
                  }
                });
              } else {
                this.splits.ratings.forEach((type) => {
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
#ratings{ overflow: hidden; width: 100%; background-color: #fff; position: absolute; top: 175px; bottom: 46px;
  .totleScore-wrapper{ overflow: hidden; border-bottom: 16px solid #f3f5f7; display: flex; padding: 18px; .border-1px();
    .totlescore{ flex:0 0 135px; text-align: center; border-right: 1px solid #ddd;
      .totle{ font-size: 24px; color: rgb(255,153,0); line-height: 28px; margin-bottom: 6px;}
      .title{ font-size: 12px; color: rgb(7,17,27); line-height: 12px; margin-bottom: 8px;}
      small{ font-size: 10px; color: rgba(7,17,27,0.5)}
    }
    .totlestars{ flex: 1; padding-left: 18px; font-size: 12px; color: rgb(7,17,27);
      .inline{ display: inline-block; margin: 0 6px; position: relative; top: 2px;
        &.time{ top: 0}
      }
      .s-item{ overflow: hidden; margin-bottom: 8px;
        span{ color: rgb(255,153,0)}
      }
    }
  }
  .rateContent{ overflow: hidden; padding: 0 18px; border-top: 1px solid rgba(7,17,27,0.1);
    .rateList{ overflow: hidden; padding: 18px 0; .border-1px();display: flex;
      .userPic{ flex: 0 0 28px; margin-right: 12px;
        img{ display: block; border-radius: 28px;}
      }
      .userrate{ flex: 1;
        .nameTime{ overflow: hidden; font-size: 10px; margin-bottom: 4px; line-height: 12px;
          .fl{ color: rgb(7,17,27)}
          .fr{ color: rgb(147,153,159)}
        }
        .starbox{ overflow: hidden; margin-bottom: 6px;
          .star{ float: left}
          .time{ float: left; font-size: 10px; color: rgb(147,153,159); line-height: 12px; position: relative; top: 2px;}
        }
        .text{ font-size: 12px; line-height: 18px; color: rgb(7,17,27); margin-bottom: 8px;}
        .tuijian{ overflow: hidden;
          small{ font-size: 9px; color: rgb(147,153,159); line-height: 16px; height: 16px; padding: 0 6px; border: 1px solid rgba(7,17,27,0.1); border-radius: 2px; display: inline-block; margin: 4px;}
        }
      }
    }
  }
}
</style>
