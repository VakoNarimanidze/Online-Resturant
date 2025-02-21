import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent,CardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RESTURANT-PROJECT';
}
