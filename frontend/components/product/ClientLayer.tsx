'use client';

import CategoryList from './CategoryList';
import ProductTable from './ProductTable';
import { ICategory } from '@/types/category/type';
import { IProduct } from '@/types/product/type';
import { useState } from 'react';

interface IProp {
  products: IProduct[];
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
