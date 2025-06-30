"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: any;
  className?: string;
  loading?: boolean;
  isBorderless?: boolean;
  isBorderBottomOnly?: boolean;
  isBorderTopOnly?: boolean;
  isBorderRightOnly?: boolean;
  isBorderLeftOnly?: boolean;
  isBorderTopRightOnly?: boolean;
  isBorderTopLeftOnly?: boolean;
  isBorderBottomRightOnly?: boolean;
  isBorderBottomLeftOnly?: boolean;
  isBorderTopRightBottomOnly?: boolean;
  isBorderTopLeftBottomOnly?: boolean;
  isBorderBottomRightLeftOnly?: boolean;
  isBorderBottomLeftRightOnly?: boolean;
  checkDisabled?: boolean;
  checkedHidden?: boolean;

  limits?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
  idField?: string;
}

// Define a type for just the border props
export type BorderProps = {
  isBorderless?: boolean;
  isBorderBottomOnly?: boolean;
  isBorderTopOnly?: boolean;
  isBorderRightOnly?: boolean;
  isBorderLeftOnly?: boolean;
  isBorderTopRightOnly?: boolean;
  isBorderTopLeftOnly?: boolean;
  isBorderBottomRightOnly?: boolean;
  isBorderBottomLeftOnly?: boolean;
  isBorderTopRightBottomOnly?: boolean;
  isBorderTopLeftBottomOnly?: boolean;
  isBorderBottomRightLeftOnly?: boolean;
  isBorderBottomLeftRightOnly?: boolean;
};

function getBorderClass(props: BorderProps) {
  if (props.isBorderless) return "border-none";
  if (props.isBorderBottomOnly) return "border-b border-gray-200";
  if (props.isBorderTopOnly) return "border-t border-gray-200";
  if (props.isBorderRightOnly) return "border-r border-gray-200";
  if (props.isBorderLeftOnly) return "border-l border-gray-200";
  if (props.isBorderTopRightOnly) return "border-t border-r border-gray-200";
  if (props.isBorderTopLeftOnly) return "border-t border-l border-gray-200";
  if (props.isBorderBottomRightOnly) return "border-b border-r border-gray-200";
  if (props.isBorderBottomLeftOnly) return "border-b border-l border-gray-200";
  if (props.isBorderTopRightBottomOnly)
    return "border-t border-r border-b border-gray-200";
  if (props.isBorderTopLeftBottomOnly)
    return "border-t border-l border-b border-gray-200";
  if (props.isBorderBottomRightLeftOnly)
    return "border-b border-r border-l border-gray-200";
  if (props.isBorderBottomLeftRightOnly)
    return "border-b border-l border-r border-gray-200";
  return "border border-gray-200";
}

