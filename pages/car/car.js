const app = getApp()
const apiHost = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    goodsList:[],
    page:1
  
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

// console.log(isSelectAll);
    _this.setData({
      isSelectAll:isSelectAll,
    })

  }
})