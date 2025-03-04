import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CardsComponent } from './cards/cards.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path: "",component: CardsComponent},
    {path:"cart",component:CartComponent},
    {path:"details",component:DetailsComponent}
];
