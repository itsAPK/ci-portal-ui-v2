import { Card, CardContent } from '@/components/ui/card';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentCard } from '../overview/content-card';
import { RiBox3Fill } from '@remixicon/react';

export const DefinePhase = () => {
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Define Phase</div>
          <Button variant="ghost-1" size={'sm'} className="gap-1">
            <PencilIcon className="h-3 w-3" /> Edit
          </Button>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ContentCard
            className='col-span-3'
              title={'Part number/Machine/Customer/Supplier selected for study'}
              value={'180-751-00017'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
                         className='col-span-3'

              title={'Other Similar Part numbers/Machine/Customer/Supplier having problem'}
              value={'180-751-00065, 180-751-00033, 180-751-00054, 180-751-00039, 180-751-00043, 180-751-00079, 180-751-00011'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
                         className='col-span-3'

              title={'Other similar Part numbers/Products/Customers/Suppliers not having the problem:'}
              value={'Not applicable '}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
                         className='col-span-2'

              title={'Suspected Phenomenon(s) that is creating the problem'}
              value={'Molten lead splashing out due to excessive force applied by electrodes'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
              <ContentCard
              title={'Process stages where the problem is inspected'}
              value={'Weld condition Checker (WCC)'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
            className='col-span-2'

              title={'Suspected last manufacturing stage where the problem is generated'}
              value={'Inter Cell Welding'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
              title={'Number of Machines used in the suspected last manufacturing stage'}
              value={'05'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
              title={'Number of Streams within each Machine'}
              value={'02'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
            
              <ContentCard
              title={'Baseline'}
              value={'5487 PPM'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
              title={'Target'}
              value={'1234 PPM'}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
              <ContentCard
              title={'Maximum Value of the Baseline in the last 6 months'}
              value={'3454 PPM'}
              className='col-span-2'
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
              <ContentCard
              title={'In which month the Maximum Value has come'}
              value={"Mar'23"}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
             <ContentCard
              title={'Minimum Value of the Baseline in the last 6 months'}
              value={"2034 PPM"}
              className='col-span-2'
              icon={<RiBox3Fill className="h-4 w-4" />}
            />
              <ContentCard
              title={'In which month the Minimum Value has come'}
              value={"Mar'23"}
              icon={<RiBox3Fill className="h-4 w-4" />}
            />  <ContentCard
            title={'Response type'}
            value={"Attribute"}
            icon={<RiBox3Fill className="h-4 w-4" />}
          />  <ContentCard
          title={'Specification'}
          value={"Not Applicable"}
          icon={<RiBox3Fill className="h-4 w-4" />}
        />  <ContentCard
        title={'Is Concentration chart applicable?'}
        value={'Yes'}
        icon={<RiBox3Fill className="h-4 w-4" />}
      />

<ContentCard
        title={'If Yes, what is the conclusion based on Concentration chart'}
        value={'Defects % contribution is <80%,  Defects are randomly generated '}
        className='col-span-2'
        icon={<RiBox3Fill className="h-4 w-4" />}
      />
      <ContentCard
        title={'Have you audited the process?'}
        value={'Yes'}
        icon={<RiBox3Fill className="h-4 w-4" />}
      /><ContentCard
      title={'Department KPI '}
      value={'N/A'}
      icon={<RiBox3Fill className="h-4 w-4" />}
    />
    <ContentCard
      title={'Last Six Months Trend '}
      value={'N/A'}
      icon={<RiBox3Fill className="h-4 w-4" />}
    />
    <ContentCard
      title={'Process Flow Diagram '}
      value={'N/A'}
      icon={<RiBox3Fill className="h-4 w-4" />}
    />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
