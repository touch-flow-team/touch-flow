import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface IProps {
  current_page: number | null;
  total_page: number;
  filter: string;
}

const ProductPagination = ({ current_page, total_page, filter }: IProps) => {
  const page = Array(total_page).fill(0);

  return (
    <>
      {
        current_page ? (
          <Pagination className="mb-[100px]" >
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${current_page - 1}&category=${filter}`}
                  className={current_page <= 1 ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
              {page.map((_, idx) => {
                return (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href={`?page=${idx + 1}&category=${filter}`}
                      isActive={idx === current_page - 1}>
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href={`?page=${current_page + 1}&category=${filter}`}
                  className={current_page >= total_page ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination >) : (
          <div className="text-3xl font-normal w-full h-[100px] flex justify-center items-center">
            No Result
          </div >
        )};
    </>
  );
};

export default ProductPagination;
