import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { LogicsService } from '../logics.service';
@Component({
  imports:[FormsModule],
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  constructor(public api:LogicsService){}
  @Output() filterChanged = new EventEmitter<any>();

  public spiciness :string =""
  public nuts:string =""
  public vegeterian:string =""

  applyFilter() {
    let sicxare;
    if(this.spiciness =="-1"){
      sicxare =""
    }   
    else{
      sicxare = this.spiciness
    }
    this.api.getFiltered(sicxare,this.nuts,this.vegeterian).subscribe(data =>{
      this.filterChanged.emit(data)
      // console.log(data);
      
    })
  }

  resetFilter() {
  }
}