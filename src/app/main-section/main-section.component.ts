import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
productDetails:any;
selectedView:any;
  constructor(private cS:CommonService,private httpClient:HttpClient) { 
  
  }
  ngOnInit(): void {
    this.cS.selectedProduct.subscribe((resprod)=>{
      this.getProductInfo(resprod);
    });  
    this.cS.selectedView.subscribe((view)=>{
   this.selectedView = view;
    });  
  }
getProductInfo(product){
  this.httpClient.get<any>(`https://app.dataweave.com/v6/app/retailer/bundle_overview/?&api_key=38430b87ac715c5858b7de91fb90b3f7&base_view=${this.selectedView}&bundle_id=${product.bundle_id}`).subscribe(res => {
    this.productDetails = res.data;
  })
}
}
