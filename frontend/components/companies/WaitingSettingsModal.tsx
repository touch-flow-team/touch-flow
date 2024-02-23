"use client"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ManagementWaitCreateParams } from "@/constants/interface"
import client from "@/libs/pockebase"


const FormSchema = z.object({
    number: z.coerce.number(),

})

interface WaitingSettingsModalProps {
    label: string
    manageId: string
    manageData: ManagementWaitCreateParams
    name: string
}

const WaitingSettingsModal = ({ label, manageId, manageData, name }: WaitingSettingsModalProps) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            number: 0
        },
    })

    const onSubmitModal = async (data: z.infer<typeof FormSchema>) => {
        console.log(data["number"]);

        let newData: ManagementWaitCreateParams = {
            ...manageData
        }

        if (name === "estimated_waiting_time") {
            newData = {
                ...manageData,
                "estimated_waiting_time": Number(data["number"])
            };
        } else {
            newData = {
                ...manageData,
                "limit_persons": Number(data["number"])
            };
        }

        const record = await client.collection('management_waits').update(manageId, newData);
        if (record) {
            setOpen(false)
            toast({
                title: "변경 사항이 저장되었습니다.",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="h-5 w-5 flex items-center cursor-pointer" onClick={() => setOpen(true)}>
                <ChevronRight className="h-5 w-5" />
            </div>
            <DialogContent className="flex flex-col max-w-[600px] rounded-lg justify-between p-16">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitModal)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder={label} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">저장</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default WaitingSettingsModal