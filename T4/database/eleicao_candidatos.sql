-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: eleicao
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `candidatos`
--

DROP TABLE IF EXISTS `candidatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidatos` (
  `numero` varchar(50) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `votos` int DEFAULT NULL,
  `partido` varchar(45) DEFAULT NULL,
  `viceId` int DEFAULT NULL,
  PRIMARY KEY (`numero`),
  KEY `viceId` (`viceId`),
  CONSTRAINT `candidatos_ibfk_1` FOREIGN KEY (`viceId`) REFERENCES `vices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidatos`
--

LOCK TABLES `candidatos` WRITE;
/*!40000 ALTER TABLE `candidatos` DISABLE KEYS */;
INSERT INTO `candidatos` VALUES ('12','Chiquinho do Adbon','prefeito','cp3.jpg',0,'PDT',6),('15','Malrinete Gralhada','prefeito','cp2.jpg',0,'MDB',5),('15123','Filho','Vereador','cv4.jpg',0,'MDB',NULL),('27222','Joel Varão','Vereador','cv5.jpg',0,'PSDC',NULL),('43333','Dandor','Vereador','cv3.jpg',0,'PV',NULL),('45','Dr. Francisco','prefeito','cp1.jpg',0,'PSC',4),('45000','Professor Clebson Almeida','Vereador','cv6.jpg',0,'PSDB',NULL),('51222','Christianne Varão','Vereador','cv1.jpg',0,'PEN',NULL),('54','Zé Lopes','prefeito','cp4.jpg',0,'PPL',2),('55555','Homero do Zé Filho','Vereador','cv2.jpg',0,'PSL',NULL),('65','Lindomar Pescador','prefeito','cp5.jpg',0,'PC do B',1);
/*!40000 ALTER TABLE `candidatos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-06 19:33:48
