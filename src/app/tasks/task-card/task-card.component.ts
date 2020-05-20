import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Task } from "../task.model";
import { TaskService } from "../task.service";
import { StatusType } from '../task.model';


@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {

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
}
