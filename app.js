//app.js
App({

  globalData: {
    ifUserSign:false,
    userInfo: {},
    host: 'http://192.168.1.6:80'
  },


  onLaunch: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框")
          this.globalData.ifUserSign = true
          this.globalData.userInfo= wx.getStorageSync("userInfo")
          console.log(this.globalData.userInfo)
        }
      }
    })
  }
})