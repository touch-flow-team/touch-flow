'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { IProp } from '@/types/stock/types';
import { deleteStock } from '@/server-actions/stocks/stocks';

const StockDeleteModal = ({ data }: IProp) => {
    const [open, setOpen] = useState(false)
    const deleteHandler = async () => {
        data.map( async (d) => {
            await deleteStock({id: d?.original?.id})
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
