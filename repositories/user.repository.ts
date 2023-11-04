import { singleton } from "tsyringe";
import { User } from "../entities/user.entity.ts";

@singleton()
export class UserRepository {
  public readonly users: User[] = [];

  constructor() {
    const user = new User();
    user.id = "ID001";
    user.username = "user";
    user.email = "user@gmail.com";
    user.password = "password";
    user.createdAt = new Date();
    user.updatedAt = new Date();

    this.users.push(user);
  }
}
