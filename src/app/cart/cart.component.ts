import { Component, OnInit } from '@angular/core';
import { LogicsService } from '../logics.service';
import { HeaderComponent } from "../header/header.component";
import { Basket } from '../basket';
import { CartLengthService } from '../cart-length.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(
    public logicsService: LogicsService,
    private cartLengthService: CartLengthService 
  ) { }

  BasketItems: Basket[] = [];
  totalPrice: number = 0;
  CartItemLength: number = 0;

  ngOnInit(): void {
    this.logicsService.getBasket().subscribe((res: Basket[]) => {
      this.BasketItems = res;
      this.updateCartLength();
      this.calculateTotal();
    });
  }

  removeItem(id: number) {
    this.logicsService.removeItems(id);

    if (this.BasketItems && Array.isArray(this.BasketItems)) {
      this.BasketItems = this.BasketItems.filter(item => item.product.id !== id);
      this.updateCartLength(); 
      this.calculateTotal();
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.logicsService.updateBasketItem(item.product.id, item.quantity, item.price);
    this.updateCartLength(); 
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.logicsService.updateBasketItem(item.product.id, item.quantity, item.price);
      this.updateCartLength(); 
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.BasketItems.reduce((acc: number, item: any) => acc + (item.quantity * item.price), 0);
  }

  private updateCartLength() {
    this.CartItemLength = this.BasketItems.length;
    console.log("Cart Length Updated:", this.CartItemLength); 
    this.cartLengthService.updateCartLength(this.CartItemLength);
  }
  
  goToHomepage(){
      window.location.href="/"
  }
  checkOut(){
    alert(`Total Price is ${this.totalPrice}$`)
  }
}
