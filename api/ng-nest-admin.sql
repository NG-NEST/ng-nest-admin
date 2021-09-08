-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ng-nest-admin
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `design_col`
--

DROP TABLE IF EXISTS `design_col`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_col` (
  `id` char(36) NOT NULL,
  `label` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  `type` json DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `primary` tinyint(4) DEFAULT NULL,
  `nullable` tinyint(4) DEFAULT NULL,
  `unique` tinyint(4) DEFAULT NULL,
  `default` varchar(255) DEFAULT NULL,
  `tableId` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9d68aa9c91c3eafeb94eeb2c0e5` (`tableId`),
  CONSTRAINT `FK_9d68aa9c91c3eafeb94eeb2c0e5` FOREIGN KEY (`tableId`) REFERENCES `design_table` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_col`
--

LOCK TABLES `design_col` WRITE;
/*!40000 ALTER TABLE `design_col` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_col` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_control`
--

DROP TABLE IF EXISTS `design_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_control` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `required` tinyint(4) DEFAULT NULL,
  `disabled` tinyint(4) DEFAULT NULL,
  `readonly` tinyint(4) DEFAULT NULL,
  `hide` tinyint(4) DEFAULT NULL,
  `primary` tinyint(4) NOT NULL,
  `sort` int(11) NOT NULL,
  `col` json DEFAULT NULL,
  `type` json NOT NULL,
  `group` json DEFAULT NULL,
  `pageId` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e47b37df862d74e39d54d17acc3` (`pageId`),
  CONSTRAINT `FK_e47b37df862d74e39d54d17acc3` FOREIGN KEY (`pageId`) REFERENCES `design_page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_control`
--

