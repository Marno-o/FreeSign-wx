//index.js
//获取应用实例
const app = getApp()

Page({

  goToMypage: function (e) {
    wx.navigateTo({
      url: "../SceneTemple/SceneTemple"
    })
  },

  data: {
    contentHeight:500,
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput:true,
    newName:"",
    hasNearly:false,
    sceneId:"",
    theme:"",
    myWidth: -15
  },

  onShow: function() {
    this.ifLogin()
    this.setData({
      hasNearly: wx.getStorageSync("hasNearly"),
      sceneId: wx.getStorageSync("scenelit").sceneId,
      theme: wx.getStorageSync("scenelit").theme
    })
  },

  onLoad: function() {
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    let query = wx.createSelectorQuery();
    query.select('.topContent').boundingClientRect(rect => {
      let contantheight = windowHeight - rect.height - 100;
      this.setData({
        contentHeight: contantheight
      });
      console.log(">>>" + rect.height)
    }).exec();


    // this.ifLogin()
    // let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的useable高度
    // let windowWidth = wx.getSystemInfoSync().windowWidth; 
    // this.setData({
    //   height: windowHeight - 450*windowWidth/750,
    // });
  },

  ifLogin: function() {
    console.log("判断app.globalData.userInfo是否为空")
    console.log(app.globalData.userInfo)
    var that = this
    if (app.globalData.ifUserSign) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.redirectTo({
        url: '../userLogin/login?targrtIs=index',
      })
    }
  },

  //点击按钮弹出指定的hiddenmodalput弹出框 
  inputNewName: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  newName: function (e) {
    this.setData({
      newName: e.detail.value
    });
  },
  //取消按钮 
  cancelInput: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认 
  subInput: function (e) {
    if(this.data.newName == ""){
      wx.showModal({
        title: "不可为空",
        showCancel: false,
        confirmText: "OK"
      })
      return
    }
    this.setData({
      hiddenmodalput: true
    })
    wx.showLoading({
      title: '正在提交...',
    })
    var that = this
    wx.request({
      url: app.globalData.host +'/changeName',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        newName: this.data.newName,
        openId: app.globalData.userInfo.pkId
      },
      success: data => {
        app.globalData.userInfo = data.data.userInfo
        wx.setStorageSync("userInfo", app.globalData.userInfo)
        that.ifLogin()
        wx.hideLoading()
        wx.showModal({
          title: data.data.msg,
          showCancel: false,
          confirmText: "OK"
        })
      }
    })
  },

  getPosition(e){
    var that = this
    if (e.detail.scrollTop>5){
      that.setData({
        myWidth:-50
      })
    }else{
      that.setData({
        myWidth: -15
      })
    }
  },

  scene: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../SceneTemple/SceneTemple?mode=view&sceneId=' + e.currentTarget.dataset.id
    })
  },

  //跳转场景详细列表页面
  moreInfo:function(e){
    console.log(e.currentTarget.dataset.way)
    wx.navigateTo({
      url: '../detail/detail?way=' + e.currentTarget.dataset.way
    })
  }
})