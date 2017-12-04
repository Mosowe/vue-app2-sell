<template>
    <div class="header">
      <div class="h-top">
        <img :src="seller.avatar" class="h-img" width="64" height="64">
        <div class="h-seller">
          <div class="title-wrapper">
            <span class="title_icon"></span>
            <span class="title">{{ seller.name }}</span>
          </div>
          <small>{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</small>
          <div class="supports" v-if="seller.supports">
            <icon :icon="seller.supports[0].type" :styl="1"></icon>
            <p>{{ seller.supports[0].description }}</p>
            <div class="more" @click="Showdetail">{{ seller.supports.length }}个 <span class="ion ion-chevron-right"></span></div>
          </div>
        </div>
      </div>
      <div class="h-gg">
        <span class="ggicon"></span>
        <p>{{ seller.bulletin }}</p>
        <span class="ion ion-chevron-right fr"></span>
      </div>
      <div class="background"></div>
      <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{ seller.name }}</h1>
              <div class="star-warpper">
                <star :size="48" :score="seller.score" :length="5"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="sup-wrapper" v-if="seller.supports">
                <li class="sup-item" v-for="item in seller.supports">
                  <icon :icon="item.type" :styl="1"></icon>
                  <span class="sup-text">{{ item.description }}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <p class="gg-text">{{ seller.bulletin }}</p>
            </div>
          </div>
          <div class="detail-close" @click="closeDetail"><i class="ion ion-android-close"></i></div>
        </div>
      </transition>

    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue';
  import icon from '../../components/icon/icon.vue';
  export default {
    components: {
      star,
      icon
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      Showdetail () {
        this.detailShow = true;
      },
      closeDetail () {
        this.detailShow = false;
      }
    }
  };
</script>

<style type="text/css">

.header{ overflow: hidden; color: #fff; width: 100%; height: 134px; position: relative; background-color: rgba(0,0,0,0.8);}
.h-top{ width: 100%; margin-top:24px; font-size: 0;}
.h-top .h-img{ display: inline-block; margin:0 16px 0 24px; border-radius: 4px;}
.h-top .h-seller{ display: inline-block; vertical-align: top}
.h-top .title-wrapper{ overflow: hidden; margin-bottom: 8px;}
.h-top .h-seller .title{ font-size: 16px; line-height: 18px; overflow: hidden; vertical-align: top; display: inline-block}
.h-top .h-seller small{ display: block; font-size: 12px; font-weight: 200; line-height: 12px; margin-bottom: 10px;}
.h-top .h-seller p{ display: inline-block; font-size: 10px; vertical-align: top;  margin-left:4px; }
.h-top .more{ font-size: 10px; background-color: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 30px; position: absolute; right: 12px; top: 70px;}
.h-top .title_icon{ display: inline-block; width: 30px; height: 18px; background: url("../../common/img/brand@2x.png") no-repeat center; background-size: cover; margin-right: 6px;}

.h-gg{ position:absolute; left: 0; bottom: 0; width: 100%; height: 28px; line-height: 28px; box-sizing: border-box; padding: 0 12px; background-color: rgba(7,17,27,0.2)}
.h-gg p{ width: 80%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; display: inline-block; font-size: 10px;}
.h-gg span{ line-height: 28px;}
.h-gg .ggicon{ display: inline-block; background: url("../../common/img/bulletin@2x.png") no-repeat center; width: 22px; height: 12px; background-size: cover; vertical-align: top; margin-top: 8px;}

.header .background{ position: absolute; z-index: -1; width: 100%; height: 100%; left: 0; top: 0; background: url("../../common/img/header01.jpg") no-repeat center; background-size: cover; filter: blur(5px)}

.detail{ position: fixed; transition:  all 0.5s; width: 100%; height: 100%; z-index: 100; overflow: auto; left: 0; top: 0;background: rgba(7,17,27,0.8)}
.detail.fade-enter-active,.detail.fade-leave-active{ opacity: 1;}
.detail.fade-enter,.detail.fade-leave-to{ opacity: 0;}
.detail .detail-wrapper{ min-height: 100%; overflow: hidden; width: 100%}
.detail .detail-main{ margin-top: 64px; padding-bottom: 84px;}
.detail .detail-close{ position: relative; width: 32px; height: 32px; font-size: 32px; margin: -64px auto 0 auto; clear: both}
.detail .name{ text-align: center; font-size: 16px; color: #fff; font-weight: 700; margin-bottom: 16px;}
.detail .star-warpper{ overflow: hidden; width: 100%; text-align: center; margin-bottom: 28px;}
.detail .title{ width: 80%; font-size: 0; margin: 0 auto 24px auto; display: flex;}
.detail .title .line{ flex: 1; position: relative; border-bottom: 1px solid rgba(255,255,255,0.2); top: -8px;}
.detail .title .text{ padding: 0 12px; font-size: 14px;}
.detail .sup-wrapper{ overflow: hidden; width: 80%; margin: 0 auto 18px auto}
.detail .sup-icon{ display: inline-block; margin-right: 6px; width: 12px; height: 12px; background-size: cover !important;}
.detail .sup-text{ font-size: 12px; vertical-align: top; display: inline-block}
.detail .sup-item{ margin-bottom: 12px;}
.detail .gg-text{ width: 80%; margin: 0 auto; font-size: 12px; line-height: 24px;}

</style>
