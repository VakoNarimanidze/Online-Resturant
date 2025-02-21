import { Component, OnInit } from '@angular/core';
import { LogicsService } from '../logics.service';
import { HeaderComponent } from "../header/header.component";
import { Basket } from '../basket';

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{


  constructor( public logicsService:LogicsService){}

  BasketItems:Basket[] = []
  totalPrice:number = 0

  ngOnInit(): void {
    this.logicsService.getBasket().subscribe((res:Basket[]) => {
      this.BasketItems = res;
      this.calculateTotal();
    });
  }

  removeItem(id: number) {
    this.logicsService.removeItems(id);
    
    if (this.BasketItems && Array.isArray(this.BasketItems)) {
      this.BasketItems = this.BasketItems.filter(item => item.product.id == id);
      this.calculateTotal(); 
    } else {
      console.error("BasketItems is not an array:", this.BasketItems);
    }
  }
  

  increaseQuantity(item: any) {
    item.quantity++;
    this.logicsService.updateBasketItem(item.product.id, item.quantity, item.price);
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.logicsService.updateBasketItem(item.product.id, item.quantity, item.price);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.BasketItems.reduce((acc: number, item: any) => acc + (item.quantity * item.price), 0);
  }

}
