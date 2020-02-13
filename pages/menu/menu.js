// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:[
      {
        name:"蓝牙签到",
        url:"sign",
        pic:"src/2.jpg"
      },
      {
        name: "NFC签到",
        url:"src/2.jpg",
        pic: "src/2.jpg"
      },
      {
        name: "组织签到",
        url:"organize",
        pic: "src/2.jpg"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转链接
   */
  jumpToPage(e) {
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url,
    })
  }
})