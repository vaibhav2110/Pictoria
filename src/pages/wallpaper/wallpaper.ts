import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams ,AlertController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';

import { UnsplashproviderProvider } from '../../providers/unsplashprovider/unsplashprovider';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserPage } from '../user/user';
import { AndroidPermissions } from '@ionic-native/android-permissions';



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
    downloading: boolean = false;
    spinning: boolean = false;

    storageDirectory: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public transfer: FileTransfer, private file: File,public alertCtrl: AlertController,public _zone: NgZone,public photoViewer: PhotoViewer,
               public social: SocialSharing,
      private Unsplashprovider: UnsplashproviderProvider, private statusBar: StatusBar, private androidPermission: AndroidPermissions) {
      
      this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalRootDirectory+'/Pictoria/';
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }
    ngOnInit(){
      this.androidPermission.checkPermission(this.androidPermission.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
          result => {console.log('has peermission?', result.hasPermission); if(!result.hasPermission){
              this.androidPermission.requestPermission(this.androidPermission.PERMISSION.WRITE_EXTERNAL_STORAGE);
          }});
      this.data = this.navParams.get('image');
      this.statusBar.hide(); 
      this.Unsplashprovider.getDownload(this.data.id).subscribe(url => {this.url = url.url; console.log(this.url);}, error => this.errmess = error);
      console.log(this.data.id);

      console.log(this.url);
    }

  ionViewDidLoad() {
      this.statusBar.hide();
    console.log('ionViewDidLoad WallpaperPage');
  }
    ionViewDidLeave(){
              this.statusBar.show();

    }
  download(){
    this.platform.ready().then(() => {
            this.downloading = true;

      const fileTransfer: FileTransferObject = this.transfer.create();

      const imageLocation = this.url;

      fileTransfer.download(imageLocation, this.storageDirectory+'/Pictoria'+this.data.id+'.jpeg').then((entry) => {
          console.log(entry.toURL());
        window['plugins'].wallpaper.setImage(entry.toURL());

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
      this.downloading = true;
      console.log(progressEvent);
      if (progressEvent.lengthComputable) {
          this._zone.run(()=>{
              this.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
              if(this.progress == 100){
                  this.downloading = false;
              }
          console.log(this.progress);
          });
        
      }
            else{
                this.progress = 'Downloading';
                console.log(this.progress);
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
        this.spinning = true;
        console.log(this.spinning);
        this.platform.ready()
        .then(()=>{
            this.social.share("Wallpaper","Downloaded from Pictoria",this.url,"https://github.com/vaibhav2110")
            .then((data)=>
                 {
                this.spinning = false;
                console.log('Shared');
            })
            .catch((err)=>{
                console.log('error');
            });
        });
  
}
    setWallpaper(){
        console.log('pressed');
        window['plugins'].wallpaper.setImage(this.url, (error)=>{
            console.log(error);
        });
    }
    openUser(event, username){
        this.navCtrl.push(UserPage, {
            username
        });
        
    }
}
                               
