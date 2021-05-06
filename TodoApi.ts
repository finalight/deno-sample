import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { getAll } from "./TodoService.ts";
import TodoRepository from "./TodoRepository.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

export const app = async () => {
  const todoRepository: TodoRepository = new TodoRepository();

  for await (const request of server) {
    const todos = await getAll(todoRepository);
    const jsonBody = JSON.stringify(todos);

    request.respond({ status: 200, body: jsonBody });
  }
};
