<div align="center">
    <img src="https://avatars1.githubusercontent.com/u/46649777?s=200&v=4" />
</div>
<h1 align="center" style="margin-top:10px">
    NG-NEST-ADMIN
</h1>

基于 Angular 和 Nestjs 构建的开源后台管理系统。[Demo 地址](http://adminui.ngnest.com)

> - 提供基本的系统管理模块（用户、角色、组织和菜单）
> - 基于 RBAC 的权限管理
> - 使用对应的 @ng-nest/ui 组件库

---

### 支持环境

- Angular ^9.0.0
- Nestjs ^7.0.0

Chrome Microsoft Edge Firefox Safari
最新 2 个版本 最新 2 个版本 最新 2 个版本 最新 2 个版本

### 2. 目录说明

| 目录 | 说明                     |
| ---- | ------------------------ |
| api  | Nestjs 后台 API 接口项目 |
| ui   | Angular 前端项目         |

### 3. 开始--后台

demo 使用 `TypeORM` 连接的 `MySql` 数据库，运行前请在 `api/ormconfig.json` 文件中配置好数据库连接。  
`MySql` 数据库文件 `api/ng-nest-admin.sql` ，新建一个数据库直接执行导入。 

```bash
$ cd api
$ npm install
$ npm run start:dev
```

### 4. 开始--前端

```bash
$ cd ui
$ npm install
$ ng serve -o
```
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin-home.png" />
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin-users.png" />
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin-role-find.png" />
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin-roles.png" />
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin-menu.png" />
<img src="https://ngnest.com/assets/img/admin/ng-nest-admin.gif" />
