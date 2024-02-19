import { Button } from '../ui/button';

export interface ICategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

const Categories = ({ categories }: { categories: string[] }) => {
  return (
    <ul className="flex gap-3">
      <li>
        <Button>전체</Button>
      </li>
      {categories.map((category) => {
        return (
          <li>
            <Button>{category}</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
