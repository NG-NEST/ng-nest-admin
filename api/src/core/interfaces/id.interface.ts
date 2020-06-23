import { ObjectID } from 'typeorm';

export interface XId {
  id: string | number | Date | ObjectID;
}
