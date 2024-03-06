"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../../ui/button"
import { ManagementWaitConfirmParams, WaitConfirmModalProps } from "@/types/waits/types"
import CounterButton from "../CounterButton"
import createUserWait from "../../../server-actions/waits/CreateUserWait"
import { phoneSchema } from "@/schemata/waits/schema"
import { useToast } from "../../ui/use-toast"

const WaitConfirmModal = ({ phoneNumber, setPhoneNumber, manageData, setIsFetching }: WaitConfirmModalProps) => {
    const [open, setOpen] = useState(false)
    const [validNumber, setValidNumber] = useState(true)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [adultCounter, setAdultCounter] = useState(0)
    const [childCounter, setChildCounter] = useState(0)
    const { toast } = useToast()

    const handleClickOk = () => {
        if (manageData.limit_persons < adultCounter + childCounter) {
            toast({
                variant: "destructive",
                title: "설정한 최대 인원 수보다 많아 웨이팅 진행이 불가합니다.",
                description: `해당 지점은 ${manageData.limit_persons} 명 까지 웨이팅 설정이 가능합니다.`
            })
            setOpen(false)
            return
        }
        setOpenConfirm(true)
    }

    const handleClickBack = async () => {
        setOpenConfirm(false)
    }

    const handleClickConfirm = async () => {
        try {
            console.log('manageData', manageData);

            phoneSchema.parse(phoneNumber);
            console.log("Valid phone number:", phoneNumber);
            const phoneNumberWithoutHyphen = phoneNumber.replace(/-/g, '');

            // API call - 웨이팅 확정 문자 발송 및 refetch 
            const data = {
                "user_phone_number": phoneNumberWithoutHyphen,
                "admission_status": false,
                "adult_persons": adultCounter,
                "child_persons": childCounter,
            }

            const idList: string[] = manageData.expand.user_waits ? manageData.expand.user_waits.map(item => item.id) : []

            const userWaitManageData = {
                "company": manageData.company,
                "waiting_enabled": manageData.waiting_enabled,
                "estimated_waiting_time": manageData.estimated_waiting_time,
                "limit_persons": manageData.limit_persons,
                "rules_enabled": manageData.rules_enabled,
                "rules_content": manageData.rules_content,
                "user_waits": idList
            }

            try {
                const record = await createUserWait(data, manageData.id, userWaitManageData);
                setIsFetching((prev) => !prev)
                setPhoneNumber("010-")
                setOpen(false)
                setValidNumber(true)
                setOpenConfirm(false)
                setAdultCounter(0)
                setChildCounter(0)
                console.log('User wait created:', record);
            } catch (error) {
                console.error('Error creating user wait:', error);
            }
            setOpen(false)
        } catch (error) {
            // API 에러
            setOpen(false)
        }
    }

    const handleWaitingCheck = () => {
        try {
            phoneSchema.parse(phoneNumber);
            console.log("Valid phone number:", phoneNumber);
        } catch (error) {
            // error handling - 팝업 내용 다르게
            console.log(error);
            setValidNumber(false)
        }

        setOpen(true)
    }

    const handleClickValidNumber = () => {
        window.location.reload() // 임시적으로 설정
        // setPhoneNumber("010-")
        // setValidNumber(true)
        // setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <button onClick={handleWaitingCheck} className='flex justify-center bg-background items-center py-12'>
                <span className='font-bold text-[28px] text-main'>웨이팅 접수</span>
            </button>
            <DialogContent className="flex flex-col max-w-[800px] rounded-lg justify-between p-16">
                {
                    validNumber ? (
                        <>
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
                                                    <CounterButton counter={adultCounter} setCounter={setAdultCounter} />
                                                </li>
                                                <li className="flex flex-row space-x-4 items-center">
                                                    <span className="font-medium text-small">아동 (초등학생 이하)</span>
                                                    <CounterButton counter={childCounter} setCounter={setChildCounter} />
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
                                            <div className="flex w-full mt-4 p-8 rounded-[8px] bg-border">
                                                <span className="font-medium text-small">
                                                    {manageData.rules_content}
                                                </span>
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
                        </>
                    ) : (
                        <>
                            <div className="w-[700px]">
                                <DialogHeader className="flex">
                                    <div>
                                        <DialogTitle className="text-xl">유효하지 않은 번호</DialogTitle>
                                        <DialogDescription>유효한 번호를 입력해주세요</DialogDescription>
                                    </div>
                                </DialogHeader>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-full"></div>
                                <div className="flex w-full ml-auto justify-end">
                                    <Button onClick={handleClickValidNumber} className="bg-main hover:bg-background hover:text-main">확인</Button>
                                </div>
                            </div></>

                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default WaitConfirmModal