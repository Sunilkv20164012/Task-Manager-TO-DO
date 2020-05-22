import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { Task } from './task.model';

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
            status: task.status
          };
        });
      }))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }
  // getTaskById(taskid: string) {

  //   this.http
  //     .get<{ message: string; task: any }>(
  //       "http://localhost:3000/api/tasks"+taskid )
  //     .subscribe(taskFound => {
  //     });
  // }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(newTask: Task ) {

    this.http
      .post<{ message: string,taskId: string }>("http://localhost:3000/api/tasks", newTask)
      .subscribe(responseData => {
        const id = responseData.taskId;
        newTask.id = id;
        this.tasks.push(newTask);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  deletePost(taskId: string) {
    this.http.delete("http://localhost:3000/api/tasks/" + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(taskId: string,task: Task) {
    this.http
    .put("http://localhost:3000/api/tasks/" + taskId, task)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }
}
