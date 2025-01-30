import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { RiDeleteBin6Fill, RiEditFill, RiGovernmentFill, RiIdCardFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import router from 'next/router';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { AddBussinessUnit } from './add-bussiness-unit';
import { EditBussinessUnit } from './edit-bussiness-unit';
import { DeleteBussinessUnit } from './delete-bussiness-unit';
import { getCookie } from 'cookies-next';

export function BussinessUnit() {
  const queryClient = useQueryClient();
  const role = getCookie('ci-portal.role');

  const bussinessUnit = useQuery({
    queryKey: ['get-bussiness-unit'],
    queryFn: async (): Promise<any> => {
      return await api
        .get('/bussiness-unit')
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  const upload = useMutation({
    mutationKey: ['upload-bussiness-unit'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/bussiness-unit/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Upload is in progress. It will take sometime', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-bussiness-unit'],
      });
    },
  });

  const onUpload = async (file: File) => {
    const { data } = await upload.mutateAsync(file);
    console.log(data);
  };

  const onDownloadSample = () => {
    router.push(`${process.env.NEXT_PUBLIC_BUSSINESS_UNIT_TEMPLATE_URL}`);
  };
  return (
    <div className="py-4">
      <Card className="min-h-[60vh] border-gray-500/20 bg-background pb-4">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Division</div>
          {role === 'admin' && (
            <div className="flex gap-2 pt-1">
              <AddBussinessUnit />
              <FileUploadDialog
                onUpload={onUpload}
                onDownloadSample={onDownloadSample}
                triggerButtonText="Upload"
                dialogTitle="Upload Division"
                allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </div>
          )}
        </div>
        {!bussinessUnit.isLoading ? (
          <>
            {bussinessUnit.data && bussinessUnit.data.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-4 pt-3">
                {bussinessUnit.data.map((bu: any) => (
                  <Badge key={bu._id} variant={'secondary'} className="flex flex-col gap-2 py-2">
                    <div className="text-xs font-semibold">{bu.name}</div>
                    {role === 'admin' && (
                      <>
                        <EditBussinessUnit data={bu} />
                        <DeleteBussinessUnit bussinessUnitId={bu._id} />
                      </>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-500">No Division found</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
}
