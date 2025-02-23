import { Component, OnInit } from '@angular/core';
import { LogicsService } from '../logics.service';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { CommonModule } from '@angular/common';
import { Products } from '../products';
import { FilterComponent } from "../filter/filter.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-cards',
  imports: [RouterModule, CategoriesComponent, CommonModule, FilterComponent, HeaderComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {


  
  allProducs: Products[] = [];

  constructor(private logicServices: LogicsService) {}

  ngOnInit(): void {
    this.logicServices.getCards().subscribe((res) => {
      this.allProducs = res;
      console.log(res);
      
    });
  }

  updateCards(FilteredItems: any) {
    this.allProducs = FilteredItems.products;
  }

  showAll(showAllItems: Products[]) {
    this.allProducs = showAllItems;
  }

 
  applyFilter(filterChanged: any) {
   this.allProducs = filterChanged
  console.log(filterChanged);
  

  }
  
  

  

  addToBasket(productId: number,itemPrice:number) {
    this.logicServices.addToBasket(productId,itemPrice);
    console.log(productId,itemPrice);
    
  }

}
