import { NgForm } from "@angular/forms";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { TaskService } from "../task.service";
import { CategoryType, Task } from '../task.model';

@Component({
  selector: "app-task-create",
  templateUrl: "./task-create.component.html",
  styleUrls: ["./task-create.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent {

  task: Task;
  exampleHeader = ExampleHeader;

  constructor(public tasksService: TaskService, public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = data.task;
  }


  onAddTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    var curdate = new Date();
    curdate.toISOString().slice(0,10);

    if(!form.value.group)form.value.group=CategoryType.Other;

    const newTask: Task = {
      id: null,
      title: form.value.title,
      deadlineDate: form.value.deadline,
      taskSetDate: curdate,
      category: form.value.group,
      status: true
    };

    this.tasksService.addTask(newTask);
    form.resetForm();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.task });
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
