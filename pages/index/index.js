//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height: 450,
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sceneListReady: [],
    sceneListDone: []
  },

  onShow: function() {
    this.ifLogin()
    this.getSceneListReady()
    this.getSceneListDone()
  },

  onLoad: function() {
    this.ifLogin()
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的useable高度
    let windowWidth = wx.getSystemInfoSync().windowWidth; 
    this.setData({
      height: windowHeight - 450*windowWidth/750
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

  getSceneListReady: function() {
    var that = this
    if (app.globalData.ifUserSign){
      wx.request({
        url: app.globalData.host + '/getscenebyoid/ready',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          originatorID: app.globalData.userInfo.openId
        },
        success: data => {
          console.log(data.data)
          that.setData({
            sceneListReady: data.data
          })
          console.log(that.data.sceneListReady)
        }
      })
    }
  },

  getSceneListDone: function () {
    var that = this
    if (app.globalData.ifUserSign) {
      wx.request({
        url: app.globalData.host + '/getscenebyoid/done',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          originatorID: app.globalData.userInfo.openId
        },
        success: data => {
          console.log(data.data)
          that.setData({
            sceneListDone: data.data
          })
          console.log(that.data.sceneListDone)
        }
      })
    }
  },

  scene: function(e) {
    wx.navigateTo({
      url: '../scene/scene?sceneID=' + e.currentTarget.dataset.id
    })
  }
})