import { User } from "../entities/user.entity.ts";

export interface IUser {
  getList(): Promise<User[]>;

  create(input: User): Promise<string>;

  update(id: string, input: User): Promise<string>;

  remove(id: string): Promise<string>;
}
