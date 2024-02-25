'use server';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import client from '@/libs/pocketbase';
import { revalidateTag } from 'next/cache';

interface IProductUpdate {
  id: string;
  data: {
    name: string;
    price: number;
    description: string;
    category: string;
  };
}

// revalidateTag 없으면 데이터 무효화가 안됨
const updateProduct = async ({ id, data }: IProductUpdate) => {
  await client
    .collection('products')
    .update(id, data)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

export default updateProduct;
