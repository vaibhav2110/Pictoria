import {Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { PartialHomePage } from "../pages/partial-home/partial-home";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NaturePage } from '../pages/nature/nature';
import { SpacePage } from '../pages/space/space';
import { MinimalPage } from '../pages/minimal/minimal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootParams: any;

  menuItems: any[] = [
    {
      name: 'Home',
      icon: 'home',
      page: 'PartialHomePage',
      params: { type: 'all' }
    },
      {
      name: 'Nature',
      icon: 'ios-leaf',
      page: 'NaturePage',
      params: { type: 'all' }
    },
      {
      name: 'Space',
      icon: 'planet',
      page: 'SpacePage',
      params: { type: 'all' }
    },
      {
      name: 'Minimal',
      icon: 'bonfire',
      page: 'MinimalPage',
      params: { type: 'all' }
    },
      {
      name: 'About',
      icon: 'help',
      page: 'AboutPage',
      params: { type: 'all' }
    }
  ];

  constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar,private screenOrientation: ScreenOrientation) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.rootPage = this.menuItems[0].page;
    this.rootParams = this.menuItems[0].params;
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.backgroundColorByHexString('#34373C')
    });
  }

  openPage(page) {
    this.nav.push(page.page, page.params);
  }

}
