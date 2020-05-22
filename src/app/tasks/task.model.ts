export interface Task {
  id: string,
  title: string,
  deadlineDate: Date,
  taskSetDate: Date,
  category: CategoryType,
  status: boolean
}

export enum CategoryType {
  Shopping,
  Groceries,
  Medical,
  Learning,
  Work,
  Other
}
export enum StatusType {
  Pending,
  InProgress,
  New,
  Done
}

