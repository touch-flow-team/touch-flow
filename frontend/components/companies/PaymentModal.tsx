"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import PaymentItem from "./PaymentItem";

const PaymentModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-center mt-10 bg-main w-full py-4 rounded-full text-white">결제 진행하기</button>
            </DialogTrigger>
            <DialogContent className="max-w-[1450px] rounded-lg flex justify-between p-24">
                <div className="w-[850px]">
                    <DialogHeader className="flex">
                        <div>
                            <DialogTitle className="text-2xl">장바구니 목록</DialogTitle>
                            <DialogDescription>총 4가지의 상품이 담겼습니다.</DialogDescription>
                        </div>
                    </DialogHeader>
                    <ul className="mt-10">
                        <PaymentItem />
                        <PaymentItem />
                        <PaymentItem />
                        <PaymentItem />
                    </ul>
                </div>
                <div className="bg-gray-200 shadow-xl ml-10 w-[600px] rounded-lg"></div>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentModal