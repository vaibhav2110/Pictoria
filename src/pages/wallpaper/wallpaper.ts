import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams ,AlertController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';


declare var cordova: any;
/**
 * Generated class for the WallpaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallpaper',
  templateUrl: 'wallpaper.html',
})
export class WallpaperPage {
   
    data: any;
    url: any;
    errmess: string;
    progress: any = null;
    storageDirectory: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public transfer: FileTransfer, private file: File,public alertCtrl: AlertController,public _zone: NgZone,public photoViewer: PhotoViewer,
               public social: SocialSharing,
      private Unsplashprovider: UnsplashproviderProvider) {
      
      this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalRootDirectory+'/img/';
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }
    ngOnInit(){
        
      this.data = this.navParams.get('image');
      this.Unsplashprovider.getDownload(this.data.id).subscribe(url => {this.url = url.url; console.log(this.url);}, error => this.errmess = error);
      console.log(this.data.id);

      console.log(this.url);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallpaperPage');
  }
  download(){
    this.platform.ready().then(() => {

      const fileTransfer: FileTransferObject = this.transfer.create();

      const imageLocation = this.url;

      fileTransfer.download(imageLocation, this.storageDirectory+'/myimg'+this.data.id+'.jpeg').then((entry) => {
          console.log(entry.toURL());
                  window['plugins'].wallpaper.setImage('myimgz4eCfBAw3jk.jpeg');

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `image was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });

        alertSuccess.present();

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `image was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });
        fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
      if (progressEvent.lengthComputable) {
          this._zone.run(()=>{
              this.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
          console.log(this.progress);
          });
        
      }
            /*const alertDownloading = this.alertCtrl.create({
          title: `Downloading`,
         subTitle: 'ho rha h',
          buttons: ['Ok']
        });

        alertDownloading.present();*/
    });
    });

  }
    share(){
        this.platform.ready()
        .then(()=>{
            this.social.share("Wallpaper",null,this.url,null)
            .then((data)=>
                 {
                console.log('Shared');
            })
            .catch((err)=>{
                console.log('error');
            });
        });
  
}
    setWallpaper(){
        window['plugins'].wallpaper.setImageHttp(cordova.file.externalRootDirectory+'image.jpg');
    }
}
                               
