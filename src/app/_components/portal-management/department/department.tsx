import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { RiDeleteBin6Fill, RiEditFill, RiGovernmentFill, RiIdCardFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { DeleteDepartment } from './delete-department';
import { AddDepartment } from './add-department';
import { EditDepartment } from './edit-department';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useRouter }  from 'next/navigation';
import { toast } from 'sonner';
import { getCookie } from 'cookies-next';
import { DeleteButton } from '@/components/delete-all-button';

export function Department() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const department = useQuery({
    queryKey: ['get-department'],
    queryFn: async (): Promise<any> => {
      return await api
        .get('/department')
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
    mutationKey: ['upload-department'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/department/upload', formData, {
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
        queryKey: ['get-department'],
      });
    },
  });
  const role = getCookie('ci-portal.role');

  const onUpload = async (file: File) => {
    const { data } = await upload.mutateAsync(file);
    console.log(data);
  };

  const onDownloadSample = () => {
    router.push(`${process.env.NEXT_PUBLIC_DEPARTMENT_TEMPLATE_URL}`);
  };


  const onDeleteSuccess = () => {
    toast.success('Department deleted successfully');
    queryClient.invalidateQueries();
  };

  return (
    <div className="py-4">
      <Card className="min-h-[60vh] border-gray-500/20 bg-background">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Department</div>
          {role === 'admin' && <div className="flex gap-2 pt-1">
            <AddDepartment />
            <FileUploadDialog
              onUpload={onUpload}
              onDownloadSample={onDownloadSample}
              triggerButtonText="Upload"
              dialogTitle="Upload Department"
              allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
                      <DeleteButton title="Delete Departments" deleteUrl="/department/erase-all" onDeleteSuccess={onDeleteSuccess} />
            
          </div>}
        </div>
        {!department.isLoading ? (
          <>
            {department.data && department.data.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 px-4 pb-3 pt-6 md:grid-cols-2 lg:grid-cols-4">
                {department.data.map((department: any) => (
                  <Card className="grid grid-cols-3 border-gray-600/10 bg-gray-100 px-4">
                    <div className="col-span-2">
                      {' '}
                      <div className="flex flex-col pt-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiIdCardFill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">Department Code</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">
                          {department.department_code}
                        </div>
                      </div>
                      <div className="flex flex-col pb-2">
                        <div className="flex gap-1 pt-2 text-xs font-semibold text-gray-500">
                          <RiGovernmentFill className="h-3 w-3" />{' '}
                          <span className="-mt-[2px]">Name</span>
                        </div>
                        <div className="px-4 text-xs font-semibold">{department.name}</div>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-center gap-2 px-7 py-3 pb-2">
                      {role === 'admin' && (
                        <>
                          <EditDepartment data={department} />
                          <DeleteDepartment departmentId={department._id} />
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-500">No Department found</p>
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
