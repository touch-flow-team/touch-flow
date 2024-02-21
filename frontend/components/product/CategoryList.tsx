'use client';

import { Button } from '../ui/button';
import { ICategory } from '@/app/companies/[id]/(admin)/category/page';

interface IProp {
  categories: Pick<ICategory, 'name' | 'id'>[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

// client
const CategoryList = ({ categories, setSelectedCategory }: IProp) => {
  return (
    <ul className="flex gap-3">
      <li>
        <Button onClick={() => setSelectedCategory('all')}>전체</Button>
      </li>
      {categories.map((category) => {
        return <Button onClick={() => setSelectedCategory(category.id)}>{category.name}</Button>;
      })}
    </ul>
  );
};

export default CategoryList;
