import { Component, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { DOCUMENT } from "@angular/common";

import {MatDialog} from '@angular/material/dialog';


import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';
import { TaskListComponent } from '../tasks/task-card/task-card.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home-navdrawer',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit{
    user: User;
    public title = "Samples";
    private isIE = !((window as any).ActiveXObject) && "ActiveXObject" in window;
    private theme = "default-theme";
    private styleElem: HTMLStyleElement;
    private typefacesLoaded = ["Titillium Web", "Roboto"];
    private typefaceUrl = "https://fonts.googleapis.com/css?family=";

    constructor(private accountService: AccountService, public dialog: MatDialog, @Inject(DOCUMENT) private document: Document) {
        this.user = this.accountService.userValue;
    }

    openDialog() {
      const dialogRef = this.dialog.open(TaskCreateComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }


    public ngOnInit() {
        this.createThemeStyle();
    }
    @HostListener("window:message", ["$event"])
    private onMessage(e: MessageEvent) {
        if (e.origin === e.data.origin && typeof e.data.themeStyle === "string") {
            this.styleElem.textContent = e.data.themeStyle;
            const typeface = window.getComputedStyle(this.document.body).fontFamily.replace(/\"/g, "");
            if (!(typeface.match(/,/g) || []).length &&
                !this.typefacesLoaded.includes(typeface)) {
                this.typefacesLoaded.push(typeface);
                this.createTypefaceLink(typeface);
            }
        } else if (e.origin === e.data.origin && typeof e.data.theme === "string") {
            this.document.body.classList.remove(this.theme);
            this.document.body.classList.add(e.data.theme);
            this.theme = e.data.theme;
        }
    }

    private createTypefaceLink(typeface: string) {
        const typefaceElem = this.document.createElement("link");
        typefaceElem.rel = "stylesheet";
        typefaceElem.id = "ignteui-theme-typeface";
        typefaceElem.href = this.typefaceUrl + typeface.split(" ").join("+");
        document.head.insertBefore(typefaceElem, this.document.head.lastElementChild);
    }

    private createThemeStyle() {
        if (this.isIE) {
            this.document.body.classList.add(this.theme);
        } else {
            this.styleElem = document.createElement("style");
            this.styleElem.id = "igniteui-theme";
            document.head.insertBefore(this.styleElem, this.document.head.lastElementChild);
            this.document.body.classList.add("custom-body");
        }
    }





    public navItems = [
      { name: "account_circle", text: "Avatar" },
      { name: "error", text: "Badge" },
      { name: "group_work", text: "Button Group" },
      { name: "home", text: "Card" },
      { name: "view_carousel", text: "Carousel" },

    ];
    public selected = "Avatar";

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public drawerState = {
      miniTemplate: false,
      open: true,
      pin: true
    };

    /** Select item and close drawer if not pinned */
    public navigate(item) {
      this.selected = item.text;
      if (!this.drawer.pin) {
        this.drawer.close();
      }
    }
}
