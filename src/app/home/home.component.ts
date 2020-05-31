import { Component, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { DOCUMENT } from "@angular/common";
import {MatDialog} from '@angular/material/dialog';


import { AuthService} from '../account/auth.service';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home-navdrawer',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent{

    public navItems = [
      { name: "ballot", text: "All Task", type: "time", color: "black" },
      { name: "today", text: "Today", type: "time", color: "green" },
      { name: "calendar_today", text: "This Weak", type: "time", color: "yellow" },
      { name: "playlist_add_check", text: "Archived", type: "status", color: "brown" },
      { name: "access_alarm", text: "Pending", type: "status", color: "red" },
      { name: "shopping_cart", text: "Shopping", type: "category", color: "grey" },

    ];
    public selected = "All Task";

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    constructor(private authService: AuthService,
      public dialog: MatDialog,
      @Inject(DOCUMENT) private document: Document
      ) {}

    openTaskCreateDialogue() {
      const dialogRef = this.dialog.open(TaskCreateComponent);
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      });
    };




    public drawerState = {
      miniTemplate: false,
      open: true,
      pin: true
    };

    /** Select item and close drawer if not pinned */
    public navigate(item) {
      this.selected = item.text;
    }
}
