/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: txus_dev
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `txus_dev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `txus_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `txus_dev`;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES
(1,'814a08e40d7fc2bcfd458759d18319198ca8ae394f2fa15617a78678e9c9c93b',1776981155533),
(2,'4c071d84cbf703a8801cba715362734ee1bcdafd34d62a28235bc2360a29239b',1776981375778),
(3,'1e9fd913a02b8dcf4add2215694c25da654ee2fa668cdc29058bc1d2c31bf9dd',1777964199992),
(4,'e372beebd105a0bbbce85f4bd458895dadb82d68e1ba2d7c98bf77c402af9cd7',1794245632966);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` text NOT NULL,
  `featuredImageUrl` varchar(500) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  `published` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `publishedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_authorId_users_id_fk` (`authorId`),
  CONSTRAINT `articles_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartInquiries`
--

DROP TABLE IF EXISTS `cartInquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartInquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inquiryCode` varchar(32) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `customerEmail` varchar(320) NOT NULL,
  `customerPhone` varchar(32) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `itemsJson` text NOT NULL,
  `pricingVersion` varchar(64) DEFAULT NULL,
  `pricingSnapshotJson` text DEFAULT NULL,
  `totalAmount` varchar(16) DEFAULT NULL,
  `fulfillment` varchar(32) DEFAULT 'local_pickup',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `cartInquiries_inquiryCode_unique` (`inquiryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartInquiries`
--

LOCK TABLES `cartInquiries` WRITE;
/*!40000 ALTER TABLE `cartInquiries` DISABLE KEYS */;
INSERT INTO `cartInquiries` VALUES
(1,'TX-AJCR7P','Jane Smith','jane@example.com',NULL,NULL,'[{\"productId\":\"101-101\",\"oldPrice\":99,\"newPrice\":159.36,\"priceChanged\":true,\"changeNotice\":\"Pricing updated from $99.00 to $159.36 based on the current Walnut board-foot rate.\",\"pricingResult\":{\"method\":\"board_foot\",\"price\":159.36,\"boardFootRateUsed\":12,\"rateSource\":\"species\",\"boardFeet\":13.28,\"formula\":\"13.28 BF × $12.00/BF = $159.36\",\"pricingVersion\":\"2026-11-09T17:34:41.515109+00:00\",\"surfacingAvailable\":true,\"surfacingFee\":50},\"surfacingFee\":50,\"itemTotal\":209.36}]','2026-11-09T17:34:41.515109+00:00','{\"version\":\"2026-11-09T17:34:41.515109+00:00\",\"updatedAt\":\"2026-11-09T17:34:41.515109+00:00\",\"defaultRate\":12,\"speciesRates\":{\"American Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Black Jack Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Cedar Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"English Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Maple\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Sycamore\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Cherry\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mountain Cedar\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"}},\"overrides\":{\"108-010\":{\"method\":\"board_foot\",\"rateOverride\":10,\"fixedPrice\":null,\"reason\":\"Clearance pricing — special piece override\",\"active\":true}}}',NULL,'local_pickup','2026-11-09 17:40:24'),
(2,'TX-2T0LFJ','Marcus Vance','marcus@vancewoodworking.com','512-555-0147','Building a walnut boardroom table; need pieces ASAP.','[{\"productId\":\"101-101\",\"oldPrice\":159.36,\"newPrice\":159.36,\"priceChanged\":false,\"changeNotice\":null,\"pricingResult\":{\"method\":\"board_foot\",\"price\":159.36,\"boardFootRateUsed\":12,\"rateSource\":\"species\",\"boardFeet\":13.28,\"formula\":\"13.28 BF × $12.00/BF = $159.36\",\"pricingVersion\":\"2026-11-09T17:50:42.612Z\",\"surfacingAvailable\":true,\"surfacingFee\":50},\"surfacingFee\":50,\"itemTotal\":209.36}]','2026-11-09T17:50:42.612Z','{\"version\":\"2026-11-09T17:50:42.612Z\",\"updatedAt\":\"2026-11-09T17:50:42.612Z\",\"defaultRate\":12,\"speciesRates\":{\"American Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Black Jack Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Cedar Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"English Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Maple\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Sycamore\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Cherry\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mountain Cedar\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"}},\"overrides\":{\"108-010\":{\"method\":\"board_foot\",\"rateOverride\":10,\"fixedPrice\":null,\"reason\":\"Clearance pricing — special piece override\",\"active\":true}}}','209.36','local_pickup','2026-11-09 17:51:10'),
(3,'TX-G5X1JF','E2E Test','test@example.com',NULL,NULL,'[{\"productId\":\"101-101\",\"oldPrice\":159.36,\"newPrice\":159.36,\"priceChanged\":false,\"changeNotice\":null,\"pricingResult\":{\"method\":\"board_foot\",\"price\":159.36,\"boardFootRateUsed\":12,\"rateSource\":\"species\",\"boardFeet\":13.28,\"formula\":\"13.28 BF × $12.00/BF = $159.36\",\"pricingVersion\":\"2026-11-09T17:56:23.725Z\",\"surfacingAvailable\":true,\"surfacingFee\":50},\"surfacingFee\":null,\"itemTotal\":159.36}]','2026-11-09T17:56:23.725Z','{\"version\":\"2026-11-09T17:56:23.725Z\",\"updatedAt\":\"2026-11-09T17:56:23.725Z\",\"defaultRate\":12,\"speciesRates\":{\"American Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Black Jack Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Cedar Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"English Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Maple\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Sycamore\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Cherry\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mountain Cedar\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"}},\"overrides\":{\"108-010\":{\"method\":\"board_foot\",\"rateOverride\":10,\"fixedPrice\":null,\"reason\":\"Clearance pricing — special piece override\",\"active\":true},\"101-102\":{\"method\":\"fixed\",\"rateOverride\":null,\"fixedPrice\":299,\"reason\":\"Website launch promotion piece\",\"active\":true}}}','159.36','local_pickup','2026-11-09 17:57:00'),
(4,'TX-MFODHL','E2E Test','test@example.com',NULL,NULL,'[{\"productId\":\"101-101\",\"oldPrice\":159.36,\"newPrice\":159.36,\"priceChanged\":false,\"changeNotice\":null,\"pricingResult\":{\"method\":\"board_foot\",\"price\":159.36,\"boardFootRateUsed\":12,\"rateSource\":\"species\",\"boardFeet\":13.28,\"formula\":\"13.28 BF × $12.00/BF = $159.36\",\"pricingVersion\":\"2026-11-09T17:56:23.725Z\",\"surfacingAvailable\":true,\"surfacingFee\":50},\"surfacingFee\":null,\"itemTotal\":159.36}]','2026-11-09T17:56:23.725Z','{\"version\":\"2026-11-09T17:56:23.725Z\",\"updatedAt\":\"2026-11-09T17:56:23.725Z\",\"defaultRate\":12,\"speciesRates\":{\"American Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Black Jack Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Cedar Elm\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"English Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Maple\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Sycamore\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Ash\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Cherry\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Live Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mesquite\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Mountain Cedar\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Pecan\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Post Oak\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Texas Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"},\"Walnut\":{\"rate\":12,\"method\":\"board_foot\",\"status\":\"active\",\"effectiveDate\":\"2026-11-09\"}},\"overrides\":{\"108-010\":{\"method\":\"board_foot\",\"rateOverride\":10,\"fixedPrice\":null,\"reason\":\"Clearance pricing — special piece override\",\"active\":true},\"101-102\":{\"method\":\"fixed\",\"rateOverride\":null,\"fixedPrice\":299,\"reason\":\"Website launch promotion piece\",\"active\":true}}}','159.36','local_pickup','2026-11-09 17:57:38');
/*!40000 ALTER TABLE `cartInquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactSubmissions`
--

DROP TABLE IF EXISTS `contactSubmissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactSubmissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactSubmissions`
--

LOCK TABLES `contactSubmissions` WRITE;
/*!40000 ALTER TABLE `contactSubmissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `contactSubmissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricingMeta`
--

