import { ObjectID } from 'typeorm';

export interface XId {
  id: XIdType;
}

export type XIdType = string | number | Date | ObjectID;
