//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        console.log(" ====>  调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。");
        console.log(" ====>  code:" + code);
        wx.getUserInfo({
          success: res => {
            console.log(" ====>  获取用户信息成功");
            wx.request({
              // url: app.server.hostUrl + '/usersign',
              method: 'post',
              header: {},
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              },
              success: data => {
                wx.getStorage({
                  key: 'userInfo',
                  data: data.data.userInfo,
                })
                if (data.data.code == 1) {
                  var userInfo_ = data.data.userInfo;
                  // app.globalData.userInfo = userInfo_
                  that.setData({
                    getUserInfoFail: false,
                    userInfo: userInfo_,
                    hasUserInfo: true
                  })
                  thist.setData({
                    datas: userInfo_,
                    index: 1
                  })
                  console.log(userInfo_)
                  that.onLoad();
                } else {
                  console.log('解密失败')
                }
              },
              fail: data => {
                console.log('系统错误')
              }
            })
          },
          fail: res => {
            console.log(res);
            that.setData({
              getUserInfoFail: true
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})