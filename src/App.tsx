import { useReducer } from "react";
import "./App.css";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import HomePage from "./routing/HomePage";
import TasksContext from "./state-management/contexts/taskContext";
import LoginStatus from "./state-management/LoginStatus";
import NavBar from "./state-management/NavBar";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TaskList from "./state-management/TaskList";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      <NavBar />
      <TaskList />
    </TasksContext.Provider>
  );
}

export default App;
