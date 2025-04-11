'use client'
import { LoaderIcon } from "lucide-react"
import { useLoading, ThreeDots } from '@agney/react-loading';

export const Loading = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    //@ts-ignore
    indicator: <ThreeDots width="50" className="text-primary" />,
  });
    return(
        <div className="flex max-h-full  flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="animate-fade-in">
          <span {...containerProps}>{indicatorEl}</span>
            <h1 className="mt-4 text-base font-semibold tracking-tight text-foreground ">
              Loading...
            </h1>
           
          </div>
        </div>
      </div>
    )
}