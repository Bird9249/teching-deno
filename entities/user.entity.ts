import { Entity } from "../common/bases/entity.ts";

export class User extends Entity {
  username!: string;

  email!: string;

  password!: string;
}
