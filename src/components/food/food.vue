<template>
  <transition name="moveLR">
    <div class="food" v-show="showflag">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showflag: false
    };
  },
  methods: {
    show () {
      this.showflag = true;
    }
  }
};
</script>

<style lang="less">
.food{ position: fixed; width: 100%; left: 0; top: 0; bottom: 48px; z-index: 30; background-color: #fff; transition: all 0.15s linear;
  &.moveLR-enter-active,.moveLR-leave-active{ transform: translateX(0);}
  &.moveLR-enter,.moveLR-leave-to{transform: translateX(100%);}
  .img-header{ width: 100%; position: relative; height: 0;padding-top: 100%}
}
</style>
