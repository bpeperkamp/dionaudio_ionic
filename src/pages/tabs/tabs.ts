import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MoviesPage } from '../movies-page/movies-page';
import { MusicPage } from '../music-page/music-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MusicPage;
  tab4Root = MoviesPage;

  constructor() {

  }
}
