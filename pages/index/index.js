//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height: 450,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sceneList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    this.getSceneList()
  },
  onLoad: function() {
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的useable高度
    this.setData({
      height: windowHeight - 100
    });
    console.log("onload...")
    if (app.globalData.userInfo) {
      console.log("判断app.globalData.userInfo是否为空" + app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log("否则判断this.data.canIUse")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getSceneList: function() {
    var that=this
    wx.request({
      url: app.globalData.host + '/getscenebyoid',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        originatorID: wx.getStorageSync("userInfo").openID
      },
      success: data => {
        console.log(data.data)
        that.setData({
          sceneList: data.data
        })
        console.log(that.data.sceneList)}
      })
  },
  getUserInfo: function(e) {
    console.log("调用了getUserInfo，接下来打印e")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", e.detail.userInfo)
    console.log("此时的app.globalData.userInfo=" + app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scene: function(e) {
    wx.navigateTo({
      url: '../scene/scene?sceneID=' + e.currentTarget.dataset.id
    })
  }
})