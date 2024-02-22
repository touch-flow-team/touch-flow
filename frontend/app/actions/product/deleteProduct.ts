'use server';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import { revalidateTag } from 'next/cache';

interface IProp {
  id: string;
}

const deleteProduct = async ({ id }: IProp) => {
  await fetch(`http://127.0.0.1:8090/api/collections/products/records/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.PRODUCT);
    })
    .catch((err) => console.log(err));
};

export default deleteProduct;
