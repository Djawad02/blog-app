-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: blogapp
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('140cb3d9-96f7-451d-ba14-d5841c17fe74','71b7c86eeb22663b68552a0bca7c777a9f3d83ba8a12a82ac0261af7ac15b404','2024-10-01 17:52:04.802','20241001175204_initial',NULL,NULL,'2024-10-01 17:52:04.205',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imagePath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Blog_authorId_fkey` (`authorId`),
  CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'Getting Started With NextJS','Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases. Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases. Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases.Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases. Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases. Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you\'ll likely be working with existing codebases.',1,'2024-10-01 17:56:15','2024-10-01 17:56:15','/images/nextJs.jpg'),(2,'Mobile Development with Kotlin','Kotlin is a cross-platform, statically typed, general-purpose high-level programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin\'s standard library depends on the Java Class Library, but type inference allows its syntax to be more concise. Kotlin is a cross-platform, statically typed, general-purpose high-level programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin\'s standard library depends on the Java Class Library, but type inference allows its syntax to be more concise.  Kotlin is a cross-platform, statically typed, general-purpose high-level programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin\'s standard library depends on the Java Class Library, but type inference allows its syntax to be more concise. ',2,'2024-10-01 17:56:15','2024-10-01 17:56:15','/images/ios.jpg'),(3,'Python and Revolutionary AI','Python can be used for multiple tasks such as: devising machines, learning algorithms, automation of machines, or just data analysis. In addition, Python is an excellent choice for web development, data science and analytics, AI/ML projects, etc. Python can be used for multiple tasks such as: devising machines, learning algorithms, automation of machines, or just data analysis. In addition, Python is an excellent choice for web development, data science and analytics, AI/ML projects, etc. Python can be used for multiple tasks such as: devising machines, learning algorithms, automation of machines, or just data analysis. In addition, Python is an excellent choice for web development, data science and analytics, AI/ML projects, etc',3,'2024-10-01 17:56:15','2024-10-01 17:56:15','/images/python.jpg'),(4,'Understanding GraphQL','GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn’t tied to any specific database or storage engine and is instead backed by your existing code and data.GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.',1,'2024-10-01 18:09:04','2024-10-02 02:02:08','/images/db.jpg'),(5,'Designing for User Experience','User experience design, upon which is the centralized requirements for \"User Experience Design Research\", defines the experience a user would go through when interacting with a company, its services, and its products. User experience design, upon which is the centralized requirements for \"User Experience Design Research\", defines the experience a user would go through when interacting with a company, its services, and its products. User experience design, upon which is the centralized requirements for \"User Experience Design Research\", defines the experience a user would go through when interacting with a company, its services, and its products.',2,'2024-10-01 18:09:04','2024-10-01 18:09:04','/images/uiux.jpg'),(6,'Bringing AI to our platforms','Google AI on Android reimagines your mobile device experience, helping you be more creative, get more done, and stay safe with powerful protection from Google. Just circle an image, text, or video to search anything across your phone with Circle to Search* and learn more with AI-powered overviews. Make complex edits without pro-level editing skills, with Magic Editor. Enjoy a personalized, smarter messaging experience with Magic Compose.',3,'2024-10-07 10:14:51','2024-10-07 10:14:51','/images/ai.jpg'),(7,'Best Xiaomi phones 2024','The best Xiaomi phones may not be as popular as the best iPhones or best Android phones, but they\'re among the best value handsets on the market thanks to their excellent build quality and unanimously great cameras. The best Xiaomi phones may not be as popular as the best iPhones or best Android phones, but they\'re among the best value handsets on the market thanks to their excellent build quality and unanimously great cameras.',4,'2024-10-01 18:19:10','2024-10-01 18:19:10','/images/mobile.jpg'),(8,'Trends in AI','Wondering what the exciting new world of AI is all about? This is where you start. But in 2024, we\'re seeing artificial intelligence support virtual agents by acting as agent assistants. For example, AI can analyze customer sentiment and provide recommended responses to help human agents provide better customer service. But in 2024, we\'re seeing artificial intelligence support virtual agents by acting as agent assistants. For example, AI can analyze customer sentiment and provide recommended responses to help human agents provide better customer service.But in 2024, we\'re seeing artificial intelligence support virtual agents by acting as agent assistants. For example, AI can analyze customer sentiment and provide recommended responses to help human agents provide better customer service.But in 2024, we\'re seeing artificial intelligence support virtual agents by acting as agent assistants. For example, AI can analyze customer sentiment and provide recommended responses to help human agents provide better customer service.',3,'2024-10-01 18:19:10','2024-10-02 01:39:01','/images/ai.jpg'),(9,'Web Development Trends For 2024','But what if we told you that there’s a compass to navigate this complex terrain? What if there were insights that could not only ease your pains but also spark a wildfire of inspiration? Well, you’re in luck because we’re about to embark on a journey through the future trends of web development.In this article, we will unveil the key trends that will define the year 2024, providing you with the tools and knowledge to stay ahead of the curve. Whether you’re a seasoned developer striving for excellence or a product owner seeking to drive innovation, this is your roadmap to success.',1,'2024-10-02 01:47:57','2024-10-02 01:47:57','/images/web.jpg'),(10,'5 UX research project examples to inspire your portfolio','If you’re working in the UX research industry (or aspiring to do so), you need a strong UX research portfolio. UX design focuses on the interaction that a human user has with everyday products and services. The goal of UX design is to make using these products and services, both digital or physical, easy, logical, and fun.\n\nYou may have spent your fair share of time searching reviews for a new coffee maker. In essence, you’re not only looking for a new appliance, but a product with features that will deliver you, the user, a great experience.UX design focuses on the interaction that a human user has with everyday products and services. The goal of UX design is to make using these products and services, both digital or physical, easy, logical, and fun.\n\nYou may have spent your fair share of time searching reviews for a new coffee maker. In essence, you’re not only looking for a new appliance, but a product with features that will deliver you, the user, a great experience.',1,'2024-10-02 15:42:13','2024-10-07 02:31:50','/images/uiux.jpg'),(11,'How to make the most of Figma AI','If you’ve ever hosted a collaborative workshop or brainstorming session in FigJam, you’ll know that the most difficult—and most time-consuming—part usually comes after the event when you’re left to organise and make sense of all the resulting sticky notes.',4,'2024-10-02 15:42:13','2024-10-02 15:42:13','/images/uiux.jpg'),(12,'12 Android blogs you should be following','The AndroidWeekly email digest is a fantastic way to stay on top of the latest Android news. Each week includes articles from the most popular and influential blogs as well as worthwhile reads from passionate developers. I’m not affiliated with AndroidWeekly, but I have found it very useful over the years and see it as a great way to take snapshots of the Android community overtime. This is the first part of a series I dive into the data from the AndroidWeekly archive. If you’re interested in the data and my analysis, check out the end of this post.',2,'2024-10-03 04:52:37','2024-10-03 11:02:19','');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs_categories`
--

DROP TABLE IF EXISTS `blogs_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs_categories` (
  `blogId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`blogId`,`categoryId`),
  KEY `blogs_categories_categoryId_fkey` (`categoryId`),
  CONSTRAINT `blogs_categories_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blogs_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs_categories`
--

LOCK TABLES `blogs_categories` WRITE;
/*!40000 ALTER TABLE `blogs_categories` DISABLE KEYS */;
INSERT INTO `blogs_categories` VALUES (1,1),(9,1),(12,1),(2,2),(12,2),(3,3),(6,3),(8,3),(4,4),(6,4),(7,4),(8,4),(9,4),(11,4),(12,4),(5,5),(10,5),(11,5),(6,9),(6,14);
/*!40000 ALTER TABLE `blogs_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs_tags`
--

DROP TABLE IF EXISTS `blogs_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs_tags` (
  `blogId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`blogId`,`tagId`),
  KEY `blogs_tags_tagId_fkey` (`tagId`),
  CONSTRAINT `blogs_tags_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blogs_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs_tags`
--

LOCK TABLES `blogs_tags` WRITE;
/*!40000 ALTER TABLE `blogs_tags` DISABLE KEYS */;
INSERT INTO `blogs_tags` VALUES (9,1),(1,2),(2,3),(12,3),(3,5),(6,5),(5,7),(10,7),(11,7),(4,8),(6,9),(7,9),(9,9),(12,9),(6,14);
/*!40000 ALTER TABLE `blogs_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`),
  KEY `Category_authorId_fkey` (`authorId`),
  CONSTRAINT `Category_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Web Development','2024-10-01 17:57:20','2024-10-01 17:57:20',1),(2,'Mobile Development','2024-10-01 17:57:20','2024-10-01 17:57:20',2),(3,'AI and Machine Learning','2024-10-01 17:57:20','2024-10-01 17:57:20',3),(4,'Technology','2024-10-01 18:09:29','2024-10-01 18:09:29',1),(5,'UI UX Design','2024-10-02 05:07:33','2024-10-02 05:07:33',4),(6,'sddsd','2024-10-07 04:56:15','2024-10-07 04:56:15',1),(8,'this is new','2024-10-07 04:59:52','2024-10-07 04:59:52',1),(9,'new category','2024-10-09 11:28:11','2024-10-09 11:28:11',1),(10,'random','2024-10-09 11:30:18','2024-10-09 11:30:18',1),(11,'random category','2024-10-09 11:30:43','2024-10-09 11:30:43',1),(12,'cetodjd','2024-10-09 11:33:35','2024-10-09 11:33:35',1),(13,'this is a new category','2024-10-09 12:04:46','2024-10-09 12:04:46',1),(14,'new?','2024-10-09 12:05:34','2024-10-09 12:05:34',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tag_name_key` (`name`),
  KEY `Tag_authorId_fkey` (`authorId`),
  CONSTRAINT `Tag_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'React','2024-10-01 17:58:46','2024-10-03 23:48:44',1),(2,'Next','2024-10-01 17:58:46','2024-10-01 17:58:46',1),(3,'Kotlin','2024-10-01 17:58:46','2024-10-01 17:58:46',2),(4,'IOS','2024-10-01 17:58:46','2024-10-01 17:58:46',2),(5,'Python','2024-10-01 17:58:46','2024-10-01 17:58:46',3),(6,'new tag','2024-10-01 17:58:46','2024-10-07 05:01:18',3),(7,'UX Design','2024-10-01 18:10:16','2024-10-01 18:10:16',2),(8,'GraphQL','2024-10-01 18:10:16','2024-10-01 18:10:16',1),(9,'Trending','2024-10-01 18:10:16','2024-10-03 23:48:14',3),(10,'coding','2024-10-02 05:31:58','2024-10-02 05:31:58',4),(11,'new tag is','2024-10-07 05:02:05','2024-10-07 05:02:40',1),(12,'newwwwwww','2024-10-09 11:39:04','2024-10-09 11:39:04',1),(13,'this is a new tag','2024-10-09 11:58:59','2024-10-09 11:58:59',1),(14,'new tag/','2024-10-09 12:05:54','2024-10-09 12:05:54',1);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dania Jawad','MERN Stack Developer','Dania has been a MERN stack developer with an experience of 6 months. She has developed end to end websites in React, Next','djawad','$2b$10$YtinyHvNXHsLinaJgQsMZeROrtG.gM8ZyS7RkMMFsNCK.i7ozjc12'),(2,'Fatima','Android Developer','Fatima has been working in a software house for more than 2 years. She has an experience of working both with android as well as ios','fatimaa','$2b$10$4NJBrqwBsFhtcF6nM1aeZ.9FHX5xfj3dsiq6P1mO1YXERaZoCMFT2'),(3,'Ahmed','Python Developer','Ahmed has been an exceptional python developer, writing optimized and easy to understand codes.','ahmedd','$2b$10$rOQF1CyGaDNG8Ao1uA0aI.JYRw7f.pjXi4gpGU3p/7eFWdeyK1lA2'),(4,'Maleeha','Content Writer','Maleeha is a content writer and has written many blog posts and articles. She is currently working at a well-known company with her dream','maleehaa','$2b$10$erm/EaE4x1KatANrcgV3Ke5YwEGpvG/6E6kmhy2rFcJp4Yja.Ror6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 22:12:57
