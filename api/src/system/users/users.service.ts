import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ObjectID } from "typeorm";
import { RepositoryService } from "../common/services/repository.service";
import { User } from "./entities/user.entity";

export interface UserQuery {
  organizationId: string;
}

@Injectable()
export class UsersService extends RepositoryService<User> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }
}
