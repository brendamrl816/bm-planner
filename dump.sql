-- MySQL dump 10.13  Distrib 5.5.43, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: bmDB
-- ------------------------------------------------------
-- Server version	5.5.43-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendars`
--

DROP TABLE IF EXISTS `calendars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendars`
--

LOCK TABLES `calendars` WRITE;
/*!40000 ALTER TABLE `calendars` DISABLE KEYS */;
INSERT INTO `calendars` VALUES (1,'work','#009933','2015-12-15 20:20:19','2015-12-15 20:20:19'),(2,'personal','#FF66CC','2015-12-15 20:34:23','2015-12-15 20:34:23'),(3,'bills','#FF9966','2015-12-15 20:59:09','2015-12-15 20:59:09');
/*!40000 ALTER TABLE `calendars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventchanges`
--

DROP TABLE IF EXISTS `eventchanges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventchanges` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  `dateOfChange` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `eventchanges_event_id_foreign` (`event_id`),
  CONSTRAINT `eventchanges_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventchanges`
--

LOCK TABLES `eventchanges` WRITE;
/*!40000 ALTER TABLE `eventchanges` DISABLE KEYS */;
INSERT INTO `eventchanges` VALUES (2,13,'2015-12-13','2015-12-30 18:58:24','2015-12-30 18:58:24'),(5,12,'2016-01-05','2016-01-07 17:08:17','2016-01-07 17:08:17');
/*!40000 ALTER TABLE `eventchanges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `calendarId` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `eventLength` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `startTimeDisplay` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `endTimeDisplay` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `allDay` tinyint(1) NOT NULL,
  `repeats` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `events_calendarid_foreign` (`calendarId`),
  CONSTRAINT `events_calendarid_foreign` FOREIGN KEY (`calendarId`) REFERENCES `calendars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (4,3,'let\'s see','2015-12-29','2015-12-29',1,'04:30:00','06:44:00','04:30am','06:44am',0,0,'2015-12-15 21:17:04','2015-12-15 21:17:04'),(12,3,'blah','2015-12-29','2015-12-29',1,'15:00:00','17:50:00','03:00pm','05:50pm',0,1,'2015-12-29 23:30:17','2015-12-29 23:30:17'),(13,2,'testing','2015-12-13','2015-12-13',1,'09:00:00','14:00:00','09:00am','02:00pm',0,1,'2015-12-30 18:50:43','2015-12-30 18:50:43'),(14,3,'testing','2015-12-13','2015-12-13',1,'09:00:00','14:00:00','09:00am','02:00pm',0,0,'2015-12-30 18:58:24','2015-12-30 18:58:24'),(16,2,'trying','2015-12-30','2015-12-30',1,'14:00:00','15:00:00','02:00pm','03:00pm',0,1,'2015-12-30 19:11:11','2015-12-30 19:11:11'),(18,1,'testing again and again','2016-01-03','2016-01-03',1,'13:00:00','14:00:00','01:00pm','02:00pm',0,1,'2015-12-31 18:39:58','2015-12-31 18:39:58'),(20,3,'blah','2016-01-05','2016-01-05',1,'15:00:00','21:50:00','03:00pm','09:50pm',0,0,'2016-01-07 17:08:18','2016-01-07 17:08:18'),(21,2,'event3','2016-01-09','2016-01-09',1,'11:00:00','12:30:00','11:00am','12:30pm',0,0,'2016-01-08 16:10:23','2016-01-08 16:10:23'),(22,3,'boo','2016-01-13','2016-01-13',1,'23:00:00','14:00:00','11:00pm','02:00pm',0,0,'2016-01-17 00:13:02','2016-01-17 00:13:02'),(23,3,'booooooooooooooooooooooooooooooooo','2016-01-13','2016-01-13',1,'11:40:00','15:00:00','11:40am','03:00pm',0,0,'2016-01-17 00:13:45','2016-01-17 00:13:45');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2015_08_03_225259_create_users_table',1),('2015_08_28_184553_create_lists_and_tasks_tables',1),('2015_11_07_203333_create_calendars_table',1),('2015_11_07_203459_create_events_table',1),('2015_11_07_203619_create_repetitions_table',1),('2015_11_30_005553_create_eventchanges_table',1),('2016_01_16_234348_entrust_setup_tables',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repetitions`
--

