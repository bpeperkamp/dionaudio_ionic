import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MoviesPage } from '../pages/movies-page/movies-page'
import { MoviePage } from '../pages/movie-page/movie-page'
import { MusicPage } from '../pages/music-page/music-page';
import { ArtistPage } from '../pages/artist-page/artist-page';
import { SongsPage } from '../pages/songs-page/songs-page';
import { TabsPage } from '../pages/tabs/tabs';

import { Kodi } from '../providers/kodi';
import { Dionaudio } from '../providers/dionaudio';
import { Spotify } from '../providers/spotify';

import { EncodeURI } from '../pipes/encodeURI';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Zeroconf } from '@ionic-native/zeroconf';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ArtistPage,
    MoviesPage,
    MoviePage,
    MusicPage,
    SongsPage,
    TabsPage,
    EncodeURI,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {
      //tabsPlacement: 'top'
      backButtonText: 'terug',
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ArtistPage,
    ContactPage,
    HomePage,
    MoviesPage,
    MoviePage,
    MusicPage,
    SongsPage,
    TabsPage
  ],
  providers: [
    Kodi,
    Dionaudio,
    Spotify,
    StatusBar,
    SplashScreen,
    AppPreferences,
    Zeroconf,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
