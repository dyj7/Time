Page({
  data: {
    value: '',
    i18n: {
      wantSpeak: '你有什么想说的试试能不能在这里说',
      btnDesc: '说完了就点这里',
    },
  },
  async onSave() {
    const tmplId = 'p5-PifVAtb-g6nmmjEZMqUx052L-5mdYL9LXEmFSVD8';
    const res = await wx.requestSubscribeMessage({
      tmplIds: [tmplId]
    })
    console.log(res)
    if(res[tmplId] === 'accept'){
      this.sendMessage()
    }else{
      await wx.showToast({
        title: '你将收不到消息提示',
      })
      this.sendMessage();
    }
  },
  sendMessage(){
    const { value } = this.data;
    if(!value){
      wx.showToast({
        title: '说点东西吧',
      })
      return;
    }
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
  },
});
