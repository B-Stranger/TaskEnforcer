export interface ITask {
  id: number;
  date: string;
  status: boolean;
  title: string;
  description: string;
}
export interface INewTask {
  date: string;
  title: string;
  description: string;
}
