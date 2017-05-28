import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongsPage } from './songs-page';

@NgModule({
  declarations: [
    SongsPage,
  ],
  imports: [
    IonicPageModule.forChild(SongsPage),
  ],
  exports: [
    SongsPage
  ]
})
export class SongsPageModule {}
