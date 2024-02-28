"use client"

import { formSchema } from "@/schemata/stocks/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { StockFormProps } from "@/types/stock/types"

const StockForm = ({ data }: StockFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: data ? data.productName : "",
            image: data ? data.image : "",
            categoryName: data ? data.categoryName : "",
            purchaseAmount: data ? data.purchaseAmount : 0,
            saleAmount: data ? data.saleAmount : 0,
            brandName: data ? data.brandName : "",
            currentCount: data ? data.currentCount : 0,
            safeCount: data ? data.safeCount : 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const [selectedFile, setSelectedFile] = useState<string | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // 파일 내용을 읽은 후의 동작
                const result = reader.result as string;
                setSelectedFile(result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col space-y-2 mb-2">
                    <h4 className="text-[16px] font-bold">제품 정보</h4>
                    <div className="w-full h-[1px] bg-border"></div>
                </div>
                <div className="flex w-full items-center space-x-5 mb-2">
                    <div className="w-[10%]">
                        <span className="font-medium">제품명</span>
                    </div>
                    <div className="w-full ml-auto">
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="제품명을 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center space-x-5 mb-2">
                    <div className="w-[10%]">
                        <span className="font-medium">이미지</span>
                    </div>
                    <div className="w-full ml-auto">
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <>
                                            <Input id="picture" type="file" onChange={handleFileChange} />
                                            {selectedFile && (
                                                <div className="mt-2">
                                                    <Image
                                                        src={selectedFile}
                                                        alt="Preview"
                                                        className="rounded-md"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center space-x-5">
                    <div className="w-[10%]">
                        <span className="font-medium">가격 설정</span>
                    </div>
                    <div className="w-full ml-auto flex flex-row space-x-2">
                        <FormField
                            control={form.control}
                            name="purchaseAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="구매가를 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saleAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="판매가를 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 mt-10 mb-2">
                    <h4 className="text-[16px] font-bold">제품 속성</h4>
                    <div className="w-full h-[1px] bg-border"></div>
                </div>
                <div className="flex w-full items-center space-x-5 mb-2">
                    <div className="w-[10%]">
                        <span className="font-medium">카테고리</span>
                    </div>
                    <div className="w-full ml-auto">
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="카테고리를 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center space-x-5">
                    <div className="w-[10%]">
                        <span className="font-medium">브랜드</span>
                    </div>
                    <div className="w-full ml-auto">
                        <FormField
                            control={form.control}
                            name="brandName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="브랜드 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 mt-10 mb-2">
                    <h4 className="text-[16px] font-bold">재고 수량 설정</h4>
                    <div className="w-full h-[1px] bg-border"></div>
                </div>

                <div className="flex w-full items-center space-x-5">
                    <div className="w-[10%]">
                        <span className="font-medium">수량 설정</span>
                    </div>
                    <div className="w-full ml-auto flex flex-row space-x-2">
                        <FormField
                            control={form.control}
                            name="currentCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="초기수량을 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="safeCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="안전수량을 입력하세요." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="mt-8">
                    {
                        data ? (
                            <Button type="submit">제품 수정</Button>
                        ) : (
                            <Button type="submit">제품 생성</Button>
                        )
                    }
                </div>
            </form>
        </Form>
    )
}

export default StockForm
