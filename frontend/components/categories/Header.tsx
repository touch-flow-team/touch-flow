'use client';

import { useState } from 'react';
import Modal from '../common/Modal';
import Button from './Button';
import ManageCategoryForm from './ManageCategoryForm';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center ">
      <strong className="text-2xl">카테고리</strong>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="카테고리 추가"
        trigger={<Button text="카테고리 추가" size="md" />}
        InnerComponent={<ManageCategoryForm mode="create" setModalOpen={setIsModalOpen} />}
      />
    </header>
  );
};

export default Header;
