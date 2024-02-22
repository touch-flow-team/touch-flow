'use server';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

interface IProp {
  name: string;
  price: number;
  description: string;
  category: string;
}

const createProduct = async (data: IProp) => {
  const { name, category, price, description } = data;

  await fetch('http://127.0.0.1:8090/api/collections/products/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category, description }),
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.PRODUCT);
    })
    .catch((err) => console.log(err));
};

export default createProduct;
