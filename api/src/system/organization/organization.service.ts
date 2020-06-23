import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Like, ObjectID } from 'typeorm';
import { RepositoryService } from '@ng-nest/api/core';
import { Organization } from './entities/organization.entity';
import { orderBy } from 'lodash';

@Injectable()
export class OrganizationService extends RepositoryService<Organization> {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {
    super(organizationRepository);
  }

  async get(id: string | number | Date | ObjectID): Promise<Organization> {
    return await this.organizationRepository.findOne(id);
  }

  async post(entity: Organization): Promise<Organization> {
    let parent = await this.organizationRepository.findOne(entity.pid);
    return await getManager().transaction<Organization>(async x => {
      entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`;
      let result = await this.organizationRepository.save(entity);
      return result;
    });
  }

  async put(entity: Organization): Promise<Organization> {
    console.log(entity);
    let find = await this.organizationRepository.findOne(entity.id);
    if (find) {
      return await getManager().transaction(async x => {
        Object.assign(find, entity);
        let result = await this.organizationRepository.save(find);
        return result;
      });
    }
  }

  async delete(id: string | number | Date | ObjectID): Promise<Organization> {
    let remove = await this.organizationRepository.findOne(id);
    let moves = await this.organizationRepository.find({ where: { path: Like(`${remove.path}%`) } });
    moves = orderBy(moves, x => -x.path.length);
    await getManager().transaction(async x => {
      moves.forEach(async y => await x.remove(y));
    });
    return remove;
  }
}
