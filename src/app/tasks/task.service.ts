import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';



import { Task, CategoryType } from './task.model';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http
      .get<{ message: string; tasks: any }>(
        "http://localhost:3000/api/tasks"
      )
      .pipe(map((taskData) => {
        return taskData.tasks.map(task => {
          return {
            id: task._id,
            title: task.title,
            deadlineDate: task.deadlineDate,
            taskSetDate: task.taskSetDate,
            category: task.category,
            status: task.status,
            creator: task.creator
          };
        });
      }))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string){
    console.log("getTask called");
    return this.http.get<{
      _id: string;
      title: string;
      deadlineDate: Date;
      taskSetDate: Date;
      category: CategoryType;
      status: boolean;
      creator: string;
    }>("http://localhost:3000/api/tasks/" + id);
  }

  addTask(newTask: Task ) {
    return this.http
      .post<{ message: string,taskId: string }>("http://localhost:3000/api/tasks", newTask)
  }

  updateTask(taskId: string,task: Task) {
    console.log(taskId + " ; " + task);
    return this.http
    .put("http://localhost:3000/api/tasks/" + taskId, task)
  }

  deletePost(taskId: string) {
    return this.http.delete("http://localhost:3000/api/tasks/" + taskId)
  }

}
