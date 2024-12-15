'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ManageViewDropdownProps {
  items: string[]
  selectedItems: string[]
  onItemToggle: (item: string) => void
  label?: string
}

export function ManageView({
  items,
  selectedItems,
  onItemToggle,
  label = 'Manage Views',
}: ManageViewDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="leaf" size='sm' className="justify-between">
          {label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Toggle Views</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            onSelect={() => onItemToggle(item)}
            className="justify-between"
          >
            {item}
            {selectedItems.includes(item) && (
              <Check className="h-4 w-4 shrink-0 opacity-100" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

