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
    { name: "ballot", text: "All Task", type: "time", color: "black", val:0 },
    { name: "today", text: "Today", type: "time", color: "green", val:1 },
    { name: "calendar_today", text: "This Weak", type: "time", color: "yellow", val:7 },
    { name: "playlist_add_check", text: "Archived", type: "status", color: "brown", val:false },
    { name: "access_alarm", text: "Pending", type: "status", color: "red", val:true  },
    { name: "shopping_cart", text: "Shopping", type: "category", color: "grey", val:0 },

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
        this.filteredTasks = tasks;
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
      if(item.val==0){
        this.filteredTasks = this.tasks;
      }else {
        this.filteredTasks = this.tasks.filter(p => this.daysRemaining(p.startDate)<=item.val);
      }
    }
    else if(item.type==="status")
    {
      this.filteredTasks = this.tasks.filter(p => p.status===item.val);
    }
    else if(item.type==="category")
    {
      this.filteredTasks = this.tasks.filter(p => p.category===item.val);
    }
    console.log("hello this is filtered list "+this.filteredTasks);
    for(let i=0;i<this.filteredTasks.length;i++){
      console.log(this.filteredTasks[i].title);
    }
  }

  onUpdateStatus(taskId: string, task: Task) {
    task.status=false;
    this.taskService.updateTask(taskId,task).subscribe(response =>{
      console.log(response);
    });
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
  textTaskCategory(taskCategory: number)
  {
    const taskCardClass = ['shopping', 'work', 'medical', 'learning', 'other'  ]
    return taskCardClass[taskCategory];
  }

  daysRemaining(deadlineDate: Date){
    var date1:any = new Date(deadlineDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }



}
