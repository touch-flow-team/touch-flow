'use client';

import { Button } from '@/components/ui/button';
import Modal from '../common/Modal';
import CreateCategoryForm from './CreateCategoryForm';

const Header = () => {
  return (
    <header className="w-full flex justify-between">
      <strong className="text-2xl">상품</strong>
      <Modal
        title="카테고리 추가"
        trigger={<Button>+ 카테고리 추가</Button>}
        InnerComponent={<CreateCategoryForm mode="create" />}
      />
    </header>
  );
};

export default Header;
