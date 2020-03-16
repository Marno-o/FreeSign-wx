// pages/SceneTemple/SceneTemple.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //基本信息
    mode: "view", //访问模式
    userInfo: {}, //浏览者信息
    startdate: "", //打开页面日期
    starttime: "", //打开页面时间
    contantHeight: 1000, //默认页面高度
    currentTab: 0,
    bluetoothopened: false,

    //新建场景信息
    date: "",
    time: "",
    timelong: 30,
    addressMeta: "custom",
    addressInfo: "点击选择地图上的地点",
    ifRegister: true,
    allowForward: true, //允许二次转发

    //蓝牙列表
    ifbt: true,
    blueToothList: [],
    scanning: false,
    motto: "正在搜索附近的蓝牙信标...",

    //查看场景信息
    sceneID: -1,
    sceneInfo: {},
    canDelete: false //判断是否拥有删除权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //如果已经登陆则获取信息
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    }

    //获取模式
    if (options.mode == "new") {
      that.setData({
        mode: options.mode,
      })
      if (!that.data.userInfo) {
        Error
      }
    } else {
      that.setData({
        mode: options.mode,
        sceneID: options.sceneID,
      })
      that.getSceneData(that.data.sceneID)
    }

    console.log(this.data.mode)
    //初始化屏幕容器高度
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    let query = wx.createSelectorQuery();
    query.select('.formHead').boundingClientRect(rect => {
      let contantheight = windowHeight - rect.height;
      this.setData({
        contantHeight: contantheight
      });
      console.log(">>>" + rect.height)
    }).exec();

    //获取当前时间
    this.getNowFormatDate()
  },

  /**
   * 自定义：获取场景信息
   */
  getSceneData(sceneID) {
    var that = this
    wx.request({
      url: app.globalData.host + '/getscenebysid',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sceneID: sceneID
      },
      success: data => {
        var thatt = that
        var scene = data.data
        console.log(data.data)
        //处理时间
        var d1 = new Date(scene.startTime)
        var d2 = new Date(scene.endTime)
        scene.startTime = d1.getFullYear() + '-' +
          (d1.getMonth() + 1 < 10 ? "0" + (d1.getMonth() + 1) : d1.getMonth() + 1) + '-' +
          (d1.getDate() < 10 ? "0" + d1.getDate() : d1.getDate()) + ' ' +
          (d1.getHours() < 10 ? "0" + d1.getHours() : d1.getHours()) + ':' +
          (d1.getMinutes() < 10 ? "0" + d1.getMinutes() : d1.getMinutes())
        scene.endTime = d2.getFullYear() + '-' +
          (d2.getMonth() + 1 < 10 ? "0" + (d2.getMonth() + 1) : d2.getMonth() + 1) + '-' +
          (d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate()) + ' ' +
          (d2.getHours() < 10 ? "0" + d2.getHours() : d2.getHours()) + ':' +
          (d2.getMinutes() < 10 ? "0" + d2.getMinutes() : d2.getMinutes())
        //判断删除权限
        var imade = false
        if (that.data.userInfo) {
          if (scene.originatorID == thatt.data.userInfo.userID) {
            imade = true
          }
        }
        //设置数据
        that.setData({
          sceneInfo: scene,
          canDelete: imade
        })
        //把浏览记录缓存在本地
        var scenelit = {
          sceneID: scene.sceneID,
          theme: scene.theme
        }
        var hasNearly = true
        wx.setStorageSync("scenelit", scenelit)
        wx.setStorageSync("hasNearly", hasNearly)
      }
    })
  },

  /**
   * 自定义：获取当前时间
   */
  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    var currenttime = hour + seperator2 + minute;
    this.setData({
      starttime: currenttime,
      time: currenttime,
      startdate: currentdate,
      date: currentdate
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getBluetoothStatus();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this
    if (this.data.mode != "new") {
      var thatt = that
      // 设置转发内容
      var sendmsg = that.data.sceneInfo.userName + "邀请你参加" + that.data.sceneInfo.theme
      if (that.data.sceneInfo.message) {
        sendmsg = sendmsg + ", " + thatt.data.sceneInfo.message
      }
      console.log(sendmsg)
      var shareObj = {
        title: sendmsg,
        path: '/pages/scene/scene?sceneID=' + that.data.sceneID,
      };
      return shareObj
    }
  },

  //需要报名
  ifRegister: function(e) {
    this.setData({
      ifRegister: e.detail.value,
      allowForward: true
    })
  },

  //报名按钮
  register(e) {
    if (!userInfo) {
      wx.showModal({
        title: '请先登录再报名',
        showCancel: false,
        confirmText: "OK",
        success: function() {
          wx.navigateTo({
            url: '../userLogin/login',
          })
        }
      })
    } else {
      wx.request({
        url: '',
      })
    }
  },

  //二次转发
  allowForwardChange: function(e) {
    this.setData({
      allowForward: e.detail.value
    })
  },

  /**
   * 改变日期
   */
  dateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 改变时间
   */
  timeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  // 设置时长
  settimelong(e) {
    this.setData({
      timelong: e.detail.value
    })
  },

  // swiper跳转
  nextstep(e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },


  // 地图模式发生改变
  changeAddressMeta: function(e) {
    var that = this
    if (e.detail.value == "getFromMap") {
      //可能需要弹窗提示
    }
    this.setData({
      addressMeta: e.detail.value
    })
    console.log('address发生change事件，携带value值为：', e.detail.value)
  },

  // 签到方式发生改变
  modeChange: function(e) {
    var that = this
    that.setData({
      ifbt: e.detail.value
    })
    if (e.detail.value == 1) {
      that.openBluetoothAdapter();
      console.log(that.data.ifbt)
    } else {
      that.closeBluetoothAdapter()
      console.log(that.data.ifbt)
    }
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //删除场景
  deleteIt(e) {
    wx.showModal({
      title: '是否删除',
      content: "此操作不可撤销",
      confirmText: "删除",
      cancelText: "取消",
      success: function() {
        wx.request({
          url: app.globalData.host + '/deleteit',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            sceneID: options.sceneID
          },
          success: data => {
            if (data.data == 1) {
              wx.showToast({
                title: '删除成功',
              })
              wx.navigateTo({
                url: '../index/index',
              })
            } else {

            }

          }

        })

      }
    })
  },

  signOnIBeacons() {
    wx.openBluetoothAdapter({
      success: function(res) {
        wx.showModal({
          title: '正在确认信标位置',
          content: '请稍候',
        })
        // 开始扫描
        wx.startBeaconDiscovery({
          uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],
          success: function() {
            console.log("开始扫描设备...");
            // 监听iBeacon信号
            wx.onBeaconUpdate(function(res) {
              console.log(res.beacons)
              var beacons = res.beacons;
              console.log(beacons[0].proximity)
              console.log(beacons[0].accuracy)
              console.log(beacons[0].rssi)
              if (beacons[0].accuracy < 10) {
                wx.hideLoading()
                wx.showModal({
                  title: '签到成功',
                  content: '时间',
                })
                wx.offBeaconUpdate()
                wx.stopBeaconDiscovery()
              }
            });
          }
        });

        // 超时停止扫描
        setTimeout(function() {
          wx.stopBeaconDiscovery({
            success: function() {
              console.log("停止设备扫描！");
              console.log(devices);
              wx.showModal({
                title: '未找到信标，请确认是否到到指定地点',
                content: '',
              })
            }
          });
        }, 5 * 1000);
      },
      fail: function() {
        wx.showModal({
          title: '请打开设备蓝牙'
        })
      }
    })
    wx.closeBluetoothAdapter()
  }
})