DROP TABLE IF EXISTS `repetitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repetitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `eventId` int(10) unsigned NOT NULL,
  `repeatOccurrence` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `endRepetitionDate` date DEFAULT NULL,
  `repeatDaily` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `repeatWeekdays` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `repeatWeekly` int(11) DEFAULT NULL,
  `repeatMonthly` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `repeatYearly` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `neverEnds` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `repetitions_eventid_foreign` (`eventId`),
  CONSTRAINT `repetitions_eventid_foreign` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repetitions`
--

LOCK TABLES `repetitions` WRITE;
/*!40000 ALTER TABLE `repetitions` DISABLE KEYS */;
INSERT INTO `repetitions` VALUES (3,12,'weekly','2016-12-29',NULL,NULL,13,NULL,NULL,0,'2015-12-29 23:30:18','2015-12-29 23:30:18'),(4,13,'monthly','2020-12-13',NULL,NULL,NULL,'13',NULL,0,'2015-12-30 18:52:30','2015-12-30 18:52:30'),(6,16,'daily','2016-02-03','*',NULL,NULL,NULL,NULL,0,'2015-12-30 19:11:11','2015-12-30 19:11:11'),(8,18,'weekly',NULL,NULL,NULL,11,NULL,NULL,1,'2015-12-31 18:39:59','2015-12-31 18:39:59');
/*!40000 ALTER TABLE `repetitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `todolist_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (2,1,'task2',0,'2015-12-15 20:59:32','2015-12-15 20:59:32'),(3,1,'task3',1,'2015-12-15 20:59:38','2015-12-15 20:59:38'),(4,2,'task4',0,'2015-12-18 22:43:31','2015-12-18 22:43:31'),(5,2,'task5',0,'2015-12-29 21:05:35','2015-12-29 21:05:35'),(6,2,'ok',1,'2015-12-29 21:05:53','2015-12-29 21:05:53'),(11,1,'blah',0,'2016-01-04 17:06:37','2016-01-04 17:06:37'),(13,1,'dfasdfasdf',1,'2016-01-17 00:28:23','2016-01-17 00:28:23');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todolists`
--

DROP TABLE IF EXISTS `todolists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todolists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolists`
--

LOCK TABLES `todolists` WRITE;
/*!40000 ALTER TABLE `todolists` DISABLE KEYS */;
INSERT INTO `todolists` VALUES (1,'list 1','#FF66CC','2015-12-15 20:59:20','2015-12-15 20:59:20'),(2,'list 2','#FF0000','2015-12-18 22:43:22','2015-12-18 22:43:22');
/*!40000 ALTER TABLE `todolists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Brenda Castillo','brendamrl816@gmail.com','$2y$10$nYZdCEpoPc/xZm1RXcI9JehfLl2YS7utEADBWlDvtdOJQRp4KAcc.',NULL,'2016-01-16 18:17:35','2016-01-16 18:17:35'),(2,'gasper illescas','gasper@gmail.com','$2y$10$xONmqSs0RXNZGCkxNgd5DeNsAqOSxREv.PVEUPEZ9DtSH/K7HW0uy','bXgCVQS14iftGz9osHPYzsWWm0ffYWGwU2kovZf2yLwEcK2ciC3YZpUzrW1N','2016-01-16 18:46:39','2016-01-16 22:50:46'),(3,'vanessa','vanessa@gmail.com','$2y$10$LezytU1f2CGMGWopOOiWOupX0daA2vjd5qq./yWOxeJQZAJZBeJKO','QrXmYXWwLvYQSbrr5NPhwpobshVtLXX97caTTCqL67s4KwkkDctEhonhohVF','2016-01-16 18:52:33','2016-01-16 19:47:37'),(4,'Donna','dcostablie@gmail.com','$2y$10$5FxIu64gYfJNk2Q.HykCDuHk8kyJSc1f6umCEt6d/gYENqowzbUs2','OJKZZw8R6OuZ7zPZTQ61Jc2QWfIgJ63oDvhTEKU8Hfswp4kHN2e532Ns6TcA','2016-01-16 19:48:19','2016-01-16 22:48:35'),(5,'blah blah','blahblah@gmail.com','$2y$10$gWaAU42fs7VZb5TGGGbzjuzg3R8s/k048o3xFagLBUF9I79RiftjK','pybcYpzIqY6tD4HgiSeIHFyoI0GIbOOcWadORvJShKGds00w6KfAaEPBXGis','2016-01-16 19:54:41','2016-01-16 19:54:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-17  5:16:09
