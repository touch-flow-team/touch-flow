'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FaAngleLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[100px] flex justify-center items-center bg-gray-200">
      <Button className="absolute left-6 bg-gray-200 hover:bg-gray-200">
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs defaultValue="account" className="w-[50%] flex justify-center">
        <TabsList className="w-full">
          <TabsTrigger
            value="account"
            className="w-full"
            onClick={() => router.push(`?status=prepare&page=1`)}>
            접수
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="w-full"
            onClick={() => router.push(`?status=complete&page=1`)}>
            완료
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Header;
