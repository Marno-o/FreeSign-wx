// pages/menu/menu.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
        name: "蓝牙签到",
        url: "sign",
        pic: "src/bluetooth.png"
      },
      {
        name: "NFC签到",
        url: "sbn",
        pic: "src/NFC.png"
      },
      {
        name: "组织签到",
        url: "SceneTemple",
        pic: "src/organize.png"
      }
    ],
    itemHeight: "",
    marginHeight: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    var itemHeight = windowHeight * 0.3
    var marginHeight = windowHeight * 0.05
    this.setData({
      itemHeight: itemHeight,
      marginHeight: marginHeight
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

  /**
   * 跳转链接
   */
  jumpToPage(e) {
    console.log(app.globalData.ifUserSign)
    if (app.globalData.ifUserSign) {
      wx.navigateTo({
        url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url + "?mode=new",
      })
    } else {
      wx.showModal({
        title: '请先登录',
        showCancel: false,
        confirmText: "好",
        success: function(res) {
          wx.redirectTo({
            url: '../userLogin/login?targrtIs=' + e.currentTarget.dataset.url,
          })
        }
      })
    }
  }
})