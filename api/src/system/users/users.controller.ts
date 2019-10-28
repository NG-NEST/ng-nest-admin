import { Controller } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { ControllerService } from "../common/services/controller.service";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController extends ControllerService<User> {
  constructor(public readonly usersService: UsersService) {
    super(usersService);
  }
}
