export default {
  SAVE_COMPUTED_CATEGORIES (state, data) {
    state.computedCategories = data
  },
  // 注册
  LOGIN (state, data) {
    state.user = data
  },
  // 本地购物车没有这个商品的时候的处理
  ADD_CART (state, data) {
    state.carts.push(data)
  },
  // 更新本地购物车商品的数量-增加
  UPDATA_NUM (state, id) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === id) {
        state.carts[i].num++
        break
      }
    }
  },
  // 更新本地购物车商品的数量-减少
  SUB_CART (state, id) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === id) {
        state.carts[i].num--
        break
      }
    }
  },
  // 从本地购物车中删除商品
  DEL_CART (state, id) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === id) {
        state.carts[i].num = 0
        // state.carts.splice(i, 1)
        break
      }
    }
  },
  // 保存从数据库中获取的购物车数据
  SAVE_CARTS (state, data) {
    // 是将数据库中的购物车数据添加到本地购物车中
    state.carts = data
    // 更新本地的原始数据的num?
    let computedCategories = state.computedCategories
    for (let i = 0; i < computedCategories.length; i++) {
      let products = computedCategories[i].products
      for (let j = 0; j < products.length; j++) {
        for (let z = 0; z < data.length; z++) {
          if (products[j].id === data[z].product_id) {
            products[j].num = data[z].num
            break
          }
        }
      }
    }
  }
}
