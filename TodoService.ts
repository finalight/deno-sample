import Todo from "./Todo.ts";
import TodoRepository from "./TodoRepository.ts";

export const getAll = async (
  todoRepository: TodoRepository,
): Promise<Todo[]> => {
  const dbResult = await todoRepository.getAll();

  return dbResult.map((record: [number, string]) =>
    ({
      id: record[0],
      name: record[1],
    }) as Todo
  );
};
