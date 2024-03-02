'use client';
import { deleteCategory } from '@/server-actions/categories/category';
import { Button } from '@/components/ui/button';
import { deleteProduct } from '@/server-actions/products/product';
import Toast from '@/components/common/Toast';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Row } from '@tanstack/react-table';
import client from '@/libs/pocketbase';
import { PB_COLLECTIONS, REVALIDATE_TAG } from '@/constants/constants';
import { revalidateTag } from 'next/cache';

interface IProp {
    data: Row<any>[]
}

const StockDeleteModal = ({ data }: IProp) => {
    const [open, setOpen] = useState(false)
    const deleteHandler = async () => {
        data.map( async (d) => {
            await client.collection(PB_COLLECTIONS.STOCKS).delete(d?.original?.id)
                .then(() => revalidateTag(REVALIDATE_TAG.STOCK));
        })

        
        setOpen((prev) => !prev);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button disabled={data.length <= 0} onClick={() => setOpen(true)} variant="secondary">
                    선택 요소 삭제
                </Button>
                <DialogContent className="flex flex-col max-w-[800px] rounded-lg justify-between p-16">
                    <strong>선택된 내용들을 삭제하시겠습니까?</strong>
                    <ul className='flex flex-col space-y-2'>
                        {
                            data.map((d) => {
                                return (
                                    <li key={d?.original?.id}>{d?.original?.productName}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="flex justify-end">
                        <Button className="w-[120px]" onClick={deleteHandler}>
                            삭제
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StockDeleteModal;
