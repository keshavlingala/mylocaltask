export interface Task {
  title: string;
  editing: boolean;
  id?: number;
  favorite?: boolean;
}


export interface TaskData {
  backlog: Task[];
  inProgress: Task[];
  completed: Task[];
  deleted: Task[];
}
