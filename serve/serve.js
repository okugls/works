import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getimg_8 } from './js/img_8.js';
import { getTypeImages } from './js/type.js';
import { getLikeImgs, updateLikeStatus } from './js/like_imgs.js';
import {saveDownloadUrl,getDownloadImgs} from './js/download_imgs.js'
import changeUser from './js/changeuser.js';
import login from './js/login.js';
var app = express();
app.use(cors({
  origin: '*',
  allowedHeaders: 'X-Required-Width,Content-type',
  methods: 'PUT ,POST, GET ,DELETE,OPTIONS',
  exposedHeaders:'Content-Disposition'
}))
app.use('/images', express.static('images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get_img_8', function (req, res) {
  let imgs_8 = getimg_8();
  //console.log(imgs_8);
  res.send(imgs_8);
})
app.get('/get_type', function (req, res) {
  const { type } = req.query;
  const typeImgs = getTypeImages(type);
  //console.log(typeImgs);
  res.send(typeImgs);
})
app.post('/like', async (req, res) => {
  try {
    const { url, islike, uid } = req.body; 
    const result = await updateLikeStatus(url, islike, uid);
    res.json({ code: 200, data: result });
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message });
  }
});
app.get('/like', async (req, res) => {
  try {
    const uid = req.query.uid; 
    const data = await getLikeImgs(uid);
    res.json({ code: 200, data: data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message });
  }
});

app.post('/download', async (req, res) => {
  try {
    const { imgUrl, uid } = req.body;
    if (!imgUrl) {
      return res.send({ success: false, error: '图片URL不能为空' });
    }
    const result = await saveDownloadUrl(imgUrl, uid);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
});
app.get('/download', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.json({ code: 400, msg: '缺少uid参数' });
    }
    // 调用查询方法
    const data = await getDownloadImgs(uid);
    res.json({ code: 200, data: data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message });
  }
});

app.post('/login',login);
app.post('/changeUser',changeUser);
var server = app.listen(8080, function () {
  console.log("应用实例，访问地址为 http://127.0.0.1:8080")

})