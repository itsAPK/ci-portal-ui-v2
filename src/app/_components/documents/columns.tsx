import { Button } from '@/components/ui/button';
import { Template } from '@/schema/template';
import { ColumnDef } from '@tanstack/react-table';
import { RiDeleteBin6Fill, RiDownload2Fill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { DeleteTemplate } from './delete';
import { getCookie } from 'cookies-next';
import { BASEURL } from '@/lib/api';
export const templateColumns = (): ColumnDef<Template>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Template Title</div>
      ),
    },
    {
      accessorKey: 'author',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Author</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Date of Upload</div>
      ),
      cell: ({ row }) => {
        return new Date(row.original.created_at).toDateString();
      },
    },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const role = getCookie('ci-portal.role');
        const router = useRouter();
        return (
          <div className="flex justify-center space-x-2 pl-2">
            <Button variant="edit" size={'sm'} className="gap-2 text-xs" onClick={() => router.push(`${BASEURL}/files/download/${row.original.path}`)}>
              <RiDownload2Fill className="mr-2 h-4 w-4" /> Download
            </Button>
            {role === 'admin' && (
              <DeleteTemplate id={row.original._id} />
            )}
          </div>
        );
      },
    },
  ];
};
