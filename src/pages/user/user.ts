import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
    username: any;
    data: any;
    photos: any;
    errormsg: any;
    pg: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,private unsplashProvider: UnsplashproviderProvider) {
          this.username = navParams.get('username');

  }
    ngOnInit(){
        
        this.unsplashProvider.getUser(this.username)
        .subscribe(photos => {console.log(photos);this.data = photos;},
                  errmess => this.errormsg = <any>errmess);
        this.unsplashProvider.getUserPhotos(this.username, this.pg)
        .subscribe(photos => {console.log(photos);this.photos = photos;},
                  errmess => this.errormsg = <any>errmess);
        this.pg++;
    }
    doInfinite(infiniteScroll){
        this.unsplashProvider.getUserPhotos(this.username, this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos){this.photos = this.photos.concat([items]);}
                              infiniteScroll.complete();},
                  errmess => {this.errormsg = <any>errmess;infiniteScroll.complete();});
        this.pg++;
        
    }
    wall(event, image){
        this.navCtrl.push(WallpaperPage,{
            image
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
