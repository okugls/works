// 1. 引入依赖：数据库连接池、uuid（生成唯一ID）
import pool from './like_imgs.js';
import { v4 as uuidv4 } from 'uuid'; // 生成唯一uid

// 2. 登录接口（随机生成唯一uid）
export default async (req, res) => {
  let connection;
  try {
    // 步骤1：获取前端传递的用户信息（昵称、头像）
    const { userInfo } = req.body;
    if (!userInfo) {
      return res.status(400).send({
        code: 400,
        msg: '参数缺失：userInfo不能为空'
      });
    }
    const { nickName, avatarUrl } = userInfo;


    // 步骤2：生成唯一uid（用uuidv4确保全局唯一）
    const uid = uuidv4(); // 生成类似 "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed" 的唯一ID


    // 步骤3：操作数据库（检查用户是否存在，存在则更新，不存在则新增）
    connection = await pool.getConnection();

    // 3.1 检查用户是否已存在（以昵称作为标识，也可调整为其他字段）
    const [existingUser] = await connection.execute(
      'SELECT * FROM users WHERE user = ?',
      [nickName]
    );

    let userData;
    if (existingUser.length > 0) {
      // 3.2 用户已存在：更新头像（uid保持不变）
      await connection.execute(
        'UPDATE users SET userimg = ? WHERE user = ?',
        [avatarUrl, nickName]
      );
      // 获取更新后的用户数据
      const [updatedUser] = await connection.execute(
        'SELECT * FROM users WHERE user = ?',
        [nickName]
      );
      userData = updatedUser[0];
    } else {
      // 3.3 用户不存在：插入新用户（包含随机生成的uid）
      await connection.execute(
        'INSERT INTO users (user, userimg, uid) VALUES (?, ?, ?)',
        [nickName, avatarUrl, uid]
      );
      // 获取新插入的用户数据
      const [newUser] = await connection.execute(
        'SELECT * FROM users WHERE user = ?',
        [nickName]
      );
      userData = newUser[0];
    }


    // 步骤4：返回结果给前端
    res.send({
      code: 200,
      msg: existingUser.length > 0 ? '登录成功' : '注册并登录成功',
      data: {
        userInfo: {
          nickName: userData.user,
          avatarUrl: userData.userimg,
          uid: userData.uid // 返回生成的唯一uid
        }
      }
    });

  } catch (err) {
    // 异常处理
    console.error('登录接口异常：', err);
    res.status(500).send({
      code: 500,
      msg: '服务器错误，请稍后再试'
    });
  } finally {
    // 归还数据库连接
    if (connection) connection.release();
  }
};
