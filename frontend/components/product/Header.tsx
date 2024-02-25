import Button from '../categories/Button';
import Modal from '../common/Modal';
import CreateProductForm from './CreateProductForm';
import { getCategories } from '@/server-actions/categories/category';

const Header = async () => {
  const category_info = await getCategories();
  return (
    <header className="w-full flex justify-between">
      <strong className="text-2xl">상품</strong>
      <Modal
        title="상품 추가"
        trigger={<Button text="상품 추가" size="md" />}
        InnerComponent={<CreateProductForm categories={category_info} mode="create" />}
      />
    </header>
  );
};

export default Header;
