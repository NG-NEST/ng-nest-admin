import { ObjectID } from 'typeorm';

export interface Id {
  id: string | number | Date | ObjectID;
}
