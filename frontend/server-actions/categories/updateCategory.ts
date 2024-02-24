'use server';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import client from '@/libs/pocketbase';
import { revalidateTag } from 'next/cache';

interface IProp {
  id: string;
  name: string;
}

const updateCategory = async ({ id, name }: IProp) => {
  await client
    .collection('categorys')
    .update(id, { name })
    .then(() => revalidateTag(REVALIDATE_TAG.CATEGORY));
};

export default updateCategory;
