import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodos = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo: Todo) => {
      // Setting the cache before succesfull update for a better client viewing experience
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [newTodo, ...(todos || [])]);

      onAdd();

      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      // Since jsonplaceholder api is fake
      // Updating the data in cache so as newly added todo is displayed
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo == newTodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      // If error reverting the cache back
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};
export default useAddTodos;
