'use server';

import { IProduct } from '@/types/product/type';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import client from '@/libs/pocketbase';

interface ICreate {
  data: {
    name: string;
    price: number;
    description: string;
    category: string;
  };
}

interface IDelete {
  id: string;
}

interface IUpdate {
  id: string;
  data: {
    name: string;
    price: number;
    description: string;
    category: string;
  };
}

const createProduct = async ({ data }: ICreate) => {
  await client
    .collection('products')
    .create(data)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

// revalidateTag 없으면 데이터 무효화가 안됨
const deleteProduct = async ({ id }: IDelete) => {
  await client
    .collection('products')
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

const getProduct = async () => {
  const products: IProduct[] = await client.collection('products').getFullList({
    expand: 'category',
    sort: 'created',
    cache: 'no-store',
    next: { tags: [REVALIDATE_TAG.PRODUCT] },
  });

  return products;
};

// revalidateTag 없으면 데이터 무효화가 안됨
const updateProduct = async ({ id, data }: IUpdate) => {
  await client
    .collection('products')
    .update(id, data)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

export { createProduct, getProduct, updateProduct, deleteProduct };
