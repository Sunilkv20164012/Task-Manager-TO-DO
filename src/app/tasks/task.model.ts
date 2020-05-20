export interface Task {
  id: string,
  title: string,
  deadlineDate: Date,
  taskSetDate: Date,
  category: CategoryType,
  status: StatusType
}

export enum CategoryType {
  Shopping,
  Groceries,
  Medical,
  Learning,
  Work
}
export enum StatusType {
  Pending,
  InProgress,
  New,
  Done
}
