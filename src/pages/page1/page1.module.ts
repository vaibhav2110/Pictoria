import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page1Page } from "./page1";

@NgModule({
  declarations: [
    Page1Page
  ],
    entryComponents: [
    ],
  imports: [
    IonicPageModule.forChild(Page1Page)
  ]
})
export class Module {}
