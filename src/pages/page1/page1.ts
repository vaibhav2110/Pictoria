import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, LoadingController} from 'ionic-angular';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserPage } from '../user/user';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1Page {

  rootNavCtrl: NavController;
  data: any;
  data2: any;
  errormsg: any;
  pg: number = 1;
    
  

  constructor(public navCtrl: NavController, public socialSharing: SocialSharing,public navParams: NavParams, private loadingCtrl: LoadingController,private unsplashProvider: UnsplashproviderProvider, private admobFree: AdMobFree, private statusBar: StatusBar) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
      
  }
    
    ngOnInit(){
                this.statusBar.show();
         const bannerConfig: AdMobFreeBannerConfig = {
         // add your config here
         // for the sake of this example we will just use the test config
         isTesting: false,
         id: 'ca-app-pub-2929147522219560/6947435351',
         autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
        this.unsplashProvider.getPhotos(this.pg)
        .subscribe(photos => {console.log(photos);this.data = photos;},
                  errmess => {console.log(errmess);this.errormsg = <any>errmess});
        this.pg++;
    }
    doInfinite(infiniteScroll){
        this.unsplashProvider.getPhotos(this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos){this.data = this.data.concat([items]);}
                              console.log(this.data);infiniteScroll.complete();},
                  errmess => {this.errormsg = <any>errmess;infiniteScroll.complete();});
        this.pg++;
        
    }

  ionViewWillLoad() {
    console.log('[1] will load fired');
  }

  ionViewDidLoad() {
                            this.statusBar.show();

    console.log('[1] did looad fired');
  }

  ionViewWillEnter() {
    console.log('[1] will enter fired');
  }

  ionViewDidEnter() {
                      this.statusBar.show();

    console.log('[1] did enter fired');
  }
    
    selected(event, image){
         this.rootNavCtrl.push(WallpaperPage,{
            image
        });
    }
    getUsers(event, username){
        this.rootNavCtrl.push(UserPage, {
            username
        });
    }
}
