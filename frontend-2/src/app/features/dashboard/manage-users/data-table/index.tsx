
import { useState } from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Pagination } from "@/app/components/data-table/pagination"
import { TableUi } from "@/app/components/data-table/table-ui"
import { Toolbar } from "./toolbar"

export default function DataTable({
  data,
  columns,
  columnVisibilityState,
}: {
  data: any,
  columns: any,
  columnVisibilityState: any,
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(columnVisibilityState || {})
    // {
    //   title: true,
    //   name: true,
    //   publisher: true,
    //   doi: true,
    //   scopusIndexed: true,
    //   sciIndexed: true,
    //   escIndexed: true,
    //   otherIndexed: true,
    //   link: true,
    //   media: true,
    //   impactFactor: true,
    //   status: true,
    // }
  const [rowSelection, setRowSelection] = useState({})
 
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })
 
  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <TableUi table={table} columns={columns} />
      <Pagination table={table} />
    </div>
  )
}