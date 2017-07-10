import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Kodi } from '../../providers/kodi';
import { Dionaudio } from '../../providers/dionaudio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  kodiAdress: any;
  playing_1: any;
  playing_1_end: any;
  current_time: any;
  iamWhere: any;
  time: any;
  medialength: any;

  constructor(public navCtrl: NavController, public platform: Platform, public Kodi: Kodi, public Dionaudio: Dionaudio, public storage: Storage, public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;

        this.time = 0;
        setInterval(() => {
          this.Kodi.getActivePlayers(this.kodiAdress).subscribe(
            data => {
              if(data.result[0]) {
                if(data.result[0].playerid === 0) {
                  this.Kodi.whatisPlayingAudio(this.kodiAdress).subscribe(
                    data => {
                      //console.log(data)
                      this.playing_1 = data.result.item;
                      this.playing_1_end = data.result.item.duration;
                      this.Kodi.getTimeAudio(this.kodiAdress).subscribe(
                        data => {

                          this.time = data.result.time;
                          this.current_time = (this.time.hours * 3600) + (this.time.minutes * 60) + (this.time.seconds);

                          let percentage = Math.round((this.current_time / this.playing_1_end) * 100);
                          this.iamWhere = percentage;

                        }, err => {
                          //console.log(err);
                          this.time = null;
                        }
                      )
                    }, err => {
                      this.playing_1 = null;
                    }
                  )
                } else if (data.result[0].playerid === 1) {
                  this.Kodi.whatisPlayingVideo(this.kodiAdress).subscribe(
                    data => {
                      //console.log(data);
                      this.playing_1 = data.result.item;
                      this.playing_1_end = data.result.item.streamdetails.video[0].duration;
                      this.Kodi.getTimeVideo(this.kodiAdress).subscribe(
                        data => {

                          this.time = data.result.time;
                          this.current_time = (this.time.hours * 3600) + (this.time.minutes * 60) + (this.time.seconds);

                          let percentage = Math.round((this.current_time / this.playing_1_end) * 100);

                          this.iamWhere = percentage;

                        }, err => {
                          //console.log(err);
                          this.time = null;
                        }
                      )
                    }, err => {
                      this.playing_1 = null;
                    }
                  )
                } else {
                  this.playing_1 = null;
                }
              } else {
                this.playing_1 = null;
              }

            }, err => {
              this.playing_1 = null;
            }
          )
        }, 1000);

      })
    });
  }

  ionViewDidLoad() {

  }

  shutdown() {
    let confirm = this.alertCtrl.create({
      title: 'SE125 Uitschakelen?',
      message: 'Weet u het zeker?',
      buttons: [
        {
          text: 'Uitschakelen',
          handler: () => {
            console.log('Agree clicked');
            this.Kodi.sendFullCommand(this.kodiAdress, {"jsonrpc":"2.0","method":"System.Shutdown","id":1}).subscribe(
              data => {
                  //console.log(data);
              },
              err => {
                  //console.log(err);
              }
            );
          }
        },
        {
          text: 'Annuleren',
          role: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Zoeken/text invoeren',
      inputs: [
        {
          name: 'textentry',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Invoeren',
          handler: data => {
            console.log(data.textentry);
            this.Kodi.sendFullCommand(this.kodiAdress, {"id":"1","jsonrpc":"2.0","method":"Input.SendText","params":{"text": data.textentry , "done":true}} ).subscribe(
              data => {
                console.log(data);
              }, err => {
                console.log(err);
              }
            )
            //if (User.isValid(data.username, data.password)) {
              // logged in!
            //} else {
              // invalid login
            //  return false;
            //}
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Selecteer input',
     buttons: [
       {
         text: 'SE125',
         handler: () => {
           //console.log('SE125 clicked');
           this.Dionaudio.sendCommand(this.kodiAdress, {"command": "toggle_relay_1"}).subscribe(
             data => {
               //console.log(data);
             }, err => {
               //console.log(err);
             }
           )
         }
       },
       {
         text: 'Analoog 1',
         handler: () => {
           //console.log('Analoog 1 clicked');
           this.Dionaudio.sendCommand(this.kodiAdress, {"command": "toggle_relay_2"}).subscribe(
             data => {
               //console.log(data);
             }, err => {
               //console.log(err);
             }
           )
         }
       },
       {
         text: 'Analoog 2',
         handler: () => {
           //console.log('Analoog 2 clicked');
           this.Dionaudio.sendCommand(this.kodiAdress, {"command": "toggle_relay_3"}).subscribe(
             data => {
               //console.log(data);
             }, err => {
               //console.log(err);
             }
           )
         }
       },
       {
         text: 'Digitaal 1',
         handler: () => {
           //console.log('Digitaal 1 clicked');
           this.Dionaudio.sendCommand(this.kodiAdress, {"command": "toggle_relay_4"}).subscribe(
             data => {
               //console.log(data);
             }, err => {
               //console.log(err);
             }
           )
         }
       },
       {
         text: 'Digitaal 2',
         handler: () => {
           //console.log('Digitaal 2 clicked');
           this.Dionaudio.sendCommand(this.kodiAdress, {"command": "toggle_relay_5"}).subscribe(
             data => {
               //console.log(data);
             }, err => {
               //console.log(err);
             }
           )
         }
       },
       {
         text: 'Annuleer',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
    });
    actionSheet.present();
  }

  cancelVolume() {
    this.Dionaudio.sendCommand(this.kodiAdress, {"command": "volume_up_off"}).subscribe(
      data => {
        //console.log(data);
      }, err => {
        //console.log(err);
      }
    )
    this.Dionaudio.sendCommand(this.kodiAdress, {"command": "volume_down_off"}).subscribe(
      data => {
        //console.log(data);
      }, err => {
        //console.log(err);
      }
    )
  }

  volumeUp() {
    this.Dionaudio.sendCommand(this.kodiAdress, {"command": "volume_up_on"}).subscribe(
      data => {
        //console.log(data);
      }, err => {
        //console.log(err);
      }
    )
  }

  volumeDown() {
    this.Dionaudio.sendCommand(this.kodiAdress, {"command": "volume_down_on"}).subscribe(
      data => {
        //console.log(data);
      }, err => {
        //console.log(err);
      }
    )
  }

  test(event: any) {
    //console.log('seeking');
    this.Kodi.getActivePlayers(this.kodiAdress).subscribe(
      data => {
          if(data.result[0]) {
            if(data.result[0].playerid === 0) {
              //console.log('its audio');
              this.Kodi.seekAudio(this.kodiAdress, event._value).subscribe(
                data => {
                    //console.log(data);
                },
                err => {
                    //console.log(err);
                }
              );
            } else if (data.result[0].playerid === 1) {
              //console.log('its video');
              this.Kodi.seekVideo(this.kodiAdress, event._value).subscribe(
                data => {
                    //console.log(data);
                },
                err => {
                    //console.log(err);
                }
              );
            } else {
              //console.log('shit happens');
            }
          } else {

          }
      },
      err => {
          //console.log(err);
      }
    );

  }

  showVal(event: any) {
    //console.log(event._value);
  }

  sendCommand(command: any) {
    this.Kodi.sendCommand(this.kodiAdress, command).subscribe(
      data => {
          //console.log(data);
      },
      err => {
          //console.log(err);
      }
    );
  }

  sendFullCommand(command: any) {
    //console.log(command);
    this.Kodi.sendFullCommand(this.kodiAdress, command).subscribe(
      data => {
          //console.log(data);
      },
      err => {
          //console.log(err);
      }
    );
  }

  setMute(command: any) {
    this.Kodi.setMute(this.kodiAdress).subscribe(
      data => {
          //console.log(data);
      },
      err => {
          //console.log(err);
      }
    );
  }

}
