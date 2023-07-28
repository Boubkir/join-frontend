export interface Task {
  category: string;
  category_color: string;
  title: string;
  description: string;
  priority: string;
  status?: string;
  due_date: Date;
  assigned_to: any[];
  sub_tasks: { name: string; done: boolean }[];
  user?: number;
  id?: number;
}
