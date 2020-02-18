// pages/userLogin/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targrtIs: ""
  },

  onLoad: function(options) {
    this.data.targrtIs = options.targrtIs
  },

  onShow:function(){
    if (app.globalData.ifUserSign) {
      wx.switchTab({
        url: '../menu/menu',
      })
    }
  },

  getUserInfo: function(e) {
    wx.showLoading({
      title: '登陆中...',
    })

    var that = this
    wx.login({
      success: r => {
        console.log("balabal.........")
        var code = r.code;
        wx.getUserInfo({
          success: res => {
            wx.request({
              url: app.globalData.host + '/usersign',
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              },
              success: data => {
                if (data.data.status == 0) {
                  wx.showToast({
                    title: '登录凭证code为空...',
                    icon: "none",
                    duration: 2500
                  })
                } else if (data.data.status == 1) {
                  app.globalData.userInfo = data.data.userInfo;
                  console.log(app.globalData.userInfo);
                  app.globalData.ifUserSign = true
                  wx.setStorageSync("userInfo", data.data.userInfo)
                } else if (data.data.status == 2) {
                  app.globalData.userInfo = data.data.userInfo;
                  app.globalData.ifUserSign = true
                  console.log(data.data.userInfo);
                  wx.setStorageSync("userInfo", data.data.userInfo)
                }
                var thatt = that
                wx.showModal({
                  title: '登陆成功',
                  showCancel: false,
                  confirmText: "好",
                  success: function (res) {
                    if (thatt.data.targrtIs == "") {
                      wx.navigateBack({
                        delta: 1
                      })
                    } else {
                      wx.navigateTo({
                        url: '/pages/' + thatt.data.targrtIs + '/' + thatt.data.targrtIs,
                      })
                    }
                  }
                })
              },
              fail: data => {
                console.log('系统错误')
              },
              complete:data=>{
                wx.hideLoading()
              }
            })
          }
        })
      }
    })
  }


  // else {
  //   // 在没有 open-type=getUserInfo 版本的兼容处理
  //   wx.getUserInfo({
  //     success: res => {
  //       app.globalData.userInfo = res.userInfo
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // }
})