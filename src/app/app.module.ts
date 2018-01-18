import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SuperTabsModule } from '../ionic2-super-tabs/src';
// import { SuperTabsModule } from 'ionic2-super-tabs';
import { WallpaperPage } from '../pages/wallpaper/wallpaper';
import { CollectionPage } from '../pages/collection/collection';
import { UserPage } from '../pages/user/user';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { UnsplashproviderProvider } from '../providers/unsplashprovider/unsplashprovider';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import {HttpModule} from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HeaderScrollerDirective } from '../directives/header-scroller/header-scroller';


@NgModule({
  declarations: [
    MyApp,
      WallpaperPage,
      CollectionPage,
      UserPage,
      ProgressBarComponent,
      HeaderScrollerDirective

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      CollectionPage,
      WallpaperPage,
      UserPage
  ],
  providers: [
    SplashScreen,
      PhotoViewer,
      SocialSharing,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UnsplashproviderProvider,
    ProcessHttpmsgProvider,
      File,
      FileTransfer,
      FileTransferObject
  ]
})
export class AppModule { }
