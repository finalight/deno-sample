import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { Stub, stub } from "https://deno.land/x/mock@v0.9.5/stub.ts";

import TodoRepository from "./TodoRepository.ts";
import { getAll } from "./TodoService.ts";

Deno.test("Should return todos in the correct format", async () => {
  const todoRepository: TodoRepository = new TodoRepository();
  const repositoryGetAllMock: [number, string][] = [
    [1, "todo 1"],
    [2, "todo 2"],
  ];

  const action: Stub<TodoRepository> = stub(todoRepository, "getAll", [
    repositoryGetAllMock,
  ]);

  try {
    assertEquals(await getAll(todoRepository), [
      {
        id: 1,
        name: "todo 1",
      },
      { id: 2, name: "todo 2" },
    ]);
  } finally {
    action.restore();
  }
});
