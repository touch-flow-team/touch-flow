import { Button } from '../ui/button';
import { IResult } from '@/app/companies/[id]/(admin)/product/page';
interface ICategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

const Categories = async () => {
  const categroies: IResult<ICategory> = await fetch(
    'http://127.0.0.1:8090/api/collections/categorys/records',
    { next: { tags: ['CATEGORY'], revalidate: 10 } },
  ).then((res) => res.json());

  return (
    <ul className="flex gap-3">
      <li>
        <Button>전체</Button>
      </li>
      {categroies.items.map((category) => {
        return (
          <li>
            <Button>{category.name}</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
