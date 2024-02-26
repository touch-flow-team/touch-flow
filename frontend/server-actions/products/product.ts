'use server';

import { IProduct } from '@/types/product/type';
import { revalidateTag } from 'next/cache';
import { IResult } from '@/types/common/type';
import { PRODUCT_PAGINATION_SIZE, REVALIDATE_TAG } from '@/constants/constants';
import client from '@/libs/pocketbase';
import { PB_COLLECTIONS } from '@/constants/constants';

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
    .collection(PB_COLLECTIONS.PRODUCTS)
    .create(formData)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

// revalidateTag 없으면 데이터 무효화가 안됨
const deleteProduct = async ({ id }: IDelete) => {
  await client
    .collection(PB_COLLECTIONS.PRODUCTS)
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

const getProduct = async ({
  current_page,
  filtering,
}: {
  current_page: number;
  filtering: string;
}) => {
  const products: IResult<IProduct> = await client
    .collection(PB_COLLECTIONS.PRODUCTS)
    .getList(current_page, PRODUCT_PAGINATION_SIZE, {
      filter: `category = "${filtering}"`,
      expand: 'category',
      sort: 'created',
      cache: 'no-store',
      next: { tags: [REVALIDATE_TAG.PRODUCT] },
    });

  return products;
};

const getAllProduct = async ({ current_page }: { current_page: number }) => {
  const products: IResult<IProduct> = await client
    .collection(PB_COLLECTIONS.PRODUCTS)
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
    .collection(PB_COLLECTIONS.PRODUCTS)
    .update(id, formData)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

export { createProduct, getProduct, updateProduct, deleteProduct, getAllProduct };
