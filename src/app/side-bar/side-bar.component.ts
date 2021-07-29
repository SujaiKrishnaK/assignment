import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  activeComponent:any;
  incopportunityCount:number;
  allProductsCount:number;
  opened:boolean = true;
  navItems = [{'title':'All matched products',value:"all_products",route:'/mid-section'},{'title':'Margin gain opportunities',value:"increase_opportunity",'route':'/mid-section'}]
  constructor(private httpClient: HttpClient,private cS:CommonService) {
   }

  ngOnInit(): void {
    this.httpClient.get<any>(`https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=all_products&start=0&limit=&sort_on=
    &sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`).subscribe(res => {
      this.allProductsCount = res.count;
    })
    this.httpClient.get<any>(`https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=increase_opportunity&start=0&limit=20&sort_on=
    &sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`).subscribe(res => {
      this.incopportunityCount = res.count;
    })
  }
  showMid(item){
  console.log(item);
  this.cS.selectedView.emit(item.value)
  }
}
