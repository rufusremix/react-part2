import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo).then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // Since jsonplaceholder api is fake
      // Updating the data in cache so as newly added todo is displayed
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [savedTodo, ...(todos || [])]);
    },
  });
  return (
    <>
      {addTodo.error && <div className="alert alert-danger">{addTodo.error.message}</div>}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              userId: 1,
              completed: false,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Adding... " : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
