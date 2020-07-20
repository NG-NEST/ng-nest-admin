/*
 Navicat Premium Data Transfer

 Source Server         : 47.93.183.122
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 47.93.183.122:3306
 Source Schema         : ng-nest-admin

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 20/07/2020 18:08:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_action
-- ----------------------------
DROP TABLE IF EXISTS `system_action`;
CREATE TABLE `system_action`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menuId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_3ed34464adf967339c44f99ff80`(`menuId`) USING BTREE,
  CONSTRAINT `FK_3ed34464adf967339c44f99ff80` FOREIGN KEY (`menuId`) REFERENCES `system_menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_action
-- ----------------------------
INSERT INTO `system_action` VALUES ('113ed106-2cdd-a596-de50-4b80de1fb83e', '删除', 'delete', 'fto-trash-2', '32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', 4);
INSERT INTO `system_action` VALUES ('19d1fde7-f3f4-4ce9-e6cc-6b77a5fe1ac4', '修改', 'edit', 'fto-edit', '32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', 3);
INSERT INTO `system_action` VALUES ('2711f0e9-5f7c-54dc-cf78-f96ef2fcaf19', '新增根节点', 'add-root', 'fto-plus', '4a305e03-c1b9-1ab7-b9ac-3408dced0194', 5);
INSERT INTO `system_action` VALUES ('28ce1bf4-830a-76ab-c73c-10a7207f92ed', '修改', 'edit', 'fto-edit', '4a305e03-c1b9-1ab7-b9ac-3408dced0194', 3);
INSERT INTO `system_action` VALUES ('29957623-54fb-d52d-bc69-9be9291eac05', '查看', 'info', 'fto-eye', '05e588cc-6026-005b-927a-0e452c4131ab', 1);
INSERT INTO `system_action` VALUES ('2afc1b90-0c7f-ae5b-589b-5da8dc78f49a', '查看', 'info', 'fto-eye', '32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', 1);
INSERT INTO `system_action` VALUES ('2d494d93-050b-f276-d993-a5c55efa6f73', '查看', 'info', 'fto-eye', '5453c6a4-00a8-1512-0708-d0747fc93c25', 1);
INSERT INTO `system_action` VALUES ('346594b7-0db7-8790-8869-be827d50a104', '删除', 'delete', 'fto-trash-2', '10f15681-0d11-78db-bc92-76d43298a5f8', 5);
INSERT INTO `system_action` VALUES ('54ccd3ee-0f78-e4aa-8643-a92dc2849000', '查看', 'info', 'fto-eye', '90d5153c-3241-0ef6-27a8-6d00012d1838', 1);
INSERT INTO `system_action` VALUES ('590ac302-cdca-72c7-60c5-0444b4585899', '查看', 'info', 'fto-eye', '10f15681-0d11-78db-bc92-76d43298a5f8', 1);
INSERT INTO `system_action` VALUES ('629d4d09-73b6-2aa0-4e58-7108f4660a50', '新增', 'add', 'fto-plus', 'f97d223d-b777-3dfa-c76a-d24244eba25e', 2);
INSERT INTO `system_action` VALUES ('63c8eeb1-5843-9bb0-d054-e854708a1f14', '查看', 'info', 'fto-eye', 'a787e3e7-1c57-ccad-eafd-7d15de1757ec', 1);
INSERT INTO `system_action` VALUES ('6dd07b1d-d431-9bf4-62d5-5db3dc99bddb', '查看', 'info', 'fto-eye', '4a305e03-c1b9-1ab7-b9ac-3408dced0194', 1);
INSERT INTO `system_action` VALUES ('74cfa90b-9e7c-344d-f5ac-2b14350697d9', '查看', 'info', 'fto-eye', '50f2cb4b-c5b4-a953-145f-fd076c675df8', 1);
INSERT INTO `system_action` VALUES ('75056496-6ca6-1346-7a60-be72cab7d72b', '删除', 'delete', 'fto-trash-2', 'f97d223d-b777-3dfa-c76a-d24244eba25e', 4);
INSERT INTO `system_action` VALUES ('76faa453-36f3-e773-1527-a3158b706f7a', '查看', 'info', 'fto-eye', '5b99835d-cbb6-06e5-fbd5-c636ff88fb60', 1);
INSERT INTO `system_action` VALUES ('7adad23f-636d-6bee-0f37-7d29d5b29585', '操作设置', 'actions', 'fto-list', '10f15681-0d11-78db-bc92-76d43298a5f8', 4);
INSERT INTO `system_action` VALUES ('811047d2-ac97-96a5-686d-59d5a54fcc62', '新增', 'add', 'fto-plus', '32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', 2);
INSERT INTO `system_action` VALUES ('8eedb227-6be9-7571-ed0b-9e181c6e6716', '修改', 'edit', 'fto-edit', 'f97d223d-b777-3dfa-c76a-d24244eba25e', 3);
INSERT INTO `system_action` VALUES ('9067e591-16f5-b7a7-9336-a09a8b10fa5e', '查看', 'info', 'fto-eye', 'e2203f49-23da-5372-a260-ba8f71dc9e08', 1);
INSERT INTO `system_action` VALUES ('ad39e8cf-2816-9176-ce7f-83fcb84c3cd1', '权限设置', 'permission', 'fto-list', 'f97d223d-b777-3dfa-c76a-d24244eba25e', 5);
INSERT INTO `system_action` VALUES ('bf9ba14b-b7db-3adb-662a-a88e417e70e8', '修改', 'edit', 'fto-edit', '10f15681-0d11-78db-bc92-76d43298a5f8', 3);
INSERT INTO `system_action` VALUES ('cac38734-fa4c-0775-96f2-c4146a4dcbe0', '新增', 'add', 'fto-plus', '10f15681-0d11-78db-bc92-76d43298a5f8', 2);
INSERT INTO `system_action` VALUES ('e1497f04-16fa-9bee-c77e-fd4afab4ef86', '删除', 'delete', 'fto-trash-2', '4a305e03-c1b9-1ab7-b9ac-3408dced0194', 4);
INSERT INTO `system_action` VALUES ('e8d9297b-e64c-f0f3-0cdb-95dede4eaa44', '查看', 'info', 'fto-eye', '9c0e8821-9ec5-516f-1694-6a75200f0296', 1);
INSERT INTO `system_action` VALUES ('f50bd17d-2436-47f3-2f9a-d914ff2ad834', '查看', 'info', 'fto-eye', 'f97d223d-b777-3dfa-c76a-d24244eba25e', 1);
INSERT INTO `system_action` VALUES ('fb5680c4-47cb-78f9-c107-656f42886e3c', '新增', 'add', 'fto-plus', '4a305e03-c1b9-1ab7-b9ac-3408dced0194', 2);

-- ----------------------------
-- Table structure for system_col
-- ----------------------------
DROP TABLE IF EXISTS `system_col`;
CREATE TABLE `system_col`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `type` json NULL,
  `length` int(11) NULL DEFAULT NULL,
  `primary` tinyint(4) NULL DEFAULT NULL,
  `nullable` tinyint(4) NULL DEFAULT NULL,
  `unique` tinyint(4) NULL DEFAULT NULL,
  `default` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `tableId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_ffb2656480f943927e94318532e`(`tableId`) USING BTREE,
  CONSTRAINT `FK_ffb2656480f943927e94318532e` FOREIGN KEY (`tableId`) REFERENCES `system_table` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_control
-- ----------------------------
DROP TABLE IF EXISTS `system_control`;
CREATE TABLE `system_control`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `required` tinyint(4) NULL DEFAULT NULL,
  `disabled` tinyint(4) NULL DEFAULT NULL,
  `readonly` tinyint(4) NULL DEFAULT NULL,
  `hide` tinyint(4) NULL DEFAULT NULL,
  `primary` tinyint(4) NOT NULL,
  `sort` int(11) NOT NULL,
  `col` json NULL,
  `type` json NOT NULL,
  `group` json NULL,
  `pageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_71c3bf30155ee1f0c19e92181f5`(`pageId`) USING BTREE,
  CONSTRAINT `FK_71c3bf30155ee1f0c19e92181f5` FOREIGN KEY (`pageId`) REFERENCES `system_page` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d7fcb6cbe5c416b793101e32a3f`(`parentId`) USING BTREE,
  CONSTRAINT `FK_d7fcb6cbe5c416b793101e32a3f` FOREIGN KEY (`parentId`) REFERENCES `system_menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES ('0009d7da-3efc-2ea1-3be1-2542c7b6c070', '系统管理', '', 'ado-setting', NULL, '0009d7da-3efc-2ea1-3be1-2542c7b6c070', 3);
INSERT INTO `system_menu` VALUES ('05e588cc-6026-005b-927a-0e452c4131ab', '测试菜单1', '1', 'fto-file', NULL, '05e588cc-6026-005b-927a-0e452c4131ab', 10);
INSERT INTO `system_menu` VALUES ('10f15681-0d11-78db-bc92-76d43298a5f8', '菜单管理', 'menus', 'fto-menu', '0009d7da-3efc-2ea1-3be1-2542c7b6c070', '0009d7da-3efc-2ea1-3be1-2542c7b6c070.10f15681-0d11-78db-bc92-76d43298a5f8', 4);
INSERT INTO `system_menu` VALUES ('32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', '用户管理', 'users', 'ado-team', '0009d7da-3efc-2ea1-3be1-2542c7b6c070', '0009d7da-3efc-2ea1-3be1-2542c7b6c070.32cbc14a-632e-24d0-8d8f-2032c2c7a5e0', 1);
INSERT INTO `system_menu` VALUES ('4a305e03-c1b9-1ab7-b9ac-3408dced0194', '组织管理', 'organization', 'ado-apartment', '0009d7da-3efc-2ea1-3be1-2542c7b6c070', '0009d7da-3efc-2ea1-3be1-2542c7b6c070.4a305e03-c1b9-1ab7-b9ac-3408dced0194', 3);
INSERT INTO `system_menu` VALUES ('50f2cb4b-c5b4-a953-145f-fd076c675df8', '测试菜单3', '3', 'fto-file', NULL, '50f2cb4b-c5b4-a953-145f-fd076c675df8', 13);
INSERT INTO `system_menu` VALUES ('5453c6a4-00a8-1512-0708-d0747fc93c25', '测试菜单2', '2', 'fto-file', NULL, '5453c6a4-00a8-1512-0708-d0747fc93c25', 11);
INSERT INTO `system_menu` VALUES ('5b99835d-cbb6-06e5-fbd5-c636ff88fb60', '测试菜单4', '4', 'fto-file', NULL, '5b99835d-cbb6-06e5-fbd5-c636ff88fb60', 14);
INSERT INTO `system_menu` VALUES ('90d5153c-3241-0ef6-27a8-6d00012d1838', '首页', 'home', 'ado-home', NULL, '90d5153c-3241-0ef6-27a8-6d00012d1838', 1);
INSERT INTO `system_menu` VALUES ('9c0e8821-9ec5-516f-1694-6a75200f0296', '测试菜单6', '6', 'fto-file', NULL, '9c0e8821-9ec5-516f-1694-6a75200f0296', 16);
INSERT INTO `system_menu` VALUES ('a787e3e7-1c57-ccad-eafd-7d15de1757ec', '测试菜单5', '5', 'fto-file', NULL, 'a787e3e7-1c57-ccad-eafd-7d15de1757ec', 15);
INSERT INTO `system_menu` VALUES ('e2203f49-23da-5372-a260-ba8f71dc9e08', '仪表盘', 'dashboard', 'ado-radar-chart', NULL, 'e2203f49-23da-5372-a260-ba8f71dc9e08', 2);
INSERT INTO `system_menu` VALUES ('f97d223d-b777-3dfa-c76a-d24244eba25e', '角色管理', 'roles', 'ado-user', '0009d7da-3efc-2ea1-3be1-2542c7b6c070', '0009d7da-3efc-2ea1-3be1-2542c7b6c070.f97d223d-b777-3dfa-c76a-d24244eba25e', 2);

-- ----------------------------
-- Table structure for system_module
-- ----------------------------
DROP TABLE IF EXISTS `system_module`;
CREATE TABLE `system_module`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_organization
-- ----------------------------
DROP TABLE IF EXISTS `system_organization`;
CREATE TABLE `system_organization`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_86110f24fd2d3afdba313c5060d`(`parentId`) USING BTREE,
  CONSTRAINT `FK_86110f24fd2d3afdba313c5060d` FOREIGN KEY (`parentId`) REFERENCES `system_organization` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_organization
-- ----------------------------
INSERT INTO `system_organization` VALUES ('14b135a5-05f6-8362-bf17-0ba7d9f9b650', '企业发展事业部', 'group', 'icon', '4980001f-45af-4a92-a68a-e1e5b128a637', '4980001f-45af-4a92-a68a-e1e5b128a637.14b135a5-05f6-8362-bf17-0ba7d9f9b650', 1);
INSERT INTO `system_organization` VALUES ('4980001f-45af-4a92-a68a-e1e5b128a637', '雷浩集团', 'root', 'icon', NULL, '4980001f-45af-4a92-a68a-e1e5b128a637', 1);
INSERT INTO `system_organization` VALUES ('658931dc-b4a2-e4b4-859b-17b2ec331f6a', '财务部', 'department', 'icon', '14b135a5-05f6-8362-bf17-0ba7d9f9b650', '4980001f-45af-4a92-a68a-e1e5b128a637.14b135a5-05f6-8362-bf17-0ba7d9f9b650.658931dc-b4a2-e4b4-859b-17b2ec331f6a', 0);
INSERT INTO `system_organization` VALUES ('6695dfb3-1097-5524-cc31-09e2167571b0', '社交网络事业部', 'group', 'icon', '4980001f-45af-4a92-a68a-e1e5b128a637', '4980001f-45af-4a92-a68a-e1e5b128a637.6695dfb3-1097-5524-cc31-09e2167571b0', 2);
INSERT INTO `system_organization` VALUES ('8029f46f-d82a-257c-97ef-64715f5ec88c', '互动娱乐事业部', 'group', 'icon', '4980001f-45af-4a92-a68a-e1e5b128a637', '4980001f-45af-4a92-a68a-e1e5b128a637.8029f46f-d82a-257c-97ef-64715f5ec88c', 3);
INSERT INTO `system_organization` VALUES ('adaa0488-7c5e-7f73-290f-a172a85f987a', '移动互联网事业部', 'group', 'icon', '4980001f-45af-4a92-a68a-e1e5b128a637', '4980001f-45af-4a92-a68a-e1e5b128a637.adaa0488-7c5e-7f73-290f-a172a85f987a', 4);
INSERT INTO `system_organization` VALUES ('fe77519d-4467-214e-647b-e0089e45306d', '网络媒体事业部', 'group', 'icon', '4980001f-45af-4a92-a68a-e1e5b128a637', '4980001f-45af-4a92-a68a-e1e5b128a637.fe77519d-4467-214e-647b-e0089e45306d', 5);

-- ----------------------------
-- Table structure for system_page
-- ----------------------------
DROP TABLE IF EXISTS `system_page`;
CREATE TABLE `system_page`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `moduleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_cd172e2eea0e95fbfd852d6d699`(`moduleId`) USING BTREE,
  CONSTRAINT `FK_cd172e2eea0e95fbfd852d6d699` FOREIGN KEY (`moduleId`) REFERENCES `system_module` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_page_relation
-- ----------------------------
DROP TABLE IF EXISTS `system_page_relation`;
CREATE TABLE `system_page_relation`  (
  `fromPageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `toPageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`fromPageId`, `toPageId`) USING BTREE,
  INDEX `FK_6c166329aff74304c4c25390a5f`(`toPageId`) USING BTREE,
  INDEX `IDX_6d3a58ca78d46588756f27fdff`(`fromPageId`) USING BTREE,
  INDEX `IDX_6c166329aff74304c4c25390a5`(`toPageId`) USING BTREE,
  CONSTRAINT `FK_6c166329aff74304c4c25390a5f` FOREIGN KEY (`toPageId`) REFERENCES `system_page` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_6d3a58ca78d46588756f27fdffc` FOREIGN KEY (`fromPageId`) REFERENCES `system_page` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizationId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_af72a2809e8b6fdf8da0955bf03`(`organizationId`) USING BTREE,
  CONSTRAINT `FK_af72a2809e8b6fdf8da0955bf03` FOREIGN KEY (`organizationId`) REFERENCES `system_organization` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES ('258a840b-7529-eb1c-4a3a-5e724958d4cb', '管理员-移动互联网事业部', 'adaa0488-7c5e-7f73-290f-a172a85f987a');
INSERT INTO `system_role` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '系统管理员', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_role` VALUES ('39f0fdd0-cfb2-0aeb-91c5-eebdbbccdfda', '管理员-互动娱乐事业部', '8029f46f-d82a-257c-97ef-64715f5ec88c');
INSERT INTO `system_role` VALUES ('51ae97e3-24a7-bca2-1ddd-e032e8202970', '管理员-社交网络事业部', '6695dfb3-1097-5524-cc31-09e2167571b0');
INSERT INTO `system_role` VALUES ('8e62a3e2-4a60-0a81-3fed-370c11c39504', '管理员-企业发展事业部', '14b135a5-05f6-8362-bf17-0ba7d9f9b650');
INSERT INTO `system_role` VALUES ('a6deeb36-3370-7002-253c-0226c8203c66', '管理员-网络媒体事业部', 'fe77519d-4467-214e-647b-e0089e45306d');
INSERT INTO `system_role` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '访客', '4980001f-45af-4a92-a68a-e1e5b128a637');

-- ----------------------------
-- Table structure for system_role_action
-- ----------------------------
DROP TABLE IF EXISTS `system_role_action`;
CREATE TABLE `system_role_action`  (
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`roleId`, `actionId`) USING BTREE,
  INDEX `FK_a0ec504b9c427ffcc85e212594c`(`actionId`) USING BTREE,
  INDEX `IDX_25439811e232662e2dc087330d`(`roleId`) USING BTREE,
  INDEX `IDX_a0ec504b9c427ffcc85e212594`(`actionId`) USING BTREE,
  CONSTRAINT `FK_25439811e232662e2dc087330d9` FOREIGN KEY (`roleId`) REFERENCES `system_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_a0ec504b9c427ffcc85e212594c` FOREIGN KEY (`actionId`) REFERENCES `system_action` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role_action
-- ----------------------------
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '113ed106-2cdd-a596-de50-4b80de1fb83e');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '19d1fde7-f3f4-4ce9-e6cc-6b77a5fe1ac4');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '2711f0e9-5f7c-54dc-cf78-f96ef2fcaf19');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '28ce1bf4-830a-76ab-c73c-10a7207f92ed');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '29957623-54fb-d52d-bc69-9be9291eac05');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '29957623-54fb-d52d-bc69-9be9291eac05');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '2afc1b90-0c7f-ae5b-589b-5da8dc78f49a');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '2afc1b90-0c7f-ae5b-589b-5da8dc78f49a');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '2d494d93-050b-f276-d993-a5c55efa6f73');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '2d494d93-050b-f276-d993-a5c55efa6f73');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '346594b7-0db7-8790-8869-be827d50a104');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '54ccd3ee-0f78-e4aa-8643-a92dc2849000');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '54ccd3ee-0f78-e4aa-8643-a92dc2849000');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '590ac302-cdca-72c7-60c5-0444b4585899');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '590ac302-cdca-72c7-60c5-0444b4585899');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '629d4d09-73b6-2aa0-4e58-7108f4660a50');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '629d4d09-73b6-2aa0-4e58-7108f4660a50');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '63c8eeb1-5843-9bb0-d054-e854708a1f14');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '6dd07b1d-d431-9bf4-62d5-5db3dc99bddb');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '6dd07b1d-d431-9bf4-62d5-5db3dc99bddb');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '74cfa90b-9e7c-344d-f5ac-2b14350697d9');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '74cfa90b-9e7c-344d-f5ac-2b14350697d9');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '75056496-6ca6-1346-7a60-be72cab7d72b');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '76faa453-36f3-e773-1527-a3158b706f7a');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '7adad23f-636d-6bee-0f37-7d29d5b29585');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '811047d2-ac97-96a5-686d-59d5a54fcc62');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '811047d2-ac97-96a5-686d-59d5a54fcc62');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '8eedb227-6be9-7571-ed0b-9e181c6e6716');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', '9067e591-16f5-b7a7-9336-a09a8b10fa5e');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', '9067e591-16f5-b7a7-9336-a09a8b10fa5e');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'ad39e8cf-2816-9176-ce7f-83fcb84c3cd1');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'bf9ba14b-b7db-3adb-662a-a88e417e70e8');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'cac38734-fa4c-0775-96f2-c4146a4dcbe0');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', 'cac38734-fa4c-0775-96f2-c4146a4dcbe0');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'e1497f04-16fa-9bee-c77e-fd4afab4ef86');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'e8d9297b-e64c-f0f3-0cdb-95dede4eaa44');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'f50bd17d-2436-47f3-2f9a-d914ff2ad834');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', 'f50bd17d-2436-47f3-2f9a-d914ff2ad834');
INSERT INTO `system_role_action` VALUES ('365612aa-3646-c1ab-f026-07e25a874c01', 'fb5680c4-47cb-78f9-c107-656f42886e3c');
INSERT INTO `system_role_action` VALUES ('e88d7417-2981-c495-2d40-65a57b03748c', 'fb5680c4-47cb-78f9-c107-656f42886e3c');

-- ----------------------------
-- Table structure for system_table
-- ----------------------------
DROP TABLE IF EXISTS `system_table`;
CREATE TABLE `system_table`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transform` json NULL,
  `moduleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_18b6873e5862386d08dcb5f3452`(`moduleId`) USING BTREE,
  CONSTRAINT `FK_18b6873e5862386d08dcb5f3452` FOREIGN KEY (`moduleId`) REFERENCES `system_module` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('09f2a43a-fe98-8ae2-0645-5c04ae02873c', 'fangke2', '123qwe', '', '', '访客2');
INSERT INTO `system_user` VALUES ('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6', 'lily', '123qwe', 'lily@leihao.com', '15896969696', '李莉');
INSERT INTO `system_user` VALUES ('46a80cc5-2f73-2012-d31b-0f28060d5867', 'fangke1', '123qwe', '', '', '访客1');
INSERT INTO `system_user` VALUES ('48c55613-5042-0fe9-9c9a-1743822125ee', 'admin', '123qwe', 'admin@leihao.com', '15888888888', '管理员');
INSERT INTO `system_user` VALUES ('4cff9683-e2df-e5ee-68cf-b063619ce3aa', 'fangke4', '123qwe', '', '', '访客4');
INSERT INTO `system_user` VALUES ('6a998d89-d49f-cfa7-9728-654dde089d7e', 'fangke5', '123qwe', '', '', '访客5');
INSERT INTO `system_user` VALUES ('b15ed784-f3e9-b671-d780-fcee0c0f2494', 'fangke3', '123qwe', '', '', '访客3');

-- ----------------------------
-- Table structure for system_user_organization
-- ----------------------------
DROP TABLE IF EXISTS `system_user_organization`;
CREATE TABLE `system_user_organization`  (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizationId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`, `organizationId`) USING BTREE,
  INDEX `FK_68941b8e6cc24f7f5cc3898edb4`(`organizationId`) USING BTREE,
  INDEX `IDX_9a2b15d16e0199fd81dec2407b`(`userId`) USING BTREE,
  INDEX `IDX_68941b8e6cc24f7f5cc3898edb`(`organizationId`) USING BTREE,
  CONSTRAINT `FK_68941b8e6cc24f7f5cc3898edb4` FOREIGN KEY (`organizationId`) REFERENCES `system_organization` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_9a2b15d16e0199fd81dec2407b2` FOREIGN KEY (`userId`) REFERENCES `system_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user_organization
-- ----------------------------
INSERT INTO `system_user_organization` VALUES ('09f2a43a-fe98-8ae2-0645-5c04ae02873c', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('46a80cc5-2f73-2012-d31b-0f28060d5867', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('48c55613-5042-0fe9-9c9a-1743822125ee', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('4cff9683-e2df-e5ee-68cf-b063619ce3aa', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('6a998d89-d49f-cfa7-9728-654dde089d7e', '4980001f-45af-4a92-a68a-e1e5b128a637');
INSERT INTO `system_user_organization` VALUES ('b15ed784-f3e9-b671-d780-fcee0c0f2494', '4980001f-45af-4a92-a68a-e1e5b128a637');

-- ----------------------------
-- Table structure for system_user_role
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role`  (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `FK_4c2ae6cf44ed3a1e1040122db4b`(`roleId`) USING BTREE,
  INDEX `IDX_4c2ae6cf44ed3a1e1040122db4`(`roleId`) USING BTREE,
  INDEX `IDX_8b51fc7bf87d9a9aada9c50454`(`userId`) USING BTREE,
  CONSTRAINT `FK_4c2ae6cf44ed3a1e1040122db4b` FOREIGN KEY (`roleId`) REFERENCES `system_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_8b51fc7bf87d9a9aada9c504544` FOREIGN KEY (`userId`) REFERENCES `system_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO `system_user_role` VALUES ('48c55613-5042-0fe9-9c9a-1743822125ee', '365612aa-3646-c1ab-f026-07e25a874c01');
INSERT INTO `system_user_role` VALUES ('12ef81dd-890b-cfea-ab4c-0e0a8c4bf8e6', '39f0fdd0-cfb2-0aeb-91c5-eebdbbccdfda');
INSERT INTO `system_user_role` VALUES ('09f2a43a-fe98-8ae2-0645-5c04ae02873c', 'e88d7417-2981-c495-2d40-65a57b03748c');
INSERT INTO `system_user_role` VALUES ('46a80cc5-2f73-2012-d31b-0f28060d5867', 'e88d7417-2981-c495-2d40-65a57b03748c');
INSERT INTO `system_user_role` VALUES ('4cff9683-e2df-e5ee-68cf-b063619ce3aa', 'e88d7417-2981-c495-2d40-65a57b03748c');
INSERT INTO `system_user_role` VALUES ('6a998d89-d49f-cfa7-9728-654dde089d7e', 'e88d7417-2981-c495-2d40-65a57b03748c');
INSERT INTO `system_user_role` VALUES ('b15ed784-f3e9-b671-d780-fcee0c0f2494', 'e88d7417-2981-c495-2d40-65a57b03748c');

SET FOREIGN_KEY_CHECKS = 1;
