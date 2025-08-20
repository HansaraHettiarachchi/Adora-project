CREATE DATABASE  IF NOT EXISTS `adoradb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `adoradb`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adoradb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qty` int NOT NULL,
  `price` double NOT NULL,
  `cost` double NOT NULL,
  `desc` text,
  `product_id` int NOT NULL,
  `size_id` int NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_batch_product1_idx` (`product_id`),
  KEY `fk_batch_size1_idx` (`size_id`),
  CONSTRAINT `fk_batch_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_batch_size1` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (1,384,150,100,'',1,2,'BATCH2024'),(2,450,2250,100,'',1,2,'BATCH2024_1'),(3,404,2250,100,'',2,2,'BATCH2024_2'),(4,450,2250,100,'',2,2,'BATCH2024_3'),(5,450,2250,100,'',2,2,'BATCH2024_4'),(6,450,2250,100,'',2,2,'BATCH2024_5'),(7,450,2250,100,'',2,2,'BATCH2024_6'),(8,450,2250,100,'',2,2,'BATCH2024_7'),(9,50,500,100,'',2,2,'BATCH2024_8');
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_details`
--

DROP TABLE IF EXISTS `card_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_no` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `users_id` int NOT NULL,
  `exp` varchar(10) DEFAULT NULL,
  `cvv` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_card_details_payment_method1_idx` (`payment_method_id`),
  KEY `fk_card_details_users1_idx` (`users_id`),
  CONSTRAINT `fk_card_details_payment_method1` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `fk_card_details_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_details`
--

LOCK TABLES `card_details` WRITE;
/*!40000 ALTER TABLE `card_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Indoor'),(2,'Outdoor'),(3,'Succulent');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Galle');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Male'),(2,'Female');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grn`
--

DROP TABLE IF EXISTS `grn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `total` double NOT NULL,
  `total_qty` int NOT NULL,
  `supplier_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grn_supplier1_idx` (`supplier_id`),
  KEY `fk_grn_users1_idx` (`users_id`),
  CONSTRAINT `fk_grn_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `fk_grn_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grn`
--

