import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, HostListener } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { IgxNavigationDrawerComponent } from "igniteui-angular";



import { Task, StatusType, CategoryType } from "../task.model";
import { TaskService } from "../task.service";
import { TaskCreateComponent } from '../task-create/task-create.component';
import { AuthService } from "../../account/auth.service";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private tasksSub: Subscription;
  private authStatusSub: Subscription;


  public navItems = [
    { name: "ballot", text: "All Task", type: "time", color: "black", val:-1 },
    { name: "today", text: "Today", type: "time", color: "green", val:0 },
    { name: "calendar_today", text: "This Weak", type: "time", color: "yellow", val:7 },
    { name: "playlist_add_check", text: "Archived", type: "status", color: "brown", val:false },
    { name: "access_alarm", text: "Pending", type: "status", color: "red", val:true  },
    { name: "shopping_cart", text: "Shopping", type: "category", color: "grey", val:0 },
    { name: "work", text: "Work", type: "category", color: "grey", val:1 },
    { name: "class", text: "Learning", type: "category", color: "grey", val:2 },
    { name: "extension", text: "Others", type: "category", color: "grey", val:3 }
  ];
  public selected = "All Task";


  @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

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
        console.log(tasks);
        this.filteredTasks = this.tasks.filter(p => p.status==true);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }


  public drawerState = {
    miniTemplate: false,
    open: true,
    pin: true
  };

  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if(item.type==="time")
    {
      if(item.val===-1){
        this.filteredTasks = this.tasks.filter(p => p.status==true);
      }else {
        this.filteredTasks = this.tasks.filter(p => this.daysRemaining(p.startDate)<=item.val && p.status==true);
      }
    }
    else if(item.type==="status")
    {
      if(item.val==true){
        this.filteredTasks = this.tasks.filter(p => p.status==true && this.daysRemaining(p.deadlineDate)<0 );
      }
      else{
        this.filteredTasks = this.tasks.filter(p => p.status==false);
      }
    }
    else if(item.type==="category")
    {
      this.filteredTasks = this.tasks.filter(p => p.category==item.val && p.status==true);
    }
    console.log("hello this is filtered list "+this.filteredTasks);

  }

  onUpdateStatus(taskId: string, task: Task) {
    task.status=false;
    this.taskService.updateTask(taskId,task).subscribe(response =>{
      console.log(response);
    });
    this.filteredTasks = this.filteredTasks.filter(p => p.id!=taskId);
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
      [StatusType.Done]: {icon: 'done_all',tooltip: "done!"},
      [StatusType.Pending]: {icon: 'report',tooltip: "pending!"},
      [StatusType.InProgress]: {icon: 'cached',tooltip: "in progress!"},
      [StatusType.New]: {icon: 'rowing',tooltip: "new!"}
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
      [CategoryType.Learning]: 'class',
      [CategoryType.Other]: 'extension',
    }
    return taskCardClass[taskCategory];
  }
  textTaskCategory(taskCategory: number)
  {
    const taskCardClass = ['shopping', 'work', 'learning', 'other'  ]
    return taskCardClass[taskCategory];
  }

  daysRemaining(deadlineDate: Date){
    var date1:any = new Date(deadlineDate);
    var date2:any = new Date();
    var diff1:any = Math.floor((date1) / (1000 * 60 * 60 * 24));
    var diff2:any = Math.floor((date2) / (1000 * 60 * 60 * 24));
    return (diff1-diff2);
  }

}
