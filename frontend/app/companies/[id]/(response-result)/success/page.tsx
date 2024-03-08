import StepIndicator from '@/components/companies/StepIndicator';
import Image from 'next/image';
import Link from 'next/link';

export default function SuccessPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex w-72 mb-8">
                <StepIndicator />
            </div>
            <div className=' my-12'>
                <Image className=' rounded-full border' src="/logo.png" alt="Success" width={140} height={140} />
            </div>
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">✅ 결제가 성공적으로 처리되었습니다.</h1>
                <p className="text-gray-400 mt-3 text-sm">조금만 기다려주시면 곧 상품을 받을 수 있습니다.</p>
            </div>
            <Link href={`/companies/${id}`} className="bg-orange-500 mt-8 text-white px-20 py-4 rounded">
                키오스크로 돌아가기
            </Link>
        </div>
    );
}