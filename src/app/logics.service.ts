import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicsService {

  private cardsAPI = "https://restaurant.stepprojects.ge/api/Products/GetAll";
  private categoriesAPI = "https://restaurant.stepprojects.ge/api/Categories/GetAll";
  private UpdatebasketAPI = "https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket"
 
  
  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<Products[]>(this.cardsAPI);
  }

  getCategories() {
    return this.http.get<any>(this.categoriesAPI);
  }

  getCategoryById(id: number) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`);
  }

 getFiltered(spiciness:string,nuts:any,vegeterian:any){
  return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&spiciness=${spiciness}`)
 }
 
  
  

  getBasket(): Observable<any[]> {
    return this.http.get<any[]>("https://restaurant.stepprojects.ge/api/Baskets/GetAll");
  }
  
  removeItems(id: number): void {
    this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
      .subscribe({
        next: () => this.getBasket(),
        error: (error) => console.error(error)
      });
  }
  
  addToBasket(productId: number, itemPrice: number) {
    this.getBasket().subscribe((basket: any[]) => {
      let existingItem = basket.find(item => item.product.id === productId);
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        const updatedPrice = itemPrice * newQuantity;
  
        this.http.put(this.UpdatebasketAPI, {
          productId: productId,
          quantity: newQuantity,
          price: updatedPrice
        }).subscribe({
          next: (res) => {
            console.log("Updated Basket Item:", res);
            this.getBasket().subscribe(); 
          },
          error: (error) => console.error("Error updating basket:", error)
        });
  
      } else {
        this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
          productId: productId,
          quantity: 1,
          price: itemPrice
        }).subscribe({
          next: (res) => {
            console.log("Added to Basket:", res);
            this.getBasket().subscribe(); 
          },
          error: (error) => console.error(" Error adding to basket:", error)
        });
      }
    });
  }
  
  
  updateBasketItem(productId: number, newQuantity: number, itemPrice: number) {
    const total = newQuantity * itemPrice;
  
    this.http.put(this.UpdatebasketAPI, {
      productId: productId,
      quantity: newQuantity,
      price: itemPrice,
      total: total
    })
    .subscribe({
      next: () => {
        console.log(`Updated basket item ${productId}: Quantity ${newQuantity}, Total ${total}`);
        this.getBasket().subscribe(); 
      },
      error: (error) => console.log("Error updating basket:", error)
    });
  }
  
  }
