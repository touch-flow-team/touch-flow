export interface IOrderDisplay {
  collectionId: string;
  collectionName: 'orders';
  created: Date;
  updated: Date;
  id: string;
  order_number: number;
  order_time: string;
  order_elapsed: Date;
  order_menus: { menu: string; amount: number }[];
  order_status: 'receive' | 'complete' | 'cancel';
  complete_time: string;
}

export interface IResponseOrderDisplay {
  collectionId: string;
  collectionName: string;
  expand: {
    orders: IOrderDisplay[];
  };
}

export type OrderStatus = IOrderDisplay['order_status'];
