import { Client } from "https://deno.land/x/postgres/mod.ts";

export default class TodoRepository {
  client: Client;

  constructor() {
    this.client = new Client({
      user: "postgres",
      database: "test",
      hostname: "localhost",
      port: 5432,
    });
  }
  getAll = async (): Promise<any> => {
    await this.client.connect();

    const result = await this.client.queryArray("SELECT * FROM todos");
    return result;
  };
}
