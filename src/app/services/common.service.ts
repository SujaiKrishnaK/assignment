import {EventEmitter, Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedView: EventEmitter<any>;
  selectedProduct: EventEmitter<any>;
  constructor() { 
    this.selectedView = new EventEmitter<any>();
    this.selectedProduct = new EventEmitter<any>();
  }
}
