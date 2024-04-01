import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiclient";
import { CACHE_KEY_TODOS } from "../constants";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const apiclient = new APIClient<Todo>("/todos");

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiclient.getAll,
  });
};

export default useTodos;
