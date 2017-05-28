import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Kodi } from '../../providers/kodi';
/**
 * Generated class for the MoviePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-movie-page',
  templateUrl: 'movie-page.html',
  providers: [ Kodi ],
})
export class MoviePage {

  movie: any;
  bgImage:any;
  kodiAdress: any;
  zoom: any;
  playing: any;
  time: any;
  medialength: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage, public Kodi: Kodi) {
    this.playing = null;
    this.time = null;
  }

  ionViewWillEnter() {

    this.content.ionScroll.subscribe((event)=>{
      this.zoom = event.scrollTop / 100;
    });

    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;
        this.Kodi.getMovie(this.kodiAdress, this.navParams.get('movie')).subscribe(
          data => {
              this.movie = data.result.moviedetails;
          },
          err => {
              console.log(err);
          },
          () => console.log('Got the movie')
        );
      })
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public playItem(id: any) {
    this.Kodi.playMovie(this.kodiAdress, id).subscribe(
      data => {
        this.presentToast('Playing: '+this.movie.label+'');
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Done')
    );
  }

}
