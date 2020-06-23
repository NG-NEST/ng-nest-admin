import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { RepositoryService } from '@ng-nest/api/core';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends RepositoryService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super(roleRepository);
  }

  async get(id: string | number | Date | ObjectID): Promise<Role> {
    return await this.roleRepository.findOne(id, { relations: ['actions'] });
  }
}
