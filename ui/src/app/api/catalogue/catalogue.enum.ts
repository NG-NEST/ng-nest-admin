export enum CatalogueDescription {
  Catalogue = '节点',

  Id = '节点编码',
  Pid = '父节点编码',
  Name = '节点名称',
  Many = '生成多次',
  Type = '节点类型',
  FileType = '文件类型',
  Sort = '节点排序',
  Description = '节点描述',
  Content = '节点内容',

  Parent = '父节点',
  Children = '子节点集合'
}

export enum CatalogueType {
  Folder = 'Folder',
  File = 'File'
}

export const CatalogueFolderFiles = 'catalogue-folder';

export enum CatalogueMessage {
  CreatedSuccess = '新增节点成功',
  UpdatedSuccess = '更新节点成功',
  DeletedSuccess = '删除节点成功',
  FolderUploadSuccess = '文件夹上传成功',
  NotFoundFiles = '找不到文件'
}
