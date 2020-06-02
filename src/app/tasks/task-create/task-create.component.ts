import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";


import { TaskService } from "../task.service";
import { CategoryType, Task } from '../task.model';
import { AuthService } from "../../account/auth.service";


export const MyDateRangeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const start = control.get('startdate');
  const end = control.get('deadline');

  return start.value>end.value ? { 'range': true } : null;
};

@Component({
  selector: "app-task-create",
  templateUrl: "./task-create.component.html",
  styleUrls: ["./task-create.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  task: Task | null;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private taskId: string;
  private authStatusSub: Subscription;

  exampleHeader = ExampleHeader;

  constructor(public tasksService: TaskService,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: Task, mode: string}) {
      if(data){
        console.log(data.task);
        this.task = data.task;
        this.mode = data.mode;
        this.taskId = data.task.id;
      }
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
        title: new FormControl(this.task ? this.task.title : null, {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
        }),
        startdate: new FormControl(this.task ? this.task.startDate : null, { validators: [Validators.required] }),
        deadline: new FormControl(this.task ? this.task.deadlineDate : null,
          { validators: [Validators.required] }
          ),
        group: new FormControl(this.task ? this.task.category : CategoryType.Other,{ validators: [Validators.required] })
      },{
        validators: MyDateRangeValidator
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
      startDate: this.form.value.startdate,
      category: this.form.value.group,
      status: true,
      creator: null
    };

    this.isLoading = true;
    if (this.mode === "create") {

      console.log("churake dil mera");
      this.tasksService.addTask(newTask)
      .subscribe(responseData => {
        this.closeDialog();
        this.router.navigate(["/"]).then(() => {
          window.location.reload();
        });
      });
    }else{
      newTask.id = this.taskId;
      newTask.title = this.form.value.title;
      newTask.startDate = this.form.value.startdate;
      newTask.deadlineDate = this.form.value.deadlineDate;
      console.log("mode" + this.mode + " "+this.form.value.group);
      this.tasksService.updateTask(this.taskId, newTask)
      .subscribe(() => {
        console.log("now navigating to home");
        this.closeDialog();
      });
    }

  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.tasksService.deletePost(postId).subscribe(() => {
      this.tasksService.getTasks();
    }, () => {
      this.isLoading = false;
    });
    this.closeDialog();
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
