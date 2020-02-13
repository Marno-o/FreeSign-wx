// pages/organize/organize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifdelay:false,
    timelong:30,
    height: 1000,
    currentTab:0,
    bt:true,
    motto:"正在搜索附近的蓝牙信标..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  ifdelay(e){
    this.setData({ ifdelay: e.detail.value })
  },

  settimelong(e){
    this.setData({ timelong: e.detail.value })
  },

  nextstep(e){
    this.setData({
      currentTab: e.target.dataset.current
    })
  }

})