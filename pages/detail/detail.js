// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    way: "",
    height: 1000,
    current: 0,
    sceneListReady: [],
    sceneListDone: [],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
        height: wx.getSystemInfoSync().windowHeight,
        way : options.way
    });
    console.log(options.way)
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
    if (this.data.way == "organized"){
      this.getSceneListReady()
      this.getSceneListDone()
    } else if (way == "registed"){
      //找已报名的
    }
    
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

  getSceneListReady: function() {
    var that = this
    if (app.globalData.ifUserSign) {
      wx.request({
        url: app.globalData.host + '/getscenebyoid/ready',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          originatorID: app.globalData.userInfo.userID
        },
        success: data => {
          console.log(data.data)
          if (data.data){
            that.setData({
              current: 1
            })
          }else{
            that.setData({
              sceneListReady: data.data
            })
          }
          console.log(that.data.current)
        }
      })
    }
  },

  getSceneListDone: function() {
    var that = this
    if (app.globalData.ifUserSign) {
      wx.request({
        url: app.globalData.host + '/getscenebyoid/done',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          originatorID: app.globalData.userInfo.userID
        },
        success: data => {
          console.log(data.data)
          that.setData({
            sceneListDone: data.data
          })
          console.log(that.data.sceneListDone)
        }
      })
    }
  },

  scene: function(e) {
    wx.navigateTo({
      url: '../scene/scene?sceneID=' + e.currentTarget.dataset.id
    })
  }
})