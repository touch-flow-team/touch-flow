"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ComboboxFormData, Companies } from "@/types/companies/type"
import { ComboboxSchema } from "@/schemata/companies/validation"
import Link from "next/link"


export function Combobox({ currentCompany, setCurrentCompany, companies }: { currentCompany: string, setCurrentCompany: Function, companies: Companies }) {
    const form = useForm<ComboboxFormData>({
        resolver: zodResolver(ComboboxSchema),
    })

    function onSubmit(data: ComboboxFormData) {
        setCurrentCompany(data.company)
        localStorage.setItem("currentCompany", data.company)
        if (data.company == currentCompany) return
        toast({
            title: `회사가 변경 되었습니다`,
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-x-4 flex">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={currentCompany}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your company" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {companies.map((company) => {
                                            return <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    )
}
