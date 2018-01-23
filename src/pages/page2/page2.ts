import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { UserPage } from '../user/user';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2Page {
    
    data: any;
    errmess: any;
    pg: number = 1;

  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private unsplashProvider: UnsplashproviderProvider, private statusBar: StatusBar) {
  this.rootNavCtrl = navParams.get('rootNavCtrl');}
    
       ngOnInit(){
        this.statusBar.show();
        this.unsplashProvider.getFeatured(this.pg)
        .subscribe(photos => {this.data = photos;},
                  errmess => this.errmess = <any>errmess);
           this.pg++;
    }
    doInfinite(infiniteScroll){
        this.unsplashProvider.getFeatured(this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos){this.data = this.data.concat([items]);}
                              console.log(this.data);infiniteScroll.complete();},
                  errmess => {this.errmess = <any>errmess;infiniteScroll.complete();});
        this.pg++;
    }
selected(event, image){
        console.log('clicked');
        this.rootNavCtrl.push(WallpaperPage,{
            image
        });
    }
    getUsers(event, username){
        this.rootNavCtrl.push(UserPage, {
            username
        });
    }

  ionViewWillLoad() {
    console.log('[2] will load fired');
  }

  ionViewDidLoad() {
    console.log('[2] did load fired');
  }

  ionViewWillEnter() {
    console.log('[2] will enter fired');
  }

  ionViewDidEnter() {
    console.log('[2] did enter fired');
  }

}
