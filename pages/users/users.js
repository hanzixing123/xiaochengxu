// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },  
//   login:function(li){
// console.log(li);

//       let _this=(this);
//     wx.login({
//       success(res){
//         if(res.code){
//           //发起请求
//           wx.request({
//               url:"http://hanzixing.yangwenlong.top/xcx/openid",
//               data:{
//                  user:li.detail.rawData,
//                 code:res.code
//               },
//               success:function(shang){  //接口回调  
//                 console.log(shang);
//                 wx.setStorage({// 储存
//                   key:"token",
//                   data:li.data[0].token,
//                 })
//               }

//           })
//           // 获取用户信息   
//           // wx.getUserInfo({
//           //   success: function(res) {
//           //     var userInfo = res.userInfo
//           //     var nickName = userInfo.nickName
//           //     var avatarUrl = userInfo.avatarUrl
//           //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
//           //     var province = userInfo.province
//           //     var city = userInfo.city
//           //     var country = userInfo.country
//           //   }
//           // })

         
//         }else{
//           console.log("登录失败"+res.errMsg);
//         }
//       }
//     })



//  },
 bindGetUserInfo: function(res)
 {
   //将用户信息保存在本地 storage
  //  console.log(res)
   let userinfo = res.detail.userInfo
   wx.setStorageSync('user', userinfo)

   let token = wx.getStorageSync('token')
   wx.login({
     success (res) {
      // console.log(res);

      if (res.code) {
         //发起网络请求
         wx.request({
           url: 'http://hanzixing.yangwenlong.top/xcx/openid',

           data:{
                user:userinfo,
                code:res.code
          },
           success: function(res){
            wx.setStorageSync('token',res.data.data.token) //获取登录时生成的token
              // console.log(res);
          }
         })
       } else {
         console.log('登录失败！' + res.errMsg)
       }
     }
   })
   this.setData({
     user: userinfo
   })
 },
 //跳转订单页面
 switchOrder:function()
 {
   wx.switchTab({
     url: '/pages/order/order',
   })
 },

 //跳转订单页面
 switchOrder:function()
 {
   wx.switchTab({
     url: '/pages/order/order',
   })
 },






  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
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

  }
})