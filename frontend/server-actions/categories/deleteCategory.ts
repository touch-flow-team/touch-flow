'use server';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import client from '@/libs/pocketbase';

interface IProp {
  id: string;
}

const deleteCategory = async ({ id }: IProp) => {
  await client
    .collection('categorys')
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.CATEGORY));
};

export default deleteCategory;
