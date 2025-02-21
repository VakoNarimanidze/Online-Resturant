import { Component,Output,EventEmitter,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogicsService } from '../logics.service';
import { Products } from '../products';

@Component({
  selector: 'app-categories',
  imports: [RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Output() FilteredItems = new EventEmitter<any>()
  @Output() showAllItems = new EventEmitter<any>()

  categories:any
  activeCategory:number = 0

  constructor(private logicService:LogicsService){}

  ngOnInit(): void {
    this.logicService.getCategories().subscribe((res) => {
     this.categories = res
  })
  }

  filterCards(id:number){
    this.activeCategory = id
    this.logicService.getCategoryById(id).subscribe((res) =>{
      this.FilteredItems.emit(res)
    }) 
  }

  showAll(){
    this.activeCategory = 0
    this.logicService.getCards().subscribe((res :Products[]) =>{
      this.showAllItems.emit(res)
    })
  }
}
