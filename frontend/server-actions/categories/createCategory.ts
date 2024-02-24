'use server';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import client from '@/libs/pocketbase';
interface IArgments {
  data: any;
  collection: 'categorys' | 'products';
  revalidate_tag: 'CATEGORY' | 'PRODUCTS';
}

const createAction = async ({ data, collection, revalidate_tag }: IArgments) => {
  await client
    .collection(collection)
    .create(data)
    .then(() => revalidateTag(revalidate_tag));
};

export default createAction;
