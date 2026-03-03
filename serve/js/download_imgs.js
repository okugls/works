// download_imgs.js
// 复用like_imgs.js中的MySQL连接池
import  pool  from './like_imgs.js';

// 存储下载的图片URL（需先在数据库中创建download_records表）
export async function saveDownloadUrl(imgUrl, uid) {
  let connection;
  try {
    connection = await pool.getConnection();
    // 插入downloadimgs表（包含url和uid）
    const [result] = await connection.execute(
      'INSERT INTO downloadimgs (url, uid) VALUES (?, ?)',
      [imgUrl, uid]
    );
    return {
      success: true,
      insertId: result.insertId
    };
  } catch (err) {
    console.error('存储下载URL失败：', err.message);
    return {
      success: false,
      error: err.message
    };
  } finally {
    if (connection) connection.release();
  }
}
// 示例：假设在dbUtils.js中
export async function  getDownloadImgs(uid) {
  let connection;
  try {
    connection = await pool.getConnection();
    // 根据uid查询downloadimgs表中的url
    const [rows] = await connection.execute(
      'SELECT url FROM downloadimgs WHERE uid = ?',
      [uid]
    );
    // 提取url列表返回
    return rows.map(item => item.url);
  } catch (err) {
    console.error('查询下载图片失败', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};
