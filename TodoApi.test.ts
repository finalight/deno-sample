import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { app } from "./TodoApi.ts";
import TodoRepository from "./TodoRepository.ts";
import { Stub, stub } from "https://deno.land/x/mock@v0.9.5/stub.ts";

Deno.test("should get all todos", async () => {
  const todoRepository: TodoRepository = new TodoRepository();
  const repositoryGetAllMock: [number, string][] = [
    [1, "todo 1"],
    [2, "todo 2"],
  ];
  const action: Stub<TodoRepository> = stub(todoRepository, "getAll", [
    repositoryGetAllMock,
  ]);
  app();
  const result = await fetch("http://localhost:8080");
  const jsonBody = await result.json();

  try {
    assertEquals(jsonBody, [
      [1, "todo 1"],
      [2, "todo 2"],
    ]);
  } finally {
    action.restore();
  }
});