LOCK TABLES `grn` WRITE;
/*!40000 ALTER TABLE `grn` DISABLE KEYS */;
/*!40000 ALTER TABLE `grn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grn_items`
--

DROP TABLE IF EXISTS `grn_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `cost` double NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `size_id` int NOT NULL,
  `desc` text,
  `product_type_id` int NOT NULL,
  `grn_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grn_items_product_type1_idx` (`product_type_id`),
  KEY `fk_grn_items_grn1_idx` (`grn_id`),
  CONSTRAINT `fk_grn_items_grn1` FOREIGN KEY (`grn_id`) REFERENCES `grn` (`id`),
  CONSTRAINT `fk_grn_items_product_type1` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grn_items`
--

LOCK TABLES `grn_items` WRITE;
/*!40000 ALTER TABLE `grn_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `grn_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` double NOT NULL,
  `qty` double NOT NULL,
  `datetime` datetime NOT NULL,
  `discount` double NOT NULL,
  `payment_method_id` int NOT NULL,
  `users_id` int NOT NULL,
  `order_status_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_invoice_users1_idx` (`users_id`),
  KEY `fk_invoice_payment_method1_idx` (`payment_method_id`),
  KEY `fk_invoice_order_status1_idx` (`order_status_id`),
  CONSTRAINT `fk_invoice_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`),
  CONSTRAINT `fk_invoice_payment_method1` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `fk_invoice_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,1000,20,'2025-08-18 10:00:00',50,1,1,1),(2,1000,20,'2025-08-18 04:30:00',50,1,1,1),(3,1000,20,'2025-08-18 04:30:00',50,1,1,1),(4,1000,20,'2025-08-18 04:30:00',50,1,1,1),(6,500,10,'2025-08-18 04:30:00',25,1,1,1),(7,500,10,'2025-08-18 04:30:00',25,1,1,1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `cost` double NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `batch_id` int NOT NULL,
  `invoice_id` int NOT NULL,
  `product_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grn_items_product_type1_idx` (`product_type_id`),
  KEY `fk_grn_items_copy1_invoice1_idx` (`invoice_id`),
  CONSTRAINT `fk_grn_items_copy1_invoice1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
  CONSTRAINT `fk_grn_items_product_type10` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
INSERT INTO `invoice_items` VALUES (1,50,30,1,10,1,1,1),(2,50,30,1,10,1,1,2),(3,50,30,1,10,1,2,1),(4,50,30,1,10,1,2,2),(5,2250,100,1,10,2,3,2),(6,150,100,1,10,1,3,1),(7,150,100,1,10,1,4,1),(8,2250,100,1,25,2,4,2),(10,150,100,1,5,1,6,1),(11,150,100,1,6,1,6,2),(12,150,100,1,55,1,7,1),(13,2250,100,2,46,3,7,2);
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_plant_type`
--

DROP TABLE IF EXISTS `mother_plant_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mother_plant_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_plant_type`
--

LOCK TABLES `mother_plant_type` WRITE;
/*!40000 ALTER TABLE `mother_plant_type` DISABLE KEYS */;
INSERT INTO `mother_plant_type` VALUES (1,'Seed'),(2,'Cutting'),(3,'Grafting');
/*!40000 ALTER TABLE `mother_plant_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'Pendding'),(2,'Deliverd'),(3,'Completed');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,'Cash'),(2,'Card');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot`
--

DROP TABLE IF EXISTS `pot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` double NOT NULL,
  `desc` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot`
--

LOCK TABLES `pot` WRITE;
/*!40000 ALTER TABLE `pot` DISABLE KEYS */;
/*!40000 ALTER TABLE `pot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot_batch`
--

DROP TABLE IF EXISTS `pot_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot_batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qty` int NOT NULL,
  `price` double NOT NULL,
  `cost` double NOT NULL,
  `desc` text,
  `pot_id` int NOT NULL,
  `pot_size_id` int NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pot_batch_pot1_idx` (`pot_id`),
  KEY `fk_pot_batch_pot_size1_idx` (`pot_size_id`),
  CONSTRAINT `fk_pot_batch_pot1` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`id`),
  CONSTRAINT `fk_pot_batch_pot_size1` FOREIGN KEY (`pot_size_id`) REFERENCES `pot_size` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot_batch`
--

LOCK TABLES `pot_batch` WRITE;
/*!40000 ALTER TABLE `pot_batch` DISABLE KEYS */;
/*!40000 ALTER TABLE `pot_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot_images`
--

DROP TABLE IF EXISTS `pot_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `pot_batch_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pot_image_pot_batch1_idx` (`pot_batch_id`),
  CONSTRAINT `fk_pot_image_pot_batch1` FOREIGN KEY (`pot_batch_id`) REFERENCES `pot_batch` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot_images`
--

LOCK TABLES `pot_images` WRITE;
/*!40000 ALTER TABLE `pot_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `pot_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot_size`
--

DROP TABLE IF EXISTS `pot_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(100) NOT NULL,
  `short_key` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot_size`
--

LOCK TABLES `pot_size` WRITE;
/*!40000 ALTER TABLE `pot_size` DISABLE KEYS */;
/*!40000 ALTER TABLE `pot_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `desc` text,
  `mother_plant_type_id` int NOT NULL,
  `category_id` int NOT NULL,
  `isActive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `fk_product_mother_plant_type1_idx` (`mother_plant_type_id`),
  KEY `fk_product_category1_idx` (`category_id`),
  CONSTRAINT `fk_product_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_product_mother_plant_type1` FOREIGN KEY (`mother_plant_type_id`) REFERENCES `mother_plant_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Aloe Vera','Medicinal plant',1,3,_binary ''),(2,'Rose','Beautiful flower',2,2,_binary ''),(3,'Snake Plant','Air purifier',3,1,_binary ''),(4,'Cactus','Desert plant',1,3,_binary '\0'),(5,'Aloe dsd Vera','Medicinal plant',1,3,_binary '');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `batch_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_image_batch1_idx` (`batch_id`),
  CONSTRAINT `fk_product_image_batch1` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (7,'batch/3/1755526082705_Screenshot (1).png',3),(8,'batch/3/1755526082715_Screenshot (2).png',3),(9,'batch/3/1755526082721_Screenshot 2024-12-19 203802.png',3),(10,'batch/9/1755604757323_Screenshot (1).png',9),(11,'batch/9/1755604757329_Screenshot (2).png',9),(12,'batch/9/1755604757334_Screenshot 2024-12-19 203802.png',9);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'Plant'),(2,'Pot');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(100) NOT NULL,
  `short_key` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'Small','S'),(2,'Medium','M'),(3,'Large','L');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Active'),(2,'Deactive');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isActive` bit(1) NOT NULL,
  `status_id` int NOT NULL,
  `gender_id` int NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supplier_status1_idx` (`status_id`),
  KEY `fk_supplier_gender1_idx` (`gender_id`),
  KEY `fk_supplier_city1_idx` (`city_id`),
  CONSTRAINT `fk_supplier_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `fk_supplier_gender1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  CONSTRAINT `fk_supplier_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'admin');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `address` varchar(100) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `p_img` text,
  `user_role_id` int NOT NULL,
  `gender_id` int NOT NULL,
  `city_id` int NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_user_role_idx` (`user_role_id`),
  KEY `fk_users_gender1_idx` (`gender_id`),
  KEY `fk_users_city1_idx` (`city_id`),
  KEY `fk_users_status1_idx` (`status_id`),
  CONSTRAINT `fk_users_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `fk_users_gender1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  CONSTRAINT `fk_users_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `fk_users_user_role` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hansara','Hettiarachchi','123 Pamunuwa Road, Maharagama','200017845678','hansdsaara@example.com','$2b$12$/bNuVnoxtUDAMSBX8uM2yefstsGTZdhLcRDityyXAmJtpLMoijx5S','0771234787','',1,1,1,1),(2,'Hansara','Hettiarachchi','123 Pamunuwa Road, Maharagama','20005617845678','hans56dsaara@example.com','$2b$12$wPfjWWW01CbFkEBO.mLGB.LLMUbCrEcDzdAAXc4rQndaErFDodoku','077122234787','users/1755525969092_582759082.png',1,1,1,1),(3,'Hansara','Hettiarachchi','123 Pamunuwa Road, Maharagama','200012345678','hansara@example.com','$2b$12$0/3/h9OS3W9StxuZAnfnwOXa4kQvfuOGPHkQJ7i1OxwPqw3YXGpGa','0771234567','',1,1,1,1);
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

-- Dump completed on 2025-08-20 11:36:26
