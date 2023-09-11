import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class EncryptService {
  static saltRounds = 11;

  constructor() {}

  genSalt() {
    return genSaltSync(EncryptService.saltRounds);
  }

  hash(data: string) {
    return hashSync(data, this.genSalt());
  }

  compare(data: string, hash: string) {
    return compareSync(data, hash);
  }
}
