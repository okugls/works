//随机8张图片
import fs from 'fs';
import path from 'path';
// 图片主文件夹路径
const imageFolder = 'images';
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp']; // 支持的图片格式
let allImages = [];
// 递归遍历文件夹获取所有图片路径
function traverseFolder(folderPath) {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(folderPath, file.name);
        if (file.isDirectory()) {
            traverseFolder(filePath); // 递归处理子文件夹
        } else if (imageExts.some(ext => file.name.toLowerCase().endsWith(ext))) {
            allImages.push(filePath); // 收集图片路径
        }
    }
}
traverseFolder(imageFolder);

// 随机选取8张图片
function getimg_8() {
    let selectedImages = [];
    if (allImages.length >= 8) {
        selectedImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 8);
    } else {
        selectedImages = allImages;
        console.warn('图片总数不足8张，已选取全部图片');
    }
    const baseUrl = 'http://127.0.0.1:8080/';
    const absoluteImage= selectedImages.map(path => {
        return baseUrl + path.replace(/\\/g, '/');
    });
    return absoluteImage;
    // 输出结果
    /* selectedImages.forEach(imgPath => {
        console.log(imgPath);
    }); */
}
export {getimg_8}
