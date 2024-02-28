import Header from '@/components/display-order/Header';
import OrderList from '@/components/display-order/OrderList';
import PageController from '@/components/display-order/PageController';
import { ORDER_DISPLAY_PAGINATION_SIZE, ORDER_MOCK_DATA } from '@/constants/constants';
export default function DisplayOrderPage({
  searchParams,
}: {
  searchParams: { page: string; status: 'prepare' | 'complete' };
}) {
  const page = searchParams.page;
  const TOTAL_PAGE = Math.ceil(ORDER_MOCK_DATA.length / ORDER_DISPLAY_PAGINATION_SIZE);

  return (
    <div className="relative h-lvh">
      <Header />
      <OrderList page={Number(page)} status={searchParams.status} />
      <PageController page={Number(page)} total_page={TOTAL_PAGE} status={searchParams.status} />
    </div>
  );
}
