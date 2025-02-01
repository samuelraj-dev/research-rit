import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Bolt, MoreHorizontal } from "lucide-react"
import { User } from "./schema"
import { ColumnHeader } from "@/app/components/data-table/column-header"

export const columns: ColumnDef<User>[] = [
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
    
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    cell: ({ row }) => {
      // const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.employeeId)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem><span className="text-red-500">Deactivate</span></DropdownMenuItem>
            <DropdownMenuItem><span className="text-red-700">Archive</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Prefix" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("prefix")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => <div className="text-primary font-medium">{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Employee ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "workEmail",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Work Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("workEmail")}</div>,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => <div>{row.getValue("designation")}</div>,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    accessorKey: "activationStatus",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Activation Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("activationStatus") ? {
        label: "Activated",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : {
        label: "Not Activated",
        background: "bg-[#FFEDEF]",
        text: "text-[#D1293D]",
        dot: "bg-[#D1293D]",
      }
      return (
        <div className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-sm text-sm font-normal ${colors.background} ${colors.text}`}>
          <div
            className={`w-2 h-2 rounded-[2px] ${colors.dot}`}
          />
          {colors.label}
        </div>
      )
    }
    // cell: ({ row }) => <div>{row.getValue("activationStatus") ? <span className="text-green-500 font-semibold">Activated</span> : <span className="text-red-500 font-semibold">Not Activated</span>}</div>,
  },
  {
    accessorKey: "dateOfJoining",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Date Joining" />
    ),
    cell: ({ row }) => <div>{row.getValue("dateOfJoining")}</div>,
  },
]