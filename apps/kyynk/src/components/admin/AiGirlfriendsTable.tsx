'use client';

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import imgixLoader from '@/lib/imgix/loader';
import Image from 'next/image';

interface AiGirlfriendsTableProps {
  data: any[];
}

const columns: ColumnDef<
  any & {
    onEdit?: (id: string) => void;
  }
>[] = [
  {
    accessorKey: 'pseudo',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <Image
            src={row.original.imageUrl}
            alt={row.original.pseudo}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <div className="font-medium">{row.original.pseudo}</div>
          <div className="text-sm text-gray-500">{row.original.slug}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'archetype',
    header: 'Archetype',
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.archetype || 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {format(new Date(row.original.createdAt), 'MMM dd, yyyy')}
      </span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {format(new Date(row.original.updatedAt), 'MMM dd, yyyy')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button
          variant="link"
          size="sm"
          onClick={() => row.original.onEdit?.(row.original.id)}
        >
          Edit
        </Button>
      </div>
    ),
  },
];

export function AiGirlfriendsTable({ data }: AiGirlfriendsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();

  const tableData = data.map((item) => ({
    ...item,
    onEdit: (id: string) => router.push(`/admin/ai/${id}`),
    imageUrl: imgixLoader({
      src: item.profileImageId || '',
      width: 400,
      quality: 80,
    }),
  }));

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
