export interface ITask {
  id: number;
  date: Date;
  status: boolean;
  title: string;
  description: string;
}
export interface INewTask {
  date: Date;
  title: string;
  description: string;
}
