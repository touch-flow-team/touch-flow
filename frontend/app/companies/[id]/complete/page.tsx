import StepIndicator from '@/components/companies/StepIndicator';
import Image from 'next/image';

export default function CompletePage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex w-72 mb-8">
                <StepIndicator />
            </div>
            <div className=' my-12'>
                <Image className=' rounded-full border' src="/logo.png" alt="Success" width={140} height={140} />
            </div>
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">결제가 성공적으로 처리되었습니다.</h1>
                <p className="text-gray-400 mt-3 text-sm">조금만 기다려주시면 곧 상품을 받을 수 있습니다.</p>
            </div>
            <button className="bg-orange-500 mt-8 text-white px-20 py-4 rounded">
                메인페이지 돌아가기
            </button>
        </div>
    );
}
