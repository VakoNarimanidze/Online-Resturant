import { Products } from "./products";

export interface Basket {
  quantity: number;
  price: number;
  product: Products;
}
