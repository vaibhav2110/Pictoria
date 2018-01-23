import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NaturePage } from './nature';

@NgModule({
  declarations: [
    NaturePage,
  ],
  imports: [
    IonicPageModule.forChild(NaturePage),
  ],
})
export class NaturePageModule {}
