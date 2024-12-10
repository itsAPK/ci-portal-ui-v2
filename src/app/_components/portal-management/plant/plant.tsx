import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { RiDeleteBin6Fill, RiEditFill, RiGovernmentFill, RiIdCardFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { DeletePlant } from './delete-plant';
import { AddPlant } from './add-plant';
import { EditPlant } from './edit-plant';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import router from 'next/router';
import { toast } from 'sonner';
import { getCookie } from 'cookies-next';
export function Plant() {
  const queryClient = useQueryClient();
  const plants = useQuery({
    queryKey: ['get-plant'],
    queryFn: async (): Promise<any> => {
      return await api
        .get('/plant')
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
    mutationKey: ['upload-plant'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/plant/upload', formData, {
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
      toast.success('Plant data uploaded successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-plant'],
      });
    },
  });
  const role = getCookie('ci-portal.role');

  const onUpload = async (file: File) => {
    const { data } = await upload.mutateAsync(file);
    console.log(data);
  };

  const onDownloadSample = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/files/download/template/Plant.xlsx`);
  };
  return (
    <div className="py-4">
      <Card className="min-h-[60vh] border-gray-500/20 bg-background pb-4">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Plant</div>
          {role === 'admin' && (
            <div className="flex gap-2 pt-1">
              <AddPlant />
              <FileUploadDialog
                onUpload={onUpload}
                onDownloadSample={onDownloadSample}
                triggerButtonText="Upload"
                dialogTitle="Upload Employee"
                allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </div>
          )}
        </div>
        {!plants.isLoading ? (
          <>
            {plants.data && plants.data.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 px-4 pt-6 md:grid-cols-2 lg:grid-cols-4">
                {plants.data.map((plant: any) => (
                  <Card className="grid grid-cols-3 border-gray-600/10 bg-gray-100 px-4">
                    <div className="col-span-2">
                      {' '}
                      <div className="flex flex-col pt-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiIdCardFill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">Plant Code</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.plant_code}</div>
                      </div>
                      <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiGovernmentFill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">Name</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.name}</div>
                      </div>
                    </div>
                    {role === 'admin' && (
                      <div className="col-span-1 flex flex-col items-center justify-center gap-2 px-7 py-3 pb-2">
                        <EditPlant data={plant} />
                        <DeletePlant plantId={plant._id} />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-500">No Plant found</p>
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
