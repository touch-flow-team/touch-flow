'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { IStockHistoryCreate, IUpdateProp } from '@/types/stock/types';
import { Input } from '../../ui/input';
import { addStockHistory, updateStockCount } from '@/server-actions/stocks/stocks';
import { STOCK_MODE } from '@/constants/constants';
import { useToast } from '@/components/ui/use-toast';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { ChevronRight } from 'lucide-react';

const StockUpdateModal = ({ data, mode }: IUpdateProp) => {
    const [open, setOpen] = useState(false)
    const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
    const { toast } = useToast();

    const updateHandler = async () => {
        let flag = true
        data.map(async (d) => {
            // validation
            if (!inputValues[d?.original?.id] || inputValues[d?.original?.id] === Number(d.original?.currentCount)) {
                toast({
                    variant: "destructive",
                    title: `${mode}량을 기존과 다르게 설정해주세요.`
                })
                flag = false
                return
            }
            if (mode === STOCK_MODE.IN) {
                if (inputValues[d?.original?.id] && inputValues[d?.original?.id] <= d?.original?.currentCount) {
                    toast({
                        variant: "destructive",
                        title: "입고량은 기존 수량보다 많아야 합니다."
                    })
                    flag = false
                    return
                }
            } else {
                if (inputValues[d?.original?.id] && inputValues[d?.original?.id] >= d?.original?.currentCount) {
                    toast({
                        variant: "destructive",
                        title: "출고량은 기존 수량보다 적어야 합니다."
                    })
                    flag = false
                    return
                }
            }
        })

        // update 를 수행하지 않음
        if (!flag) {
            return
        }

        data.map(async (d) => {
            const new_d = {
                ...d.original,
                currentCount: inputValues[d?.original?.id] ? Number(inputValues[d?.original?.id]) : d?.original?.currentCount
            }
            // console.log(inputValues[d?.original?.id]);

            const new_history: IStockHistoryCreate = {
                past_count: d?.original?.currentCount,
                current_count: inputValues[d?.original?.id] ? inputValues[d?.original?.id] : d?.original?.currentCount,
                mode: mode === STOCK_MODE.IN ? 'in' : 'out',
                companies: d.original?.companies,
                stocks: d.original?.id
            }

            await updateStockCount({ id: d?.original?.id, data: new_d })
            await addStockHistory(new_history)
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
                <DialogContent className="flex flex-col space-y-10 max-w-[800px] rounded-lg justify-between p-16">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{mode}</DialogTitle>
                        <DialogDescription className="text-lg">{mode}할 물품 개수를 선택해주세요.</DialogDescription>
                    </DialogHeader>
                    <ul className='flex flex-col space-y-5'>
                        {
                            data.map((d) => {
                                return (
                                    <li key={d?.original?.id} className='flex flex-col space-y-2 justify-center items-start'>
                                        <div>
                                            <span className='text-[20px] font-bold'>{d?.original?.productName}</span>
                                        </div>
                                        <div className='flex w-full items-center space-x-4'>
                                            <div className='w-[40%] flex space-x-1 items-center'>
                                                <span className='font-medium text-[18px]'>기존 재고 수: {d?.original?.currentCount}</span>
                                                <ChevronRight className="h-6 w-6" />
                                            </div>
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
                                        </div>
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
