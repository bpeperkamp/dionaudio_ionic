import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Spotify provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Spotify {

  constructor(public http: Http) {
    console.log('Hello Spotify Provider');
  }

  searchArtist(data: any) {
    var url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(data) + '&offset=0&limit=10&type=artist';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
