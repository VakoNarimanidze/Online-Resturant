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

  public spiciness :number = -1
  public nuts:string =""
  public vegeterian:string =""

  applyFilter() {
    let sicxare = this.spiciness === -1 ? "" : this.spiciness.toString();
    this.api.getFiltered(sicxare, this.nuts, this.vegeterian).subscribe(data => {
      this.filterChanged.emit(data);
    });
  }
  

  resetFilter() {
    this.spiciness = -1
    this.nuts =""
    this.vegeterian = ""
    this.applyFilter()

    setTimeout(() => {
      this.applyFilter(); 
    });
  }
}