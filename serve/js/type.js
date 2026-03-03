import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const _filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(_filename);
// 定义获取图片列表的函数
 function getTypeImages(type) {
  const imgDir = path.join(__dirname, '..','images', type);
  try {
    const files = fs.readdirSync(imgDir);
    // 过滤出图片文件（可根据实际后缀调整，如.jpg、.png等）
    const imgFiles = files.filter(file => 
      ['.jpg', '.png', '.jpeg','.webp'].includes(path.extname(file).toLowerCase())
    );
    // 返回图片路径列表（可根据前端需求调整为完整URL或相对路径）
   //return imgFiles.map(file => `/images/${type}/${file}`);
    const baseUrl = 'http://127.0.0.1:8080/';
    const absoluteImage=imgFiles.map(file => `images/${type}/${file}`).map(path => {
        return baseUrl + path.replace(/\\/g, '/');
    })
    return absoluteImage;
  } catch (err) {
    console.error('获取图片失败：', err);
    return [];
  }
}

export {getTypeImages};

