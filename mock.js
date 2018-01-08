var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
  'bannar|3-5': [
    {
      'id|+1': 1,
      'bannar_img': '@image(320x140, @color)',
      'cids|4': [
        {
          'cid_id|+1': 1,
          'name': '@cword(3, 5)'
        }
      ],
      'products|30-50': [
        {
          // 子分类id
          'cidId|0-3': 10,
          'product_id|+1': 1,
          'product_img': '@image(168x168,@color)',
          'product_name': '@cword(2,8)',
          'price|1-99.1': 10,
          'unit|10-1000': 10
        }
      ]
    }
  ],
  'categories|20': [
    {
      // 分类id
      'id|+1': 1,
      // 分类的名称
      'name': '@cword(3, 5)',
      // 分类的图片
      'category_img': '@image(320x76, @color)',
      // 分类标题的颜色
      'color': '@color',
      // 子分类
      'cids|4': [
        {
          'name': '@cword(2,6)'
        }
      ],
      // 保存分类对应的商品数据
      'products': []
    }
  ],
  'products|200-400': [
    {
      // 商品id
      'id|+1': 1,
      // 商品对应的分类id
      'categoryId|1-20': 10,
      // 该商品对应的子分类下标
      'cidsIndex|0-3': 10,
      // 商品的图片
      'imgs': {
        // 列表页用的缩略图
        'min': '@image(80x80, @color, @cname)',
        // 详情页使用的大图
        'big': '@image(300x300, @color, @cname)'
      },
      // 商品的名称
      'name': '@cword(3,10)',
      // 商品的价格
      'price|1-100.1': 10,
      // 商品的单位
      'unit|10-1000': 10,
      // 商品的品牌
      'brand': '@cword(2, 6)',
      // 保质期
      'expiration_date|1-3.1': 10,
      // 商品的产地
      'place_of_origin': '@cword(2, 4)',
      // 数量
      'num': 0
    }
  ],
  // 用户信息表
  /* 
    {
      id,
      phone
    }
  */
  'users': [],
  // 购物车表
  /* 
    {
      id商品在购物中表的 id,
      商品的id product_id,
      用户id userId,
      商品的数量,
      商品的图片,
      商品的名称,
      商品的价格,
      是否选择
    }
  */
  'carts': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2), function () {
  console.log('写入成功')
})