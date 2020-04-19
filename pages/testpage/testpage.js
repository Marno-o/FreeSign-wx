// pages/testpage/testpage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sceneID: 0,
    major: 10001,
    minor: 19641
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sceneID = options.sceneID;
    var flag = getiBeaconInfo(sceneID)
    if(flag){
      this.signThisBeacons()
    }else{
      //获取失败
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getiBeaconInfo(sceneID){
    this.setData({
      // sceneID: options.sceneID,
      // major: options.major,
      // minor: options.minor
      sceneID: 20202204411,
      major: 10001,
      minor: 19641
    })
    return true;
  },

  signThisBeacons() {
    var that = this
    wx.openBluetoothAdapter({
      success(e) {
        wx.showLoading({
          title: '正在确认信标位置',
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '请打开蓝牙',
          confirmText: "OK",
          showCancel: false,
          success(e) {
            wx.switchTab({
              url: '/pages/menu/menu'
            })
          }
        })
      },
    })
    // 开始扫描
    wx.startBeaconDiscovery({
      uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825']
    });
    // 超时停止扫描
    setTimeout(function() {
      var major = that.data.major
      var minor = that.data.minor
      var sceneID = that.data.sceneID
      if (major == 0 || minor == 0 || sceneID == 0) {
        wx.showModal({
          title: '信息无效',
          content: "请检查网络连接",
          confirmText: "OK",
          showCancel: false,
          success(e) {
            wx.switchTab({
              url: '/pages/menu/menu'
            })
          }
        })
      } else {
        var thatt = that
        wx.getBeacons({
          success: (res) => {
            var beacons = res.beacons;
            console.log(res.beacons.length)
            for (var i = 0; i < beacons.length; i++) {
              var thattt = that
              if (beacons[i].major == major && beacons[i].minor == minor) {
                wx.hideLoading()
                thattt.signThis(sceneID)
                wx.stopBeaconDiscovery()
                break;
              }
              if (i == beacons.length - 1) {
                wx.stopBeaconDiscovery({
                  success: function() {
                    wx.hideLoading()
                    wx.showModal({
                      title: '未找到信标，请确认是否到到指定地点',
                      confirmText: "OK",
                      showCancel: false,
                      success(e) {
                        wx.switchTab({
                          url: '/pages/menu/menu'
                        })
                      }
                    })
                  }
                });
              }
            }
          }
        })
      }
    }, 2000);
  },

  signThis(e) {
    console.log(" ====>  开始签到");
    console.log(app.globalData.host + '/btsign');
    wx.showLoading({
      title: '正在签到...',
    })
    wx.request({
      url: app.globalData.host + '/btsign',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        btId: e,
        memberId: app.globalData.userInfo.userID
      },
      success: data => {
        wx.hideLoading()
        console.log(data)
        console.log(" ====>  获取服务器返回的结果");
        if (data.data.status == 1) {
          wx.showModal({
            title: data.data.msg,
            showCancel: false,
            confirmText: "Nice！",
            success: function(res) {
              wx.redirectTo({
                url: '../scene/scene' + "?sceneID=" + sceneID,
              })
            }
          })
        } else {
          wx.showModal({
            title: '签到失败',
            content: data.data.msg,
            showCancel: false,
            confirmText: "OK",
            success(e) {
              wx.switchTab({
                url: '/pages/menu/menu'
              })
            }
          })
        }
      },
      fail: data => {
        wx.hideLoading()
        wx.showModal({
          title: '网络错误',
          showCancel: false,
          confirmText: "Fxxx！",
          success(e) {
            wx.switchTab({
              url: '/pages/menu/menu'
            })
          }
        })
      }
    })
  },
})