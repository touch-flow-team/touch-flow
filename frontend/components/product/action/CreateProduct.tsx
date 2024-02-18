'use server';
import { revalidateTag } from 'next/cache';
import PocketBase from 'pocketbase';

interface IProp {
  name: string;
  price: number;
  description: string;
  category: string;
}

const CreateProduct = async (data: IProp) => {
  const { name, category, price, description } = data;

  await fetch('http://127.0.0.1:8090/api/collections/products/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category, description }),
  })
    .then(() => {
      revalidateTag('PRODUCT');
    })
    .catch((err) => console.log(err));

  // await fetch('http://127.0.0.1:8090/api/collections/categorys/records', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name }),
  // })
  //   .then(() => {
  //     revalidateTag('CATEGORY');
  //   })
  //   .catch((err) => console.log(err));
};

export default CreateProduct;
