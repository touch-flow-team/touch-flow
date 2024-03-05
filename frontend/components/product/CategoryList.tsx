import Link from 'next/link';
import { Button } from '../ui/button';
import { ICategory } from '@/types/category/type';

const CategoryList = ({ categories }: { categories: Pick<ICategory, 'name' | 'id'>[] }) => {
  return (
    <ul className="flex gap-3">
      <Link href={'?page=1&category=all'}>
        <Button>전체</Button>
      </Link>
      {categories.map((category) => {
        return (
          <Link href={`?page=1&category=${category.id}`} key={category.id}>
            <Button>{category.name}</Button>
          </Link>
        );
      })}
    </ul>
  );
};

export default CategoryList;
