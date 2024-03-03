'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { IUpdateProp } from '@/types/stock/types';
import { Input } from '../ui/input';
import { updateStockCount } from '@/server-actions/stocks/stocks';
import { STOCK_MODE } from '@/constants/constants';

const StockUpdateModal = ({ data, mode }: IUpdateProp) => {
    const [open, setOpen] = useState(false)
    const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
    const updateHandler = async () => {
        data.map(async (d) => {
            const new_d = {
                ...d.original,
                currentCount: inputValues[d?.original?.id] ? Number(inputValues[d?.original?.id]) : d?.original?.currentCount
            }
            await updateStockCount({ id: d?.original?.id, data: new_d })
        })

        setOpen((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 현재의 상태 복사
        const updatedInputValues = { ...inputValues };
        // 해당 Input 태그의 이름에 따라 상태를 업데이트
        updatedInputValues[name] = Number(value);

        // 업데이트된 상태를 설정
        setInputValues(updatedInputValues);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button disabled={data.length <= 0} onClick={() => setOpen(true)} variant="secondary">
                    선택 요소 {mode}
                </Button>
                <DialogContent className="flex flex-col max-w-[800px] rounded-lg justify-between p-16">
                    <ul className='flex flex-col space-y-2'>
                        {
                            data.map((d) => {
                                return (
                                    <li key={d?.original?.id} className='flex space-x-1'>
                                        <span className='w-[80%]'>{d?.original?.productName}</span>
                                        {
                                            mode === STOCK_MODE.IN ? (
                                                <Input type='number'
                                                    name={d?.original?.id}
                                                    value={inputValues[d?.original?.id] ? inputValues[d?.original?.id] : d?.original?.currentCount}
                                                    onChange={handleInputChange} 
                                                    min={`${d?.original?.currentCount}`}
                                                />
                                            ) : (
                                                <Input type='number'
                                                    name={d?.original?.id}
                                                    value={inputValues[d?.original?.id] ? inputValues[d?.original?.id] : d?.original?.currentCount}
                                                    onChange={handleInputChange} 
                                                    max={`${d?.original?.currentCount}`}
                                                />
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="flex justify-end">
                        <Button className="w-[120px]" onClick={updateHandler}>
                            {mode} 완료
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StockUpdateModal;
