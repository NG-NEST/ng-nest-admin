import { Injectable } from '@nestjs/common';
import { readdir } from 'fs-extra';
import { join } from 'path';
import { LogsOutput } from './logs.output';
import { BaseSelect } from '@api/core';
import { isEmpty, isNotEmpty } from 'class-validator';
import { LogsType } from './logs.enum';

const logsPath = './logs';

@Injectable()
export class LogsService {
  constructor() {}

  async logs(select: BaseSelect): Promise<LogsOutput> {
    const typeObj: LogsOutput = {};
    if (!select) return typeObj;
    let types = (await readdir(logsPath)) as LogsType[];
    if (isEmpty(types)) {
      return typeObj;
    }
    types = types.filter((type) => isNotEmpty(select.select[type]));
    for (const type of types) {
      if (!typeObj[type]) typeObj[type] = [];
      const typePath = join(logsPath, type);
      const files = await readdir(typePath);
      typeObj[type].push(
        ...files.map((x) => {
          return {
            name: x,
            type: type,
            extension: x.split('.').pop(),
          };
        }),
      );
    }

    return typeObj;
  }
}
