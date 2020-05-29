export interface Task {
  id: string,
  title: string,
  startDate: Date,
  deadlineDate: Date,
  category: CategoryType,
  status: boolean,
  creator: string
}

export enum CategoryType {
  Shopping,
  Work,
  Medical,
  Learning,
  Other
}
export enum StatusType {
  Pending,
  InProgress,
  New,
  Done
}

