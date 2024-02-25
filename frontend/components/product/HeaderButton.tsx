'use client';
import { useState } from 'react';
import Button from '../categories/Button';
import Modal from '../common/Modal';
import ProductManageForm from './ProductManageForm';
import { ICategory } from '@/types/category/type';

const HeaderButton = ({ data }: { data: Pick<ICategory, 'name' | 'id'>[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      title="상품 추가"
      trigger={<Button text="상품 추가" size="md" />}
      InnerComponent={
        <ProductManageForm categories={data} mode="create" setModalOpen={setIsModalOpen} />
      }
    />
  );
};

export default HeaderButton;
