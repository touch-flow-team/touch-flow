'use server';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

interface IProp {
  id: string;
}

const deleteCategory = async ({ id }: IProp) => {
  await fetch(`http://127.0.0.1:8090/api/collections/categorys/records/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.CATEGORY);
    })
    .catch((err) => console.log(err));
};

export default deleteCategory;
