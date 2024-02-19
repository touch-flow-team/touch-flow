'use server';
import { Button } from '@/components/ui/button';
import { revalidateTag } from 'next/cache';

interface IProp {
  id: string;
}

const deleteCategory = async ({ id }: IProp) => {
  await fetch(`http://127.0.0.1:8090/api/collections/categorys/records/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      revalidateTag('CATEGORY');
    })
    .catch((err) => console.log(err));
};

export default deleteCategory;
