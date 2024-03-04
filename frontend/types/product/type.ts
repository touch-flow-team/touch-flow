import { Dispatch, SetStateAction } from 'react';

export interface IProduct {
  category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  updated: string;
  expand: {
    category: {
      name: string;
      id: string;
    };
  };
}

export type Product = {
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  collectionId: string;
  quantity?: number;
};

export type ProductsArray = Product[];

export interface PaymentItemsProps {
  products?: ProductsArray;
  carts: ProductsArray;
  totalPrice?: number;
  setCarts: Dispatch<SetStateAction<ProductsArray>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
