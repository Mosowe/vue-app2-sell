<template>
    <div id="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :class="{active : currentIndex === index}" @click="selectMenu(index)">
            <span class="text"><icon :icon="item.type" :styl="3" v-if="item.type>0"></icon>
            {{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="item in goods" class="foods-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li @click="selectFood(food)" v-for="food in item.foods" class="foodList">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <div class="desc">{{ food.description }}</div>
                  <div class="selrat">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="nowPrice">￥{{ food.price }}</span>
                    <span class="oldPrice" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cart-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcar :select-foods="selectFoods" :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcar>
      <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../../components/icon/icon.vue';
  import shopcar from '../../components/shopCar/shopCar.vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import food from '../../components/food/food.vue';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
    export default {
      components: {
        icon,
        food,
        shopcar,
        cartcontrol
      },
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: {
            type: Object
          },
          listHeight: [],
          scrollY: 0,
          selectedFood: {}
        };
      },
      created () {
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => { // 使用better-scroll需要在$nextTick之后
              this._initScroll();
              this._calculateHeight();
            });
          }
        });
      },
      computed: {
        currentIndex () {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        },
        selectFoods () {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
          });
        });
          return foods;
        }
      },
      methods: {
        _initScroll () { // 菜单与列表的联动
          this.menuScroll = new BScroll(this.$refs.menu, {
            click: true
          });
          this.foodsScroll = new BScroll(this.$refs.foods, {
            probeType: 3,
            click: true
          });
          this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight () {  // 将列表的每一栏目的高度用数组存放
          let foodList = this.$refs.foods.getElementsByClassName('foods-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        },
        selectMenu (index) {
          let foodlist = this.$refs.foods.getElementsByClassName('foods-list-hook');
          let act = foodlist[index];
          this.foodsScroll.scrollToElement(act, 300);
        },
        selectFood (food) {
          this.selectedFood = food;
          this.$refs.food.show();
        }
      }
    };
</script>

<style lang="less">
@import "../../common/less/resetFun";
  #goods{position: absolute; display: flex; width: 100%; top: 175px; bottom: 46px; overflow: hidden;
    .menu-wrapper{ flex: 0 0 80px; width: 80px; background: #f3f5f7;
      .menu-item{ display:table; height: 54px; width: 56px; line-height: 14px; padding: 0 12px;
        .text{ font-size: 12px; color: rgb(77, 85, 93); display: table-cell; vertical-align: middle; border-bottom: 1px solid rgba(7,17,27,0.1)}
        &.active{ background-color: #fff;margin-top: -1px; z-index: 2; font-weight: 700;
          .text{.border-none}
        }
      }
    }
    .foods-wrapper{ flex: 1;
      .title{ width: 100%; height: 26px; line-height: 26px; font-size: 12px; color: rgb(147,153,159); padding-left: 14px; box-sizing: border-box; border-left:2px solid #d9dde1; background-color: #f3f5f7 }
      .foodList{ display: flex; margin:0 18px;.border-1px();padding: 18px 0;
        &:last-child{ .border-none}
        .icon{ flex: 0 0 57px; margin-right: 10px; width: 57px;}
        .content{ flex: 1; position: relative;
          .name{ font-size: 14px; color: rgb(7,17,27); font-weight: normal; line-height: 14px; margin: 2px 0 8px 0}
          .desc,.selrat{ font-size: 10px; color: rgb(147,153,159);
            span:first-child{margin-right: 10px;}
          }
          .desc{ margin-bottom: 8px;}
          .nowPrice{ font-size: 14px; color: rgb(140,20,20); font-weight: 700; line-height:24px; margin-right: 8px;}
          .oldPrice{ font-size: 10px; color: rgb(147,153,159); text-decoration: line-through}
          .cart-wrapper{ position: absolute; right: 0; bottom: -8px;}
        }
      }
    }
  }
</style>
