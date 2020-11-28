const app = getApp()
const apiHost = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    goodsList:[],
    page:1,
    total:0,
  },

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车商品列表
    this.getCartList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取购物车商品列表
   */
  getCartList: function()
  {
    let _this = this;
    
    wx.request({
      url:"https://hanzixing.yangwenlong.top/xcx/car?token="+wx.getStorageSync('token'),
    
      success: function(d)
      {
        console.log(d);
        if(d.data.error==0)   //请求接口成功
        {
          _this.setData({
            goodsList:d.data.data
          })

        }else{
          console.log("接口请求错误")
        }

      }
    })
  },

  /**
   * 全选
   */
  selectAll:function()
  {
    let _this = this;
    let isSelectAll = !_this.data.isSelectAll;
    let total =0; 
    let list= _this.data.goodsList;

    list.forEach((value)=>{
      
      if(isSelectAll){ // 当前为  true 
        value.checked = true;
        total+= value.goods_num * value.goods_price;
      }else{
        value.checked=false;
      }

    })
// console.log(list);
    _this.setData({
      goodsList:list,
      isSelectAll:isSelectAll,
      total:total
    })

  },
  /*
    单选   
  */
  Select:function(res){
    // console.log(res);
    let id=res.target.dataset.id;
    let _this=this;
    let total=0;
    _this.data.goodsList.forEach( (value)=>{
      if(value.goods_id==id){
          value.checked=!value.checked;
      }
      if(value.checked){
         total+= value.goods_num * value.goods_price;
      }
    })
      _this.setData({
        total: total
      })

  },
  
  // 购物车加号
  incr:function(num){
    console.log(num);

    
  },
  // 购物车减号
  decr:function(num){
    // let num=num.target.dataset.num;
    let _this=this;
    let  list=this.data.goodsList;
    let  goods_id=num.target.dataset.id; // 获取当前点击商品在列表中的id
    let total=0;
    wx.request({
        url:"https://hanzixing.yangwenlong.top/xcx/car_decr?token="+wx.getStorageSync('token')+"&goods_id="+num.target.dataset.id+"&goods_num="+num.target.dataset.num,
        success:function(res){
          console.log(res);
          if(res.data.error==0){
            console.log(123);

            list.forEach((value)=>{
              if(value.goods_id==goods_id){
                 value.checked=true; 
                 value.goods_num-1;
                 total = (value.goods_num -1) * value.goods_price;
              }
             })
             _this.setData({
              goodsList:list,
              total:total,
              
             })


          }
       
        }

    })
  },
xiao:function(){
  wx.showToast({
    title: "最少购买一件",
    icon: 'loading',
    duration: 2000,
  });
},

 // 购物车  加号 
incr:function(num){
  let _this=this;
  let  list=this.data.goodsList;
  let  goods_id=num.target.dataset.id; // 获取当前点击商品在列表中的id
  let total=0;
  wx.request({
      url:"https://hanzixing.yangwenlong.top/xcx/car_incr?token="+wx.getStorageSync('token')+"&goods_id="+num.target.dataset.id+"&goods_num="+num.target.dataset.num,
      success:function(res){
        console.log(res);
        if(res.data.error==0){
          console.log(123);

          list.forEach((value)=>{
            if(value.goods_id==goods_id){
               value.checked=true; 
               value.goods_num+1;
               total = (value.goods_num +1) * value.goods_price;
            }
           })
           _this.setData({
            goodsList:list,
            total:total,  
           })


        }
     
      }

  })

},

// 购物车 input 框
// num:function(num){
//   let _this=this;
//   let  list=this.data.goodsList;
//   let  goods_id=num.target.dataset.id; // 获取当前点击商品在列表中的id
//   let total=0;
//   console.log(num);
//   // wx.request({
//   //     url:"https://hanzixing.yangwenlong.top/xcx/car_incr?token="+wx.getStorageSync('token')+"&goods_id="+num.target.dataset.id+"&goods_num="+num.target.dataset.num,
//   //     success:function(res){
//   //       console.log(res);
//   //       if(res.data.error==0){
//   //         console.log(123);

//   //         list.forEach((value)=>{
//   //           if(value.goods_id==goods_id){
//   //              value.checked=true; 
//   //              value.goods_num+1;
//   //              total =    * value.goods_price;
//   //           }
//   //          })
//   //          _this.setData({
//   //           goodsList:list,
//   //           total:total,  
//   //          })


//   //       }
     
//   //     }

//   // })

// },
  
// 删除
shan:function(){
  let _this=this;
  let goods_ids='';
  _this.data.goodsList.forEach( (value)=>{
    if(value.checked){  //即 选中的
       goods_ids+= value.goods_id+',';
    }
  })
  if(goods_ids==''){
    wx.showToast({
              title: "请先勾选",
              icon: 'loading',
               duration: 2000,
     });

  }else{
    wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success: function(res) {

            if (res.confirm) { // 点击了 确定
              wx.request({
                url:"http://hanzixing.yangwenlong.top/xcx/shan?goods_ids="+goods_ids+"&token="+wx.getStorageSync("token"),
                success:function(res){
                    if(res.data.error==0){
                        wx.showToast({
                             title: "删除成功",
                             icon: 'success',
                             duration: 2000,
                        });
                   }
                }
              })

            } else if (res.cancel) { // 点击了取消
              wx.showToast({
                title: "取消成功",
                icon: 'success',
                duration: 2000,
              });
            }
        }
    })
  }

  






}









})