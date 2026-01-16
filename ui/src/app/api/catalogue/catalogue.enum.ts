export enum CatalogueDescription {
  Catalogue = 'catalogue',

  Id = 'id',
  Pid = 'pid',
  Name = 'name',
  Many = 'many',
  Type = 'type',
  FileType = 'fileType',
  Sort = 'sort',
  Description = 'description',
  Content = 'content',

  Parent = 'parent',
  Children = 'children'
}

export enum CatalogueType {
  Folder = 'Folder',
  File = 'File'
}

export const CatalogueFolderFiles = 'catalogue-folder';

export enum CatalogueMessage {
  CreatedSuccess = 'createdSuccess',
  UpdatedSuccess = 'updatedSuccess',
  DeletedSuccess = 'deletedSuccess',
  FolderUploadSuccess = 'folderUploadSuccess',
  NotFoundFiles = 'notFoundFiles'
}
