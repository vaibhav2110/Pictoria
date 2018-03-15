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
import { Base64 } from '@ionic-native/base64';
import { FileOpener } from '@ionic-native/file-opener';


declare var cordova: any;
declare var wallpaper: any;


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
    url2: any;
    url: any;
    errmess: string;
    progress: any = null;
    downloading: boolean = false;
    spinning: boolean = false;
    cancelled: boolean = false;


    storageDirectory: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public transfer: FileTransfer, private file: File,public alertCtrl: AlertController,public _zone: NgZone,public photoViewer: PhotoViewer,private base64: Base64,
               public social: SocialSharing,
               private fileOpener: FileOpener,
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
        this.storageDirectory = cordova.file.externalRootDirectory+'/Pictures/';
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
      this.Unsplashprovider.getDownload(this.data.id).subscribe(url2 => {this.url2 = url2.links.download_location; console.log(this.url2);
                                                                        this.Unsplashprovider.getDownloads(this.url2).subscribe(url => {this.url = url.url; console.log(this.url);}, error => this.errmess = error);}, error => this.errmess = error);
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
    cancel(){
        this.cancelled=true;
    }
  download(){
    this.platform.ready().then(() => {
      this.downloading = true;

      const fileTransfer: FileTransferObject = this.transfer.create();

      const imageLocation = this.url;

      fileTransfer.download(imageLocation, this.storageDirectory+'Pictoria/'+this.data.id+'.jpg').then((entry) => {
          console.log(entry.toURL());
        
          let filepath: string = entry.toURL();
          
          /*this.fileOpener.open(entry.toURL(), 'image/jpeg')
  .then(() => console.log('File is opened  thtehet'))
  .catch(e => console.log('Error openening file', e));*/
          //window['plugins'].wallpaper.setImageHttp(entry.toURL());
          window['galleryRefresh'].refresh(
              entry.toURL(), // file local path
              function(success){ console.log(success); }, // success callback
              function(error){ console.log(error); } // error callback
            );
          
        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `image was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });

        alertSuccess.present();

      }, (error) => {
          this.downloading = false;
        const alertFailure = this.alertCtrl.create({
          title: `Download Failed or Cancelled!`,
          subTitle: `Ooops..! There was an error. Try clicking the download button again`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });
        fileTransfer.onProgress((progressEvent) => {
      this.downloading = true;
      console.log(this.downloading);
      console.log(progressEvent);
      if (progressEvent.lengthComputable) {
          this._zone.run(()=>{
              if(this.cancelled){
                  this.downloading = false;
                  this.cancelled=false;
                  fileTransfer.abort();
                  this.downloading = false;
                  this.cancelled=false;

              }
              else{
              this.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
              if(this.progress == 100){
                  this.downloading = false;
              }
          console.log(this.progress);
              }
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
    
    set(){
        this.spinning = true;
         this.platform.ready().then(() => {
        window['plugins'].wallpaper.setImageHttp(this.url, (error)=> {
          if (error) {
            console.error(error);
          const alertSuccess = this.alertCtrl.create({
          title: `Error`,
          subTitle: `There was an error setting wallpaper. Try setting manually`,
          buttons: ['Ok']
        });

        alertSuccess.present();
        this.spinning = false;
          }
          else {
            console.log('Success setting wallpaper.');
            const alertFailure = this.alertCtrl.create({
          title: ``,
          subTitle: `Wallpaper set successfully`,
          buttons: ['Ok']
        });

        alertFailure.present();
        this.spinning = false;
        }
          }
        );
    });
    }
                                    

    share(){
        this.spinning = true;
        console.log(this.spinning);
         this.platform.ready().then(() => {

      const fileTransfer: FileTransferObject = this.transfer.create();

      const imageLocation = this.url;

      fileTransfer.download(imageLocation, this.storageDirectory+'/Pictures/Pictoria'+this.data.id+'.jpg').then((entry) => {
          console.log(entry.toURL());
        
          let filepath: string = entry.toURL();
          this.social.share("Downloadeded from Pictoria","",filepath,"https://play.google.com/store/apps/details?id=com.vp.pictoria&hl=en")
            .then((data)=>
                 {
                this.spinning = false;
                console.log('Shared');
            })
            .catch((err)=>{
                this.spinning = false;
                console.log('error');
            });
          //window['plugins'].wallpaper.setImageHttp(entry.toURL());
          

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
                               
