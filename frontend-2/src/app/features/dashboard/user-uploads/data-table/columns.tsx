import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Bolt, FileText } from "lucide-react"
import { Book, BookChapter, Conference, Copyright, Journal, Patent } from "./schema"
import { ColumnHeader } from "@/app/components/data-table/column-header"
import { BASE_URL } from "@/libs/constants/server-endpoint"

export const journalColumns: ColumnDef<Journal>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-green-500">Accept</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Reject</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "media_url",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      return (
        row.getValue("media_url")
        ?
          <a href={`${BASE_URL}${row.getValue("media_url")}`} target="_blank" className="w-full flex justify-center underline hover:text-primary">
            <FileText size={20} className="mr-1" />open
          </a>
        : <div>No media</div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="text-primary font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Publisher" />
    ),
    cell: ({ row }) => <div>{row.getValue("publisher")}</div>,
  },
  {
    accessorKey: "doi",
    header: ({ column }) => (
        <ColumnHeader column={column} title="DOI" />
    ),
    cell: ({ row }) => <div>{row.getValue("doi")}</div>,
  },
  {
    accessorKey: "indexing.scopus",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Scopus Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_scopus") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.sci",
    header: ({ column }) => (
        <ColumnHeader column={column} title="SCI Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_sci") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.esc",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ESC Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_esc") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.other.indexed",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Other Indexed" />
    ),
    cell: ({ row }) => {
      return (
        <div>{row.getValue("indexing_other_indexed") ? row.original.indexing.other.name : "No"}</div>
      )
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
  {
    accessorKey: "impact_factor",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Impact Factor" />
    ),
    cell: ({ row }) => <div>{row.getValue("impact_factor")}</div>,
  },
  {
    accessorKey: "quartile",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Quartile" />
    ),
    cell: ({ row }) => <div>{row.getValue("quartile")}</div>,
  },
]

export const bookColumns: ColumnDef<Book>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "media_url",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      return (
        row.getValue("media_url")
        ?
          <a href={`${BASE_URL}${row.getValue("media_url")}`} target="_blank" className="w-full flex justify-center underline hover:text-primary">
            <FileText size={20} className="mr-1" />open
          </a>
        : <div>No media</div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="text-primary font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Publisher" />
    ),
    cell: ({ row }) => <div>{row.getValue("publisher")}</div>,
  },
  {
    accessorKey: "issn",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ISSN" />
    ),
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "indexing.scopus",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Scopus Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_scopus") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.sci",
    header: ({ column }) => (
        <ColumnHeader column={column} title="SCI Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_sci") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.esc",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ESC Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_esc") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.other.indexed",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Other Indexed" />
    ),
    cell: ({ row }) => {
      return (
        <div>{row.getValue("indexing_other_indexed") ? row.original.indexing.other.name : "No"}</div>
      )
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
]

export const bookChapterColumns: ColumnDef<BookChapter>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "media_url",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      return (
        row.getValue("media_url")
        ?
          <a href={`${BASE_URL}${row.getValue("media_url")}`} target="_blank" className="w-full flex justify-center underline hover:text-primary">
            <FileText size={20} className="mr-1" />open
          </a>
        : <div>No media</div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="text-primary font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "chapter_name",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Chapter Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("chapter_name")}</div>,
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Publisher" />
    ),
    cell: ({ row }) => <div>{row.getValue("publisher")}</div>,
  },
  {
    accessorKey: "issn",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ISSN" />
    ),
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "indexing.scopus",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Scopus Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_scopus") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.sci",
    header: ({ column }) => (
        <ColumnHeader column={column} title="SCI Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_sci") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.esc",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ESC Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_esc") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.other.indexed",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Other Indexed" />
    ),
    cell: ({ row }) => {
      return (
        <div>{row.getValue("indexing_other_indexed") ? row.original.indexing.other.name : "No"}</div>
      )
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
]

export const conferenceColumns: ColumnDef<Conference>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "media_url",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      return (
        row.getValue("media_url")
        ?
          <a href={`${BASE_URL}${row.getValue("media_url")}`} target="_blank" className="w-full flex justify-center underline hover:text-primary">
            <FileText size={20} className="mr-1" />open
          </a>
        : <div>No media</div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="text-primary font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Publisher" />
    ),
    cell: ({ row }) => <div>{row.getValue("publisher")}</div>,
  },
  {
    accessorKey: "doi",
    header: ({ column }) => (
        <ColumnHeader column={column} title="DOI" />
    ),
    cell: ({ row }) => <div>{row.getValue("doi")}</div>,
  },
  {
    accessorKey: "indexing.scopus",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Scopus Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_scopus") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.sci",
    header: ({ column }) => (
        <ColumnHeader column={column} title="SCI Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_sci") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.esc",
    header: ({ column }) => (
        <ColumnHeader column={column} title="ESC Indexed" />
    ),
    cell: ({ row }) => <div>{row.getValue("indexing_esc") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "indexing.other.indexed",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Other Indexed" />
    ),
    cell: ({ row }) => {
      return (
        <div>{row.getValue("indexing_other_indexed") ? row.original.indexing.other.name : "No"}</div>
      )
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
]

export const patentColumns: ColumnDef<Patent>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "date_published",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Date Published" />
    ),
    cell: ({ row }) => <div>{row.getValue("date_published")}</div>,
  },
  {
    accessorKey: "authority",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Authority" />
    ),
    cell: ({ row }) => <div>{row.getValue("authority")}</div>,
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
  {
    accessorKey: "grant_access",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Grant Access" />
    ),
    cell: ({ row }) => <div>{row.getValue("grant_access") ? "Yes" : "No"}</div>,
  },
]

export const copyrightColumns: ColumnDef<Copyright>[] = [
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
    // header: () => <div className="flex w-full justify-center"></div>,
    header: () => <div className="font-medium text-xs flex items-center justify-center"><Bolt size={15} /></div>,
    enableHiding: false,
    enableResizing: true,
    cell: ({ row }) => {
      const isPending = row.original.status === 'PENDING'
 
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
            <DropdownMenuItem>View Paper</DropdownMenuItem>
            {isPending &&
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = row.getValue("status") == 'ACCEPTED' ? {
        label: "Accepted",
        background: "bg-[#E1FCEF]",
        text: "text-[#14804A]",
        dot: "bg-[#14804A]",
      } : row.getValue("status") == 'PENDING' ? {
        label: "Pending",
        background: "bg-[#FCF2E6]",
        text: "text-[#AA5B00]",
        dot: "bg-[#AA5B00]",
      } : {
        label: "Rejected",
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
    accessorKey: "title",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "date_published",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Date Published" />
    ),
    cell: ({ row }) => <div>{row.getValue("date_published")}</div>,
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
  {
    accessorKey: "grant_access",
    header: ({ column }) => (
        <ColumnHeader column={column} title="Grant Access" />
    ),
    cell: ({ row }) => <div>{row.getValue("grant_access") ? "Yes" : "No"}</div>,
  },
]
