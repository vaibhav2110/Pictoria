import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinimalPage } from './minimal';

@NgModule({
  declarations: [
    MinimalPage,
  ],
  imports: [
    IonicPageModule.forChild(MinimalPage),
  ],
})
export class MinimalPageModule {}
