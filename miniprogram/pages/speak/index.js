Page({
  data: {
    value: '',
    i18n: {
      wantSpeak: '你有什么想说的试试能不能在这里说',
      btnDesc: '说完了就点这里',
    },
  },
  onSave() {
    const { value } = this.data;
    const db = wx.cloud.database();
    db.collection('talks').add({
      data: {
        time: new Date().toString(),
        desc: value,
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: 'ok 你学会说话了',
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: '/pages/index/index',
          })
        },2000)
      },
    });
  },
  onInput(e) {
    console.log(e);
    const { value } = e.detail;
    this.setData({ value });
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '想说啥' })
  },

  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},
});
