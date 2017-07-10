import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the Kodi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Kodi {

  constructor(public http: Http, public platform: Platform, public storage: Storage) {
    this.http = http;
  }

  getMovies(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "params": { "filter": {"field": "playcount", "operator": "is", "value": "0"}, "limits": { "start" : 0, "end": 99000 }, "properties" : ["art", "rating", "thumbnail", "playcount", "file", "year"], "sort": { "order": "ascending", "method": "label", "ignorearticle": true } }, "id": "libMovies"}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getMovie(adress: any, id: number) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method":"VideoLibrary.GetMovieDetails","params":{"movieid": '+id+',"properties": ["runtime","thumbnail","rating","plot","year","fanart","genre"]}, "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getArtists(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "AudioLibrary.GetArtists", "params": { "limits": { "start" : 0, "end": 99000 }, "properties": [ "thumbnail", "fanart" ], "sort": { "order": "ascending", "method": "artist", "ignorearticle": true } }, "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getArtistAlbums(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0","params": {"filter": {"artistid": '+id+'}, "properties": ["thumbnail","year","title","artistid","artist"]}, "method": "AudioLibrary.GetAlbums", "id": "libAlbums"} }';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getAlbumSongs(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "AudioLibrary.GetSongs", "params": {"filter": {"albumid":'+id+'}, "properties": [ "artist", "artistid", "duration", "album", "track" ]}, "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getAlbumDetails(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "AudioLibrary.GetAlbumDetails", "params": { "properties": [ "thumbnail", "fanart" ], "albumid":'+id+'}, "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getArtistDetails(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "AudioLibrary.GetArtistDetails", "params": { "properties": [ "thumbnail", "fanart" ], "artistid": '+id+'}, "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  playMovie(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Player.Open","params":{"item": {"movieid": '+id+'} }}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  playAlbum(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Player.Open","params":{"item": {"albumid": '+id+'} }}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  playSong(adress: any, id: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Player.Open","params":{"item": {"songid": '+id+'} }}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  sendCommand(adress: any, command: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":'+JSON.stringify(command)+'}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getTimeAudio(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Player.GetProperties", "params": {"properties":["time"], "playerid": 0}}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getTimeVideo(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Player.GetProperties", "params": {"properties":["time"], "playerid": 1}}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  seekAudio(adress: any, value: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc":"2.0", "method":"Player.Seek", "params": { "playerid":0, "value":'+value+' }, "id":1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  seekVideo(adress: any, value: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc":"2.0", "method":"Player.Seek", "params": { "playerid":1, "value":'+value+' }, "id":1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  sendFullCommand(adress: any, command: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request='+JSON.stringify(command);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getActivePlayers(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  whatisPlayingAudio(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["title", "album", "artist", "duration", "thumbnail", "file", "fanart", "streamdetails"], "playerid": 0 }, "id": "AudioGetItem"}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  whatisPlayingVideo(adress: any) {
    var url = 'http://'+adress+':8080/jsonrpc?request={"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["title", "album", "artist", "season", "episode", "duration", "showtitle", "tvshowid", "thumbnail", "file", "fanart", "streamdetails"], "playerid": 1 }, "id": "VideoGetItem"}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  setMute(address: any) {
    var url = 'http://'+address+':8080/jsonrpc?request={"id":"1","jsonrpc":"2.0","method":"Application.SetMute","params":{"mute":"toggle"}}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
