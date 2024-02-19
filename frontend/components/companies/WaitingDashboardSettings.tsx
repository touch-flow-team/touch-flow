"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Textarea } from "../ui/textarea"



const FormSchema = z.object({
    waiting_enabled: z.boolean().default(false).optional(),
    estimated_waiting_time: z.number().default(0).optional(),
    rules_enabled: z.boolean().default(false).optional(),
    rules_content: z.string().default("")

})

export function WaitingDashboardSettings() {
    const { toast } = useToast()
    const [waitingEnabled, setWaitingEnabled] = useState(false)
    const [estimatedWaitingTime, setEstimatedWaitingTime] = useState(0)
    const [limitPerson, setLimitPerson] = useState(0)
    const [rulesEnabled, setRulesEnabled] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            waiting_enabled: false,
            rules_enabled: false
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-[24px] font-bold">웨이팅 관련 설정</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="waiting_enabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            웨이팅 사용 여부
                                        </FormLabel>
                                        <FormDescription>
                                            웨이팅 기능 사용 여부를 체크해주세요.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={waitingEnabled}
                                            onCheckedChange={() => {
                                                setWaitingEnabled((prev) => !prev)
                                                toast({
                                                    title: "변경 사항이 저장되었습니다.",

                                                })
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {
                            waitingEnabled && (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-row pl-1">
                                        <FormLabel className="text-base">예상 대기 시간</FormLabel>
                                        <div className="ml-auto flex flex-row items-center space-x-2">
                                            <span className="text-black font-medium"> 팀 당 {estimatedWaitingTime} 분</span>
                                            <Button className="h-6 w-6" variant="outline" size="icon">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-row pl-1">
                                        <FormLabel className="text-base">최대 인원</FormLabel>
                                        <div className="ml-auto flex flex-row items-center space-x-2">
                                            <span className="text-black font-medium"> 팀 당 {limitPerson} 명</span>
                                            <Button className="h-6 w-6" variant="outline" size="icon">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="rules_enabled"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">유의 사항 문구 설정</FormLabel>
                                                    <FormDescription>
                                                        유의 사항으로 보여줄 문구 설정 여부를 체크해주세요.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={rulesEnabled}
                                                        onCheckedChange={() => {
                                                            setRulesEnabled((prev) => !prev)
                                                            toast({
                                                                title: "변경 사항이 저장되었습니다.",

                                                            })
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        rulesEnabled && (
                                            <FormField
                                                control={form.control}
                                                name="rules_content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>유의 사항</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="유의 사항 문구를 직접 입력해주세요."
                                                                className="resize-none"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            미입력시 기본 문구로 설정 됩니다.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        </Form>
    )
}
