'use server';

import client from '@/libs/pocketbase';
import { revalidateTag } from 'next/cache';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';
import { ICategory } from '@/types/category/type';

interface ICreateAction {
  data: { name: string };
}

interface IDeleteAction {
  id: string;
}

interface IUpdateAction {
  id: string;
  name: string;
}

const createCategory = async ({ data }: ICreateAction) => {
  await client
    .collection('categories')
    .create(data)
    .then(() => revalidateTag(REVALIDATE_TAG.CATEGORY));
};

const getCategories = async () => {
  const categories: ICategory[] = await client.collection('categories').getFullList({
    sort: 'created',
    cache: 'no-store',
    next: { tags: [REVALIDATE_TAG.CATEGORY], revalidate: 10 },
  });

  const categories_info = categories.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });
  return categories_info;
};

// TODO - 공통으로 사용 가능할 것으로 보임
const deleteCategory = async ({ id }: IDeleteAction) => {
  await client
    .collection('categories')
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.CATEGORY));
};

// TODO - 공통으로 사용 가능할 것으로 보임
const updateCategory = async ({ id, name }: IUpdateAction) => {
  await client
    .collection('categories')
    .update(id, { name })
    .then(() => revalidateTag(REVALIDATE_TAG.CATEGORY));
};

export { createCategory, getCategories, updateCategory, deleteCategory };