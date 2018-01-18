import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { UserPage } from '../user/user';

/**
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {
    
    data: any;
    collections: any;
    pg: number = 1;
    errmess: any;
    rootNavCtrl: NavController;


  constructor(public navCtrl: NavController, public navParams: NavParams,private Unsplashprovider: UnsplashproviderProvider) {
      this.rootNavCtrl = navParams.get('root');
  }
    
    ngOnInit(){
        this.data = this.navParams.get('image');
        console.log(this.data.id);
        this.Unsplashprovider.getCollection(this.data.id, this.pg)
        .subscribe(photos => {this.collections = photos;},
                  errmess => this.errmess = <any>errmess);
        this.pg++;
        
    }
    doInfinite(infiniteScroll){
        this.Unsplashprovider.getCollection(this.data.id,this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos){this.data = this.data.concat([items]);}
                              console.log(this.data);infiniteScroll.complete();},
                  errmess => {this.errmess = <any>errmess;infiniteScroll.complete();});
        this.pg++;
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionPage');
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