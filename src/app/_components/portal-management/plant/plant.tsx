import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { RiDeleteBin6Fill, RiEditFill, RiGovernmentFill, RiIdCardFill ,RiUser2Fill,RiUserFill,RiUser3Fill,RiUser4Fill,RiUser5Fill,RiUser6Fill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { DeletePlant } from './delete-plant';
import { AddPlant } from './add-plant';
import { EditPlant } from './edit-plant';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getCookie } from 'cookies-next';
import { DeleteButton } from '@/components/delete-all-button';
export function Plant() {
  const queryClient = useQueryClient();
  const router = useRouter();
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
      toast.success('Upload is in progress. It will take sometime', {
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
    router.push(`${process.env.NEXT_PUBLIC_PLANT_TEMPLATE_URL}`);
  };

  const onDeleteSuccess = () => {
    toast.success('Plant deleted successfully');
    queryClient.invalidateQueries();
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
                dialogTitle="Upload Plant"
                allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <DeleteButton title="Delete Plants" deleteUrl="/plant/erase-all" onDeleteSuccess={onDeleteSuccess} />
              
            </div>
          )}
        </div>
        {!plants.isLoading ? (
          <>
            {plants.data && plants.data.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 px-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
                {plants.data.map((plant: any) => (
                  <Card className="grid grid-cols-2 border-gray-600/10 bg-gray-100 px-4">
                    <div className="col-span-1">
                  
                     
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
                      <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiUser2Fill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">CI Head</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.ci_head? plant.ci_head.name : "---"}</div>
                      </div>
                      <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiUser6Fill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">HOD</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.hod? plant.hod.name : "---"}</div>
                      </div>  <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiUser5Fill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">CS Head</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.cs_head? plant.cs_head.name : "---"}</div>
                      </div>  <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiUserFill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">LOF</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.lof? plant.lof.name : "---"}</div>
                      </div>
                      <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiUser3Fill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">CI Team</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{plant.ci_team? plant.ci_team.name : "---"}</div>
                      </div>
                      {role === 'admin' && (
                      <div className="col-span-1 flex  items-center justify-center gap-2 px-7 py-3 pb-2">
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
