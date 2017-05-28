import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { SongsPage } from '../songs-page/songs-page';

import { Kodi } from '../../providers/kodi';
import { Spotify } from '../../providers/spotify';
/**
 * Generated class for the ArtistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-artist-page',
  templateUrl: 'artist-page.html',
})
export class ArtistPage {

  artist: any;
  artist_image: any;
  albums: any;
  album: any;
  bgImage:any;
  kodiAdress: any;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage, public Kodi: Kodi, public spotify: Spotify) {
  }

  ionViewWillEnter() {
    this.albums = [];
    this.artist = [];
    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;
        this.Kodi.getArtistAlbums(this.kodiAdress, this.navParams.get('artist'))
        .subscribe(
          data => {
            //console.log(data);
            this.albums = data.result.albums;
          },
          err => {
              //console.log(err);
          },
          //() => console.log('Got the albums')
        );
        this.Kodi.getArtistDetails(this.kodiAdress, this.navParams.get('artist')).subscribe(
          data => {
            //console.log(data);
            this.artist = data.result.artistdetails;

            this.spotify.searchArtist(this.artist.label).subscribe(
              data => {
                //console.log(data);
                if (data.artists.items[0]) {
                  if (data.artists.items[0].images[0]) {
                    this.artist_image = data.artists.items[0].images[0].url;
                  } else {
                    this.artist_image = null;
                  }
                  //console.log('i gots images');
                } else {
                  this.artist_image = null;
                  //console.log('i gots no images :()');
                }
              },
              err => {
                  //console.log(err);
              },
              //() => console.log('Got the artist spotify info')
            );

          },
          err => {
              //console.log(err);
          },
          //() => console.log('Got the artist')
        );
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistPage');
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public showInfo(id: number) {
    this.navCtrl.push(SongsPage, {
      album: id,
    });
  }

  public playAlbum(id: number, label: any) {
    this.Kodi.playAlbum(this.kodiAdress, id).subscribe(
      data => {
        this.presentToast('Playing: '+label+'');
        //console.log(data);
      },
      err => {
        //console.log(err);
      },
      //() => console.log('Playing the album')
    );
  }

}
