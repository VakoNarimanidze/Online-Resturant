import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartLengthService } from '../cart-length.service';
import { LoaderComponent } from "../loader/loader.component";
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterModule, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  basketCount: number = 0;
  public isLoading:boolean = false
  

  constructor(private cartLengthService: CartLengthService,public loader:LoaderService) {
    this.loaderLogic()
  }

  ngOnInit() {
    this.cartLengthService.cartItemLength$.subscribe(count => {
      this.basketCount = count;
    });
  }
@HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 300) {
      document.querySelector('.top-nav')?.classList.add('fixed-nav');
    } else {
      document.querySelector('.top-nav')?.classList.remove('fixed-nav');
    }
  }


  loaderLogic(){
    this.loader.isLoading.subscribe((data:boolean) => {
      this.isLoading = data
    })
  }
}
 
