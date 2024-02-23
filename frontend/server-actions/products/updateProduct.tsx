'use server';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import { revalidateTag } from 'next/cache';

interface IProp {
  id: string;
  data: {
    name: string;
    price: number;
    description: string;
    category: string;
  };
}

const updateProduct = async ({ id, data }: IProp) => {
  const { name, category, price, description } = data;
  await fetch(`http://127.0.0.1:8090/api/collections/products/records/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category, description }),
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.PRODUCT);
    })
    .catch((err) => console.log(err));
};

export default updateProduct;
