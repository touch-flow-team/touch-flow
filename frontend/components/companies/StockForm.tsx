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
import { imageSrc } from "@/libs/utils"
import { getImageData } from "@/libs/getImageData"
import { useParams, useRouter } from "next/navigation"
import client from "@/libs/pocketbase"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import { revalidateTag } from "next/cache"
import { updateStock } from "@/server-actions/stocks/stocks"

const StockForm = ({ data }: StockFormProps) => {
    const params = useParams()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: data ? data.productName : "",
            image: data && data?.image,
            categoryName: data ? data.categoryName : "",
            purchaseAmount: data && String(data.purchaseAmount),
            saleAmount: data && String(data.saleAmount),
            brandName: data ? data.brandName : "",
            currentCount: data && String(data.currentCount),
            safeCount: data && String(data.safeCount),
        },
    })

    const [preview, setPreview] = useState(
        data
            ? imageSrc({ collection_id: 'stocks', record_id: data.id, file_name: data?.image })
            : '',
    );

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newData = new FormData();
        newData.append('productName', values.productName);
        newData.append('categoryName', values.categoryName);
        newData.append('purchaseAmount', Number(values.purchaseAmount).toString());
        newData.append('saleAmount', Number(values.saleAmount).toString());
        newData.append('brandName', values.brandName);
        newData.append('safeCount', Number(values.safeCount).toString());
        newData.append('currentCount', Number(values.currentCount).toString());
        newData.append('companies', String(params?.id));
        newData.append('image', values.image);

        try {
            if (data) {
                await updateStock({ id: data.id, formData: newData })
                    .then(() => { router.push(`/companies/${String(params?.id)}/stocks`) })
            } else {
                const record = await client.collection(PB_COLLECTIONS.STOCKS).create(newData)
                    .then(() => router.push(`/companies/${String(params?.id)}/stocks`))
            }
        } catch (e) {
            alert(e)
        }


    }

    const amountPlaceHolder = data ? "현재 수량을 입력하세요." : "초기 수량을 입력하세요."

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
                            name="image"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <Input
                                                type="file"
                                                {...rest}
                                                onChange={(event) => {
                                                    const selectedFile = event.target.files && event.target.files.length > 0
                                                        ? event.target.files[0]
                                                        : null;

                                                    if (!selectedFile) {
                                                        return
                                                    }

                                                    const displayUrl = getImageData(selectedFile);

                                                    if (displayUrl !== "no file") {
                                                        setPreview(displayUrl);
                                                    }
                                                    onChange(selectedFile);
                                                }}
                                                className="w-[50%]"
                                            />
                                            <picture className="w-[150px] h-[150px] relative ">
                                                {preview && <Image src={preview} alt="product image" fill />}
                                            </picture>
                                        </div>
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
                                        <Input type="number" placeholder={amountPlaceHolder} {...field} />
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
