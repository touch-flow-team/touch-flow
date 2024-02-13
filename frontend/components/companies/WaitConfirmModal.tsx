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
import ConterButton from "./ConterButton"
import { Button } from "../ui/button"


const WaitConfirmModal = () => {
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

    const handleClickOk = () => {
        setOpenConfirm(true)
    }

    const handleClickBack = () => {
        setOpenConfirm(false)
    }

    const handleClickConfirm = () => {
        // API call and refetch
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='flex justify-center bg-background items-center py-12'>
                    <span className='font-bold text-[20px] text-main'>웨이팅 접수</span>
                </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-[800px] rounded-lg flex justify-between p-16">
                <div className="w-[700px]">
                    {
                        !openConfirm ? (
                            <>
                                <DialogHeader className="flex">
                                    <div>
                                        <DialogTitle className="text-xl">인원수</DialogTitle>
                                        <DialogDescription>입장할 인원 수를 설정해주세요.</DialogDescription>
                                    </div>
                                </DialogHeader>
                                <ul className="flex w-full mt-10 space-x-12">
                                    <li className="flex flex-row space-x-4 items-center">
                                        <span className="font-medium text-small">성인 (중학생 이상)</span>
                                        <ConterButton />
                                    </li>
                                    <li className="flex flex-row space-x-4 items-center">
                                        <span className="font-medium text-small">아동 (초등학생 이하)</span>
                                        <ConterButton />
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <DialogHeader className="flex">
                                    <div>
                                        <DialogTitle className="text-xl">웨이팅 확정</DialogTitle>
                                        <DialogDescription>주의 사항을 확인해주세요.</DialogDescription>
                                    </div>
                                </DialogHeader>
                                <div className="flex w-full mt-4 rounded-[8px] bg-border">
                                    <ul className="flex flex-col p-8 space-y-4">
                                        <li className="">
                                            <span className="font-medium text-small">웨이팅 5분전에 재알람 드립니다.</span>
                                        </li>
                                        <li className="">
                                            <span className="font-medium text-small">예상 대기 시간과 실제 입장 시간이 다를 수 있습니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="flex flex-row">
                    <div className="w-full"></div>
                    {
                        !openConfirm ? (
                            <div className="flex w-full ml-auto justify-end">
                                <Button onClick={handleClickOk} className="bg-main hover:bg-background hover:text-main">확인</Button>
                            </div>
                        ) : (
                            <div className="flex w-full flex-row space-x-2 ml-auto justify-end">
                                <Button onClick={handleClickBack} className="bg-main hover:bg-background hover:text-main">이전</Button>
                                <Button onClick={handleClickConfirm} className="bg-main hover:bg-background hover:text-main">웨이팅 확정</Button>
                            </div>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default WaitConfirmModal