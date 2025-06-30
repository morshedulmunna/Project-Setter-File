import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export function generateColumnsFromData<T extends Record<string, any>>(
  data: T[]
): ColumnDef<T>[] {
  if (!data || data.length === 0) return [];

  let columns = Object.keys(data[0])
    .filter((key) => key !== "id") // Filter out id field
    .map((key) => ({
      accessorKey: key,
      header: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      cell: ({ row }: { row: { original: T } }) => {
        const value = row.original[key];
        return React.isValidElement(value) ? (
          value
        ) : (
          <span>{String(value)}</span>
        );
      },
    }));

  return columns;
}
