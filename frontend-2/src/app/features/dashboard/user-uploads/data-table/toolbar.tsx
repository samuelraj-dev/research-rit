"use client"

import { Table } from "@tanstack/react-table"
import { PlusCircle, X } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

import { ViewOptions } from "@/app/components/data-table/view-options"
import { Link } from "@tanstack/react-router"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Toolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter papers by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      {/* <Link to="/dashboard/upload-paper">
        <Button variant="outline" size="sm" className="h-8 border-dashed mr-2">
          <PlusCircle />
          {"Add Paper"}
        </Button>
      </Link> */}
      <ViewOptions table={table} />
    </div>
  )
}