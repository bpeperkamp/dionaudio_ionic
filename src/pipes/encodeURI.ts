import {Pipe} from '@angular/core';

@Pipe({
  name: 'encodeURI'
})
export class EncodeURI {
  transform(value, args) {
    //Count how many words were passed in
    let newValue = encodeURIComponent(value);
    return newValue;
  }
}
