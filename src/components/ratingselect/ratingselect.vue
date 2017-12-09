<template>
    <div id="rantingselect">
      <div class="ratingType">
        <span class="btn" @click="select(2)" :class="{active:selectType === 2}">{{desc.all}}<span class="num">47</span></span>
        <span class="btn" @click="select(0)" :class="{active:selectType === 0}">{{desc.good}}<span class="num">40</span></span>
        <span class="btn" @click="select(1)" :class="{active:selectType === 1}">{{desc.bad}}<span class="num">7</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{checked:onlyContent}">
        <span class="ion ion-checkmark-circled ion-size22"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
// const GOOD = 0;
// const BAD = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          good: '满意',
          bad: '不满意'
        };
      }
    }
  },
  methods: {
    select (type) {
      this.selectType = type;
      this.$dispatch('ratingtype.select', type);
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent;
      this.$dispatch('content.toglle', this.onlyContent);
    }
  }
};
</script>

<style lang="less">
  @import "../../common/less/resetFun";
  #rantingselect{padding: 18px 0; .border-1px(); overflow: hidden;
    .ratingType{
      .btn{ float: left; margin-right: 8px; color: rgb(77,85,93); font-size: 14px; padding: 8px 12px; background-color: rgba(0,160,220,0.2);
        &.active{ background-color: rgb(0,160,220); color: #fff;}
        .num{ font-size: 10px; margin-left: 5px;}
      }
    }
    .switch{ overflow: hidden; width: 100%; padding: 12px 18px; margin-left: -18px; .border-1px(); font-size: 12px; color: rgb(147,153,159); line-height: 24px;
      .ion{ vertical-align: middle}
      &.checked{
        .ion{color: rgb(0,160,220)}
      }
    }
  }
</style>
