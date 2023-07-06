export interface Task {
  category: string;
  title: string;
  description: string;
  priority: string;
  status?: string;
  due_date: Date;
  assigned_to: any[];
  sub_tasks: any[];
  user:number;
}
