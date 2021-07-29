import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mid-section',
  templateUrl: './mid-section.component.html',
  styleUrls: ['./mid-section.component.css']
})
export class MidSectionComponent implements OnInit {
  midData:any;
  searchTxt:any;
  filterUpdate = new Subject<string>();
  count:any;
  highlow = {'display' : 'HIGH TO LOW','val': 'desc'};
  sortVal:any;
  limit = 3;
  start = 0;
  selectedView:any;
  loadedCards:any;
  view:any = 'all_products';
  rippleColor:string = "cornflowerblue";
  constructor(public cS:CommonService,public httpClient:HttpClient) {
    this.cS.selectedView.subscribe(val => {
     this.view = val;
      })
    this.filterUpdate.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchCall(value)
      });
   }

  ngOnInit(): void {
    this.cS.selectedView.subscribe(value => {
      this.getProductCards(value)
      this.selectedView = value;
    });
    this.getProductCards('all_products')
  }
  pageCall(back?){
    if(this.midData && this.midData.length > 0){
     this.limit = this.limit + 3 
      this.start = this.start + 3
    }
    if(back || this.selectedView == 'increase_opportunity'){
      this.limit = 3;
      this.start = 0; 
    }
    this.getProductCards(this.selectedView)
  }
  getProductCards(val){
    this.httpClient.get<any>(`https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${val}&limit=${this.limit}&start=${this.start}&api_key=38430b87ac715c5858b7de91fb90b3f7`).subscribe(res => {
      this.midData = res.data;
      this.count = res.count;
    });
    if(this.midData && this.midData.length == 0){
      this.limit = 3;
      this.start = 0;
    }
  }
  setProduct(prod){
    this.cS.selectedProduct.emit(prod)
  }
  searchCall(value){
    this.start = 0;
    this.limit = this.count;
    let url = '';
    if(value){
      // &start=0&limit=${this.limit}&sort_on='available_price'&sort_by="asc"
      url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${this.view}&filters={"search":"${value}"}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
    }else if(value == ''){
      url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${this.view}&api_key=38430b87ac715c5858b7de91fb90b3f7`
    }
    this.httpClient.get<any>(url).subscribe(res => {
      setTimeout(() => {
        this.midData = res.data;
        this.count = res.count;
        this.loadedCards =  this.midData.length;
      }, 1000);
    })
  }
  sortCall(event,order){
    this.sortVal = event.target.value;
   let url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${this.view}&start=0&limit=${this.limit}&sort_on=${event.target.value}&sort_by=${order.val}&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
   this.httpClient.get<any>(url).subscribe(result => {
    console.log(result,'check');
    if(order.val == 'desc'){
      this.highlow = {'display' : 'LOW TO HIGH','val': 'asc'} 
     }else{
      this.highlow = {'display' : 'HIGH TO LOW','val': 'desc'}
     }
    setTimeout(() => {
      this.midData = result.data;
      this.count = result.count;
      this.loadedCards =  this.midData.length;
    }, 1000);
   })
  }
}
