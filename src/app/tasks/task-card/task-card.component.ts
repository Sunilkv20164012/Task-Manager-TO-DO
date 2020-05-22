import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


import { Task, StatusType, CategoryType } from "../task.model";
import { TaskService } from "../task.service";
import { TaskCreateComponent } from '../task-create/task-create.component';



@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(public taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  iconTaskStatus(status: boolean, deadline: Date)
  {
    var daysrem = this.daysRemaining(deadline);

    const taskCardClass = {
      [StatusType.Done]: 'done_all',
      [StatusType.Pending]: 'report',
      [StatusType.InProgress]: 'cached',
      [StatusType.New]: 'rowing'
    }
    if(!status){
      return taskCardClass[StatusType.Done];
    }
    else if(daysrem<0){
      return taskCardClass[StatusType.Pending];
    }
    else{
      return taskCardClass[StatusType.New];
    }
  }

  iconTaskCategory(taskCategory: CategoryType)
  {
    const taskCardClass = {
      [CategoryType.Shopping]: 'add_shopping_cart',
      [CategoryType.Groceries]: 'fastfood',
      [CategoryType.Learning]: 'account_balance',
      [CategoryType.Work]: 'work',
      [CategoryType.Medical]: 'healing'
    }
    return taskCardClass[taskCategory];
  }

  onUpdateStatus(taskId: string) {
    const updatedTask = this.tasks.filter(task => task.id === taskId);
    updatedTask[0].status=false;
    this.taskService.updateTask(taskId,updatedTask[0]);
  }

  onEditTask(taskId: string) {
    const updatedTask = this.tasks.filter(task => task.id === taskId);
    const dialogRef = this.dialog.open(TaskCreateComponent,{
      data: {
        task: updatedTask
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  daysRemaining(deadlineDate: Date){
    var date1:any = new Date(deadlineDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
