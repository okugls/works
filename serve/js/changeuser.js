import pool from './like_imgs.js'; 
export default async (req, res) => {
  let connection;
  try {
    const { avatar, nickname, uid } = req.body;
    if (!uid || !nickname) {
      return res.status(400).send({
        success: false,
        msg: '参数缺失：uid和nickname不能为空'
      });
    }

    // 2. 连接数据库，执行更新操作
    connection = await pool.getConnection();
    await connection.execute(
      'UPDATE users SET userimg = ?, user = ? WHERE uid = ?',
      [avatar, nickname, uid] 
    );

    // 3. 返回成功结果
    res.send({
      success: true,
      msg: '修改成功'
    });
  } catch (err) {
    console.error('修改用户信息异常：', err);
    res.status(500).send({
      success: false,
      msg: '服务器错误，请稍后再试'
    });
  } finally {
    // 释放数据库连接
    if (connection) connection.release();
  }
};
