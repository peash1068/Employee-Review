/*
SQLyog Enterprise - MySQL GUI v8.14 
MySQL - 5.5.19 : Database - employeereview
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`employeereview` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci */;

USE `employeereview`;

/*Table structure for table `tbl_assignment` */

DROP TABLE IF EXISTS `tbl_assignment`;

CREATE TABLE `tbl_assignment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_list` int(10) DEFAULT NULL,
  `assigned_to` int(10) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_assignment` */

insert  into `tbl_assignment`(`id`,`emp_list`,`assigned_to`,`updated_at`) values (9,5,17,'2018-05-26 10:09:08'),(10,17,5,'2018-05-26 10:09:21'),(11,1,17,'2018-05-26 10:10:43'),(13,5,1,'2018-05-26 10:26:47');

/*Table structure for table `tbl_emp` */

DROP TABLE IF EXISTS `tbl_emp`;

CREATE TABLE `tbl_emp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `emp_id` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `role` int(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_emp` */

insert  into `tbl_emp`(`id`,`emp_name`,`email`,`password`,`emp_id`,`role`,`updated_at`) values (1,'Rahat Mahmud','admin@gmail.com','1234','E001',1,'2018-05-26 03:54:43'),(5,'Karim Miah','karim@gmail.com','2345','E002',0,'2018-05-26 04:40:39'),(17,'Sajib Mia','sajib@gmail.com','1234','E003',0,'2018-05-26 04:43:22');

/*Table structure for table `tbl_review` */

DROP TABLE IF EXISTS `tbl_review`;

CREATE TABLE `tbl_review` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_unq_id` int(10) DEFAULT NULL,
  `reviewer_unq_id` int(10) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `review` text COLLATE utf8_swedish_ci,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_review` */

insert  into `tbl_review`(`id`,`emp_unq_id`,`reviewer_unq_id`,`rate`,`review`,`updated_at`) values (13,5,1,8.5,'Excellent Worker, Works hard.','2018-05-26 04:08:43'),(14,17,5,7,'Good team worker. Efficient.','2018-05-26 04:13:05'),(18,5,17,7,'Team player.','2018-05-26 04:23:51'),(19,1,17,9,'Good.','2018-05-26 04:24:50');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
