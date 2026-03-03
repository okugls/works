-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        11.7.2-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 uniapp-wallpaper 的数据库结构
CREATE DATABASE IF NOT EXISTS `uniapp-wallpaper` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `uniapp-wallpaper`;

-- 导出  表 uniapp-wallpaper.downloadimgs 结构
CREATE TABLE IF NOT EXISTS `downloadimgs` (
  `url` varchar(255) NOT NULL,
  `uid` varchar(50) NOT NULL,
  KEY `FK_downloadimgs_users` (`uid`),
  CONSTRAINT `FK_downloadimgs_users` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 数据导出被取消选择。

-- 导出  表 uniapp-wallpaper.likeimgs 结构
CREATE TABLE IF NOT EXISTS `likeimgs` (
  `url` varchar(255) NOT NULL DEFAULT '',
  `islike` int(11) NOT NULL DEFAULT 0,
  `uid` varchar(50) NOT NULL,
  KEY `FK_likeimgs_users` (`uid`),
  CONSTRAINT `FK_likeimgs_users` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='喜爱的图片\r\n';

-- 数据导出被取消选择。

-- 导出  表 uniapp-wallpaper.users 结构
CREATE TABLE IF NOT EXISTS `users` (
  `user` varchar(50) NOT NULL,
  `userimg` varchar(255) NOT NULL,
  `uid` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 数据导出被取消选择。

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
