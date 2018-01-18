import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { CollectionPage } from '../collection/collection';
@IonicPage()
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3Page {
    
    data: any;
    errmess: any;
    pg: number = 1;
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private unsplashProvider: UnsplashproviderProvider) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
}
    
    ngOnInit(){
        
        this.unsplashProvider.getCollections(this.pg)
        .subscribe(photos => {this.data = photos;},
                  errmess => this.errmess = <any>errmess);
           this.pg++;
    }
    doInfinite(infiniteScroll){
        this.unsplashProvider.getCollections(this.pg)
        .subscribe(photos => {console.log(photos);for(let items of photos){this.data = this.data.concat([items]);}
                              console.log(this.data);infiniteScroll.complete();},
                  errmess => {this.errmess = <any>errmess;infiniteScroll.complete();});
        this.pg++;
    }

  ionViewWillLoad() {
    console.log('[3] will load fired');
  }

  ionViewDidLoad() {
    console.log('[3] did load fired');
  }

  ionViewWillEnter() {
    console.log('[3] will enter fired');
  }

  ionViewDidEnter() {
    console.log('[3] did enter fired');
  }
    selected(event, image){
        var root = this.rootNavCtrl;
        console.log('clicked');
        this.navCtrl.push(CollectionPage,{
            image,
            root
        });
    }

}
