import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

interface IProps {
  trigger: React.ReactElement;
  title: string;
  InnerComponent: React.ReactElement;
}

const Modal = ({ title, trigger, InnerComponent }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">{title}</DialogTitle>
          <DialogDescription>{InnerComponent}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
