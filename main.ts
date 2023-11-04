import "reflect-metadata";
import { container } from "tsyringe";
import { User } from "./entities/user.entity.ts";
import { UserService } from "./services/user.service.ts";

const userService = container.resolve(UserService);

console.log(await userService.getList());

const createUser = new User();
createUser.username = "my name";
createUser.email = "myEmail@gmail.com";
createUser.password = "password";
const created = await userService.create(createUser);

console.log(created);
console.log(await userService.getList());

const updateUser = new User();
updateUser.username = "bird";
updateUser.email = "bird@gmail.com";
updateUser.password = "bird1234";
const updated = await userService.update("ID001", updateUser);

console.log(updated);
console.log(await userService.getList());

const removed = await userService.remove("ID001");

console.log(removed);
console.log(await userService.getList());
