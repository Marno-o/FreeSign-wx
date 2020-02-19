//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height: 450,
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput:true,
    newName:"",
    hasNearly:false,
    sceneID:"",
    theme:""
  },

  onShow: function() {
    this.ifLogin()
    this.setData({
      hasNearly: wx.getStorageSync("hasNearly"),
      sceneID: wx.getStorageSync("scenelit").sceneID,
      theme: wx.getStorageSync("scenelit").theme
    })
  },

  onLoad: function() {
    this.ifLogin()
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的useable高度
    let windowWidth = wx.getSystemInfoSync().windowWidth; 
    this.setData({
      height: windowHeight - 450*windowWidth/750,
    });
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
        url: '../userLogin/login',
      })
    }
  },

  //点击按钮痰喘指定的hiddenmodalput弹出框 
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
      url: app.globalData.host+'/changename',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        newName: this.data.newName,
        openId: app.globalData.userInfo.userID
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

  scene: function (e) {
    wx.navigateTo({
      url: '../scene/scene?sceneID=' + e.currentTarget.dataset.id
    })
  },

  moreInfo:function(e){
    console.log(e.currentTarget.dataset.way)
    wx.navigateTo({
      url: '../detail/detail?way=' + e.currentTarget.dataset.way
    })
  }
})