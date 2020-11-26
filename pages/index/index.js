//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello 离殇',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      list:[],
      page:1,
      pagesize:10,
      bian:0,
  },
//轮播图 变色




  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this =(this);
     this.GoodsList();
 wx.request({ //导航栏
  url: 'http://hanzixing.yangwenlong.top/xcx/daohang', //仅为示例，并非真实的接口地址
 success:function(dao) {
   console.log(dao);
   _this.setData({
     daohang:dao.data.data
    
   });
 },
 fail:function(){
   console.log("请求失败");
 }
})
wx.request({//轮播图
  url:"http://hanzixing.yangwenlong.top/xcx/luen",
  success:function(luen){
    console.log(luen);
  _this.setData({
      luen:luen.data.data
  })
},
})
  },
cate:function(res){
    let _this=this;
      _this.data.page=1;
    // console.log(res.target.dataset.cate_id);
 
  //     let  list=[];
      // this.data.list=[];
  // let cate_id=res.target.dataset.bian;
   wx.request({ 
    url: 'http://hanzixing.yangwenlong.top/xcx/list2', //仅为示例，并非真实的接口地址
    data:{
          cate_id:res.target.dataset.cate_id
    },
    success:function(dao) {
     console.log(dao);
     _this.setData({
       list:dao.data.data,
       bian:res.target.dataset.cate_id
     });
   },
   fail:function(){
     console.log("请求失败");
   }



  })

},




//页面上拉处理事件的处理函数

onReachBottom:function(){

   this.data.page++;
  this.GoodsList();

},

//封装 调用 后台 商品列表接口

 GoodsList:function(){
    let _this=this;
    console.log(this.data.bian)
 wx.request({ //商品列表
     url: 'http://hanzixing.yangwenlong.top/xcx/list', //仅为示例，并非真实的接口地址
        data:{
            page: _this.data.page,
            pagesize:_this.data.pagesize,
            cate_id:this.data.bian
        },
     success:function(res) {
      // console.log(res);
     let  _list=_this.data.list.concat(res.data.data.data)
     _this.setData({
        list:_list
     }); 
    },
    fail:function(){ console.log("请求失败"); }
  })
} 

})
