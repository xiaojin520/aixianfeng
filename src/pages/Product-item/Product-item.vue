<template>
  <div class="product-item">
    <HeaderGray :headerTitle="productInfo.name" back="true" />
    <div class="main">
      <div class="wraper">
        <div class="product-item-block">
          <div class="mod-banner-wrap-outer">
            <img v-lazy="productInfo.imgs.big">
          </div>
          <div class="mod-pub-product">
            <div class="product-title-no-short">
              <p class="product-name">{{productInfo.name}}</p>
            </div>
            <div class="product-shopping">
              <span class="product-price">￥<var>{{productInfo.price}}</var></span>
            </div>
          </div>
        </div>
        <div class="product-properties">
          <div class="title">商品详情</div>
          <div class="property-item">
            <span class="leading-word">品<span class="text-hidden">中中</span>牌</span>
            <span class="content-word">{{productInfo.brand}}</span>
          </div>
          <div class="property-item">
            <span class="leading-word">产品规格</span>
            <span class="content-word">{{productInfo.unit}}g</span>
          </div>
        </div>
      </div>
      <div class="product-properties">
        <div class="title">图文详情</div>
        <p>{{productInfo.details}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import HeaderGray from '@/components/Header-gray/Header-gray'
export default {
  // 当组件创建成功的时候执行,且执行一次
  activated () {
    // console.log(this.$route.params.id)
    // 获取商品的id
    let productId = this.$route.params.id
    this.$http.get(api.host + '/products/' + productId)
      .then(res => {
        // console.log(res.data)
        this.productInfo = res.data
      })
  },
  components: {
    HeaderGray
  },
  data () {
    return {
      productInfo: {
        imgs: {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main{
  bottom: 0;
}
.wraper{
  background-color: #f8f8f8;
  font-size: 1.4rem;
}
.product-item-block{
  margin-bottom: 0.5rem;
  background-color: #fff;
}
.mod-banner-wrap-outer{
  padding: 1rem;
}
.bannerContainer{
  width: 100%;
}
.product-name{
  padding: 0 1rem;
  color: #292d33;
  font-size: 2.3rem;
  line-height: 3rem;
  text-align: center;
  white-space: normal;
}
.product-shopping{
  padding: 1rem 0 3rem 0;
  text-align: center;
  color: #f40;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.9rem;
  var{
    font-size: 2.2rem;
    font-weight: 700;
  }
}
.product-properties{
  padding: 1.5rem;
}
.title{
  margin-bottom: 1.5rem;
  background: url('./images/title_bg.png') center center no-repeat;
  -webkit-background-size: auto .2rem;
  background-size: auto .2rem;
  text-align: center;
  color: #e0bd6a;
}
.product-properties{
  background-color: #fff;
  margin-bottom: .5rem;
}
.property-item{
  line-height: 3rem;
}
.leading-word{
  width: 4em;
  display: inline-block;
  color: #848c99;
}
.content-word{
  padding-left: 1.5rem;
  color: #333;
}
.product-properties{
  p{
    line-height: 1.5;
    color: #e53333;
    font-size: 14px;
  }
}
.mod-banner-wrap-outer{
  img{
    width: 30rem;
    height: 30rem;
  }
}
</style>


