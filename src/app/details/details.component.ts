import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LogicsService } from '../logics.service';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [RouterModule, HeaderComponent,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  product: any;
  quantity: number = 1;  

  constructor(private route: ActivatedRoute, public logicsServices: LogicsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.product = JSON.parse(params['data']);
        console.log(this.product);
      }
    });
  }

  addToBasket(productId: number, itemPrice: number, quantity: number) {
    this.logicsServices.addToBasket(productId, itemPrice, quantity);
    alert( `${quantity}  ${this.product.name} Added In Cart `)
  }
}
