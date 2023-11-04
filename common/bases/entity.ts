export class Entity {
  id: string = crypto.randomUUID();

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
}
