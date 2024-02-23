'use client';

import { IResult } from '@/app/companies/[id]/(dashboard-admin)/product/page';
import CategoryList from './CategoryList';
import ProductTable, { IProduct } from './ProductTable';
import { ICategory } from '@/app/companies/[id]/(dashboard-admin)/category/page';
import { useState } from 'react';

interface IProp {
  products: IResult<IProduct>;
  categories: Pick<ICategory, 'name' | 'id'>[];
}

const ClientLayer = ({ products, categories }: IProp) => {
  const [seletedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="flex flex-col gap-10">
      <CategoryList categories={categories} setSelectedCategory={setSelectedCategory} />
      <ProductTable products={products} categories={categories} seletedCategory={seletedCategory} />
    </div>
  );
};

export default ClientLayer;
