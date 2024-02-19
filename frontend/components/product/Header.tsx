'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import Modal from './Modal';
import { ICategory } from './Categories';
interface IProps {
  categories: Pick<ICategory, 'name' | 'id'>[];
}
const Header = ({ categories }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full flex justify-between">
      <strong className="text-2xl">상품</strong>
      <Modal
        trigger={<Button>+ 상품 추가</Button>}
        open={open}
        setOpen={setOpen}
        categories={categories}
      />
    </header>
  );
};

export default Header;
