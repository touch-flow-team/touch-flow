'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ICategory } from '@/types/category/type';
import { useRouter } from 'next/navigation';

const CategoryList = ({ categories }: { categories: Pick<ICategory, 'name' | 'id'>[] }) => {
  const router = useRouter();
  return (
    <ul className="flex gap-3">
      <Button onClick={() => router.push('?page=1&category=all')}>전체</Button>
      {categories.map((category) => {
        return (
          <Button key={category.id} onClick={() => router.push(`?page=1&category=${category.id}`)}>
            {category.name}
            <Link href={`?page=1&category=${category.id}`} />
          </Button>
        );
      })}
    </ul>
  );
};

export default CategoryList;
