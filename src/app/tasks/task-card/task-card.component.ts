import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";


import { Task, StatusType, CategoryType } from "../task.model";
import { TaskService } from "../task.service";
import { TaskCreateComponent } from '../task-create/task-create.component';
import { AuthService } from "../../account/auth.service";



@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private tasksSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public taskService: TaskService,
    private router: Router,
    private authService: AuthService,
     public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.getTasks();
    this.userId = this.authService.getUserId();
    this.tasksSub = this.taskService.getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.isLoading = false;
        this.tasks = tasks;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onUpdateStatus(taskId: string, task: Task) {
    task.status=false;
    this.taskService.updateTask(taskId,task);
  }

  onEditTask(task: Task) {
    const dialogRef = this.dialog.open(TaskCreateComponent,{
      data: {
        task: task,
        mode: "edit"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  iconTaskStatus(status: boolean, startDate: Date, deadline: Date)
  {
    var daystoStart = this.daysRemaining(startDate);
    var daystoDead = this.daysRemaining(deadline);

    const taskCardClass = {
      [StatusType.Done]: 'done_all',
      [StatusType.Pending]: 'report',
      [StatusType.InProgress]: 'cached',
      [StatusType.New]: 'rowing'
    }
    if(!status){
      return taskCardClass[StatusType.Done];
    }
    else if(daystoStart>0){
      return taskCardClass[StatusType.New];
    }
    else if(daystoDead>0){
      return taskCardClass[StatusType.InProgress];
    }
    else{
      return taskCardClass[StatusType.Pending];
    }
  }

  iconTaskCategory(taskCategory: CategoryType)
  {
    const taskCardClass = {
      [CategoryType.Shopping]: 'add_shopping_cart',
      [CategoryType.Work]: 'work',
      [CategoryType.Medical]: 'healing',
      [CategoryType.Learning]: 'account_balance',
      [CategoryType.Other]: 'extension',
    }
    return taskCardClass[taskCategory];
  }

  daysRemaining(deadlineDate: Date){
    var date1:any = new Date(deadlineDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
