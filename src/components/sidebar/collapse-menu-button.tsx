"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full text-white"
    >
      <CollapsibleTrigger
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-90 text-white hover:text-primary"
        asChild
      >
        <Button
          variant={"ghost"}
          className={cn(
            "w-full rounded-full my-2",
            active ? "bg-white text-primary h-[53px]" : "h-14",
          )}
        >
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center">
              <div className={cn("mr-4 flex h-full items-center px-3 py-3")}>
                <Icon size={20} />
              </div>
              <p
                className={cn(
                  "max-w-[150px] truncate text-[15px] font-normal",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0",
              )}
            >
              <ChevronRight
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "overflow-hidden",
          "data-[state=open]:animate-slideDown",
          "data-[state=closed]:animate-slideUp",
        )}
      >
        <div className="bg-white p-2 rounded-3xl flex flex-col justify-start items-start text-start">
          {submenus.map(({ href, label, active }, index) => (
            <Button
              key={index}
              variant={"ghost"}
              className={cn(
                active ? "bg-primary/20" : "bg-transparent",
                "h-[50px] w-full px-4 py-2 hover:bg-primary/20 text-[#777d74] hover:text-primary flex justify-start items-center my-1",
              )}
              asChild
            >
              <Link href={href}>
                <div className="flex items-center justify-start">
                  <Icon size={20} className="mr-4" />
                  <p className="max-w-[150px] truncate text-[15px]">{label}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
              //@ts-ignore
                variant={"tool"}
                size={"icon"}
                className={cn("ml-4 h-[53px] w-full")}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        !active ? "text-white" : "bg-white text-[#099bab]",
                        isOpen === false ? "" : "text-white",
                        "flex h-full items-center rounded-lg px-3 py-3",
                      )}
                    >
                      <Icon size={20} />
                    </div>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="start"
            alignOffset={2}
            className="bg-white text-primary"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        side="right"
        sideOffset={25}
        align="start"
        className="bg-white text-primary" // White background
      >
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild className="hover:bg-primary/20">
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
