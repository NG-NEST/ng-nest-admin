export class BaseAudit {
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export class BaseModel extends BaseAudit {
  id!: string;
}
