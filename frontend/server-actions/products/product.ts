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
  try {
    await client
      .collection(PB_COLLECTIONS.PRODUCTS)
      .create(formData)
      .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
  } catch (error) {
    throw error;
  }
};

// revalidateTag 없으면 데이터 무효화가 안됨
const deleteProduct = async ({ id }: IDelete) => {
  await client
    .collection(PB_COLLECTIONS.PRODUCTS)
    .delete(id)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

const getProduct = async ({
  id,
  current_page,
  filtering,
}: {
  id: string;
  current_page: number;
  filtering: string;
}) => {
  try {
    const products: IResult<IProduct> = await client
      .collection(PB_COLLECTIONS.PRODUCTS)
      .getList(current_page, PRODUCT_PAGINATION_SIZE, {
        filter: `${PB_COLLECTIONS.CATEGORIES}.id="${filtering}"`,
        expand: `${PB_COLLECTIONS.CATEGORIES}`,
        sort: 'created',
        cache: 'no-store',
      });
    return products;
  } catch (error) {
    return null;
  }
};

const getAllProduct = async ({ current_page, id }: { current_page: number; id: string }) => {
  try {
    const products: IResult<IProduct> = await client
      .collection(PB_COLLECTIONS.PRODUCTS)
      .getList(current_page, PRODUCT_PAGINATION_SIZE, {
        expand: 'categories',
        filter: `company.id="${id}"`,
        sort: 'created',
        cache: 'no-store',
        next: { tags: [REVALIDATE_TAG.PRODUCT] },
      });
    return products;
  } catch (error) {
    return null;
  }
};
// revalidateTag 없으면 데이터 무효화가 안됨
const updateProduct = async ({ id, formData }: IUpdate) => {
  await client
    .collection(PB_COLLECTIONS.PRODUCTS)
    .update(id, formData)
    .then(() => revalidateTag(REVALIDATE_TAG.PRODUCT));
};

export { createProduct, getProduct, updateProduct, deleteProduct, getAllProduct };