DROP TABLE IF EXISTS `pricingMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricingMeta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metaKey` varchar(64) NOT NULL,
  `metaValue` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `pricingMeta_metaKey_unique` (`metaKey`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricingMeta`
--

LOCK TABLES `pricingMeta` WRITE;
/*!40000 ALTER TABLE `pricingMeta` DISABLE KEYS */;
INSERT INTO `pricingMeta` VALUES
(1,'defaultBoardFootRate','12.00','2026-11-09 17:34:41'),
(2,'pricingVersion','2026-11-09T17:56:23.725Z','2026-11-09 17:56:23'),
(3,'pricingUpdated','2026-11-09T17:56:23.725Z','2026-11-09 17:56:23'),
(4,'pricingServiceStatus','operational','2026-11-09 17:34:41');
/*!40000 ALTER TABLE `pricingMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productPricingOverrides`
--

DROP TABLE IF EXISTS `productPricingOverrides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productPricingOverrides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` varchar(64) NOT NULL,
  `pricingMethod` enum('board_foot','fixed','inquire') NOT NULL DEFAULT 'board_foot',
  `boardFootRateOverride` varchar(10) DEFAULT NULL,
  `fixedPrice` varchar(10) DEFAULT NULL,
  `overrideReason` text DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `productPricingOverrides_productId_unique` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productPricingOverrides`
--

LOCK TABLES `productPricingOverrides` WRITE;
/*!40000 ALTER TABLE `productPricingOverrides` DISABLE KEYS */;
INSERT INTO `productPricingOverrides` VALUES
(1,'108-010','board_foot','10.00',NULL,'Clearance pricing — special piece override',1,'2026-11-09 17:34:41','2026-11-09 17:34:41'),
(2,'101-102','fixed',NULL,'299.00','Website launch promotion piece',1,'2026-11-09 17:51:25','2026-11-09 17:51:25');
/*!40000 ALTER TABLE `productPricingOverrides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(64) NOT NULL,
  `category` varchar(64) NOT NULL,
  `species` varchar(128) NOT NULL,
  `lengthIn` varchar(16) DEFAULT NULL,
  `widthMinIn` varchar(16) DEFAULT NULL,
  `widthMaxIn` varchar(16) DEFAULT NULL,
  `averageWidthIn` varchar(16) DEFAULT NULL,
  `thicknessIn` varchar(16) DEFAULT NULL,
  `boardFeet` varchar(16) DEFAULT NULL,
  `pricingMethodDefault` varchar(64) DEFAULT NULL,
  `sourcePrice` varchar(16) DEFAULT NULL,
  `location` varchar(128) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `primaryImage` varchar(255) DEFAULT NULL,
  `allImages` text DEFAULT NULL,
  `imageCount` int(11) DEFAULT 0,
  `imageStatus` varchar(32) DEFAULT 'IMAGE_LINKED',
  `publicListing` varchar(8) DEFAULT 'YES',
  `status` varchar(64) DEFAULT 'available',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
('101-101','Slabs','Texas Walnut','51','10','20','15','2.5','13.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 101-101.jpeg | WA 101-101 (2).jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('101-102','Slabs','Texas Walnut','51','17','22','19.5','2.5','17.27','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 101-102.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('101-103','Slabs','Texas Walnut','51','19','22','20.5','2.5','18.15','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('102-104','Slabs','Texas Walnut','57','16','23','19.5','2.5','19.3','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 102-104 (2).jpeg | WA 102-104.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('102-105','Slabs','Texas Walnut','57','18','29','23.5','2.5','23.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 102-105.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('102-106','Slabs','Texas Walnut','57','20','31','25.5','2.5','25.23','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 102-106.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('102-107','Slabs','Texas Walnut','57','20','30','25','2.5','24.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 102-107.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('102-108','Slabs','Texas Walnut','57','18','29','23.5','2.5','23.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'WA 102-108.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('106-001','Slabs','Pecan - Series is 70 year old or 1950 DOB','86','20','23','21.5','2.75','35.31','BOARD_FEET_X_RATE',NULL,NULL,'Original species/status text: Pecan - Series is 70 year old or 1950 DOB.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('106-006','Slabs','Pecan','86','21','23','22','2.75','36.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('108-002 Fcut','Slabs','Pecan - 115 years or DOB in 1905','112','47','23','35','2.5','68.06','BOARD_FEET_X_RATE','544.44',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('108-010','Slabs','Pecan','112','30','50','40','2.5','77.78','BOARD_FEET_X_RATE','622.22',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('109-001','Slabs','Cedar Elm','90','18','28','23','2.75','39.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('109-002','Slabs','Cedar Elm','90','21','29','25','2.75','42.97','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('109-003','Slabs','Cedar Elm','90','22','29','25.5','2.75','43.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('109-004','Slabs','Cedar Elm','90','22','27','24.5','2.75','42.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('112-002','Slabs','Pecan','153','52','36','44','2.5','116.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'20190611_200239.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('112-005','Slabs','Pecan - Marvin Pecan Countertop','153','54','34','44','2.5','116.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('114-006','Slabs','Pecan','162','21','31','26','2.5','73.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS Pecan P114-006 KD2.jpg | TXUS Pecan P114-006 KD.jpg | P114-006 KD w Curve.jpg | P114-006 KD.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('114-007','Slabs','Pecan','162','18','29','23.5','2.5','66.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('119-001','Slabs','Pecan','118','18','31','24.5','2.5','50.19','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('119-002','Slabs','Pecan','118','23','34','28.5','2.5','58.39','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('119-003','Slabs','Pecan','118','27','35','31','2.5','63.51','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('123-002','Slabs','Pecan','119','26','38','32','2.5','66.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('123-003','Slabs','Pecan','119','26','40','33','2.5','68.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-1','Slabs','Pecan','72','36','58','47','2.5','58.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-2','Slabs','Pecan','72','38','58','48','2.5','60','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-3','Slabs','Pecan','72','40','58','49','2.5','61.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-4','Slabs','Pecan','72','40','58','49','2.5','61.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-5','Slabs','Pecan','72','38','58','48','2.5','60','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('127-6','Slabs','Pecan','72','36','58','47','2.5','58.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('131-4','Slabs','Pecan','96','24','24','24','2.5','40','BOARD_FEET_X_RATE',NULL,NULL,NULL,'413-1, 413-2, 413-3.jpg | walnut-slab-1131-4, 13ft x 2.5in thick.jpg | 20181013_141616.jpg | 1131-4 KD Slab Pic.jpg | 1131-4 KD Slab Pic2.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('131-5','Slabs','Pecan','96','24','24','24','2.5','40','BOARD_FEET_X_RATE',NULL,NULL,NULL,'20231215_131515.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('131-6','Slabs','Pecan','96','20','20','20','2.5','33.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'20170813_165044.jpg | 20170813_162927.jpg | Walnut 1131-6, 13 ft x 30in to 41in x 2.5in thick, $3600.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('135-1','Slabs','Pecan','72','57','32','44.5','2.5','55.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'RE Walnut-813-5, 18ft long, 38-52in wide, 2.5in thick.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('135-3','Slabs','Pecan','72','57','31','44','2.5','55','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('135-4','Slabs','Pecan','72','57','30','43.5','2.5','54.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'413-4, 413-5, 411-1.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('135-5','Slabs','Pecan','72','57','27','42','2.5','52.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-001','Slabs','Texas Walnut','88','10','12','11','2','13.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-002','Slabs','Texas Walnut','88','14','14','14','2','17.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-003','Slabs','Texas Walnut','88','12','14','13','2','15.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-009','Slabs','Texas Walnut','92','12','14','13','2','16.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-010','Slabs','Texas Walnut','92','12','14','13','2','16.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-011','Slabs','Texas Walnut','92','12','14','13','2','16.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('155-012','Slabs','Texas Walnut','92','12','14','13','2','16.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('156-001','Slabs','Maple','161','24','32','28','3','93.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'156-001 Maple.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('156-002','Slabs','Maple','161','24','33','28.5','3','95.59','BOARD_FEET_X_RATE',NULL,NULL,NULL,'156-002 Maple.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('157-003','Slabs','Ash','138','23','34','28.5','3','81.94','BOARD_FEET_X_RATE',NULL,NULL,NULL,'157-003 Ash.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('158-001','Slabs','Maple','104','41','48','44.5','4','128.56','BOARD_FEET_X_RATE',NULL,NULL,NULL,'158-001 Maple.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('158-002','Slabs','Maple','108','45','55','50','4','150','BOARD_FEET_X_RATE',NULL,NULL,NULL,'158-002 Maple.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('228-001','Slabs','Pecan','123','32','48','40','2.75','93.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPETXUS - Pecan 228-001.jpg | TXUS - Pecan 228-001.jpg | TXUS 228-001.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('228-003','Slabs','Pecan','123','40','44','42','2.75','98.66','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 228-003 Oak Hill, 20231019_090818.jpg | TPETXUS - Pecan 228-003.jpg | TXUS - Pecan 228-003.jpg | TXUS 228-003.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('228-006','Slabs','Pecan','123','26','43','34.5','2.75','81.04','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 228-006 Oak Hill, 20231019_090656.jpg | TPETXUS - Pecan 228-006.jpg | TXUS - Pecan 228-006.jpg | TXUS 228-006.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('228-007','Slabs','Pecan','123','26','38','32','2.75','75.17','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 228-007 Oak Hill, 20231019_090531.jpg | TPETXUS - Pecan 228-007.jpg | TXUS - Pecan 228-007.jpg | TXUS 228-007.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('228-008','Slabs','Pecan','123','27','29','28','2.75','65.77','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPETXUS - Pecan 228-008.jpg | TXUS - Pecan 228-008.jpg | TXUS 228-008.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-005','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-005.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-006','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-006.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-007','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-007.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-008','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-008.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-009','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-009.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-010','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-011','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TMQ 229-011.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-012','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('229-013','Cookies & Rounds','Mesquite Burl Cookies',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-001','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TXUrbanSawmill_PecanReUse_P1230001.jpg | P1230001.JPG',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-002','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','P1230002.JPG | TXUrbanSawmill_PecanReUse_P1230002.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-003','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TXUrbanSawmill_PecanReUse_P1230003.jpg | P1230003.JPG',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-004','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','P1230004.JPG | TXUrbanSawmill_PecanReUse_P1230004.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-005','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','P1230005.JPG | TXUrbanSawmill_PecanReUse_P1230005.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-006','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TXUrbanSawmill_PecanReUse_P1230006.jpg | P1230006.JPG',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-007','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.','TXUrbanSawmill_PecanReUse_P1230007.jpg | P1230007.JPG',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-008','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-009','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-010','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-011','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('230-012','Cookies & Rounds','Pecan Cookies',NULL,NULL,NULL,NULL,'5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,'Confirmed by Dev as duplicate of main inventory record on 2026-10-31; exclude Cookies-tab copy from active catalog. | Cookies tab is canonical single source of truth for this product ID; do not duplicate in active catalog.',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('231-001','Slabs','Texas Walnut','87','15','23','19','2','22.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'231-001.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('231-002','Slabs','Texas Walnut','87','18','23','20.5','2.5','30.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'231-002.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('231-003','Slabs','Texas Walnut','86','15','20','17.5','2','20.9','BOARD_FEET_X_RATE',NULL,NULL,NULL,'231-003.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('231-004','Slabs','Texas Walnut','86','15','20','17.5','2','20.9','BOARD_FEET_X_RATE',NULL,NULL,NULL,'231-004.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('231-009','Slabs','Texas Walnut','93','18','18','18','2','23.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,'231-009.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('401-008','Slabs','Texas Mesquite','113','10','12','11','2','17.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'401-008.jpg | 401-008B.jpg | 401-008.JPEG',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('402-002','Slabs','Texas Mesquite','121','16','18','17','2','28.57','BOARD_FEET_X_RATE',NULL,NULL,NULL,'402-002.jpg | 402-002B.jpg | 402-002.JPEG',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('402-006','Slabs','Texas Mesquite (AFD Plaque)','121','11','18','14.5','2','24.37','BOARD_FEET_X_RATE',NULL,NULL,NULL,'402-006.jpg | 402-006B.jpg | 402-006.JPEG',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-001','Slabs','Texas Mesquite','82','14','22','18','2','20.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-001.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-002','Slabs','Texas Mesquite','82','18','22','20','2','22.78','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-002.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-003','Slabs','Texas Mesquite','82','22','31','26.5','2','30.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-003.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-004','Slabs','Texas Mesquite','82','22','28','25','2','28.47','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-004.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-005','Slabs','Texas Mesquite','82','24','28','26','2','29.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-005.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('403-006','Slabs','Texas Mesquite','82','22','24','23','2','26.19','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Mesquite 403-006.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('404-2','Slabs','Texas Mesquite','95','18','21','19.5','2.5','32.16','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 404-2 & 3.jpg | TSYTSY404-2.jpg | 404-2, 404-3.jpg | 1404-2.jpg | 404-2 & 3.jpg | 20181014_174042.jpg',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('404-3','Slabs','Texas Mesquite','95','18','18','18','2.5','29.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-3.jpg | 404-2, 404-3.jpg | 1404-3.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('405-1','Slabs','Texas Mesquite','93','8','17','12.5','2.5','20.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-1.jpg | 404-6, 405-1.jpg | 1405-1.jpg | 20220405_145856.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('405-5','Slabs','Texas Mesquite','93','13','16','14.5','2.5','23.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-5.jpg | 405-4, 405-5.jpg | 1405-5.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('405-6','Slabs','Texas Mesquite','93','12','17','14.5','2.5','23.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 405-6.jpg | TAETAE405-6.jpg | 405-6.jpg | 1405-6.jpg',NULL,6,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('406-4','Slabs','Texas Mesquite','102','18','22','20','2.25','31.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 406-4 & 5.jpg | 406-5,406-4.jpg | 406-4 & 5.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('406-5','Slabs','Texas Mesquite','102','18','22','20','2.25','31.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'406-5,406-4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('407-1','Slabs','Texas Mesquite','102','12','18','15','2.25','23.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'406-1, 407-1.jpg | 406-6 & 407-1.jpg | RE Walnut 840-7, 10ft x 11-27in wide, 2.5in thick.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('407-4','Slabs','Texas Mesquite','102','12','14','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 407-4 & 5.jpg | TME407-4.jpg | 407-4, 407-5-SOLD.jpg | 407-4 & 5.jpg | 407-4, 407-5.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('408-1','Slabs','Texas Mesquite','102','12','16','14','2.25','22.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 408-1 & 2.jpg | TME408-1.jpg | 408-1, 408-2.jpg | 408-1 & 2.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('408-2','Slabs','Texas Mesquite','102','15','16','15.5','2.25','24.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME408-2.jpg | 408-1, 408-2.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('408-4','Slabs','Texas Mesquite','102','16','19','17.5','2.25','27.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'408-3, 408-4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('408-5','Slabs','Texas Mesquite','102','11','16','13.5','2.25','21.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 408-5 (SOLD) & 6.jpg | 408-5, 408-6.jpg | 408-5 & 6.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('408-6','Slabs','Texas Mesquite','102','10','16','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'408-5, 408-6.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('409-1','Slabs','Texas Mesquite','102','12','14','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 409-1 & 2 & 410-1.jpg | TME409-1.jpg | 409-1, 409-2, 410-1.jpg | 409-1 & 2 & 410-1.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('409-2','Slabs','Texas Mesquite','102','12','14','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME409-2.jpg | 409-1, 409-2, 410-1.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('409-3','Slabs','Texas Mesquite','102','11','15','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 409-3 & 4 & 5.jpg | 409-3, 409-4, 409-5.jpg | 409-3 & 4 & 5.jpg | .facebook_396791875-20150326-140938.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('409-4','Slabs','Texas Mesquite','102','11','14','12.5','2.25','19.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'409-3, 409-4, 409-5.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('409-5','Slabs','Texas Mesquite','102','10','14','12','2.25','19.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'409-3, 409-4, 409-5.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('410-1','Slabs','Texas Mesquite','102','8','13','10.5','2.25','16.73','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 409-1 & 2 & 410-1.jpg | 409-1, 409-2, 410-1.jpg | 409-1 & 2 & 410-1.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('411-1','Slabs','Texas Mesquite','122','13','14','13.5','2.25','25.73','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 411-1.jpg | 413-4, 413-5, 411-1.jpg | 411-1.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('412-1','Slabs','Texas Mesquite','122','9','15','12','2.25','22.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 412-1 & 2.jpg | 412-1, 412-2.jpg | 412-1 & 2.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('412-2','Slabs','Texas Mesquite','122','16','18','17','2.25','32.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'412-1, 412-2.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('412-3','Slabs','Texas Mesquite','122','16','18','17','2.25','32.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 412-3 & 4.jpg | TME412-3.jpg | 412-3, 412-4.jpg | 412-3 & 4.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('412-4','Slabs','Texas Mesquite','122','15','17','16','2.25','30.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME412-4.jpg | 412-3, 412-4.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('412-5','Slabs','Texas Mesquite','122','12','16','14','2.25','26.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 412-5.jpg | 412-5, 414-1.jpg | 412-5.jpg | RE slab 634-1, 2.5″ x 21″-35″ x 10′.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('413-4','Slabs','Texas Mesquite','122','13','16','14.5','2.25','27.64','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 413-4 & 5.jpg | 413-4, 413-5, 411-1.jpg | 413-4 & 5.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('413-5','Slabs','Texas Mesquite','122','13','16','14.5','2.25','27.64','BOARD_FEET_X_RATE',NULL,NULL,NULL,'413-4, 413-5, 411-1.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('414-1','Slabs','Texas Mesquite','123','10','12','11','2.25','21.14','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 414-1.jpg | 412-5, 414-1.jpg | 414-1.jpg | 404-1, 410-6.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('415-2','Slabs','Texas Mesquite','114','17','22','19.5','2.25','34.73','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 415-2.jpg | 414-6, 415-2.jpg | 415-2.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('415-3','Slabs','Texas Mesquite','114','17','22','19.5','2.25','34.73','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 415-3 & 4.jpg | 415-3, 415-4.jpg | 415-3 & 4.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('415-4','Slabs','Texas Mesquite','114','18','22','20','2.25','35.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'415-3, 415-4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('415-5','Slabs','Texas Mesquite','114','17','25','21','2.25','37.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 415-5 & 6.jpg | 415-5, 415-6.jpg | 415-5 & 6.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('415-6','Slabs','Texas Mesquite','114','14','23','18.5','2.25','32.95','BOARD_FEET_X_RATE',NULL,NULL,NULL,'415-5, 415-6.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('416-2','Slabs','Texas Mesquite','112','13','18','15.5','2.25','27.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'416-2, 416-1.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('416-3','Slabs','Texas Mesquite','112','16','20','18','2.25','31.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 416-3 & 4.jpg | 416-4, 416-3.jpg | 416-3 & 4.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('416-4','Slabs','Texas Mesquite','112','16','19','17.5','2.25','30.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'416-4, 416-3.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('416-5','Slabs','Texas Mesquite','112','13','18','15.5','2.25','27.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 416-5 & 6.jpg | 416-5, 416-6.jpg | 416-5 & 6.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('416-6','Slabs','Texas Mesquite','112','10','17','13.5','2.25','23.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'416-5, 416-6.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('417-1','Slabs','Texas Mesquite','102','12','22','17','2.25','27.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 417-1 & 2.jpg | 417-1, 417-2.jpg | 417-1 & 2.jpg | 20181014_171625.jpg | 20181014_171241.jpg | 20181014_171303.jpg | 20181014_171256.jpg',NULL,9,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('417-2','Slabs','Texas Mesquite','102','18','19','18.5','2.25','29.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'417-1, 417-2.jpg | 417-3, 417-2.jpg | 20181014_172101.jpg | 20181014_172218.jpg',NULL,6,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('417-3','Slabs','Texas Mesquite','102','18','22','20','2.25','31.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 417-3.jpg | 417-3, 417-2.jpg | 417-3.jpg | 20181014_173656.jpg | 20181014_173617.jpg',NULL,6,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('417-4','Slabs','Texas Mesquite','102','16','18','17','2.25','27.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,'20181014_174042.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('417-5','Slabs','Texas Mesquite','102','7','19','13','2.25','20.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite 417-5.jpg | 417-5, 415-1.jpg | 417-5.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('418-4','Slabs','Texas Walnut','80','12','23','17.5','2.5','24.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 418-4, (418-3 sold) Walnut.jpg | TXUS - Series 418-4, 418-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('419-1','Slabs','Texas Walnut','80','13','15','14','2.5','19.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 419-2, 419-1 Walnut.jpg | TXUS - Series 419-2, 419-1 Tx Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('419-2','Slabs','Texas Walnut','80','13','15','14','2.5','19.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 419-2, 419-1 Walnut.jpg | TXUS - Series 419-2, 419-1 Tx Walnut.jpg | 20181014_192907.jpg | 20181014_192859.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('419-3','Slabs','Texas Walnut','80','14','16','15','2.5','20.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 419-4, 419-3 Walnut.jpg | Walnut ID766-4, 19-36in, 14ft, 2.5in thick.jpg | 20181014_193500.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('419-4','Slabs','Texas Walnut','80','12','15','13.5','2.5','18.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 419-4, 419-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('420-1','Slabs','Texas Walnut','80','10','10','10','2.5','13.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-1, 421-3, 421-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('420-2','Slabs','Texas Walnut','80','9','11','10','2.5','13.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-4, 420-3, 420-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('420-3','Slabs','Texas Walnut','80','12','14','13','2.5','18.06','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-4, 420-3, 420-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('420-4','Slabs','Texas Walnut','80','11','14','12.5','2.5','17.36','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-4, 420-3, 420-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('421-1','Slabs','Texas Walnut','80','9','11','10','2.5','13.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 421-1, 422-5, 423-4 Walnut.jpg | Walnut-1142-11, 12 ft x 31in to 39in wide x 2.5in thick.jpg | Walnut 1142-11, 12 ft x 31in to 39in x 2.5in thick, $3300.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('421-2','Slabs','Texas Walnut','80','10','12','11','2.5','15.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-1, 421-3, 421-2 Walnut.jpg | Walnut 924-2, 12 foot x 16in to 36in wide x 2.5in thick.jpg | Walnut-Slab-1004-2, 12ft x 21in to 37in wide x 2.5in thick.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('421-3','Slabs','Texas Walnut','80','7','11','9','2.5','12.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 420-1, 421-3, 421-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('422-1','Slabs','Texas Walnut','64','9','16','12.5','2.5','13.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 422-2, 422-1 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('422-2','Slabs','Texas Walnut','64','16','22','19','2.5','21.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 422-2, 422-1 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('422-3','Slabs','Texas Walnut','64','17','24','20.5','2.5','22.78','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 422-4, 422-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('422-4','Slabs','Texas Walnut','64','17','25','21','2.5','23.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 422-4, 422-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('422-5','Slabs','Texas Walnut','64','15','18','16.5','2.5','18.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 421-1, 422-5, 423-4 Walnut.jpg | RE 634-2,  2.5″ x 25″-36″ x 10′.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('423-1','Slabs','Texas Walnut','64','11','18','14.5','2.5','16.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('423-2','Slabs','Texas Walnut','64','12','18','15','2.5','16.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 423-2, 423-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('423-3','Slabs','Texas Walnut','64','7','15','11','2.5','12.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Walnut 1268-4, 23-34inx13ft.jpg | TXUS - Series 423-2, 423-3 Walnut.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('424-1','Slabs','Texas Walnut','80','10','16','13','2.5','18.06','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 425-1 (SOLD), 424-1 Walnut.jpg | TXUS - Series 425-1, 424-1 Walnut.jpg | 414-2, 414-3.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('424-2','Slabs','Texas Walnut','80','11','17','14','2.5','19.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 424-3, 424-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('424-3','Slabs','Texas Walnut','80','13','18','15.5','2.5','21.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 424-3, 424-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('425-2','Slabs','Texas Walnut','80','14','25','19.5','2.5','27.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 425-2, 425-3 Walnut.jpg | RE - Oak 524-2 & 524-3.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('425-3','Slabs','Texas Walnut','80','11','24','17.5','2.5','24.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 425-2, 425-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('425-4','Slabs','Texas Walnut','80','10','25','17.5','2.5','24.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 425-4, 425-5 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('425-5','Slabs','Texas Walnut','80','10','22','16','2.5','22.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 425-4, 425-5 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('426-1','Slabs','Texas Walnut','64','10','12','11','2.5','12.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 426-1, 426-2, 427-1 Walnut.jpg | TXUS - Series 426-1, 426-2 SOLD, 427-1 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('426-3','Slabs','Texas Walnut','64','9','11','10','2.5','11.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 426-3 Walnut.jpg | Walnut ID960-4, 26-39in, 2.5in thick, 15ft.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('427-1','Slabs','Texas Walnut','64','10','11','10.5','2.5','11.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 426-1, 426-2, 427-1 Walnut.jpg | TXUS - Series 426-1, 426-2 SOLD, 427-1 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('427-2','Slabs','Texas Walnut','64','9','11','10','2.5','11.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('428-2','Slabs','Texas Walnut','52','10','11','10.5','2.5','9.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 428-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('428-3','Slabs','Texas Walnut','52','10','12','11','2.5','9.93','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 428-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('428-4','Slabs','Texas Walnut','52','10','10','10','2.5','9.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 428-4 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('428-5','Slabs','Texas Walnut','52','10','10','10','2.5','9.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 428-5 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('429-1','Slabs','Texas Walnut','52','8','10','9','2.5','8.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 429-1 Walnut.jpg | RE Walnut-642-9, 10 ft x 26-47in wide x 2in.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('429-2','Slabs','Texas Walnut','52','8','9','8.5','2.25','6.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 429-2 Walnut.jpg | Walnut 924-2 & 924-3, Digital Bookmatch Simulation.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('429-3','Slabs','Texas Walnut','52','9','10','9.5','2.5','8.58','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 429-3 Walnut.jpg | Live-Edge-Walnut-Slab-1084-4, 29-37in wide x 11 ft.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('429-4','Slabs','Texas Walnut','52','7','8','7.5','2.25','6.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 429-4 Walnut.jpg | walnut-788-4, 29-48in wide x 9ft.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('430-1','Slabs','Texas Walnut','38','7','12','9.5','2.5','6.27','BOARD_FEET_X_RATE',NULL,NULL,NULL,'walnut-1430-1011-bookmatch-sim.jpg | TXUS - Series 430-1 Walnut.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('430-2','Slabs','Texas Walnut','38','8','12','10','2.5','6.6','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 430-2 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('430-3','Slabs','Texas Walnut','38','8','9','8.5','2.5','5.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS - Series 430-3 Walnut.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('431-1','Slabs','Post Oak','126','18','24','21','3','55.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('431-4','Slabs','Post Oak','126','28','31','29.5','3','77.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('431-5','Slabs','Post Oak','126','28','34','31','3','81.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('431-6','Slabs','Post Oak','126','28','31','29.5','3','77.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TWA-431-6 & 7.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('AEL405-3','Slabs','American Elm','112','21','33','27','3','63','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 2','Slabs','Black Jack Oak','110','25','32','28.5','3','65.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO2.jpg | BJO2.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 3','Slabs','Black Jack Oak','110','29','36','32.5','3','74.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO3.jpg | BJO3.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 4','Slabs','Black Jack Oak','110','31','37','34','3','77.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO4.jpg | BJO4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 5','Slabs','Black Jack Oak','110','36','37','36.5','3','83.65','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO5.jpg | BJO5.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 6','Slabs','Black Jack Oak','110','33','40','36.5','3','83.65','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO6.jpg | BJO6.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 7','Slabs','Black Jack Oak','110','35','40','37.5','3','85.94','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO7.jpg | BJO7.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 8','Slabs','Black Jack Oak','110','36','40','38','3','87.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO8.jpg | BJO8.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('BJO 9','Slabs','Black Jack Oak','110','28','38','33','3','75.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'BJOBJO9.jpg | BJO9.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 100','Slabs','English Walnut','103','24','35','29.5','2.5','52.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW100.jpg | EW100.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 101','Slabs','English Walnut','103','23','33','28','2.5','50.07','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW101.jpg | EW101.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 102','Slabs','English Walnut','103','22','30','26','2.5','46.49','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW102.jpg | EW102.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 103','Slabs','English Walnut','103','18','30','24','2.5','42.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW103.jpg | EW103.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 104','Slabs','English Walnut','100','21','28','24.5','2.5','42.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW104.jpg | EW104.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 105','Slabs','English Walnut','100','23','32','27.5','2.5','47.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW105.jpg | EW105.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 106','Slabs','English Walnut','100','22','35','28.5','2.5','49.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 107','Slabs','English Walnut','100','22','37','29.5','2.5','51.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW107.jpg | EW107.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 108','Slabs','English Walnut','100','22','37','29.5','2.5','51.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW108.jpg | EW108.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 109','Slabs','English Walnut','100','18','37','27.5','2.5','47.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW109.jpg | EW109.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 110','Slabs','English Walnut','100','28','31','29.5','2.5','51.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW110.jpg | EW110.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 111','Slabs','English Walnut','103','28','31','29.5','2.5','52.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW111.jpg | EW111.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 112','Slabs','English Walnut','103','27','30','28.5','2.5','50.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW112.jpg | EW112.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 113','Slabs','English Walnut','103','27','29','28','2.5','50.07','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW113.jpg | EW113.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 114','Slabs','English Walnut','102','19','24','21.5','2.5','38.07','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EW114.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 115','Slabs','English Walnut','24','21','21','21','3','10.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 116','Slabs','English Walnut','21','19','19','19','3.5','9.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 118','Slabs','English Walnut','20','18','18','18','3.5','8.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 119','Slabs','English Walnut','20','18','18','18','3.5','8.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 12','Slabs','English Walnut','104','13','22','17.5','2.5','31.6','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW12.jpg | EW12.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 120','Slabs','English Walnut','21','20','20','20','3.25','9.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 121 - SOLD','Slabs','English Walnut','20','20','20','20','1.75','4.86','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 122','Slabs','English Walnut','21','20','20','20','3','8.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 13','Slabs','English Walnut','104','22','26','24','2.5','43.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW13.jpg | EW13.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 14','Slabs','English Walnut','104','22','26','24','2.5','43.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW14.jpg | EW14.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 15','Slabs','English Walnut','104','21','27','24','2.5','43.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW15.jpg | EW15.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 16','Slabs','English Walnut','104','15','24','19.5','2.5','35.21','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW16.jpg | EW16.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 17','Slabs','English Walnut','104','14','21','17.5','2.5','31.6','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW17.jpg | EW17.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 18','Slabs','English Walnut','104','17','21','19','2.5','34.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW18.jpg | EW18.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 19','Slabs','English Walnut','104','17','21','19','2.5','34.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW19.jpg | EW19.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 20','Slabs','English Walnut','104','17','20','18.5','2.5','33.4','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW20.jpg | EW20.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 21','Slabs','English Walnut','104','12','17','14.5','2.5','26.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW21.jpg | EW21.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 22','Slabs','English Walnut','104','19','22','20.5','2.5','37.01','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW22.jpg | EW22.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 23','Slabs','English Walnut','104','19','24','21.5','2.5','38.82','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW23.jpg | EW23.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 24','Slabs','English Walnut','104','19','26','22.5','2.5','40.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW24.jpg | EW24.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 25','Slabs','English Walnut','104','19','26','22.5','2.5','40.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW25.jpg | EW25.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 26','Slabs','English Walnut','104','14','23','18.5','2.5','33.4','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW26.jpg | EW26.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 27','Slabs','English Walnut','104','18','28','23','2.5','41.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW27.jpg | EW27.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 28','Slabs','English Walnut','104','19','29','24','2.5','43.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW28.jpg | EW28.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 29','Slabs','English Walnut','104','17','28','22.5','2.5','40.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW29.jpg | EW29.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 30','Slabs','English Walnut','104','14','25','19.5','2.5','35.21','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW30.jpg | EW30.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 31','Slabs','English Walnut','104','15','19','17','2.5','30.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW31.jpg | EW31.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 32','Slabs','English Walnut','104','9','28','18.5','2.5','33.4','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW32.jpg | EW32.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 33','Slabs','English Walnut','104','19','20','19.5','2.5','35.21','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW33.jpg | EW33.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 34','Slabs','English Walnut','104','11','21','16','2.25','26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW34.jpg | EW34.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 35','Slabs','English Walnut','104','17','23','20','2.25','32.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW35.jpg | EW35.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 36','Slabs','English Walnut','104','22','24','23','2.25','37.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW36.jpg | EW36.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 37','Slabs','English Walnut','104','15','24','19.5','2.25','31.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW37.jpg | EW37.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 38','Slabs','English Walnut','104','21','26','23.5','2.25','38.19','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW38.jpg | EW38.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 39','Slabs','English Walnut','104','21','25','23','1.5','24.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW39.jpg | EW39.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 48','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW48.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 50','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW50.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 51','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW51.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 52','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW52.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 53','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW53.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 54','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EWEW54.jpg | EW54.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 57','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW57.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 63','Cookies & Rounds','English Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','348.3',NULL,NULL,'EW63.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 66','Slabs','English Walnut','127','14','20','17','2.5','37.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW66.jpg | EW66.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 67','Slabs','English Walnut','127','19','22','20.5','2.5','45.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW67.jpg | EW67.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 68','Slabs','English Walnut','127','22','29','25.5','2.5','56.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW68.jpg | EW68.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 69','Slabs','English Walnut','127','21','31','26','2.5','57.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW69.jpg | EW69.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 70','Slabs','English Walnut','127','18','29','23.5','2.5','51.81','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW70.jpg | EW70.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 71','Slabs','English Walnut','127','16','23','19.5','2.5','42.99','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW71.jpg | EW71.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 72','Slabs','English Walnut','127','20','25','22.5','2.5','49.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW72.jpg | EW72.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 73','Slabs','English Walnut','127','21','29','25','2.5','55.12','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW73.jpg | EW73.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 74','Slabs','English Walnut','127','19','29','24','2.5','52.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW74.jpg | EW74.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 75','Slabs','English Walnut','127','12','18','15','2.5','33.07','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW75.jpg | EW75.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 76','Slabs','English Walnut','127','15','18','16.5','2.5','36.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW76.jpg | EW76.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 77','Slabs','English Walnut','127','15','18','16.5','2.5','36.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW77.jpg | EW77.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 78','Slabs','English Walnut','127','16','22','19','2.5','41.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW78.jpg | EW78.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 79','Slabs','English Walnut','127','15','19','17','2.5','37.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW79.jpg | EW79.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 80','Slabs','English Walnut','127','16','19','17.5','2.5','38.59','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW80.jpg | EW80.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 81','Slabs','English Walnut','127','17','20','18.5','2.5','40.79','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW81.jpg | EW81.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 82','Slabs','English Walnut','127','20','23','21.5','2.5','47.4','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW82.jpg | EW82.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 83','Slabs','English Walnut','127','19','23','21','2.5','46.3','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW83.jpg | EW83.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 84','Slabs','English Walnut','127','16','24','20','2.5','44.1','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW84.jpg | EW84.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 85','Slabs','English Walnut','127','15','29','22','2.5','48.51','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW85.jpg | EW85.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 86','Slabs','English Walnut','127','19','30','24.5','2.5','54.02','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW86.jpg | EW86.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 87','Slabs','English Walnut','127','21','28','24.5','2.5','54.02','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW87.jpg | EW87.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 88','Slabs','English Walnut','127','21','30','25.5','2.5','56.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW88.jpg | EW88.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 89','Slabs','English Walnut','101','18','26','22','2.5','38.58','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW89.jpg | EW89.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 90','Slabs','English Walnut','101','22','29','25.5','2.5','44.71','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW90.jpg | EW90.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 91','Slabs','English Walnut','101','22','31','26.5','2.5','46.47','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW91.jpg | EW91.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 92','Slabs','English Walnut','101','22','30','26','2.5','45.59','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW92.jpg | EW92.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 93','Slabs','English Walnut','99','13','14','13.5','2.5','23.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW93.jpg | EW93.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 94','Slabs','English Walnut','99','13','14','13.5','2.5','23.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW94.jpg | EW94.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 95','Slabs','English Walnut','99','18','23','20.5','2.5','35.23','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW95.jpg | EW95.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 96','Slabs','English Walnut','99','18','24','21','2.5','36.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW96.jpg | EW96.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 97','Slabs','English Walnut','99','19','24','21.5','2.5','36.95','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW97.jpg | EW97.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 98','Slabs','English Walnut','103','15','31','23','2.5','41.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW98.jpg | EW98.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW 99','Slabs','English Walnut','103','19','36','27.5','2.5','49.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWEW99.jpg | EW99.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-C1','Mantels','English Walnut','78','8','8.25','8.13','8.25','36.33','BOARD_FEET_X_RATE',NULL,NULL,'Cant',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-C2','Mantels','English Walnut','77','8','8.25','8.13','8','34.78','BOARD_FEET_X_RATE',NULL,NULL,'Cant',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-C3','Mantels','English Walnut','69','10','10','10','10','47.92','BOARD_FEET_X_RATE',NULL,NULL,'Cant',NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-M1','Mantels','English Walnut','95','6','14','10','7.8725','51.94','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EW-M1 Face.jpg | EW-M1.jpg | EW-M1&2.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-M2','Mantels','English Walnut','95','6','15','10.5','7.8725','54.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-M3','Mantels','English Walnut','95','6','13','9.5','7.8725','49.34','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EW-M3&4.jpeg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EW-M4','Mantels','English Walnut','95','6','12','9','10','59.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EW-M4 Face.jpg | EW-M4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 68','Slabs','English Walnut','103','14','20','17','2.5','30.4','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA68.jpg | EWA68.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 69','Slabs','English Walnut','103','15','21','18','2.5','32.19','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA69.jpg | EWA69.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 70','Slabs','English Walnut','103','21','23','22','2.5','39.34','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA70.jpg | EWA70.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 71','Slabs','English Walnut','103','19','22','20.5','2.5','36.66','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA71.jpg | EWA71.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 72','Slabs','English Walnut','103','16','19','17.5','2.5','31.29','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA72.jpg | EWA72.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 73','Slabs','English Walnut','100','18','21','19.5','2.5','33.85','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA73.jpg | EWA73.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 74','Slabs','English Walnut','100','20','22','21','2.5','36.46','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA74.jpg | EWA74.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 75','Slabs','English Walnut','100','19','21','20','2.5','34.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA75.jpg | EWA75.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 76','Slabs','English Walnut','100','11','20','15.5','2.5','26.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA76.jpg | EWA76.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('EWA 77','Slabs','English Walnut','100','10','17','13.5','2.5','23.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'EWAEWA77.jpg | EWA77.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 10','Slabs','American Elm','95','25','30','27.5','2.75','49.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE10.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 11','Slabs','American Elm','95','24','27','25.5','2.75','46.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE11.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 12','Slabs','American Elm','95','20','27','23.5','2.75','42.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE12.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 13','Slabs','American Elm','95','17','23','20','2.75','36.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE13.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 14','Slabs','American Elm','61','17','31','24','2.75','27.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE14.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 15','Slabs','American Elm','61','19','32','25.5','2.75','29.71','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE15.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 16','Slabs','American Elm','61','19','29','24','2.75','27.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE16.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 17','Slabs','American Elm','61','11','24','17.5','2.75','20.39','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE17.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 18','Slabs','American Elm','59','16','23','19.5','2.75','21.97','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE18.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 19','Slabs','American Elm','59','20','23','21.5','2.75','24.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE19.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 20','Slabs','American Elm','59','21','23','22','2.75','24.79','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE20.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 21','Slabs','American Elm','59','19','22','20.5','2.75','23.1','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE21.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 22','Slabs','American Elm','59','16','20','18','2.75','20.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE22.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 23','Mantels','American Elm','95','7','8','7.5','5','24.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE23.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 33','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','132.03',NULL,NULL,'TAETAE33.jpg | TAE33.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 39','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAETAE39.jpg | TAE39.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 40','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAETAE405-4 SOLD CHANDLER.jpg | TAETAE405-1.jpg | TAETAE405-3.jpg | TAETAE405-2 SOLD BRENT.jpg | TAETAE405-5.jpg | TAETAE405-6.jpg | TAE40.jpg | TAE405-4.jpg',NULL,9,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 41','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAE41.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 42','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAETAE42.jpg | TAE42.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 43','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAE43.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 44','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAE44.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 46','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','297',NULL,NULL,'TAE46.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 47','Cookies & Rounds','American Elm',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','149.04',NULL,NULL,'TAE47.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 52','Slabs','American Elm','113','12','14','13','4.25','43.36','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE52.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 65','Slabs','American Elm','99','29','37','33','2.75','62.39','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE65.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 66','Slabs','American Elm','99','32','41','36.5','2.75','69.01','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE66.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 67','Slabs','American Elm','99','30','42','36','2.75','68.06','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE67.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 68','Slabs','American Elm','99','28','42','35','2.75','66.17','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE68.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 69','Slabs','American Elm','99','25','39','32','2.75','60.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE69.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 70','Slabs','American Elm','99','15','37','26','2.75','49.16','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE70.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 8','Slabs','American Elm','95','21','26','23.5','2.75','42.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE8.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE 9','Slabs','American Elm','95','22','31','26.5','2.75','48.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE9.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-24','Mantels','American Elm','95','7','8','7.5','5','24.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE24.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-25','Mantels','American Elm','95','9','11','10','5','32.99','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE25.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-26','Mantels','American Elm','95','9','10','9.5','5','31.34','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE26.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-48','Mantels','American Elm','103','7','14','10.5','5','37.55','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE48.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-53','Mantels','American Elm','113','12','14','13','4','40.81','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE53.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-61','Mantels','American Elm','104','7','10','8.5','5.5','33.76','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE61.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-62','Mantels','American Elm','103','9','10','9.5','5','33.98','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE62.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-63','Mantels','American Elm','103','7','9','8','4.75','27.18','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE63.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-64','Mantels','American Elm','104','11','11','11','3.5','27.81','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-71','Mantels','American Elm','102','10','13','11.5','8.5','69.24','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE71 Face.jpg | TAE71.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-72','Mantels','American Elm','127','12','12','12','8.5','89.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE72 Face.jpg | TAE72.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-73','Mantels','American Elm','127','6.5','8.5','7.5','6.5','42.99','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE73 Face.jpg | TAE73.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-M1','Mantels','American Elm','112','11.5','12','11.75','6','54.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE-M1.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-M2','Mantels','American Elm','112','11','12','11.5','6','53.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE-M2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE-M3','Mantels','American Elm','112','9.5','9.5','9.5','6','44.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAE-M3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-1','Slabs','American Elm','100','22','30','26','3','54.17','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-1.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-2','Slabs','American Elm','101','20','30','25','3','52.6','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-2 SOLD BRENT.jpg | TAE405-2.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-4','Slabs','American Elm','112','28','36','32','3','74.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-4 SOLD CHANDLER.jpg | TAE405-4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-5','Slabs','American Elm','112','26','43','34.5','3','80.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-6','Slabs','American Elm','112','21','44','32.5','3','75.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TAETAE405-6.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAE405-7','Slabs','American Elm','112','13','40','26.5','3','61.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAS 2','Cookies & Rounds','Texas Ash',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','74.25',NULL,NULL,'TAS2.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAS 3','Cookies & Rounds','Texas Ash',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','74.25',NULL,NULL,'TAS3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAS 4','Cookies & Rounds','Texas Ash',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','74.25',NULL,NULL,'TAS4.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TAS 5','Cookies & Rounds','Texas Ash',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','74.25',NULL,NULL,'TAS5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TCY-100-1','Slabs','Texas CHERRY','78','14','21','17.5','2','18.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TCY-100-1 & 2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TCY-100-2','Slabs','Texas CHERRY','78','15','22','18.5','2','20.04','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TCY-100-3','Slabs','Texas CHERRY','78','15','24','19.5','2','21.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TCY-100-3 & 4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TCY-100-4','Slabs','Texas CHERRY','78','13','20','16.5','2','17.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TCY-100-5','Slabs','Texas CHERRY','78','12','19','15.5','2','16.79','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TCY-100-5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 10','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','93.52',NULL,NULL,'TLOTLO10.jpg | TLO10.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 11','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO11.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 12','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO12.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 14','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO14.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 15','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO15.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 16','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLOTLO16.jpg | TLO16.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 17','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO17.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 18','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO18.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 19','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO19.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 20','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLOTLO20.jpg | TLO20.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 21','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO21.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 22','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO22.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 24','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO24.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 26','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','59.88',NULL,NULL,'TLO26.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 27','Slabs','Texas Live Oak','134','29','47','38','3','106.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TLOTLO27.jpg | TLO27.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 28','Slabs','Texas Live Oak','134','29','47','38','3','106.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TLOTLO28.jpg | TLO28.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 29','Slabs','Texas Live Oak','125','28','30','29','3','75.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TLOTLO29.jpg | TLO29.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 7','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','93.52',NULL,NULL,'TLO7.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 8','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','93.52',NULL,NULL,'TLOTLO8.jpg | TLO8.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO 9','Cookies & Rounds','Texas Live Oak',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','93.52',NULL,NULL,'TLO9.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO-M1','Mantels','Live Oak','96','6.5','9.75','8.13','4.75','25.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TLO-M1 Face.jpg | TLO-M1.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TLO-M2','Mantels','Live Oak','96','5','10','7.5','5.75','28.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TMC 2','Cookies & Rounds','Texas Mountain Cedar',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','11.04',NULL,NULL,'TMC2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TMC 3','Cookies & Rounds','Texas Mountain Cedar',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','11.04',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 10','Slabs','Texas Mesquite','102','18','21','19.5','2.25','31.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME10.jpg | TMETME10.jpg | TME10.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 11','Slabs','Texas Mesquite','102','17','21','19','2.25','30.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME11.jpg | TMETME11.jpg | TME11.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 12','Slabs','Texas Mesquite','102','15','22','18.5','2.25','29.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME12.jpg | TMETME12.jpg | TME12.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 13','Slabs','Texas Mesquite','102','16','21','18.5','2.25','29.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME13.jpg | TMETME13.jpg | TME13.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 14','Slabs','Texas Mesquite','102','18','23','20.5','2.25','32.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME14.jpg | TMETME14.jpg | TME14.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 15','Slabs','Texas Mesquite','102','17','22','19.5','2.25','31.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME15.jpg | TMETME15.jpg | TME15.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 16','Slabs','Texas Mesquite','102','10','22','16','2.25','25.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME16.jpg | TMETME16.jpg | TME16.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 17','Slabs','Texas Mesquite','98','19','21','20','2.25','30.63','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME17.jpg | TMETME17.jpg | TME17.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 18','Slabs','Texas Mesquite','101','16','22','19','2.25','29.98','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME18.jpg | TMETME18.jpg | TME18.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 19','Slabs','Texas Mesquite','100','17','21','19','2.25','29.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME19.jpg | TMETME19.jpg | TME19.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 2','Slabs','Texas Mesquite','102','16','20','18','2.25','28.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME28.jpg | Texas Mesquite TME26.jpg | Texas Mesquite TME27.jpg | Texas Mesquite TME25.jpg | Texas Mesquite TME24.jpg | Texas Mesquite TME23.jpg | Texas Mesquite TME22.jpg | Texas Mesquite TME21.jpg',NULL,30,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 20','Slabs','Texas Mesquite','100','17','20','18.5','2.25','28.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME20.jpg | TMETME20.jpg | TME20.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 21','Slabs','Texas Mesquite','100','16','18','17','2.25','26.56','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME21.jpg | TMETME21.jpg | TME21.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 22','Slabs','Texas Mesquite','100','16','22','19','2.25','29.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME22.jpg | TMETME22.jpg | TME22.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 23','Slabs','Texas Mesquite','60','16','22','19','2.25','17.81','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME23.jpg | TMETME23.jpg | TME23.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 24','Slabs','Texas Mesquite','75','21','23','22','2.25','25.78','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME24.jpg | TMETME24.jpg | TME24.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 25','Slabs','Texas Mesquite','83','23','27','25','2.25','32.42','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME25.jpg | TMETME25.jpg | TME25.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 26','Slabs','Texas Mesquite','83','23','27','25','2.25','32.42','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME26.jpg | TMETME26.jpg | TME26.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 27','Slabs','Texas Mesquite','83','23','27','25','2.25','32.42','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME27.jpg | TMETME27.jpg | TME27.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 28','Slabs','Texas Mesquite','83','26','40','33','2.25','42.8','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME28.jpg | TMETME28.jpg | TME28.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 3','Slabs','Texas Mesquite','102','18','19','18.5','2.25','29.48','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME38.jpg | Texas Mesquite TME35.jpg | Texas Mesquite TME36.jpg | Texas Mesquite TME37.jpg | Texas Mesquite TME34.jpg | Texas Mesquite TME31.jpg | Texas Mesquite TME32.jpg | Texas Mesquite TME33.jpg',NULL,33,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 30','Slabs','Texas Mesquite','93','17','41','29','2.25','42.14','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME30.jpg | TMETME30.jpg | TME30.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 31','Slabs','Texas Mesquite','93','14','38','26','2.25','37.78','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME31.jpg | TMETME31.jpg | TME31.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 32','Slabs','Texas Mesquite','0','0','0','0','2.25','0','EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'Texas Mesquite TME32.jpg | TMETME32.jpg | TME32.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 33','Slabs','Texas Mesquite','92','25','28','26.5','2.25','38.09','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME33.jpg | TMETME33.jpg | TME33.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 34','Slabs','Texas Mesquite','98','14','15','14.5','2.25','22.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME34.jpg | TMETME34.jpg | TME34.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 35','Slabs','Texas Mesquite','98','14','15','14.5','2.25','22.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME35.jpg | TMETME35.jpg | TME35.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 36','Slabs','Texas Mesquite','98','14','15','14.5','2.25','22.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME36.jpg | TMETME36.jpg | TME36.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 37','Slabs','Texas Mesquite','98','14','15','14.5','2.25','22.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME37.jpg | TMETME37.jpg | TME37.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 38','Slabs','Texas Mesquite','98','12','14','13','2.25','19.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME38.jpg | TMETME38.jpg | TME38.jpeg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 39','Slabs','Texas Mesquite','102','12','16','14','2.25','22.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME39.jpg | TMETME39.jpg | TME39.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 4','Slabs','Texas Mesquite','102','18','21','19.5','2.25','31.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME46.jpg | Texas Mesquite TME47.jpg | Texas Mesquite TME45.jpg | Texas Mesquite TME44.jpg | Texas Mesquite TME42.jpg | Texas Mesquite TME43.jpg | Texas Mesquite TME41.jpg | Texas Mesquite TME4.jpg',NULL,42,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 40','Slabs','Texas Mesquite','102','12','16','14','2.25','22.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME40.jpg | TME409-2.jpg | TME409-1.jpg | TME408-1.jpg | TME408-2.jpg | TME407-5.jpg | TME407-4.jpg | TME406-2 .jpg',NULL,15,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 41','Slabs','Texas Mesquite','102','15','16','15.5','2.25','24.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME41.jpg | TME412-4.jpg | TME412-3.jpg | TMETME41.jpg | TME41.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 42','Slabs','Texas Mesquite','102','13','14','13.5','2.25','21.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME42.jpg | TMETME42.jpg | TME42.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 43','Slabs','Texas Mesquite','102','13','14','13.5','2.25','21.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME43.jpg | TMETME43.jpg | TME43.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 44','Slabs','Texas Mesquite','99','12','14','13','2.25','20.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME44.jpg | TMETME44.jpg | TME44.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 45','Slabs','Texas Mesquite','98','13','15','14','2.25','21.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME45.jpg | TMETME45.jpg | TME45.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 46','Slabs','Texas Mesquite','98','12','15','13.5','2.25','20.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME46.jpg | TMETME46.jpg | TME46.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 47','Slabs','Texas Mesquite','98','11','13','12','2.25','18.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME47.jpg | TMETME47.jpg | TME47.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 49','Slabs','Texas Mesquite','103','10','15','12.5','5','44.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME49.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 5','Slabs','Texas Mesquite','102','18','20','19','2.25','30.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME5.jpg | TMETME52.jpg | TMETME5.jpg | TME5.jpg | TME51.jpg | TME54.jpg | TME55.jpg | TME52.jpg',NULL,10,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 51','Slabs','Texas Mesquite','101','10','15','12.5','5','43.84','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME51.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 52','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TMETME52.jpg | TME52.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 54','Slabs','Texas Mesquite','76','8','13','10.5','5.75','31.86','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME54.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 55','Slabs','Texas Mesquite','75','8','13','10.5','5.75','31.45','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME55.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 56','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME56.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 59','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME59.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 6','Slabs','Texas Mesquite','102','14','19','16.5','2.25','26.3','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME6.jpg | TMETME67.jpg | TMETME65.jpg | TMETME6.jpg | TME6.jpg | TME60.jpg | TME61.jpg | TME62.jpg',NULL,14,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 60','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME60.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 61','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME61.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 62','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME62.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 63','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME63.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 64','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME64.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 65','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TMETME65.jpg | TME65.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 66','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME66.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 67','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'2.25',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TMETME67.jpg | TME67.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 7','Slabs','Texas Mesquite','102','18','21','19.5','2.25','31.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME7.jpg | TMETME70.jpg | TMETME7.jpg | TME7.jpg | TME70.jpg | TME71.jpg | TME72.jpg',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 70','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'4',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TMETME70.jpg | TME70.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 71','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'4',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME71.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 72','Cookies & Rounds','Texas Mesquite',NULL,NULL,NULL,NULL,'3',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','63.83',NULL,NULL,'TME72.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 8','Slabs','Texas Mesquite','102','19','21','20','2.25','31.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME81 Face.jpg | TME81.jpg | TME80 Face.jpg | TME80.jpg | Texas Mesquite TME8.jpg | TMETME8.jpg | TME8.jpg',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME 9','Slabs','Texas Mesquite','102','20','21','20.5','2.25','32.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'Texas Mesquite TME9.jpg | TMETME9.jpg | TME9.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-80','Mantels','Mesquite','102','8','12','10','6.5','46.04','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME80 Face.jpg | TME80.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-81','Mantels','Mesquite','103','8','12','10','6.5','46.49','BOARD_FEET_X_RATE',NULL,NULL,'46.041666666666664','TME81 Face.jpg | TME81.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M1','Mantels','Mesquite','85','11','14','12.5','63.5','468.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M17 Face.jpg | TME-M17.jpg | TME-M16 Face.jpg | TME-M16.jpg | TME-M15 Face.jpg | TME-M15.jpg | TME-M14 Face.jpg | TME-M14.jpg',NULL,17,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M10','Mantels','Mesquite','78','6','9','7.5','8.5','34.53','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M10 Face.jpg | TME-M10.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M11','Mantels','Mesquite','79','8','10.5','9.25','8.5','43.13','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M11 Face.jpg | TME-M11.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M12','Mantels','Mesquite','83','8','9.5','8.75','8.5','42.87','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M12 Face.jpg | TME-M12.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M13','Mantels','Mesquite','80','7.5','10.5','9','8.5','42.5','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M13 Face.jpg | TME-M13.jpg | TME-M13 Face 1.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M14','Mantels','Mesquite','80','7','10','8.5','8.5','40.14','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M14 Face.jpg | TME-M14.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M15','Mantels','Mesquite','79','8','10','9','8.5','41.97','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M15 Face.jpg | TME-M15.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M16','Mantels','Mesquite','78','9.5','11','10.25','8.5','47.19','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M16 Face.jpg | TME-M16.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M17','Mantels','Mesquite','78','9.5','11','10.25','8.5','47.19','BOARD_FEET_X_RATE',NULL,NULL,'Milled 2/26/26','TME-M17 Face.jpg | TME-M17.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M2','Mantels','Mesquite','99','10.25','10.25','10.25','4.75','33.47','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M2.jpg | TME-M2 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M3','Mantels','Mesquite','91','9','11','10','6.5','41.08','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M3.jpg | TME-M3 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M4','Mantels','Mesquite','91.5','9','11.5','10.25','6.5','42.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M4.jpg | TME-M4 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M5','Mantels','Mesquite','100','8','11','9.5','6','39.58','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M5.jpg | TME-M5 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M6','Mantels','Mesquite','99','4','7.5','5.75','6.5','25.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M6.jpg | TME-M6 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M7','Mantels','Mesquite','101','5','9','7','6.5','31.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M7.jpg | TME-M7 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M8','Mantels','Mesquite','80','7.5','10','8.75','7.5','36.46','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TME-M8.jpg | TME-M8 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TME-M9','Mantels','Mesquite','101','5','9','7','6.25','30.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 15','Slabs','Texas Pecan','103','10','18','14','2.5','25.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 15.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 16','Slabs','Texas Pecan','101','18','20','19','2.5','33.32','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 16.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 17','Slabs','Texas Pecan','98','18','18','18','2.25','27.56','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 17.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 18','Slabs','Texas Pecan','102','17','18','17.5','2.25','27.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 18.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 19','Slabs','Texas Pecan','103','13','18','15.5','2.25','24.95','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 19.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 2','Slabs','Texas Pecan','83','10','11','10.5','5','30.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE2.jpeg | TPE-20-counter.jpg | TPE-20-counter.jpg.HEIC | TPE 29, 30.jpg | TPE 25.jpg | TPE 26, 27, 28.jpg | TPE 22.jpg | TPE 23.jpg',NULL,36,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 20','Slabs','Texas Pecan','98','21','12','16.5','2.25','25.27','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-20-counter.jpg | TPE-20-counter.jpg.HEIC | TPE 20.jpg | TPE 20-8.jpg | TPE 20-9.jpg | TPE 20-7.jpg | TPE 20-6.jpg | TPE 20-5.jpg',NULL,11,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 21','Slabs','Texas Pecan','98','7','17','12','2.25','18.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 21.jpg | TPE 21-4.jpg | TPE 21-1.jpg | TPE 21-2.jpg | TPE 21-5.jpg | TPE 21-3.jpg | TPE 21-6.jpg',NULL,7,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 22','Slabs','Texas Pecan','100','14','27','20.5','2.25','32.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 22.jpg | TPE 22-6.jpg | TPE 22-4.jpg | TPE 22-2.jpg | TPE 22-3.jpg | TPE 22-5.jpg | TPE 22-1.jpg | TPE 228-007 Oak Hill, 20231019_090531.jpg',NULL,11,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 23','Slabs','Texas Pecan','99','6','8','7','2.25','10.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 23.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 24','Slabs','Texas Pecan','99','6','8','7','2.25','10.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 24.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 25','Slabs','Texas Pecan','90','8','10','9','2','11.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 25.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 26','Slabs','Texas Pecan','70','6','7','6.5','1.75','5.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 26, 27, 28.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 27','Slabs','Texas Pecan','70','7','8','7.5','1.75','6.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 28','Slabs','Texas Pecan','84','8','9','8.5','1.75','8.68','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 29','Slabs','Texas Pecan','85','7','9','8','1.75','8.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 29, 30.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 3','Slabs','Texas Pecan','95','11','12','11.5','5','37.93','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 38, 39.jpg | TPE 35, 36, 37.jpg | TPE 31, 32.jpg | TPE 33, 34.jpg | TPE3.jpg',NULL,5,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 30','Slabs','Texas Pecan','85','4','9','6.5','1.75','6.71','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 31','Slabs','Texas Pecan','85','7','9','8','1.75','8.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 31, 32.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 32','Slabs','Texas Pecan','89','8','8','8','1.75','8.65','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 33','Slabs','Texas Pecan','78','9','15','12','1.75','11.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 33, 34.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 34','Slabs','Texas Pecan','78','10','13','11.5','1.75','10.9','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 35','Slabs','Texas Pecan','63','8','11','9.5','2','8.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 35, 36, 37.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 36','Slabs','Texas Pecan','71','7','7','7','2','6.9','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 37','Slabs','Texas Pecan','71','7','7','7','2','6.9','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 38','Slabs','Texas Pecan','70','5','7','6','1.75','5.1','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 38, 39.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 39','Slabs','Texas Pecan','77','7','9','8','1.5','6.42','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-03','Slabs','Texas Pecan','93','41','43','42','2.75','74.59','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-04','Slabs','Texas Pecan','93','42','47','44.5','2.75','79.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-05','Slabs','Texas Pecan','93','43','46','44.5','2.75','79.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-06','Slabs','Texas Pecan','93','41','46','43.5','2.75','77.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-08','Slabs','Texas Pecan','93','38','43','40.5','2.75','71.93','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-09','Slabs','Texas Pecan','93','31','46','38.5','2.75','68.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 600-10','Slabs','Texas Pecan','93','27','37','32','2.75','56.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TXUS TPE 600-10.jpg | TPE 600-10.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-1','Slabs','Texas Pecan','103','19','23','21','2','30.04','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-2','Slabs','Texas Pecan','103','22','30','26','2.5','46.49','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-3','Slabs','Texas Pecan','103','26','31','28.5','2.5','50.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-4','Slabs','Texas Pecan','103','29','32','30.5','2.5','54.54','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-5','Slabs','Texas Pecan','103','30','34','32','2.5','57.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-6','Slabs','Texas Pecan','103','29','33','31','2.5','55.43','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 601-7','Slabs','Texas Pecan','103','28','31','29.5','2.5','52.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-1','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-1.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-2','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-3','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-4','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-5','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-6','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-6.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-7','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-7.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE 602-8','Cookies & Rounds','Texas Pecan BURL Cookie',NULL,NULL,NULL,NULL,'2',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS',NULL,NULL,NULL,'TPE-602-8.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-4','Mantels','Texas Pecan','95','11','12','11.5','5','37.93','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE42 Face - Copy.jpg | TPE42 Face.jpg | TPE42.jpg | TPE42 - Copy.jpg | TPE43.jpg | TPE41 Face.jpg | TPE41 Face - Copy.jpg | TPE41 - Copy.jpg',NULL,37,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-40','Mantels','Pecan','102','10','11','10.5','8.5','63.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE40 Face.jpg | TPE40 - Copy.jpg | TPE40.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-41','Mantels','Pecan','102','11','13','12','6.5','55.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE41 Face.jpg | TPE41 Face - Copy.jpg | TPE41 - Copy.jpg | TPE41.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-42','Mantels','Pecan','82','10','12','11','8.75','54.81','BOARD_FEET_X_RATE',NULL,NULL,'Blanco State Park','TPE42 Face - Copy.jpg | TPE42 Face.jpg | TPE42.jpg | TPE42 - Copy.jpg',NULL,4,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-43','Mantels','Pecan','103','6.5','6.5','6.5','3.25','15.11','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE43.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-01','Slabs','Texas Pecan','146','23','29','26','2.75','72.49','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-01.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-02','Slabs','Texas Pecan','146','26','33','29.5','2.75','82.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-02.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-03','Slabs','Texas Pecan','146','27','35','31','2.75','86.43','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-03.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-04','Slabs','Texas Pecan','146','27','35','31','2.75','86.43','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-04.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-05','Slabs','Texas Pecan','146','27','34','30.5','2.75','85.04','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-05.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-06','Slabs','Texas Pecan','146','26','31','28.5','2.75','79.46','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-06.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-498-07','Slabs','Texas Pecan','146','22','27','24.5','2.75','68.31','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 498-07.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-499-01','Slabs','Texas Pecan','151','26','36','31','2.75','89.39','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 499-01.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-499-02','Slabs','Texas Pecan','151','28','38','33','2.75','95.16','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 499-02.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-499-03','Slabs','Texas Pecan','151','30','38','34','2.75','98.05','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 499-03.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-499-04','Slabs','Texas Pecan','151','32','36','34','2.75','98.05','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 499-04.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-499-05','Slabs','Texas Pecan','151','29','33','31','2.75','89.39','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 499-05.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-1','Slabs','Texas Pecan','177','17','25','21','3','77.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-1.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-2','Slabs','Texas Pecan','177','18','26','22','3','81.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-3','Slabs','Texas Pecan','177','25','28','26.5','3','97.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-4','Slabs','Texas Pecan','177','28','30','29','3','106.94','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-5','Slabs','Texas Pecan','177','27','31','29','3','106.94','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-515-6','Slabs','Texas Pecan','177','23','30','26.5','3','97.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-515-6.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-01','Slabs','Texas Pecan','147','28','35','31.5','2.75','88.43','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-01.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-02','Slabs','Texas Pecan','147','29','37','33','2.75','92.64','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-02.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-03','Slabs','Texas Pecan','147','30','38','34','2.75','95.45','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-03.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-04','Slabs','Texas Pecan','147','30','38','34','2.75','95.45','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-04.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-05','Slabs','Texas Pecan','147','29','36','32.5','2.75','91.24','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-05.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-535-06','Slabs','Texas Pecan','147','25','34','29.5','2.75','82.82','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 535-06.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-01','Slabs','Texas Pecan','194','19','26','22.5','2.75','83.36','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-01.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-02','Slabs','Texas Pecan','194','25','29','27','2.75','100.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-02.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-03','Slabs','Texas Pecan','194','31','32','31.5','2.75','116.7','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-03.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-04','Slabs','Texas Pecan','194','32','39','35.5','2.75','131.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-04.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-05','Slabs','Texas Pecan','194','31','40','35.5','2.75','131.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-05.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-06','Slabs','Texas Pecan','194','30','41','35.5','2.75','131.52','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-06.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-536-07','Slabs','Texas Pecan','194','26','40','33','2.75','122.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 536-07.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-01','Slabs','Texas Pecan','195','26','27','26.5','3','107.66','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-01.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-02','Slabs','Texas Pecan','195','26','27','26.5','3','107.66','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-02.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-03','Slabs','Texas Pecan','195','29','32','30.5','3','123.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-03.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-04','Slabs','Texas Pecan','195','29','32','30.5','3','123.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-04.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-05','Slabs','Texas Pecan','195','29','30','29.5','3','119.84','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-05.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-06','Slabs','Texas Pecan','195','26','29','27.5','3','111.72','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-06.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-537-07','Slabs','Texas Pecan','195','22','23','22.5','3','91.41','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE 537-07.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-01','Slabs','Texas Pecan','175','25','28','26.5','3','96.61','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-02','Slabs','Texas Pecan','175','25','36','30.5','3','111.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-03','Slabs','Texas Pecan','175','28','39','33.5','3','122.14','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-04','Slabs','Texas Pecan','175','29','39','34','3','123.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-05','Slabs','Texas Pecan','175','28','36','32','3','116.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-539-06','Slabs','Texas Pecan','175','27','30','28.5','3','103.91','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M1','Mantels','Pecan','93','11','14.5','12.75','5.5','45.29','BOARD_FEET_X_RATE',NULL,NULL,'Punky','TPE-M1 Face.jpg | TPE-M1.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M2','Mantels','Pecan','95','1','13','7','7.75','35.79','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-M2 Face.jpg | TPE-M2.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M3','Mantels','Pecan','93','11','13','12','6','46.5','BOARD_FEET_X_RATE',NULL,NULL,'Punky','TPE-M3 Face.jpg | TPE-M3.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M4','Mantels','Pecan','78','10','10','10','9.5','51.46','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-M4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M5','Mantels','Pecan','102','5','7','6','9.5','40.38','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M6','Mantels','Pecan','104','5','10','7.5','10','54.17','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-M6.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M7','Mantels','Pecan','103','11','10','10.5','7.75','58.21','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPE-M7.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPE-M8','Mantels','Pecan','103','9','11','10','7.5','53.65','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 1','Slabs','Texas Post Oak','126','18','25','21.5','3','56.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO17 - Kiln Dried.jpg | TPOTPO13.jpg | TPOTPO16.jpg | TPOTPO12.jpg | TPOTPO19.jpg | TPOTPO15.jpg | TPOTPO14.jpg | TPOTPO17.jpg',NULL,19,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 12','Slabs','Texas Post Oak','106','35','41','38','3','83.92','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO12.jpg | TPO12.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 13','Slabs','Texas Post Oak','106','37','41','39','3','86.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO13.jpg | TPO13.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 14','Slabs','Texas Post Oak','107','38','43','40.5','3','90.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO14.jpg | TPO14.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 15','Slabs','Texas Post Oak','107','39','42','40.5','3','90.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO15.jpg | TPO15.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 16','Slabs','Texas Post Oak','107','39','42','40.5','3','90.28','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO16.jpg | TPO16.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 17','Slabs','Texas Post Oak','107','37','40','38.5','3','85.82','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO17 - Kiln Dried.jpg | TPOTPO17.jpg | TPO17.jpg',NULL,3,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 18','Slabs','Texas Post Oak','107','32','38','35','3','78.02','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO18.jpg | TPO18.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 19','Slabs','Texas Post Oak','107','26','34','30','3','66.88','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO19.jpg | TPO19.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 2','Slabs','Texas Post Oak','126','24','28','26','3','68.25','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO25 Face.jpg | TPO25.jpg | TPO23 Face.jpg | TPO23.jpg | TPO22 Face.jpg | TPO22.jpg | TPO21 Face.jpg | TPO21.jpg',NULL,12,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 3','Slabs','Texas Post Oak','126','26','30','28','3','73.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO3.jpg | TPO3.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 4','Slabs','Texas Post Oak','126','28','31','29.5','3','77.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO4.jpg | TPO4.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 5','Slabs','Texas Post Oak','126','29','34','31.5','3','82.69','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO5.jpg | TPO5.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 6','Slabs','Texas Post Oak','126','28','31','29.5','3','77.44','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPOTPO6.jpg | TPO6.jpeg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO 7','Slabs','Texas Post Oak','126','28','29','28.5','3','74.81','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-20','Mantels','Post Oak','101','7.5','10.5','9','6.5','41.03','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO20 Face.jpg | TPO20.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-21','Mantels','Post Oak','101','7.75','7.75','7.75','6.5','35.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO21 Face.jpg | TPO21.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-22','Mantels','Post Oak','101','9.5','10','9.75','8.5','58.13','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO22 Face.jpg | TPO22.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-23','Mantels','Post Oak','101','10','12','11','8.5','65.58','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO23 Face.jpg | TPO23.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-25','Mantels','Post Oak','102','9','10','9.5','8.5','57.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO25 Face.jpg | TPO25.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-M3','Mantels','Post Oak','92','10.5','12.5','11.5','5','36.74','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO-M3.jpg | TPO-M3 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-M4','Mantels','Post Oak','93','11','12.5','11.75','4.75','36.05','BOARD_FEET_X_RATE',NULL,NULL,'Wonky (Final thickness will be thinner)','TPO-M4.jpg | TPO-M4 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-M5','Mantels','Post Oak','86','11','14','12.5','5','37.33','BOARD_FEET_X_RATE',NULL,NULL,'Wonky (Final thickness will be thinner)','TPO-M5.jpg | TPO-M5 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TPO-M6','Mantels','Post Oak','86','11.5','13.5','12.5','5','37.33','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TPO-M6.jpg | TPO-M6 Face.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 1','Cookies & Rounds','Sycamore',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','149.04',NULL,NULL,'TSY1.jpg | TSY10.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 2','Slabs','Sycamore','95','10','13','11.5','5','37.93','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSY2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 3','Slabs','Sycamore','95','10','14','12','5','39.58','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSY3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 64','Mantels','Sycamore','128','10','11','10.5','5.25','49','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSY64.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 65','Mantels','Sycamore','128','10','11','10.5','5','46.67','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSY65.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 68','Slabs','Sycamore','115','29','37','33','2.75','72.47','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY68.jpg | TSY68.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 69','Slabs','Sycamore','115','34','39','36.5','2.75','80.16','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY69.jpg | TSY69.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 70','Slabs','Sycamore','115','36','41','38.5','2.75','84.55','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY70.jpg | TSY70.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 71','Slabs','Sycamore','115','37','42','39.5','2.75','86.75','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY71.jpg | TSY71.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 72','Slabs','Sycamore','115','37','41','39','2.75','85.65','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY72.jpg | TSY72.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 73','Slabs','Sycamore','115','34','40','37','2.75','81.26','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY73.jpg | TSY73.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 74','Slabs','Sycamore','115','32','37','34.5','2.75','75.77','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY74.jpg | TSY74.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY 75','Slabs','Sycamore','115','27','33','30','2.75','65.89','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY75.jpg | TSY75.jpg',NULL,2,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-1','Slabs','Sycamore','124','27','32','29.5','3','76.21','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-1.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-2','Slabs','Sycamore','124','30','37','33.5','3','86.54','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-2.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-3','Slabs','Sycamore','124','32','39','35.5','3','91.71','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-3.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-4','Slabs','Sycamore','124','31','37','34','3','87.83','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-5','Slabs','Sycamore','124','31','36','33.5','3','86.54','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-5.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TSY404-8','Slabs','Sycamore','124','17','24','20.5','3','52.96','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TSYTSY404-8.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-1','Slabs','Texas Walnut','101','5','11','8','2','11.22','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-2','Slabs','Texas Walnut','101','9','13','11','2','15.43','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-3','Slabs','Texas Walnut','101','9','12','10.5','2','14.73','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-4','Slabs','Texas Walnut','101','12','17','14.5','2','20.34','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-5','Slabs','Texas Walnut','101','12','13','12.5','2','17.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-6','Slabs','Texas Walnut','101','12','13','12.5','2','17.53','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TWA-431-6 & 7.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-431-7','Slabs','Texas Walnut','101','11','15','13','2','18.24','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-432-1','Slabs','Texas Walnut','79','16','19','17.5','2','19.2','BOARD_FEET_X_RATE',NULL,NULL,NULL,'TWA-432-1 & 4.jpg',NULL,1,'IMAGE_LINKED','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-432-4','Slabs','Texas Walnut','79','15','18','16.5','2','18.1','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-433-1','Slabs','Texas Walnut','72','10','16','13','2','13','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-433-2','Slabs','Texas Walnut','72','16','21','18.5','2','18.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-433-3','Slabs','Texas Walnut','72','15','24','19.5','2','19.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-433-4','Slabs','Texas Walnut','72','10','25','17.5','2','17.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-434-5','Slabs','Texas Walnut','72','21','27','24','2','24','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('TWA-434-6','Slabs','Texas Walnut','72','15','22','18.5','2','18.5','BOARD_FEET_X_RATE',NULL,NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 1','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 2','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 3','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 4','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 5','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 6','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 8','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41'),
('W 9','Cookies & Rounds','Walnut',NULL,NULL,NULL,NULL,'3.5',NULL,'EXISTING_SALE_PRICE_NO_DIMENSIONS','667.98',NULL,NULL,NULL,NULL,0,'IMAGE_REVIEW','YES','available','2026-11-09 17:34:41','2026-11-09 17:34:41');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speciesPricing`
--

DROP TABLE IF EXISTS `speciesPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciesPricing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `species` varchar(128) NOT NULL,
  `boardFootRate` varchar(10) NOT NULL DEFAULT '12.00',
  `pricingMethod` enum('board_foot','fixed','inquire') NOT NULL DEFAULT 'board_foot',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `effectiveDate` varchar(32) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `speciesPricing_species_unique` (`species`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speciesPricing`
--

LOCK TABLES `speciesPricing` WRITE;
/*!40000 ALTER TABLE `speciesPricing` DISABLE KEYS */;
INSERT INTO `speciesPricing` VALUES
(1,'American Elm','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(2,'Ash','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(3,'Black Jack Oak','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(4,'Cedar Elm','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(5,'English Walnut','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:47:19'),
(6,'Live Oak','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(7,'Maple','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(8,'Mesquite','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(9,'Pecan','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:50:42'),
(10,'Post Oak','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(11,'Sycamore','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(12,'Texas Ash','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(13,'Texas Cherry','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(14,'Texas Live Oak','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(15,'Texas Mesquite','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(16,'Texas Mountain Cedar','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(17,'Texas Pecan','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(18,'Texas Post Oak','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(19,'Texas Walnut','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41'),
(20,'Walnut','12.00','board_foot','active','2026-11-09','Imported from TXUS Master Inventory','2026-11-09 17:34:41','2026-11-09 17:34:41');
/*!40000 ALTER TABLE `speciesPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speciesPricingHistory`
--

DROP TABLE IF EXISTS `speciesPricingHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciesPricingHistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `speciesPricingId` int(11) DEFAULT NULL,
  `species` varchar(128) NOT NULL,
  `oldRate` varchar(10) DEFAULT NULL,
  `newRate` varchar(10) DEFAULT NULL,
  `oldMethod` varchar(16) DEFAULT NULL,
  `newMethod` varchar(16) DEFAULT NULL,
  `changedBy` varchar(128) DEFAULT NULL,
  `changeReason` text DEFAULT NULL,
  `changedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speciesPricingHistory`
--

LOCK TABLES `speciesPricingHistory` WRITE;
/*!40000 ALTER TABLE `speciesPricingHistory` DISABLE KEYS */;
INSERT INTO `speciesPricingHistory` VALUES
(1,1,'American Elm',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(2,2,'Ash',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(3,3,'Black Jack Oak',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(4,4,'Cedar Elm',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(5,5,'English Walnut',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(6,6,'Live Oak',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(7,7,'Maple',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(8,8,'Mesquite',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(9,9,'Pecan',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(10,10,'Post Oak',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(11,11,'Sycamore',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(12,12,'Texas Ash',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(13,13,'Texas Cherry',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(14,14,'Texas Live Oak',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(15,15,'Texas Mesquite',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(16,16,'Texas Mountain Cedar',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(17,17,'Texas Pecan',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(18,18,'Texas Post Oak',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(19,19,'Texas Walnut',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(20,20,'Walnut',NULL,'12.00',NULL,'board_foot','system','Initial rate import — Dev working rate of $12/BF','2026-11-09 17:34:41'),
(21,9,'Pecan','12.00','14.00','board_foot','board_foot','Dev','Pecan market rate adjustment','2026-11-09 17:40:35'),
(22,9,'Pecan','14.00','12.00','board_foot','board_foot','Dev','Reverted for baseline demo state','2026-11-09 17:40:35'),
(23,5,'English Walnut','12.00','15.50','board_foot','board_foot','Dev','English Walnut price review','2026-11-09 17:47:09'),
(24,5,'English Walnut','15.50','12.00','board_foot','board_foot','Dev','Reverted for baseline demo state','2026-11-09 17:47:19'),
(25,9,'Pecan','12.00','14.00','board_foot','board_foot','Dev','Pecan live adjustment demo','2026-11-09 17:49:40'),
(26,9,'Pecan','14.00','12.00','board_foot','board_foot','Dev','Revert to baseline working rate of $12/BF','2026-11-09 17:50:42');
/*!40000 ALTER TABLE `speciesPricingHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastSignedIn` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2026-11-09 17:59:59
