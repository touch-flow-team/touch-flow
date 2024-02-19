"use client"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
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



const FormSchema = z.object({
    number: z.number().default(0)

})

interface WaitingSettingsModalProps {
    label: string
    description: string
}

const WaitingSettingsModal = ({ label, description }: WaitingSettingsModalProps) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            number: 0
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
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="h-5 w-5 flex items-center cursor-pointer" onClick={() => setOpen(true)}>
                <ChevronRight className="h-5 w-5" />
            </div>
            <DialogContent className="flex flex-col max-w-[600px] rounded-lg justify-between p-16">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={label} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {}
                                    </FormDescription>
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