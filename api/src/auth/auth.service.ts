import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../system/users/entities/user.entity';
import { XApiExceptionCode } from '../core/exceptions/api-exception-code';
import { Menu } from '../system/menus/entities/menu.entity';
import { Role } from '../system/roles/entities/role.entity';
import { Action } from '../system/actions/entities/action.entity';
import { map, uniqBy, union, split } from 'lodash';

@Injectable()
export class AuthService {
  user: User;
  expires: number = 3600;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>
  ) {}

  async createToken(id: string): Promise<any> {
    const user: JwtPayload = { id: id };
    return jwt.sign(user, 'secretKey', { expiresIn: this.expires });
  }

  async validateAccount(payload: JwtPayload): Promise<any> {
    return this.userRepository.findOneBy({ id: payload.id });
  }

  async finduserByAccount(account: string): Promise<User> {
    return this.userRepository.findOneBy({ account: account });
  }

  async menus(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async login(account: string, password: string): Promise<any> {
    this.user = await this.userRepository.findOne({ where: { account: account }, relations: ['roles'] });
    if (this.user != undefined && this.user.password == password) {
      let permissions = await this.getPermissions(this.user);
      return new Promise((x, y) => {
        this.createToken(this.user.id)
          .then((z) => x({ name: this.user.name, token: z, permissions: permissions }))
          .catch((z) => y(z));
      });
    } else {
      throw new HttpException(XApiExceptionCode.USER_ACCOUNT_PASSWORD_INVALID, HttpStatus.BAD_REQUEST);
    }
  }

  private async getPermissions(user: User): Promise<{ actions: Action[]; menus: Menu[] }> {
    let actions = await this.actionRepository
      .createQueryBuilder('action')
      .innerJoin('action.roles', 'role')
      .where('role.id IN (' + map(user.roles, (x) => `"${x.id}"`).join(',') + ')')
      .getMany();
    let menuIds = map(
      uniqBy(actions, (x) => x.menuId),
      (x) => x.menuId
    );
    let paths = await this.menuRepository
      .createQueryBuilder('menu')
      .select('menu.path')
      .where('menu.id IN (' + map(menuIds, (x) => `"${x}"`).join(',') + ')')
      .getMany();
    let ids = union(map(paths, (x) => split(x.path, '.')));
    let idss = [];
    ids.forEach((x) => (idss = union(idss, x)));
    let menus = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.id IN (' + map(idss, (x) => `"${x}"`).join(',') + ')')
      .orderBy({
        'menu.pid': 'ASC',
        'menu.sort': 'ASC'
      })
      .getMany();
    return { actions: actions, menus: menus };
  }
}
