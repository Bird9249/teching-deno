import { Hono } from "hono";
import "reflect-metadata";
import { container } from "tsyringe";
import { User } from "./entities/user.entity.ts";
import { UserService } from "./services/user.service.ts";

const app = new Hono();
const userService = container.resolve(UserService);

app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
});

app
  .get("user", async (c) => {
    const data = await userService.getList();
    return c.json(data);
  })
  .post("user", async (c) => {
    const body = await c.req.json<User>();

    const newUser = new User();
    newUser.username = body["username"];
    newUser.email = body["email"];
    newUser.password = body["password"];

    const data = await userService.create(newUser);

    return c.json(data);
  })
  .put("user/:id", async (c) => {
    const body = await c.req.json<User>();

    const newUser = new User();
    newUser.username = body["username"];
    newUser.email = body["email"];
    newUser.password = body["password"];

    const { id } = c.req.param();

    const data = await userService.update(id, newUser);

    return c.json(data);
  })
  .delete("user/:id", async (c) => {
    const { id } = c.req.param();

    const data = await userService.remove(id);

    return c.json(data);
  });

Deno.serve(app.fetch);
