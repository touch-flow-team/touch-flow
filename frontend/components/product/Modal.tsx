import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { ICategory } from './Categories';
import CreateProductForm from './CreateProductForm';

interface IProps {
  trigger: React.ReactElement;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Pick<ICategory, 'name' | 'id'>[];
}

const Modal = ({ trigger, open, setOpen, categories }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen((prev) => !prev)}>{trigger}</DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle className="mb-5">상품 추가</DialogTitle>
          <DialogDescription>
            <CreateProductForm categories={categories} setOpen={setOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
