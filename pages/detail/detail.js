// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addLike:0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
    imgs:[],
    num:0,
    goods_num:1,
     minusStatus: 'disabled',
    // goods_nums:0
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src; //图片路径
      // console.log(e);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgs // 需要预览的图片http链接列表  
    })
    // console.log(this.data.imgs);   // 图集

  },
  //  加入购物车
  addCar:function(res){
   let  _this=this
    wx.request({
      url:"http://hanzixing.yangwenlong.top/xcx/addCar",
      data:{
        goods_id:res.target.dataset.id,
        goods_num:res.target.dataset.num,
        token:wx.getStorageSync('token')    //获取值
      },
    success:function(res){

      wx.showToast({
        title: res.data.data,
        icon: res.data.error==0 ? 'success':'loading',
        duration: 2000,
        // mask:false
      });
    
      },
   
    })
    // console.log(this.data.err);
    // console.log(res.target.dataset.num);
    // console.log(res.target.dataset.id);

  },
//  商品 详情  加减

	/* 点击减号 */
	bindMinus: function() {
    var goods_num = this.data.goods_num;
    // console.log(this);
		// 如果大于1时，才可以减
		if (goods_num > 1) {
			goods_num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = goods_num <= 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			goods_num: goods_num,
			minusStatus: minusStatus
		});
	},
	/* 点击加号 */
	bindPlus: function() {
    var goods_num = this.data.goods_num;
    var goods_nums=this.data.goods_nums;
		// 不作过多考虑自增1
		goods_num ++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    console.log(this.data.goods_nums);
		var minusStatus = goods_num < 1 /*&& goods_num > goods_nums*/  ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			goods_num: goods_num,
			minusStatus: minusStatus
		});
	},
	/* 输入框事件 */
	bindManual: function(e) {
		var goods_num = e.detail.value;
		// 将数值与状态写回
		this.setData({
			goods_num: goods_num
		});
	},
  // 收藏
  addLike(lishang) {
       // let lishang=1;
       let _this =this;
      wx.request({
        url:"http://hanzixing.yangwenlong.top/xcx/shocang?token="+wx.getStorageSync('token')+"&goods_id="+lishang.target.dataset.goods_id,


        success:function(res){
              _this.setData({
                  addLike:res.data.error_no
              });
              console.log(res);
    wx.showToast({
        title: _this.data.addLike==0?'取消收藏成功':'收藏成功',
        icon: _this.data.addLike==0 ? 'loading':'success',
        duration: 2000,
      });
        }
      });







      
      // console.log(this.data.addLike);

    
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/car/car'
    })
  },
  //跳转 首页
  index() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'loading',
      duration: 2000
    });
  },
// 客服
kefu() {
  wx.showToast({
    title: '当前功能未开发.....',
    icon: 'close',
    duration: 2000
  });
},
  
  /**
   * 生命周期函数--监听页面加载
   */
 num:function(num){
  //  console.log(num.detail.current);
   this.setData({
     num:num.detail.current
   })
 },


  onLoad: function (options) {
    let _this=(this);
    let goods_id=options.goods_id;
    wx.request({
      url:"http://hanzixing.yangwenlong.top/xcx/xiangqing",
      data:{
        goods_id:goods_id
      },
      success:function(res){
        // console.log(res);
        _this.setData({
            goods:res.data.data,
            imgs:res.data.imgs,
            // goods_nums:res.data.data.goods_store   // 商品库存
        })

      }


    });

    wx.request({
      url:"http://hanzixing.yangwenlong.top/xcx/shocangs?token="+wx.getStorageSync('token')+"&goods_id="+options.goods_id,

      success:function(res){
        console.log(res);
        console.log(123);
        _this.setData({
          addLike:res.data.error
        })
      //  let _this.data.addLike=res.data.error
      }


    });







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