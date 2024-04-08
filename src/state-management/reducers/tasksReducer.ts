export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  id: number;
}

export type TaskAction = AddTask | DeleteTask;

const tasksReducer = (tasks: Task[], action: TaskAction) => {
  switch (action.type) {
    case "ADD":
      return [action.task, ...tasks];

    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
  }
};

export default tasksReducer;
