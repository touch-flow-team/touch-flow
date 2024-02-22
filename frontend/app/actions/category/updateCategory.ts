'use server';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import { revalidateTag } from 'next/cache';

interface IProp {
  id: string;
  name: string;
}

const updateCategory = async ({ id, name }: IProp) => {
  await fetch(`http://127.0.0.1:8090/api/collections/categorys/records/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.CATEGORY);
    })
    .catch((err) => console.log(err));
};

export default updateCategory;
