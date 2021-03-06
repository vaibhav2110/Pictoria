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
import { FileOpener } from '@ionic-native/file-opener';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HeaderScrollerDirective } from '../directives/header-scroller/header-scroller';
import { EmailComposer } from '@ionic-native/email-composer';
import { Base64 } from '@ionic-native/base64';
import { AdMobFree } from '@ionic-native/admob-free';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
      AndroidPermissions,
      EmailComposer,
      FileOpener,
      AdMobFree,
      ScreenOrientation,
      Base64,
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
