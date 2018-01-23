import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpacePage } from './space';

@NgModule({
  declarations: [
    SpacePage,
  ],
  imports: [
    IonicPageModule.forChild(SpacePage),
  ],
})
export class SpacePageModule {}
