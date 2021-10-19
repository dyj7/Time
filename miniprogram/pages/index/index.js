
import moment from '../../libs/moment.js';

Page({
  data: {
    talks:[]
  },
  onLoad() {
    wx.cloud.init();
    wx.setNavigationBarTitle({ title: '王娇专属' })
    const db = wx.cloud.database();
    db.collection('talks')
      .get({
        success:  (res) => {
          console.log(res);
          res.data.forEach(item=>{
            item.time =  moment(item.time).format('YYYY[年]MM[月]DD[日] HH:mm');
          })
          this.setData({ talks: res.data })
        },
      });
  },
});
