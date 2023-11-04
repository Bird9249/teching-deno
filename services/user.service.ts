import { inject, singleton } from "tsyringe";
import { User } from "../entities/user.entity.ts";
import { IUser } from "../interfaces/user.interface.ts";
import { UserRepository } from "../repositories/user.repository.ts";

@singleton()
export class UserService implements IUser {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async getList(): Promise<User[]> {
    return await this.userRepository.users;
  }

  async create(input: User): Promise<string> {
    const user = new User();
    user.username = input.username;
    user.email = input.email;
    user.password = input.password;
    await this.userRepository.users.push(user);

    return "Create User Successfully!";
  }

  async update(id: string, input: User): Promise<string> {
    const oldUser = await this.userRepository.users.find(
      (user) => user.id === id
    );

    if (!oldUser) throw new Error("Not Found User");

    oldUser.username = input.username;
    oldUser.email = input.email;
    oldUser.password = input.password;

    return "Update User Successfully!";
  }

  async remove(id: string): Promise<string> {
    const userIdx = await this.userRepository.users.findIndex(
      (user) => user.id === id
    );

    if (userIdx === undefined) throw new Error("Not Found User");

    this.userRepository.users.splice(userIdx, 1);

    return "Remove User Successfully!";
  }
}
