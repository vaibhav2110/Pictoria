import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallpaperPage } from './wallpaper';

@NgModule({
  declarations: [
    WallpaperPage,
  ],
  imports: [
    IonicPageModule.forChild(WallpaperPage),
  ],
})
export class WallpaperPageModule {}
