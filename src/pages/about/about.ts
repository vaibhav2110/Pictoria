import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
    sendEmail() {

    let email = {
      to: 'vaibhpraky@gmail.com',
      subject: '[Pictoria]: Query',
      body: '',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
