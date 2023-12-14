import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  changePopup(value: string): string{
    if(value == 'none'){
      return 'flex'
    }else{
      return 'none'
    }
  }

}
