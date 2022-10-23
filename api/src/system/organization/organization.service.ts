import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Like } from 'typeorm';
import { XRepositoryService, XQuery, XIdType } from '@ng-nest/api/core';
import { Organization } from './entities/organization.entity';
import { orderBy } from 'lodash';

@Injectable()
export class OrganizationService extends XRepositoryService<Organization, XQuery> {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {
    super(organizationRepository);
  }

  async get(id: XIdType): Promise<Organization> {
    return await this.organizationRepository.findOne({ id });
  }

  async post(entity: Organization): Promise<Organization> {
    let parent = null;
    if (entity.pid !== null) parent = await this.organizationRepository.findOne({ pid: entity.pid });
    return await getManager().transaction<Organization>(async x => {
      entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`;
      let result = await this.organizationRepository.save(entity);
      return result;
    });
  }

  async put(entity: Organization): Promise<Organization> {
    let find = await this.organizationRepository.findOne({ id: entity.id });
    if (find) {
      return await getManager().transaction(async x => {
        Object.assign(find, entity);
        let result = await this.organizationRepository.save(find);
        return result;
      });
    }
  }

  async delete(id: XIdType): Promise<Organization> {
    let remove = await this.organizationRepository.findOne({ id });
    let moves = await this.organizationRepository.find({ where: { path: Like(`${remove.path}%`) } });
    moves = orderBy(moves, x => -x.path.length);
    for (let move of moves) {
      await this.organizationRepository.remove(move);
    }
    return remove;
  }
}
