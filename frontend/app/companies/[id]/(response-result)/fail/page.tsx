import StepIndicator from '@/components/companies/StepIndicator';
import Image from 'next/image';
import Link from 'next/link';

export default function FailPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex w-72 mb-8">
                <StepIndicator />
            </div>
            <div className=' my-12'>
                <Image className=' rounded-full border' src="/logo.png" alt="Success" width={140} height={140} />
            </div>
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">❌ 결제에 실패했습니다.</h1>
                <p className="text-gray-400 mt-3 text-sm">주문과정에서 알수없는 에러가 발생했습니다. 관리자에게 문의 하세요.</p>
            </div>
            <Link href={`/companies/${id}`} className="bg-orange-500 mt-8 text-white px-20 py-4 rounded">
                키오스크로 돌아가기
            </Link>
        </div>
    );
}