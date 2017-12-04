<template>
  <!--商家优惠的图标-->
  <span class="icon" :class="supMap[icon]+styl"></span>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        icon: { // icon的类名前缀,类选择
          type: Number()
        },
        styl: { // icon的类名后缀，类样式选择
          type: Number
        }
      },
      created () {
        this.supMap = ['decrease-', 'discount-', 'special-', 'invoice-', 'guarantee-'];
      }
    };
</script>

<style lang="less">
  @import "../../common/less/resetFun";
  .icon{display: inline-block; width: 12px; height: 12px;
    &.decrease-3{.bgimg("decrease_3@2x.png")}
    &.discount-3{.bgimg("discount_3@2x.png")}
    &.special-3{.bgimg("special_3@2x.png")}
    &.invoice-3{.bgimg("invoice_3@2x.png")}
    &.guarantee-3{.bgimg("guarantee_3@2x.png")}

    &.decrease-1{.bgimg("decrease_1@2x.png")}
    &.discount-1{.bgimg("discount_1@2x.png")}
    &.special-1{.bgimg("special_1@2x.png")}
    &.invoice-1{.bgimg("invoice_1@2x.png")}
    &.guarantee-1{.bgimg("guarantee_1@2x.png")}

  }
</style>
