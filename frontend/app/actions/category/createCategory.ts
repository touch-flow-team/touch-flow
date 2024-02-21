'use server';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

interface IProp {
  name: string;
}

const createCategory = async (data: IProp) => {
  const { name } = data;

  await fetch('http://127.0.0.1:8090/api/collections/categorys/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
    .then(() => {
      revalidateTag(REVALIDATE_TAG.CATEGORY);
    })
    .catch((err) => console.log(err));
};

export default createCategory;
