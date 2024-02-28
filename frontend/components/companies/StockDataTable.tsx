"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableProps, IStock } from "@/types/stock/types"
import { Button } from "../ui/button"
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"
import { useParams, useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { imageSrc } from "@/libs/utils"
import { PB_COLLECTIONS } from "@/constants/constants"
import StockDeleteModal from "./StockDeleteModal"

export const stockColumns: ColumnDef<IStock | undefined, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <div>이미지</div>
      )
    },
    cell: ({ row }) => {
      const record_id = row.original?.id ? row.original?.id : ""
      const file_name = row.original?.image

      return (
        <Image src={imageSrc({ collection_id: 'stocks', record_id, file_name })} width={70} height={70} alt={"images"} />
      )
    }
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <div>제품명</div>
      )
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <div>카테고리</div>
      )
    },
  },
  {
    accessorKey: "currentCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          재고 수
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const stock = row.original
      const router = useRouter()
      const params = useParams()

      return (
        <div className="flex flex-row space-x-1 justify-center">
          <Button onClick={() => router.push(`/companies/${String(params?.id)}/stocks/update/${stock?.id}`)} variant="outline" className="h-8 w-12">
            수정
          </Button>
        </div>
      )
    }
  }
]

export default function StockDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
  })

  return (
    <>
      <div className="flex space-x-2 items-center py-2">
        <Input
          placeholder="카테고리를 입력하세요."
          value={(table.getColumn("categoryName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("categoryName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <StockDeleteModal data={table.getFilteredSelectedRowModel().rows}/>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  )
}
