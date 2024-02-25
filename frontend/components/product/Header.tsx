import { getCategories } from '@/server-actions/categories/category';
import HeaderButton from './HeaderButton';
import { ICategory } from '@/types/category/type';

const Header = async () => {
  const category_info: Pick<ICategory, 'name' | 'id'>[] = await getCategories();
  return (
    <header className="w-full flex justify-between">
      <strong className="text-2xl">상품</strong>
      <HeaderButton data={category_info} />
    </header>
  );
};

export default Header;
