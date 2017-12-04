<template>
    <div class="star" :class="starType">
      <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
    </div>
</template>

<script type="text/ecmascript-6">
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';

  export default {
    props: {
      size: {  // star 的尺寸
        type: Number
      },
      score: { // 分数
        type: Number
      },
      length: {  // 总的个数
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2; // 获取分数
        let int = Math.floor(score);  // 获取分数的整数部分
        let float = score % 1 !== 0;  // 分数是否有小数
        for (let i = 0; i < int; i++) {
          result.push(CLS_ON);
        }
        if (float) {
          result.push(CLS_HALF);
        }
        while (result.length < this.length) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style type="text/css">
.star{ font-size: 0;}
.star.star-24 .star-item{ width: 15px; height: 15px; margin-right: 20px; display: inline-block; background-size: cover !important; background-repeat: no-repeat !important;}
.star.star-24 .star-item.on{ background: url("star24_on@3x.png")}
.star.star-24 .star-item.off{ background: url("star24_off@3x.png")}
.star.star-24 .star-item.half{ background: url("star24_half@3x.png")}
.star.star-36 .star-item{ width: 24px; height: 24px; margin-right: 20px; display: inline-block; background-size: cover !important; background-repeat: no-repeat !important;}
.star.star-36 .star-item.on{ background: url("star36_on@3x.png")}
.star.star-36 .star-item.off{ background: url("star36_off@3x.png")}
.star.star-36 .star-item.half{ background: url("star36_half@3x.png")}
.star.star-48 .star-item{ width: 30px; height: 30px; margin-right: 20px; display: inline-block; background-size: cover !important; background-repeat: no-repeat !important;}
.star.star-48 .star-item.on{ background: url("star48_on@3x.png")}
.star.star-48 .star-item.off{ background: url("star48_off@3x.png")}
.star.star-48 .star-item.half{ background: url("star48_half@3x.png")}

</style>
