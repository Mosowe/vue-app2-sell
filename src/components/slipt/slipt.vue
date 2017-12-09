<template>
    <div id="slipt">
      <ul class="ratenum">
        <li :class="{active:splits.rateActive===index}" v-for="(item,index) in rateMenu" @click="splits.rateActive = index">{{item}} <span>{{rate[index]}}</span></li>
      </ul>
      <div class="rateChoose">
        <div @click="rateChoose">
          <span class="ion ion-checkmark-circled ion-size22" :class="{checked:splits.checked}"></span>
          只看有内容的评价
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    splits: {
      type: Object,
      default () {
        return {
          rateActive: 0,
          checked: false
        };
      }
    }
  },
  data () {
    return {
      rateMenu: ['全部', '推荐', '吐槽']
    };
  },
  methods: {
    rateChoose () {
        this.splits.checked = !this.splits.checked;
    }
  },
  computed: {
    rate () {
      let num = 0;
      let ratenum = [];
      if (this.ratings.length > 0) {
        ratenum.push(this.ratings.length);
        this.ratings.forEach((type) => {
          if (!type.rateType) {
            num++;
          }
        });
        ratenum.push(num);
        num = 0;
        this.ratings.forEach((type) => {
          if (type.rateType) {
            num++;
          }
        });
        ratenum.push(num);
        num = 0;
      }
      return ratenum;
    }
  }
};
</script>

<style lang="less">
  @import "../../common/less/resetFun";
  .ratenum{ padding: 18px 0; .border-1px(); overflow: hidden;
    li{ float: left; margin-right: 8px; color: rgb(77,85,93); font-size: 14px; padding: 8px 12px; background-color: rgba(0,160,220,0.2);
      &.active{ background-color: rgb(0,160,220); color: #fff;}
      span{ font-size: 10px;}
    }
  }
  .rateChoose{ overflow: hidden; width: 100%; padding: 12px 18px; margin-left: -18px; .border-1px(); font-size: 12px; color: rgb(147,153,159); line-height: 24px;
    .ion{ vertical-align: middle}
    .checked{ color: rgb(0,160,220)}
  }
</style>