LOCK TABLES `design_control` WRITE;
/*!40000 ALTER TABLE `design_control` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_module`
--

DROP TABLE IF EXISTS `design_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_module` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_module`
--

LOCK TABLES `design_module` WRITE;
/*!40000 ALTER TABLE `design_module` DISABLE KEYS */;
INSERT INTO `design_module` VALUES ('1','测试模块1','test1','说明信息说明信息说明信息','fto-user','2021-07-05 20:45:37.570270','2021-07-05 20:51:26.796463'),('10','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.864578','2021-07-05 20:51:26.864578'),('11','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.872257','2021-07-05 20:51:26.872257'),('2','测试模块2','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.806027','2021-07-05 20:51:26.806027'),('3','测试模块3','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.814678','2021-07-05 20:51:26.814678'),('4','测试模块4','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.823136','2021-07-05 20:51:26.823136'),('5','测试模块5','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.829841','2021-07-05 20:51:26.829841'),('6','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.835778','2021-07-05 20:51:26.835778'),('7','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.842849','2021-07-05 20:51:26.842849'),('8','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.850804','2021-07-05 20:51:26.850804'),('9','测试模块1','test1','说明信息说明信息说明信息',NULL,'2021-07-05 20:51:26.857922','2021-07-05 20:51:26.857922');
/*!40000 ALTER TABLE `design_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_page`
--

DROP TABLE IF EXISTS `design_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_page` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `moduleId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ba2c0903999794b6aa84886cf10` (`moduleId`),
  CONSTRAINT `FK_ba2c0903999794b6aa84886cf10` FOREIGN KEY (`moduleId`) REFERENCES `design_module` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_page`
--

LOCK TABLES `design_page` WRITE;
/*!40000 ALTER TABLE `design_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_page_relation`
--

DROP TABLE IF EXISTS `design_page_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_page_relation` (
  `fromPageId` char(36) NOT NULL,
  `toPageId` char(36) NOT NULL,
  PRIMARY KEY (`fromPageId`,`toPageId`),
  KEY `IDX_a4e7fb1fab5198f676d18d2ee9` (`fromPageId`),
  KEY `IDX_14d9d88c1d57c4f6b685ae33c5` (`toPageId`),
  CONSTRAINT `FK_14d9d88c1d57c4f6b685ae33c54` FOREIGN KEY (`toPageId`) REFERENCES `design_page` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a4e7fb1fab5198f676d18d2ee9f` FOREIGN KEY (`fromPageId`) REFERENCES `design_page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_page_relation`
--

LOCK TABLES `design_page_relation` WRITE;
/*!40000 ALTER TABLE `design_page_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_page_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_table`
--

DROP TABLE IF EXISTS `design_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_table` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `transform` json DEFAULT NULL,
  `moduleId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8fa8f94fa5cf732303e33f1d7d1` (`moduleId`),
  CONSTRAINT `FK_8fa8f94fa5cf732303e33f1d7d1` FOREIGN KEY (`moduleId`) REFERENCES `design_module` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_table`
--

LOCK TABLES `design_table` WRITE;
/*!40000 ALTER TABLE `design_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_action`
--

DROP TABLE IF EXISTS `system_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_action` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menuId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_3ed34464adf967339c44f99ff80` (`menuId`) USING BTREE,
  CONSTRAINT `FK_3ed34464adf967339c44f99ff80` FOREIGN KEY (`menuId`) REFERENCES `system_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_action`
--

LOCK TABLES `system_action` WRITE;
/*!40000 ALTER TABLE `system_action` DISABLE KEYS */;
INSERT INTO `system_action` VALUES ('113ed106-2cdd-a596-de50-4b80de1fb83e','删除','delete','fto-trash-2','32cbc14a-632e-24d0-8d8f-2032c2c7a5e0',4),('19d1fde7-f3f4-4ce9-e6cc-6b77a5fe1ac4','修改','edit','fto-edit','32cbc14a-632e-24d0-8d8f-2032c2c7a5e0',3),('2711f0e9-5f7c-54dc-cf78-f96ef2fcaf19','新增根节点','add-root','fto-plus','4a305e03-c1b9-1ab7-b9ac-3408dced0194',5),('28ce1bf4-830a-76ab-c73c-10a7207f92ed','修改','edit','fto-edit','4a305e03-c1b9-1ab7-b9ac-3408dced0194',3),('29957623-54fb-d52d-bc69-9be9291eac05','查看','info','fto-eye','05e588cc-6026-005b-927a-0e452c4131ab',1),('2afc1b90-0c7f-ae5b-589b-5da8dc78f49a','查看','info','fto-eye','32cbc14a-632e-24d0-8d8f-2032c2c7a5e0',1),('2d494d93-050b-f276-d993-a5c55efa6f73','查看','info','fto-eye','5453c6a4-00a8-1512-0708-d0747fc93c25',1),('346594b7-0db7-8790-8869-be827d50a104','删除','delete','fto-trash-2','10f15681-0d11-78db-bc92-76d43298a5f8',5),('54ccd3ee-0f78-e4aa-8643-a92dc2849000','查看','info','fto-eye','90d5153c-3241-0ef6-27a8-6d00012d1838',1),('590ac302-cdca-72c7-60c5-0444b4585899','查看','info','fto-eye','10f15681-0d11-78db-bc92-76d43298a5f8',1),('629d4d09-73b6-2aa0-4e58-7108f4660a50','新增','add','fto-plus','f97d223d-b777-3dfa-c76a-d24244eba25e',2),('63c8eeb1-5843-9bb0-d054-e854708a1f14','查看','info','fto-eye','a787e3e7-1c57-ccad-eafd-7d15de1757ec',1),('6dd07b1d-d431-9bf4-62d5-5db3dc99bddb','查看','info','fto-eye','4a305e03-c1b9-1ab7-b9ac-3408dced0194',1),('74cfa90b-9e7c-344d-f5ac-2b14350697d9','查看','info','fto-eye','50f2cb4b-c5b4-a953-145f-fd076c675df8',1),('75056496-6ca6-1346-7a60-be72cab7d72b','删除','delete','fto-trash-2','f97d223d-b777-3dfa-c76a-d24244eba25e',4),('76faa453-36f3-e773-1527-a3158b706f7a','查看','info','fto-eye','5b99835d-cbb6-06e5-fbd5-c636ff88fb60',1),('7adad23f-636d-6bee-0f37-7d29d5b29585','操作设置','actions','fto-list','10f15681-0d11-78db-bc92-76d43298a5f8',4),('7ca5096a-9302-4405-1362-5b7369b2b178','查看','info','fto-eye','8eed6ab4-07fa-2f01-5ed5-b5bb74ab26f1',1),('811047d2-ac97-96a5-686d-59d5a54fcc62','新增','add','fto-plus','32cbc14a-632e-24d0-8d8f-2032c2c7a5e0',2),('8eedb227-6be9-7571-ed0b-9e181c6e6716','修改','edit','fto-edit','f97d223d-b777-3dfa-c76a-d24244eba25e',3),('9067e591-16f5-b7a7-9336-a09a8b10fa5e','查看','info','fto-eye','e2203f49-23da-5372-a260-ba8f71dc9e08',1),('ad39e8cf-2816-9176-ce7f-83fcb84c3cd1','权限设置','permission','fto-list','f97d223d-b777-3dfa-c76a-d24244eba25e',5),('bf9ba14b-b7db-3adb-662a-a88e417e70e8','修改','edit','fto-edit','10f15681-0d11-78db-bc92-76d43298a5f8',3),('cac38734-fa4c-0775-96f2-c4146a4dcbe0','新增','add','fto-plus','10f15681-0d11-78db-bc92-76d43298a5f8',2),('e1497f04-16fa-9bee-c77e-fd4afab4ef86','删除','delete','fto-trash-2','4a305e03-c1b9-1ab7-b9ac-3408dced0194',4),('e8d9297b-e64c-f0f3-0cdb-95dede4eaa44','查看','info','fto-eye','9c0e8821-9ec5-516f-1694-6a75200f0296',1),('f50bd17d-2436-47f3-2f9a-d914ff2ad834','查看','info','fto-eye','f97d223d-b777-3dfa-c76a-d24244eba25e',1),('fb5680c4-47cb-78f9-c107-656f42886e3c','新增','add','fto-plus','4a305e03-c1b9-1ab7-b9ac-3408dced0194',2);
/*!40000 ALTER TABLE `system_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_menu`
--

DROP TABLE IF EXISTS `system_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_menu` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_d7fcb6cbe5c416b793101e32a3f` (`parentId`) USING BTREE,
  CONSTRAINT `FK_d7fcb6cbe5c416b793101e32a3f` FOREIGN KEY (`parentId`) REFERENCES `system_menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_menu`
--

LOCK TABLES `system_menu` WRITE;
/*!40000 ALTER TABLE `system_menu` DISABLE KEYS */;
INSERT INTO `system_menu` VALUES ('0009d7da-3efc-2ea1-3be1-2542c7b6c070','系统管理','','ado-setting',NULL,'0009d7da-3efc-2ea1-3be1-2542c7b6c070',4),('05e588cc-6026-005b-927a-0e452c4131ab','测试菜单1','1','fto-file',NULL,'05e588cc-6026-005b-927a-0e452c4131ab',10),('10f15681-0d11-78db-bc92-76d43298a5f8','菜单管理','menus','fto-menu','0009d7da-3efc-2ea1-3be1-2542c7b6c070','0009d7da-3efc-2ea1-3be1-2542c7b6c070.10f15681-0d11-78db-bc92-76d43298a5f8',4),('32cbc14a-632e-24d0-8d8f-2032c2c7a5e0','用户管理','users','ado-team','0009d7da-3efc-2ea1-3be1-2542c7b6c070','0009d7da-3efc-2ea1-3be1-2542c7b6c070.32cbc14a-632e-24d0-8d8f-2032c2c7a5e0',1),('4a305e03-c1b9-1ab7-b9ac-3408dced0194','组织管理','organization','ado-apartment','0009d7da-3efc-2ea1-3be1-2542c7b6c070','0009d7da-3efc-2ea1-3be1-2542c7b6c070.4a305e03-c1b9-1ab7-b9ac-3408dced0194',3),('50f2cb4b-c5b4-a953-145f-fd076c675df8','测试菜单3','3','fto-file',NULL,'50f2cb4b-c5b4-a953-145f-fd076c675df8',13),('5453c6a4-00a8-1512-0708-d0747fc93c25','测试菜单2','2','fto-file',NULL,'5453c6a4-00a8-1512-0708-d0747fc93c25',11),('5b99835d-cbb6-06e5-fbd5-c636ff88fb60','测试菜单4','4','fto-file',NULL,'5b99835d-cbb6-06e5-fbd5-c636ff88fb60',14),('8eed6ab4-07fa-2f01-5ed5-b5bb74ab26f1','模块设计','design','fto-columns',NULL,'8eed6ab4-07fa-2f01-5ed5-b5bb74ab26f1',3),('90d5153c-3241-0ef6-27a8-6d00012d1838','首页','home','ado-home',NULL,'90d5153c-3241-0ef6-27a8-6d00012d1838',1),('9c0e8821-9ec5-516f-1694-6a75200f0296','测试菜单6','6','fto-file',NULL,'9c0e8821-9ec5-516f-1694-6a75200f0296',16),('a787e3e7-1c57-ccad-eafd-7d15de1757ec','测试菜单5','5','fto-file',NULL,'a787e3e7-1c57-ccad-eafd-7d15de1757ec',15),('e2203f49-23da-5372-a260-ba8f71dc9e08','仪表盘','dashboard','ado-radar-chart',NULL,'e2203f49-23da-5372-a260-ba8f71dc9e08',2),('f97d223d-b777-3dfa-c76a-d24244eba25e','角色管理','roles','ado-user','0009d7da-3efc-2ea1-3be1-2542c7b6c070','0009d7da-3efc-2ea1-3be1-2542c7b6c070.f97d223d-b777-3dfa-c76a-d24244eba25e',2);
/*!40000 ALTER TABLE `system_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_organization`
--

DROP TABLE IF EXISTS `system_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_organization` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_86110f24fd2d3afdba313c5060d` (`parentId`) USING BTREE,
  CONSTRAINT `FK_86110f24fd2d3afdba313c5060d` FOREIGN KEY (`parentId`) REFERENCES `system_organization` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_organization`
--

LOCK TABLES `system_organization` WRITE;
/*!40000 ALTER TABLE `system_organization` DISABLE KEYS */;
INSERT INTO `system_organization` VALUES ('14b135a5-05f6-8362-bf17-0ba7d9f9b650','企业发展事业部','group','icon','4980001f-45af-4a92-a68a-e1e5b128a637','4980001f-45af-4a92-a68a-e1e5b128a637.14b135a5-05f6-8362-bf17-0ba7d9f9b650',1),('4980001f-45af-4a92-a68a-e1e5b128a637','雷浩集团','root','icon',NULL,'4980001f-45af-4a92-a68a-e1e5b128a637',1),('658931dc-b4a2-e4b4-859b-17b2ec331f6a','财务部','department','icon','14b135a5-05f6-8362-bf17-0ba7d9f9b650','4980001f-45af-4a92-a68a-e1e5b128a637.14b135a5-05f6-8362-bf17-0ba7d9f9b650.658931dc-b4a2-e4b4-859b-17b2ec331f6a',0),('6695dfb3-1097-5524-cc31-09e2167571b0','社交网络事业部','group','icon','4980001f-45af-4a92-a68a-e1e5b128a637','4980001f-45af-4a92-a68a-e1e5b128a637.6695dfb3-1097-5524-cc31-09e2167571b0',2),('8029f46f-d82a-257c-97ef-64715f5ec88c','互动娱乐事业部','group','icon','4980001f-45af-4a92-a68a-e1e5b128a637','4980001f-45af-4a92-a68a-e1e5b128a637.8029f46f-d82a-257c-97ef-64715f5ec88c',3),('adaa0488-7c5e-7f73-290f-a172a85f987a','移动互联网事业部','group','icon','4980001f-45af-4a92-a68a-e1e5b128a637','4980001f-45af-4a92-a68a-e1e5b128a637.adaa0488-7c5e-7f73-290f-a172a85f987a',4),('fe77519d-4467-214e-647b-e0089e45306d','网络媒体事业部','group','icon','4980001f-45af-4a92-a68a-e1e5b128a637','4980001f-45af-4a92-a68a-e1e5b128a637.fe77519d-4467-214e-647b-e0089e45306d',5);
/*!40000 ALTER TABLE `system_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role`
--

DROP TABLE IF EXISTS `system_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_role` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizationId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_af72a2809e8b6fdf8da0955bf03` (`organizationId`) USING BTREE,
  CONSTRAINT `FK_af72a2809e8b6fdf8da0955bf03` FOREIGN KEY (`organizationId`) REFERENCES `system_organization` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_role`
--

LOCK TABLES `system_role` WRITE;
/*!40000 ALTER TABLE `system_role` DISABLE KEYS */;
INSERT INTO `system_role` VALUES ('258a840b-7529-eb1c-4a3a-5e724958d4cb','管理员-移动互联网事业部','adaa0488-7c5e-7f73-290f-a172a85f987a'),('365612aa-3646-c1ab-f026-07e25a874c01','系统管理员','4980001f-45af-4a92-a68a-e1e5b128a637'),('39f0fdd0-cfb2-0aeb-91c5-eebdbbccdfda','管理员-互动娱乐事业部','8029f46f-d82a-257c-97ef-64715f5ec88c'),('51ae97e3-24a7-bca2-1ddd-e032e8202970','管理员-社交网络事业部','6695dfb3-1097-5524-cc31-09e2167571b0'),('8e62a3e2-4a60-0a81-3fed-370c11c39504','管理员-企业发展事业部','14b135a5-05f6-8362-bf17-0ba7d9f9b650'),('a6deeb36-3370-7002-253c-0226c8203c66','管理员-网络媒体事业部','fe77519d-4467-214e-647b-e0089e45306d'),('e88d7417-2981-c495-2d40-65a57b03748c','访客','4980001f-45af-4a92-a68a-e1e5b128a637');
/*!40000 ALTER TABLE `system_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role_action`
--

DROP TABLE IF EXISTS `system_role_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_role_action` (
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`roleId`,`actionId`) USING BTREE,
  KEY `FK_a0ec504b9c427ffcc85e212594c` (`actionId`) USING BTREE,
  KEY `IDX_25439811e232662e2dc087330d` (`roleId`) USING BTREE,
  KEY `IDX_a0ec504b9c427ffcc85e212594` (`actionId`) USING BTREE,
  CONSTRAINT `FK_25439811e232662e2dc087330d9` FOREIGN KEY (`roleId`) REFERENCES `system_role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a0ec504b9c427ffcc85e212594c` FOREIGN KEY (`actionId`) REFERENCES `system_action` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_role_action`
--

LOCK TABLES `system_role_action` WRITE;
/*!40000 ALTER TABLE `system_role_action` DISABLE KEYS */;
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01','113ed106-2cdd-a596-de50-4b80de1fb83e'),('365612aa-3646-c1ab-f026-07e25a874c01','19d1fde7-f3f4-4ce9-e6cc-6b77a5fe1ac4'),('365612aa-3646-c1ab-f026-07e25a874c01','2711f0e9-5f7c-54dc-cf78-f96ef2fcaf19'),('365612aa-3646-c1ab-f026-07e25a874c01','28ce1bf4-830a-76ab-c73c-10a7207f92ed'),('365612aa-3646-c1ab-f026-07e25a874c01','29957623-54fb-d52d-bc69-9be9291eac05'),('e88d7417-2981-c495-2d40-65a57b03748c','29957623-54fb-d52d-bc69-9be9291eac05'),('365612aa-3646-c1ab-f026-07e25a874c01','2afc1b90-0c7f-ae5b-589b-5da8dc78f49a'),('e88d7417-2981-c495-2d40-65a57b03748c','2afc1b90-0c7f-ae5b-589b-5da8dc78f49a'),('365612aa-3646-c1ab-f026-07e25a874c01','2d494d93-050b-f276-d993-a5c55efa6f73'),('e88d7417-2981-c495-2d40-65a57b03748c','2d494d93-050b-f276-d993-a5c55efa6f73'),('365612aa-3646-c1ab-f026-07e25a874c01','346594b7-0db7-8790-8869-be827d50a104'),('365612aa-3646-c1ab-f026-07e25a874c01','54ccd3ee-0f78-e4aa-8643-a92dc2849000'),('e88d7417-2981-c495-2d40-65a57b03748c','54ccd3ee-0f78-e4aa-8643-a92dc2849000'),('365612aa-3646-c1ab-f026-07e25a874c01','590ac302-cdca-72c7-60c5-0444b4585899'),('e88d7417-2981-c495-2d40-65a57b03748c','590ac302-cdca-72c7-60c5-0444b4585899'),('365612aa-3646-c1ab-f026-07e25a874c01','629d4d09-73b6-2aa0-4e58-7108f4660a50'),('e88d7417-2981-c495-2d40-65a57b03748c','629d4d09-73b6-2aa0-4e58-7108f4660a50'),('365612aa-3646-c1ab-f026-07e25a874c01','63c8eeb1-5843-9bb0-d054-e854708a1f14'),('365612aa-3646-c1ab-f026-07e25a874c01','6dd07b1d-d431-9bf4-62d5-5db3dc99bddb'),('e88d7417-2981-c495-2d40-65a57b03748c','6dd07b1d-d431-9bf4-62d5-5db3dc99bddb'),('365612aa-3646-c1ab-f026-07e25a874c01','74cfa90b-9e7c-344d-f5ac-2b14350697d9'),('e88d7417-2981-c495-2d40-65a57b03748c','74cfa90b-9e7c-344d-f5ac-2b14350697d9'),('365612aa-3646-c1ab-f026-07e25a874c01','75056496-6ca6-1346-7a60-be72cab7d72b'),('365612aa-3646-c1ab-f026-07e25a874c01','76faa453-36f3-e773-1527-a3158b706f7a'),('365612aa-3646-c1ab-f026-07e25a874c01','7adad23f-636d-6bee-0f37-7d29d5b29585'),('365612aa-3646-c1ab-f026-07e25a874c01','7ca5096a-9302-4405-1362-5b7369b2b178'),('365612aa-3646-c1ab-f026-07e25a874c01','811047d2-ac97-96a5-686d-59d5a54fcc62'),('e88d7417-2981-c495-2d40-65a57b03748c','811047d2-ac97-96a5-686d-59d5a54fcc62'),('365612aa-3646-c1ab-f026-07e25a874c01','8eedb227-6be9-7571-ed0b-9e181c6e6716'),('365612aa-3646-c1ab-f026-07e25a874c01','9067e591-16f5-b7a7-9336-a09a8b10fa5e'),('e88d7417-2981-c495-2d40-65a57b03748c','9067e591-16f5-b7a7-9336-a09a8b10fa5e'),('365612aa-3646-c1ab-f026-07e25a874c01','ad39e8cf-2816-9176-ce7f-83fcb84c3cd1'),('365612aa-3646-c1ab-f026-07e25a874c01','bf9ba14b-b7db-3adb-662a-a88e417e70e8'),('365612aa-3646-c1ab-f026-07e25a874c01','cac38734-fa4c-0775-96f2-c4146a4dcbe0'),('e88d7417-2981-c495-2d40-65a57b03748c','cac38734-fa4c-0775-96f2-c4146a4dcbe0'),('365612aa-3646-c1ab-f026-07e25a874c01','e1497f04-16fa-9bee-c77e-fd4afab4ef86'),('365612aa-3646-c1ab-f026-07e25a874c01','e8d9297b-e64c-f0f3-0cdb-95dede4eaa44'),('365612aa-3646-c1ab-f026-07e25a874c01','f50bd17d-2436-47f3-2f9a-d914ff2ad834'),('e88d7417-2981-c495-2d40-65a57b03748c','f50bd17d-2436-47f3-2f9a-d914ff2ad834'),('365612aa-3646-c1ab-f026-07e25a874c01','fb5680c4-47cb-78f9-c107-656f42886e3c'),('e88d7417-2981-c495-2d40-65a57b03748c','fb5680c4-47cb-78f9-c107-656f42886e3c');
/*!40000 ALTER TABLE `system_role_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_user`
--

DROP TABLE IF EXISTS `system_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_user` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_user`
--

LOCK TABLES `system_user` WRITE;
/*!40000 ALTER TABLE `system_user` DISABLE KEYS */;
INSERT INTO `system_user` VALUES ('09f2a43a-fe98-8ae2-0645-5c04ae02873c','fangke2','123qwe','','','访客2'),('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6','lily','123qwe','lily@leihao.com','15896969696','李莉'),('46a80cc5-2f73-2012-d31b-0f28060d5867','fangke1','123qwe','','','访客1'),('48c55613-5042-0fe9-9c9a-1743822125ee','admin','123qwe','admin@leihao.com','15888888888','管理员'),('4cff9683-e2df-e5ee-68cf-b063619ce3aa','fangke4','123qwe','','','访客4'),('6a998d89-d49f-cfa7-9728-654dde089d7e','fangke5','123qwe','','','访客5'),('b15ed784-f3e9-b671-d780-fcee0c0f2494','fangke3','123qwe','','','访客3');
/*!40000 ALTER TABLE `system_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_user_organization`
--

DROP TABLE IF EXISTS `system_user_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_user_organization` (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizationId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`,`organizationId`) USING BTREE,
  KEY `FK_68941b8e6cc24f7f5cc3898edb4` (`organizationId`) USING BTREE,
  KEY `IDX_9a2b15d16e0199fd81dec2407b` (`userId`) USING BTREE,
  KEY `IDX_68941b8e6cc24f7f5cc3898edb` (`organizationId`) USING BTREE,
  CONSTRAINT `FK_68941b8e6cc24f7f5cc3898edb4` FOREIGN KEY (`organizationId`) REFERENCES `system_organization` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9a2b15d16e0199fd81dec2407b2` FOREIGN KEY (`userId`) REFERENCES `system_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_user_organization`
--

LOCK TABLES `system_user_organization` WRITE;
/*!40000 ALTER TABLE `system_user_organization` DISABLE KEYS */;
INSERT INTO `system_user_organization` VALUES ('09f2a43a-fe98-8ae2-0645-5c04ae02873c','4980001f-45af-4a92-a68a-e1e5b128a637'),('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6','4980001f-45af-4a92-a68a-e1e5b128a637'),('46a80cc5-2f73-2012-d31b-0f28060d5867','4980001f-45af-4a92-a68a-e1e5b128a637'),('48c55613-5042-0fe9-9c9a-1743822125ee','4980001f-45af-4a92-a68a-e1e5b128a637'),('4cff9683-e2df-e5ee-68cf-b063619ce3aa','4980001f-45af-4a92-a68a-e1e5b128a637'),('6a998d89-d49f-cfa7-9728-654dde089d7e','4980001f-45af-4a92-a68a-e1e5b128a637'),('b15ed784-f3e9-b671-d780-fcee0c0f2494','4980001f-45af-4a92-a68a-e1e5b128a637');
/*!40000 ALTER TABLE `system_user_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_user_role`
--

DROP TABLE IF EXISTS `system_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_user_role` (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`,`roleId`) USING BTREE,
  KEY `FK_4c2ae6cf44ed3a1e1040122db4b` (`roleId`) USING BTREE,
  KEY `IDX_4c2ae6cf44ed3a1e1040122db4` (`roleId`) USING BTREE,
  KEY `IDX_8b51fc7bf87d9a9aada9c50454` (`userId`) USING BTREE,
  CONSTRAINT `FK_4c2ae6cf44ed3a1e1040122db4b` FOREIGN KEY (`roleId`) REFERENCES `system_role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8b51fc7bf87d9a9aada9c504544` FOREIGN KEY (`userId`) REFERENCES `system_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_user_role`
--

LOCK TABLES `system_user_role` WRITE;
/*!40000 ALTER TABLE `system_user_role` DISABLE KEYS */;
INSERT INTO `system_user_role` VALUES ('48c55613-5042-0fe9-9c9a-1743822125ee','365612aa-3646-c1ab-f026-07e25a874c01'),('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6','39f0fdd0-cfb2-0aeb-91c5-eebdbbccdfda'),('09f2a43a-fe98-8ae2-0645-5c04ae02873c','e88d7417-2981-c495-2d40-65a57b03748c'),('46a80cc5-2f73-2012-d31b-0f28060d5867','e88d7417-2981-c495-2d40-65a57b03748c'),('4cff9683-e2df-e5ee-68cf-b063619ce3aa','e88d7417-2981-c495-2d40-65a57b03748c'),('6a998d89-d49f-cfa7-9728-654dde089d7e','e88d7417-2981-c495-2d40-65a57b03748c'),('b15ed784-f3e9-b671-d780-fcee0c0f2494','e88d7417-2981-c495-2d40-65a57b03748c');
/*!40000 ALTER TABLE `system_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ng-nest-admin'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-08 18:39:26
