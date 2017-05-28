import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, Content, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Kodi } from '../../providers/kodi';

import { MoviePage } from '../movie-page/movie-page';
/**
 * Generated class for the MoviesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-movies-page',
  templateUrl: 'movies-page.html',
  providers: [ Kodi ],
})
export class MoviesPage {

  searchQuery: string = '';
  items: any;
  playing: any;
  time: any;
  medialength: any;

  public movies: Array<any> = [];
  public toggled: boolean;
  public kodiAdress: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public storage: Storage, public Kodi: Kodi) {
    this.playing = [];
    this.time = [];
    this.toggled = false;
    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;
        this.Kodi.getMovies(this.kodiAdress).subscribe(
          data => {
            this.movies = data.result.movies;
            //console.log(data);
          },
          err => {
            this.movies = null;
            //console.log(err);
          },
          () => console.log('Got all movies')
        );
      })
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loader.present();
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.storage.get('movie_data').then((val) => {
        if(val === false) {
          this.presentLoading();
          this.storage.set('movie_data', true);
          // Get new data from provider
          this.storage.get('ip').then((val) => {
            this.kodiAdress = val;
            this.Kodi.getMovies(this.kodiAdress).subscribe(
              data => {
                this.movies = data.result.movies;
                //console.log(data);
              },
              err => {
                this.movies = null;
                //console.log(err);
              },
              () => console.log('Got all movies')
            );
          })
          // end Get new data from provider
        } else {
          //console.log('no new data get is neccesary');
        }
      })
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MoviesPage');
  }

  getItems(searchEvent: any) {
    let term = searchEvent.target.value
    if(searchEvent.target.value == null) {
      this.Kodi.getMovies(this.kodiAdress).subscribe(
        data => {
          this.movies = data.result.movies;
        },
        err => {
          this.movies = null;
        }
      );
    } else {
      if (term.trim() === '' || term.trim().length < 3) {
        this.Kodi.getMovies(this.kodiAdress).subscribe(
          data => {
            this.movies = data.result.movies;
          },
          err => {
            this.movies = null;
          }
        );
      } else {
        this.movies = this.movies.filter((item) => {
          return (item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
        })
      }
    }
  }

  public showInfo(id: number) {
    this.navCtrl.push(MoviePage, {
      movie: id,
    });
  }

  public playItem(id: any, label: any) {
    //console.log('sending request');
    this.Kodi.playMovie(this.kodiAdress, id).subscribe(
      data => {
          this.presentToast('Playing: '+label+'');
          console.log(data);
      },
      err => {
          console.log(err);
      },
      () => console.log('Done')
    );
  }

}
