import { NgForm } from "@angular/forms";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";


import { TaskService } from "../task.service";
import { CategoryType, Task } from '../task.model';
import { AuthService } from "../../account/auth.service";


@Component({
  selector: "app-task-create",
  templateUrl: "./task-create.component.html",
  styleUrls: ["./task-create.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  task: Task;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private taskId: string;
  private authStatusSub: Subscription;

  exampleHeader = ExampleHeader;

  constructor(public tasksService: TaskService,
    public route: ActivatedRoute,
    private authService: AuthService,
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: Task, mode: string}) {
    this.task = data.task;
    this.mode = data.mode;
  }


  ngOnInit() {

    // authentcation status validation
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
      // form validation
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.mode = "edit";
        this.taskId = paramMap.get("taskId");
        this.isLoading = true;
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.isLoading = false;
          this.task = {
            id: taskData._id,
            title: taskData.title,
            deadlineDate: taskData.deadlineDate,
            taskSetDate: taskData.taskSetDate,
            category: taskData.category,
            status: taskData.status,
            creator: taskData.creator
          };
          this.form.setValue({
            title: this.task.title,
            deadline: this.task.deadlineDate,
            group: this.task.category
          });
        });
      } else {
        this.mode = "create";
        this.taskId = null;
      }
    });
  }


  onAddTask() {
    if (this.form.invalid) {
      return;
    }
    var curdate = new Date();

    const newTask: Task = {
      id: null,
      title: this.form.value.title,
      deadlineDate: this.form.value.deadline,
      taskSetDate: curdate,
      category: this.form.value.group,
      status: true,
      creator: null
    };

    this.isLoading = true;
    if (this.mode === "create") {
      this.tasksService.addTask(newTask);
    }else{
      newTask.id = this.taskId;
      newTask.title = this.form.value.title;
      newTask.deadlineDate = this.form.value.deadlineDate;
      newTask.category = this.form.value.category;
      this.tasksService.updateTask( this.taskId, newTask );
    }

    this.form.reset();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.tasksService.deletePost(postId).subscribe(() => {
      this.tasksService.getTasks();
    }, () => {
      this.isLoading = false;
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.task });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}






/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styleUrls: ["./task-create.component.css"],
  templateUrl:"./datepicker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
      private _calendar: MatCalendar<D>, private _dateAdapter: DateAdapter<D>,
      @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
    _calendar.stateChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
        .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
        .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
        this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
        this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
