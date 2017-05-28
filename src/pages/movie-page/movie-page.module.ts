import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviePage } from './movie-page';

@NgModule({
  declarations: [
    MoviePage,
  ],
  imports: [
    IonicPageModule.forChild(MoviePage),
  ],
  exports: [
    MoviePage
  ]
})
export class MoviePageModule {}
