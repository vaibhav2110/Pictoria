import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { UserPage } from '../user/user';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the SpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-space',
  templateUrl: 'space.html',
})
export class SpacePage {
rootNavCtrl: NavController;
  data: any;
  data2: any;
  errormsg: any;
  pg: number = 1;

  constructor(public navCtrl: NavController,private unsplashProvider: UnsplashproviderProvider, public navParams: NavParams,private statusBar: StatusBar) {
  }
    ngOnInit(){
        this.statusBar.show();
        this.unsplashProvider.getSpacePhotos(this.pg)
        .subscribe(photos => {console.log(photos);this.data = photos.results;},
                  errmess => {console.log(errmess);this.errormsg = <any>errmess});
        this.pg++;
    }
    doInfinite(infiniteScroll){ 
        this.unsplashProvider.getSpacePhotos(this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos.results){this.data = this.data.concat([items]);}
                              console.log(this.data);infiniteScroll.complete();},
                  errmess => {this.errormsg = <any>errmess;infiniteScroll.complete();});
        this.pg++;
        
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NaturePage');
  }
    selected(event, image){
         this.navCtrl.push(WallpaperPage,{
            image
        });
    }
    getUsers(event, username){
        this.navCtrl.push(UserPage, {
            username
        });
    }

}