export function DataTable<T>({
  data,
  columns,
  className,
  loading = false,
  isBorderless = false,
  limits = 5,
  isBorderBottomOnly = false,
  isBorderTopOnly = false,
  isBorderRightOnly = false,
  isBorderLeftOnly = false,
  isBorderTopRightOnly = false,
  isBorderTopLeftOnly = false,
  isBorderBottomRightOnly = false,
  isBorderBottomLeftOnly = false,
  isBorderTopRightBottomOnly = false,
  isBorderTopLeftBottomOnly = false,
  isBorderBottomRightLeftOnly = false,
  isBorderBottomLeftRightOnly = false,
  onSelectionChange,
  idField = "id",
  checkDisabled = false,
  checkedHidden = false,
  ...props
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Add checkbox column
  const checkboxColumn: ColumnDef<T, any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
        disabled={checkDisabled}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
        disabled={checkDisabled}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable<T>({
    data,
    columns: checkedHidden ? columns : [checkboxColumn, ...columns],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      sorting: [
        {
          id: "name",
          desc: true,
        },
      ],
    },
  });

  // Call onSelectionChange when selection changes
  React.useEffect(() => {
    if (onSelectionChange && !checkedHidden) {
      const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => (row.original as any)[idField]);
      onSelectionChange(selectedIds);
    }
  }, [rowSelection, onSelectionChange, table, idField, checkedHidden]);

  if (loading) {
    return (
      <Table>
        <TableBody>
          {Array.from({ length: limits }).map((_, index) => (
            <TableRow
              key={index}
              className={getBorderClass({
                isBorderless,
                isBorderBottomOnly,
                isBorderTopOnly,
                isBorderRightOnly,
                isBorderLeftOnly,
                isBorderTopRightOnly,
                isBorderTopLeftOnly,
                isBorderBottomRightOnly,
                isBorderBottomLeftOnly,
                isBorderTopRightBottomOnly,
                isBorderTopLeftBottomOnly,
                isBorderBottomRightLeftOnly,
                isBorderBottomLeftRightOnly,
              })}
            >
              {Array.from({ length: columns.length + 1 }).map(
                (_, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={`h-7 bg-gray-200/50 animate-pulse ${getBorderClass(
                      {
                        isBorderless,
                        isBorderBottomOnly,
                        isBorderTopOnly,
                        isBorderRightOnly,
                        isBorderLeftOnly,
                        isBorderTopRightOnly,
                        isBorderTopLeftOnly,
                        isBorderBottomRightOnly,
                        isBorderBottomLeftOnly,
                        isBorderTopRightBottomOnly,
                        isBorderTopLeftBottomOnly,
                        isBorderBottomRightLeftOnly,
                        isBorderBottomLeftRightOnly,
                      }
                    )}`}
                  >
                    <div className="bg-gray-200 h-6 w-full rounded animate-pulse"></div>
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <div {...props} className={`w-full overflow-x-auto ${className || ""}`}>
      <Table className="min-w-full rounded-md shadow-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={`bg-[#f9fafb] text-md capitalize text-gray-500 tracking-wider ${getBorderClass(
                {
                  isBorderless,
                  isBorderBottomOnly,
                  isBorderTopOnly,
                  isBorderRightOnly,
                  isBorderLeftOnly,
                  isBorderTopRightOnly,
                  isBorderTopLeftOnly,
                  isBorderBottomRightOnly,
                  isBorderBottomLeftOnly,
                  isBorderTopRightBottomOnly,
                  isBorderTopLeftBottomOnly,
                  isBorderBottomRightLeftOnly,
                  isBorderBottomLeftRightOnly,
                }
              )}`}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`font-semibold px-4 py-3 ${getBorderClass({
                    isBorderless,
                    isBorderBottomOnly,
                    isBorderTopOnly,
                    isBorderRightOnly,
                    isBorderLeftOnly,
                    isBorderTopRightOnly,
                    isBorderTopLeftOnly,
                    isBorderBottomRightOnly,
                    isBorderBottomLeftOnly,
                    isBorderTopRightBottomOnly,
                    isBorderTopLeftBottomOnly,
                    isBorderBottomRightLeftOnly,
                    isBorderBottomLeftRightOnly,
                  })}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row, idx) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`text-sm hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-white"
                } ${getBorderClass({
                  isBorderless,
                  isBorderBottomOnly,
                  isBorderTopOnly,
                  isBorderRightOnly,
                  isBorderLeftOnly,
                  isBorderTopRightOnly,
                  isBorderTopLeftOnly,
                  isBorderBottomRightOnly,
                  isBorderBottomLeftOnly,
                  isBorderTopRightBottomOnly,
                  isBorderTopLeftBottomOnly,
                  isBorderBottomRightLeftOnly,
                  isBorderBottomLeftRightOnly,
                })}`}
              >
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`px-4 py-2 text-gray-800 ${getBorderClass({
                      isBorderless,
                      isBorderBottomOnly,
                      isBorderTopOnly,
                      isBorderRightOnly,
                      isBorderLeftOnly,
                      isBorderTopRightOnly,
                      isBorderTopLeftOnly,
                      isBorderBottomRightOnly,
                      isBorderBottomLeftOnly,
                      isBorderTopRightBottomOnly,
                      isBorderTopLeftBottomOnly,
                      isBorderBottomRightLeftOnly,
                      isBorderBottomLeftRightOnly,
                    })}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow
              className={getBorderClass({
                isBorderless,
                isBorderBottomOnly,
                isBorderTopOnly,
                isBorderRightOnly,
                isBorderLeftOnly,
                isBorderTopRightOnly,
                isBorderTopLeftOnly,
                isBorderBottomRightOnly,
                isBorderBottomLeftOnly,
                isBorderTopRightBottomOnly,
                isBorderTopLeftBottomOnly,
                isBorderBottomRightLeftOnly,
                isBorderBottomLeftRightOnly,
              })}
            >
              <TableCell
                colSpan={columns.length + 1}
                className={`h-24 text-center text-gray-500 text-sm ${getBorderClass(
                  {
                    isBorderless,
                    isBorderBottomOnly,
                    isBorderTopOnly,
                    isBorderRightOnly,
                    isBorderLeftOnly,
                    isBorderTopRightOnly,
                    isBorderTopLeftOnly,
                    isBorderBottomRightOnly,
                    isBorderBottomLeftOnly,
                    isBorderTopRightBottomOnly,
                    isBorderTopLeftBottomOnly,
                    isBorderBottomRightLeftOnly,
                    isBorderBottomLeftRightOnly,
                  }
                )}`}
              >
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
