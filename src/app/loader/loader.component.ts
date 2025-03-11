import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  constructor(public loader:LoaderService){
    this.loaderLogic()
  }

  public isLoading:any
  loaderLogic(){
    this.loader.isLoading.subscribe((data:boolean) => {
      this.isLoading = data
    })
  }
}
