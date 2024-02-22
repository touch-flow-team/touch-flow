import { Button } from '../ui/button';
import Modal from '../common/Modal';
import CreateProductForm from './CreateProductForm';
import { getCategories } from '@/app/actions/category/getCategory';

const Header = async () => {
  const category_info = await getCategories();
  return (
    <header className="w-full flex justify-between">
      <strong className="text-2xl">상품</strong>
      <Modal
        title="상품 추가"
        trigger={<Button>+ 상품 추가</Button>}
        InnerComponent={<CreateProductForm categories={category_info} mode="create" />}
      />
    </header>
  );
};

export default Header;
