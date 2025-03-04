import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartLengthService {
  private cartItemLength = new BehaviorSubject<number>(0);
  cartItemLength$ = this.cartItemLength.asObservable();

  updateCartLength(length: number) {
    this.cartItemLength.next(length);
  }
}
