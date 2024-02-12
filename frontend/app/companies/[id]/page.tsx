import CategoryList from "@/components/companies/CategoryList";
import MenuCard from "@/components/companies/MenuCard";
import PaymentModal from "@/components/companies/PaymentModal";
import Search from "@/components/companies/Search";
import ShopingCartItem from "@/components/companies/ShopingCartItem";
import StepIndicator from "@/components/companies/StepIndicator";

interface IParams {
    params: { id: string };
}

export default function Company({ params: { id } }: IParams) {
    return (
        <>
            <div className='mx-auto max-w-[1250px] flex  bg-gray-50'>
                <div className='border pb-14 w-[75%]'>
                    <div className='flex items-center px-10 h-[95px] mb-7 border-b bg-white w-full'>
                        <Search />
                    </div>
                    <div className='px-14 '>
                        <CategoryList />
                        <h4 className='mt-7 text-2xl font-semibold'>커피 메뉴</h4>
                        <div className='mt-5 grid grid-cols-2 gap-4 '>
                            <MenuCard />
                            <MenuCard />
                            <MenuCard />
                            <MenuCard />
                        </div>
                    </div>
                </div>
                <div className=" w-[25%]">
                    <div className='h-[95px] flex justify-around border border-l-0 bg-white'>
                        <StepIndicator />
                    </div>
                    <div className="p-7">
                        <h4 className="flex justify-between items-center text-xl font-bold">장바구니<span className="text-sm font-normal text-gray-400">order #3252</span></h4>
                        <ul>
                            <ShopingCartItem />
                            <ShopingCartItem />
                            <ShopingCartItem />
                        </ul>
                        <div className="text-gray-400 mt-7">
                            <p className="flex justify-between text-sm">물품 가격<span className=" text-gray-600">₩30,000</span></p>
                            <p className="flex justify-between text-sm mt-3">할인률<span className=" text-red-600 line-through">₩3,000</span></p>
                            <p className="flex justify-between text-sm mt-10 text-gray-900">전체<span className=" text-gray-600">₩27,000</span></p>
                        </div>
                        <PaymentModal />
                        {/* <button className="text-center mt-10 bg-main w-full py-4 rounded-full text-white">결제 진행하기</button> */}
                    </div>
                </div>
            </div>

        </>
    );
}
