import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

const MENU = [
  {
    url: '/companies/1/calendar',
    name: '매출달력',
  },
  {
    url: '/companies/1/dashboard',
    name: '대시보드',
  },
  {
    url: '/companies/1/product',
    name: '상품관리',
  },
  {
    url: '/companies/1/category',
    name: '카테고리',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-lvh w-full">
        <div className="w-[200px] h-full bg-gray-200 p-10 ">
          <ul>
            {MENU.map((e) => (
              <li className="mb-3" key={e.url}>
                <Link href={e.url}>{e.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center w-full relative">{children}</div>
        <Toaster />
      </div>
    </>
  );
}
