import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';



import { Task, CategoryType } from './task.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl+"/tasks/";

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http
      .get<{ message: string; tasks: any }>(
        BACKEND_URL
      )
      .pipe(map((taskData) => {
        return taskData.tasks.map(task => {
          return {
            id: task._id,
            title: task.title,
            deadlineDate: task.deadlineDate,
            startDate: task.startDate,
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
      startDate: Date;
      category: CategoryType;
      status: boolean;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addTask(newTask: Task ) {
    return this.http
      .post<{ message: string,taskId: string }>(BACKEND_URL, newTask)
  }

  updateTask(taskId: string,task: Task) {
    console.log(task.category);
    return this.http
    .put(BACKEND_URL + taskId, task)
  }

  deletePost(taskId: string) {
    return this.http.delete(BACKEND_URL + taskId)
  }

}
