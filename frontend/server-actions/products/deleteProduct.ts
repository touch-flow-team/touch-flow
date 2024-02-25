'use server';
import client from '@/libs/pocketbase';

interface IProp {
  id: string;
}

const deleteProduct = async ({ id }: IProp) => {
  await client.collection('products').delete(id);
};

export default deleteProduct;
