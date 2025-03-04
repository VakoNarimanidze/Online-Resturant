import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartLengthService } from '../cart-length.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  basketCount: number = 0;

  constructor(private cartLengthService: CartLengthService) {}

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
}
 
