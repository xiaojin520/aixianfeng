import http from 'axios'
import api from '@/api'
export default {
  // 对提交的手机号进行处理
  submit ({commit}, userObj) {
    // 验证手机号在数据库是否存在
    return http.get(api.host + '/users?phone=' + userObj.phone)
      .then(res => {
        // 判断这个接口是否返回了数据，如果返回就是存在，没返回就是没有这个手机号
        if (res.data.length > 0) {
          // 提取该用户的购物车数据
          http.get(api.host + '/users/' + res.data[0].id + '/carts')
            .then(res => {
              commit('SAVE_CARTS', res.data)
            })
          // 登陆成功，将用户信息保存到vuex的user状态下
          commit('LOGIN', res.data[0])
          return {"msg": "登陆成功"}
        } else {
          // 注册
          return http.post(api.host + '/users', userObj)
            .then(res => {
              if (res.data.id > 0) {
                // 注册成功将数据保存到vuex的state中，以备后用
                commit('LOGIN', res.data)
                return { "msg": "注册成功" }
              } else {
                return { "msg": "注册失败" }
              }
            })
        }
      })
  },
  // 添加到购物车的处理
  addCart (store, product) {
    if (product.cartBol) {
      // 更新数量,数量+1
      // 克隆一下本地购物车对应的商品
      let newLocalCartProduct = Object.assign({}, product)
      newLocalCartProduct.num++
      return http.patch(api.host + '/carts/' + newLocalCartProduct.id, {
        num: newLocalCartProduct.num
      })
        .then(res => {
          // 更改成功
          if (res.data.id > 0) {
            // 通知本地购物车更新
            store.commit('UPDATA_NUM', res.data.id)
            return { "msg": "更新数量成功" }
          } else {
            return { "msg": "更新数量失败" }
          }
        })
    }
    // 首先验证该商品在本地购物车中是否已经存在
    let localCarts = store.state.carts
    let user = store.state.user
    // 假设不存在，需要添加
    let addBol = true
    for (let i = 0; i < localCarts.length; i++) {
      // id->商品在购物车表中的id
      if (localCarts[i].product_id === product.id) {
        // 找到了，存在
        addBol = false
        // 更新数量,数量+1
        // 克隆一下本地购物车对应的商品
        let newLocalCartProduct = Object.assign({}, localCarts[i])
        newLocalCartProduct.num++
        // 更新数据库
        return http.patch(api.host + '/carts/' + newLocalCartProduct.id, {
          num: newLocalCartProduct.num
        })
          .then(res => {
            // 更改成功
            if (res.data.id > 0) {
              // 通知本地购物车更新
              store.commit('UPDATA_NUM', res.data.id)
              return {"msg": "更新数量成功"}
            } else {
              return {"msg": "更新数量失败"}
            }
          })
      }
    }
    if (addBol) {
      // 不存在，需要添加,构造需要添加到购物车中的商品对象
      /* 
        数据结构
        {
          商品在购物中表的 id,
          商品的id product_id,
          用户id user_id,
          商品的数量,
          商品的图片,
          商品的名称,
          商品的价格,
          是否选择
        }
      */
      let productToCartObj = {
        product_id: product.id,
        userId: user.id,
        product_img: product.imgs.min,
        product_name: product.name,
        product_price: product.price,
        checked: true,
        num: 1
      }
      // 添加到数据库中的购物车
      return http.post(api.host + '/carts', productToCartObj)
        .then(res => {
          if (res.data.id > 0) {
            // 添加成功
            // 添加到本地购物车中
            store.commit('ADD_CART', res.data)
            return {"msg": "添加成功"}
          } else {
            // 添加失败
            return {"msg": "添加失败"}
          }
        })
    }
  },
  // 从购车中减少数量
  subCart (store, product) {
    
    if (product.cartBol) {
      var productToCartId = product.id
      console.log(productToCartId)
    }
    let localCarts = store.state.carts
    // 循环遍历提取该商品在本地购物车中的id
    for (let i = 0; i < localCarts.length; i++) {
      if (product.id === localCarts[i].product_id) {
        // 获取该商品的购物车id，以方便更改
        var productToCartId = localCarts[i].id
      }
    }
    if (product.num > 1) {
      // 更改-》减少
      // 获取该商品在本地购物车中的id
      let newProduct = Object.assign({}, product)
      newProduct.num--
      // 发请求更新num数值
      return http.patch(api.host + '/carts/' + productToCartId, {
        num: newProduct.num
      })
        .then(res => {
          if (res.data.id > 0) {
            // 更新本地购物车
            store.commit('SUB_CART', res.data.id)
            return { "msg": "减少数量成功" }
          } else {
            return { "msg": "减少数量失败" }
          }
        })
    } else {
      // 从本地和数据库中删除该商品
      return http.delete(api.host + '/carts/' + productToCartId)
        .then(res => {
          // 先从本地购物车删除该商品
          store.commit('DEL_CART', productToCartId)
          return { "msg": "删除商品成功" }
        })
    }
  },
  changeChecked(store,product){
    //更新数据库中的商品的状态
   return http.patch(api.host+'/carts/'+product.id,{
     checked:!product.checked
   })
   .then(res=>{
    if(res.data.id>0){
      //更新本地购物车状态
      store.commit('CHANGE_CHECKED',product)
      return {"msg":"切换状态成功"}
    }else{
      return {"msg":"切换状态失败"}      
    }
   })
  },
  //购物车商品勾选状态全部取消
  checkedAllFalse(store){
    let user=store.state.user
   return http.patch(api.host+'/users/'+user.id+'/carts',{
      checked:false
    })
    .then(res=>{
      
    })
  },
   // 购物车商品勾选状态全部取消
   checkedAllFalse (store) {
    let carts = store.state.carts
    let completeNum = 0
    function promiseCheckedAllFalse () {
      return new Promise(function (resolve, reject) {
        for (let i = 0; i < carts.length; i++) {
          http.patch(api.host + '/carts/' + carts[i].id, {
            checked: false
          })
            .then(res => {
              completeNum++
              // 全部更改完成
              if (completeNum >= carts.length - 1) {
                resolve({"msg": "全部取消成功"})
              }
            })
        }
      })
    }
    return promiseCheckedAllFalse()
      .then(res => {
        // 更新本地购物车
        store.commit('CHECKED_ALL_FALSE')
        return res
      })
  },
  // 购物车商品勾选状态全部选中
  checkedAllTrue (store) {
    let carts = store.state.carts
    let completeNum = 0
    function promiseCheckedAllTrue() {
      return new Promise(function (resolve, reject) {
        for (let i = 0; i < carts.length; i++) {
          http.patch(api.host + '/carts/' + carts[i].id, {
            checked: true
          })
            .then(res => {
              completeNum++
              // 全部更改完成
              if (completeNum >= carts.length - 1) {
                resolve({ "msg": "全部勾选成功" })
              }
            })
        }
      })
    }
    return promiseCheckedAllTrue()
      .then(res => {
        // 更新本地购物车
        store.commit('CHECKED_ALL_TRUE')
        return res
      })
  }
}
