import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task, CategoryType, StatusType } from './task.model';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  getTasks() {
    return [...this.tasks];
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(id:string, title: string, deadlineDate: Date, taskSetDate: Date, category: CategoryType, status: StatusType ) {
    const task: Task = {id:id, title: title, deadlineDate: deadlineDate, taskSetDate:taskSetDate, category:category, status:status};
    this.tasks.push(task);
    this.tasksUpdated.next([...this.tasks]);
  }
}
