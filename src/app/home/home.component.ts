import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService,public dialog: MatDialog) {
        this.user = this.accountService.userValue;
    }
    openDialog() {
      const dialogRef = this.dialog.open(TaskCreateComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}
