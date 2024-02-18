import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import CreateForm from './CraeteProductForm';

interface IProps {
  trigger: React.ReactElement;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ trigger, open, setOpen }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger onClick={() => setOpen((prev) => !prev)}>{trigger}</DialogTrigger>
      <DialogContent className="min-w-[40%]">
        <DialogHeader>
          <DialogTitle className="mb-5">카테고리 추가</DialogTitle>
          <DialogDescription>
            <CreateForm setOpen={setOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
