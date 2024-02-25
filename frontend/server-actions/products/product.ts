'use server';

import { IProduct } from '@/types/product/type';
import { revalidateTag } from 'next/cache';
import { IResult } from '@/types/common/type';
import { PRODUCT_PAGINATION_SIZE, REVALIDATE_TAG } from '@/constants/constants';
import client from '@/libs/pocketbase';

interface ICreate {
  formData: FormData;
}

interface IDelete {
  id: string;
}

interface IUpdate {
  id: string;
  formData: FormData;
}

const createProduct = async ({ formData }: ICreate) => {
  await client
    .collection('products')
    .create(formData)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

// revalidateTag 없으면 데이터 무효화가 안됨
const deleteProduct = async ({ id }: IDelete) => {
  await client
    .collection('products')
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

const getProduct = async ({ current_page }: { current_page: number }) => {
  const products: IResult<IProduct> = await client
    .collection('products')
    .getList(current_page, PRODUCT_PAGINATION_SIZE, {
      expand: 'category',
      sort: 'created',
      cache: 'no-store',
      next: { tags: [REVALIDATE_TAG.PRODUCT] },
    });

  return products;
};

// revalidateTag 없으면 데이터 무효화가 안됨
const updateProduct = async ({ id, formData }: IUpdate) => {
  await client
    .collection('products')
    .update(id, formData)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

export { createProduct, getProduct, updateProduct, deleteProduct };
