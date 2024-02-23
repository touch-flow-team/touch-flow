'use client';

import Modal from '../common/Modal';
import Button from './Button';
import CreateCategoryForm from './ManageCategoryForm';

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center ">
      <strong className="text-2xl">카테고리</strong>
      <Modal
        title="카테고리 추가"
        trigger={<Button text="카테고리 추가" size="md" />}
        InnerComponent={<CreateCategoryForm mode="create" />}
      />
    </header>
  );
};

export default Header;
