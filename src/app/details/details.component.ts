import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LogicsService } from '../logics.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-details',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

product:any

constructor(private route:ActivatedRoute,public logicsServices:LogicsService){}


ngOnInit(): void {
  this.route.queryParams.subscribe(params =>{
    if(params['data']){
      this.product = JSON.parse(params['data'])
      console.log(this.product);      
    }
  })
}
addToBasket(productId: number,itemPrice:number) {
  this.logicsServices.addToBasket(productId,itemPrice);
}
}
