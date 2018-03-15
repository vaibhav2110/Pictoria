import {Component, ViewChild} from '@angular/core';
import { NgModule } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, IonicPage} from 'ionic-angular';
import { AdMobFree,AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@IonicPage({
  segment: 'partial-home/:type'
})
@Component({
  selector: 'page-partial-home',
  templateUrl: 'partial-home.html'
})
export class PartialHomePage {
@ViewChild(Content) content: Content;
 
  // Necessary for the change() method below
  page1: any = 'Page1Page';
  page2: any = 'Page2Page';
  page3: any = 'Page3Page';

  showIcons: boolean = true;
  showTitles: boolean = true;
  pageTitle: string = 'Partial Home';

  constructor(public navCtrl: NavController, private navParams: NavParams,private admobFree: AdMobFree) {
    const type = navParams.get('type');
    switch (type) {
      case 'icons-only':
        this.showTitles = false;
        this.pageTitle += ' - Icons only';
        break;

      case 'titles-only':
        this.showIcons = false;
        this.pageTitle += ' - Titles only';
        break;
    }
  }
    ngOnInit(){
       
        console.log('entered');
    }

}
