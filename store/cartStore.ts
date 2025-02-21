import { Product } from "@/utils/api";

export interface CartState {
  products: Array<Product> & { quantity: number };
}
