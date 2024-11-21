'use client'
import { PencilIcon } from 'lucide-react';
import {RiAddCircleFill, RiDeleteBin2Fill, RiEyeFill, RiUpload2Fill} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DocumentCard } from '@/components/document-card';
const data = [
    'document1.pdf',
    'document2.pdf',
    'document3.pdf',
]

export const Documents = () => {
    return (
        <Card className="border-gray-500/20 bg-white mt-6">
        <div className="flex justify-between p-4">
          <div className="text-base font-semibold pt-2 ">Documents</div>
          <Button variant="ghost-1" size={'sm'} className=" gap-1">
           <RiUpload2Fill className='w-3 h-3'/>  Upload Documents
          </Button>
        </div>
        <CardContent className=" overflow-y-auto p-4 pt-0 grid grid-cols-3 gap-3">
          {
            data.map((item) => (
               <DocumentCard
               key={item}
                 documentName={item}
                 onDelete={() => {}} />
            ))
          }
          </CardContent>
      </Card>
    )
}