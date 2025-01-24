import { IndianNumberInput } from '@/components/indian-number-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableRow, TableCell } from '@/components/ui/table';
import api from '@/lib/api';
import { OpportunitySchema } from '@/schema/opportunity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { AlertTriangle } from 'lucide-react';
import { act, useState } from 'react';
import { toast } from 'sonner';
import opportunity from '../opportunity';
import { Badge } from '@/components/ui/badge';

export const MonthlySavingsRow = ({
  item,
  csHeadId,
  opportunityId,
  category,
}: {
  item: any;
  csHeadId: string;
  opportunityId: string;
  category: string;
}) => {
  const role = getCookie('ci-portal.role');
  const userId = getCookie('ci-portal.user_id');
  const [actual, setActual] = useState(item.actual ?? '0');
  const queryClient = useQueryClient();
  const editOpportunity = useMutation({
    mutationKey: ['edit-opportunity'],
    mutationFn: async ({ actual, is_approved }: { actual: string; is_approved: boolean }) => {
      return await api
        .patch(`/opportunity/monthly-savings/${opportunityId}/${item._id.$oid}`, {
          actual: actual,
          is_approved: is_approved,
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Opportunity Updated successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      if (category === 'Black') {
        queryClient.refetchQueries({
          queryKey: ['get-opportunities'],
        });
      } else {
        queryClient.refetchQueries({
          queryKey: ['get-other-opportunities'],
        });
      }
    },
  });
  return (
    <TableRow>
      <TableCell className="text-center text-xs">{item.year}</TableCell>
      <TableCell className="text-center text-xs">{item.month}</TableCell>
      <TableCell className="text-center text-xs">{`₹ ${item.savings}`}</TableCell>
      <TableCell className="flex justify-center text-center text-xs">
        {role === 'cs_head' && userId === csHeadId  ? (
          <IndianNumberInput
            value={actual}
            onChange={async (e) =>
              await editOpportunity.mutateAsync({ actual: e, is_approved: item.is_approved })
            }
            className="text-center text-xs"
          />
        ) : item.actual ? (
          `₹ ${item.actual}`
        ) : (
          'N/A'
        )}
      </TableCell>
      <TableCell className="text-center text-xs">
        {role === 'cs_head' && userId === csHeadId ? <Button
          variant={item.is_approved ? 'edit' : 'ghost-1'}
          size="xs"
          disabled={item.is_approved}
          onClick={async () =>
            await editOpportunity.mutateAsync({ actual: item.actual, is_approved: true })
          }
        >
          {item.is_approved ? 'Approved' : 'Approve'}
        </Button> : <Badge variant={item.is_approved ? 'success' : 'destructive'}>
          {item.is_approved ? 'Approved' : 'Not Approved'}
          </Badge>}
      </TableCell>
    </TableRow>
  );
};
