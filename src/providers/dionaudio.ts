import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the Dionaudio provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dionaudio {

  constructor(public http: Http, public platform: Platform, public storage: Storage) {
    this.http = http;
  }

  sendCommand(command: any) {
    var url = 'http://10.0.0.230:4000/device/command/';
    var response = this.http.post(url, command).map(res => res.json());
    return response;
  }

}
