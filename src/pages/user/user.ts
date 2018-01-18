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
    errormsg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private unsplashProvider: UnsplashproviderProvider) {
          this.username = navParams.get('username');

  }
    ngOnInit(){
        
        this.unsplashProvider.getUser(this.username)
        .subscribe(photos => {console.log(photos);this.data = photos;},
                  errmess => this.errormsg = <any>errmess);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
