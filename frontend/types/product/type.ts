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

export type KioskCategorise = {
  id: string;
  name: string;
};

export type KioskProduct = {
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  collectionId: string;
  quantity?: number;
  category?: string;
};

export type KioskCategoriseArray = KioskCategorise[];
export type KioskProductsArray = KioskProduct[];

export interface PaymentItemsProps {
  id?: string;
  products?: KioskProductsArray;
  carts: KioskProductsArray;
  totalPrice?: number;
  setCarts: Dispatch<SetStateAction<KioskProductsArray>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
