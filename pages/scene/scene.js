// pages/scene/scene.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    theme: "",
    hoster: "",
    starttime: "2009/1/1 11:11:21",
    endtime: "2009/1/1 11:11:21",
    address: "",
    ifRegister: 2,
    mymessage: "",
    mode: 1,
    height: 1000,
    currentTab: 0,
    ifRegister: true,
    ifbt: true,
    motto: "..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sceneID = options.sceneID
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.request({
      url: app.globalData.host + '/getscenebysid',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sceneID: options.sceneID
      },
      success: data => {
        console.log(data.data)
        var d1 = new Date(data.data.startTime)
        var startTime = d1.getFullYear() + '-' + (d1.getMonth() + 1 < 10 ? "0" + (d1.getMonth() + 1) : d1.getMonth() + 1) + '-' + (d1.getDate() < 10 ? "0" + d1.getDate() : d1.getDate()) + ' ' + (d1.getHours() < 10 ? "0" + d1.getHours() : d1.getHours()) + ':' + (d1.getMinutes() < 10 ? "0" + d1.getMinutes() : d1.getMinutes())
        var d2 = new Date(data.data.endTime)
        var endTime = d2.getFullYear() + '-' + (d2.getMonth() + 1 < 10 ? "0" + (d2.getMonth() + 1) : d2.getMonth() + 1) + '-' + (d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate()) + ' ' + (d2.getHours() < 10 ? "0" + d2.getHours() : d2.getHours()) + ':' + (d2.getMinutes() < 10 ? "0" + d2.getMinutes() : d2.getMinutes())
        that.setData({
          theme: data.data.theme,
          hoster: data.data.hoster,
          starttime: startTime,
          endtime: endTime,
          address: data.data.address,
          ifRegister: data.data.ifRegister,
          mymessage: data.data.message,
          mode: data.data.mode,
        })
        console.log(that.data)
      }
    })
    console.log(wx.getStorageSync('userInfo'))
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    console.log(windowHeight)
    let query = wx.createSelectorQuery();
    var that = this
    query.select('.formHead').boundingClientRect(rect => {
      let contheight = windowHeight - rect.height;
      that.setData({
        height: contheight
      });
    }).exec();
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

  },

  nextstep(e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },

  register(e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },

})