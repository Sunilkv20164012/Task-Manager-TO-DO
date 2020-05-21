import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


import { Task, StatusType, CategoryType } from "../task.model";
import { TaskService } from "../task.service";


@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.tasksSub = this.taskService.getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  iconTaskStatus(taskSTatus: StatusType)
  {
    const taskCardClass = {
      [StatusType.Done]: 'done_all',
      [StatusType.Pending]: 'report',
      [StatusType.InProgress]: 'cached',
      [StatusType.New]: 'rowing'
    }
    return taskCardClass[taskSTatus];
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
  daysRemaining(deadlineDate: Date){
    var date1:any = new Date(deadlineDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
