<template>
    <div id="seller" ref="sell">
      <div>
        <div class="seller-message">
          <h1 class="name">{{seller.name}}</h1>
          <div class="stars">
            <span class="fl"><star :size="24" :score="seller.score"></star></span>
            <span class="fl text">({{seller.ratingCount}}) 月销售{{seller.sellCount}}单</span>
          </div>
          <ul class="message">
            <li class="mes-item">
              <div class="title">起送价</div>
              <div class="cont">{{seller.minPrice}}<small>元</small></div>
            </li>
            <li class="mes-item">
              <div class="title">商家配送</div>
              <div class="cont">{{seller.deliveryPrice}}<small>元</small></div>
            </li>
            <li class="mes-item">
              <div class="title">平均配送时间</div>
              <div class="cont">{{seller.deliveryTime}}<small>分钟</small></div>
            </li>
          </ul>
          <div class="stow" @click="stows">
            <span class="ion ion-heart" :class="{getStow: seller.stow}"></span>
            <div class="text"><span v-if="!seller.stow">未收藏</span><span v-else>已收藏</span></div>
          </div>
        </div>
        <div class="s-pd16"></div>
        <div class="seller-bulletin">
          <div class="name">公告与活动</div>
          <div class="cont">{{seller.bulletin}}</div>
          <ul class="hd">
            <li class="hd-item" v-for="item in seller.supports"><span class="hd-icon" :class="vclass[item.type]"></span>{{item.description}}</li>
          </ul>
        </div>
        <div class="s-pd16"></div>
        <div class="seller-photo">
          <div class="name">商家实景</div>
          <div class="wrapper" ref="phwrapper">
            <ul class="ph-box" ref="phbox">
              <li class="ph-item" v-for="item in seller.pics"><img :src="item" width="120" height="90"></li>
            </ul>
          </div>
        </div>
        <div class="s-pd16"></div>
        <div class="seller-info">
          <div class="name">商家信息</div>
          <ul class="info">
            <li class="info-item" v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
import Vue from 'vue';
import BScroll from 'better-scroll';
export default {
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      vclass: ['jian', 'zhe', 'te', 'piao', 'bao']
    };
  },
  mounted () {
    this.$refs.phbox.style.width = 126 * 4 + 'px';
  },
  created () {
    this.$nextTick(() => {
      this.sellerscroll = new BScroll(this.$refs.sell, {
        click: true
      });
      this.phwrapperscroll = new BScroll(this.$refs.phwrapper, {
        scrollX: true
      });
    });
  },
  methods: {
    stows () {
      if (!this.seller.stow) {
        Vue.set(this.seller, 'stow', 1);
      } else {
        this.seller.stow = 0;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/resetFun";
#seller{ overflow: hidden; position: absolute; left: 0; top: 175px; bottom: 0; width: 100%;
  .name{ font-size: 14px; color: rgb(7,17,27); line-height: 14px; font-weight: normal}
  .s-pd16{ overflow: hidden; width: 100%; height: 16px; background-color: #f3f5f7; border-top: 1px solid rgba(7,17,27,0.1); border-bottom: 1px solid rgba(7,17,27,0.1)}
  .seller-message{ overflow: hidden; padding: 18px; position: relative;
    .stars{ overflow: hidden; margin-bottom: 18px; margin-top: 8px;
      .text{ font-size: 10px; color: rgb(77,85,93); line-height: 18px;}
    }
    .message{ display:flex; overflow: hidden; padding: 18px 0; border-top: 1px solid rgba(7,17,27,0.1);
      .mes-item{ flex: 1; border-right: 1px solid rgba(7,17,27,0.1); text-align: center;
        .title{ font-size: 10px; color: rgb(147,153,159); line-height: 10px; margin-bottom: 4px;}
        .cont{ font-size: 24px; color: rgb(7,17,27); line-height: 24px; font-weight: 200;
          small{ font-size: 10px;}
        }
        &:last-child{ border: none}
      }
    }
    .stow{ overflow: hidden; position: absolute; right: 18px; top: 18px; text-align: center;
      .ion{ font-size: 24px; color: rgba(7,17,27,0.4);
        &.getStow{ color: rgb(240,20,20)}
      }
      .text{ font-size: 10px; color: rgb(77,85,93); line-height: 10px;}
    }
  }
  .seller-bulletin{ overflow: hidden; padding: 18px;
    .cont{ font-size: 12px; color: rgb(240,20,20); line-height: 24px; font-weight: 200; margin: 8px 0 16px 0;}
    .hd{ overflow: hidden;
      .hd-item{ overflow: hidden; width: 100%; padding: 16px 12px; border-top: 1px solid rgba(7,17,27,0.1); font-size: 12px; color: rgb(7,17,27); line-height: 16px; font-weight: 200}
      .hd-icon{ display: inline-block; width: 16px; height: 16px; margin-right: 6px; vertical-align: -3px;
        &.jian{ .bgimg('decrease_3@2x.png')}
        &.zhe{ .bgimg('discount_3@2x.png')}
        &.bao{ .bgimg('guarantee_3@2x.png')}
        &.piao{ .bgimg('invoice_3@2x.png')}
        &.te{ .bgimg('special_3@2x.png')}
      }
    }
  }
  .seller-info{ overflow: hidden; padding: 18px;
    .info{ overflow: hidden; margin-top: 12px; font-size: 12px; color: rgb(7,17,27); font-weight: 200; line-height: 16px;
      .info-item{ padding: 16px 12px; border-top: 1px solid rgba(7,17,27,0.1)}
    }
  }
  .seller-photo{ overflow: hidden; padding: 18px;
    .wrapper{ position: relative; margin-top: 12px;
      .ph-box{ height: 90px;
        .ph-item{ float: left; width: 120px; height: 90px; overflow: hidden; margin-right: 6px;}
      }
    }
  }
}
</style>
