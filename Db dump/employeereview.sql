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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_assignment` */

insert  into `tbl_assignment`(`id`,`emp_list`,`assigned_to`,`updated_at`) values (2,1,8,'2018-05-24 15:23:00'),(4,8,5,'2018-05-24 18:18:20'),(5,1,5,'2018-05-24 19:26:23'),(6,10,5,'2018-05-24 20:53:18');

/*Table structure for table `tbl_emp` */

DROP TABLE IF EXISTS `tbl_emp`;

CREATE TABLE `tbl_emp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `emp_id` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `role` int(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_emp` */

insert  into `tbl_emp`(`id`,`emp_name`,`password`,`emp_id`,`role`,`updated_at`) values (1,'admin','1234','E001',1,'2018-05-23 16:51:26'),(5,'lamid','2345','E003',0,'2018-05-23 16:50:01'),(8,'Bruce wane','123','E004',0,'2018-05-24 11:27:46'),(10,'Sajib','1234','E005',0,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tbl_review` */

insert  into `tbl_review`(`id`,`emp_unq_id`,`reviewer_unq_id`,`rate`,`review`,`updated_at`) values (1,1,5,2.003,'Good Boy','2018-05-24 12:15:36'),(4,5,1,2,'Bad Boy','2018-05-24 13:58:03'),(6,8,5,8,'Best','2018-05-24 14:00:22'),(8,5,1,1,'Good Work','2018-05-24 14:52:52'),(9,10,5,10,'Good','2018-05-24 20:53:55');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
