// hooks/useStockForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemata/stocks/schema';
import { useState } from 'react';
import { imageSrc } from '@/libs/utils';
import { StockFormProps } from '@/types/stock/types';
import { useRouter, useParams } from 'next/navigation';
import client from '@/libs/pocketbase';
import { PB_COLLECTIONS } from '@/constants/constants';
import { updateStock } from '@/server-actions/stocks/stocks';
import { z } from 'zod';

export const useStockForm = (data?: StockFormProps['data']) => {
  const params = useParams();
  const router = useRouter();
  const stocksURL = `/companies/${String(params?.id)}/stocks`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: data ? data.productName : '',
      image: data && data?.image,
      categoryName: data ? data.categoryName : '',
      purchaseAmount: data && String(data.purchaseAmount),
      saleAmount: data && String(data.saleAmount),
      brandName: data ? data.brandName : '',
      currentCount: data && String(data.currentCount),
      safeCount: data && String(data.safeCount),
    },
  });

  const [preview, setPreview] = useState(
    data ? imageSrc({ collection_id: 'stocks', record_id: data.id, file_name: data?.image }) : '',
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        await updateStock({ id: data.id, formData: newData }).then(() => {
          router.push(stocksURL);
        });
      } else {
        const record = await client
          .collection(PB_COLLECTIONS.STOCKS)
          .create(newData)
          .then(() => router.push(stocksURL));
      }
    } catch (e) {
      alert(e);
    }
  };

  const amountPlaceHolder = data ? '현재 수량을 입력하세요.' : '초기 수량을 입력하세요.';

  return { form, preview, setPreview, onSubmit, amountPlaceHolder, stocksURL };
};
