import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import {MatDialog} from '@angular/material/dialog';


import { TaskCreateComponent } from '../tasks/task-create/task-create.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home-navdrawer',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent{

    constructor(public dialog: MatDialog,
      @Inject(DOCUMENT) private document: Document
      ) {}

    openTaskCreateDialogue() {
      const dialogRef = this.dialog.open(TaskCreateComponent);
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      });
    };
}
