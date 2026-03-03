import mysql from 'mysql2/promise';

// 数据库配置（注意：host不要加端口，端口单独写port字段）
const dbConfig = {
  host: '127.0.0.1',    // 地址
  port: 3306,           // 端口（单独配置）
  user: 'root',         // 用户名
  password: '123456',   // 密码
  database: 'uniapp-wallpaper' // 数据库名
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 测试连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
  } catch (err) {
    console.error('数据库连接失败:', err.message);
  }
}
testConnection();

// 封装：查询likeimgs表所有数据
export async function getLikeImgs(uid) {
  try {
    const [data] = await pool.query(
      'SELECT * FROM likeimgs WHERE islike = 1 AND uid = ?',
      [uid] // 只查当前用户的喜爱图片
    );
    return data;
  } catch (err) {
    throw new Error('查询失败：' + err.message);
  }
}

// 改造updateLikeStatus函数：新增uid参数
export async function updateLikeStatus(url, islike, uid) {
  try {
    // 1. 查询该用户下的该url是否已存在
    const [exist] = await pool.query(
      'SELECT * FROM likeimgs WHERE url = ? AND uid = ?',
      [url, uid] // 同时匹配url和uid
    );

    if (exist.length > 0) {
      // 2. 存在则更新islike
      await pool.query(
        'UPDATE likeimgs SET islike = ? WHERE url = ? AND uid = ?',
        [Number(islike), url, uid]
      );
      return { code: 200, msg: '状态更新成功' };
    } else {
      // 3. 不存在则新增（包含uid）
      await pool.query(
        'INSERT INTO likeimgs (url, islike, uid) VALUES (?, ?, ?)',
        [url, Number(islike), uid] // 插入时包含uid
      );
      return { code: 200, msg: '状态新增成功' };
    }
  } catch (err) {
    throw new Error('操作失败：' + err.message);
  }
}


// 导出连接池和操作函数
export default pool;
