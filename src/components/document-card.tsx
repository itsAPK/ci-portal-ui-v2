"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { RiDownload2Fill } from '@remixicon/react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import router from 'next/router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface DocumentCardProps {
  documentName: string
  onDelete?: () => void
  bucket?: string
}

export function DocumentCard({ documentName, bucket }: DocumentCardProps) {
const router  = useRouter();
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold truncate" title={documentName}>
          {documentName}
        </h3>
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="ghost-1" size="sm" className="h-8 flex gap-2" onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/files/download/${bucket}`)}>
          <RiDownload2Fill className="h-4 w-4" /> Download
        </Button>
        
      </CardFooter>
    </Card>
  )
}

