// pages/scene/scene.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: wx.getStorageSync('userInfo').nickName,
    avatarUrl: wx.getStorageSync("userInfo").avatarUrl,
    starttime: "2009/1/1 11:11:21",
    endtime: "2009/1/1 11:11:21",
    height: 1000,
    currentTab:0,
    ifRegister: true,
    ifbt: true,
    motto: "正在搜索附近的蓝牙信标..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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