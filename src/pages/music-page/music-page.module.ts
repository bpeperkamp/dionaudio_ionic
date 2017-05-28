import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music-page';

@NgModule({
  declarations: [
    MusicPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicPage),
  ],
  exports: [
    MusicPage
  ]
})
export class MusicPageModule {}
