"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { RiDownload2Fill } from '@remixicon/react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

interface DocumentCardProps {
  documentName: string
  onDelete: () => void
}

export function DocumentCard({ documentName, onDelete }: DocumentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulating an asynchronous delete operation
    setTimeout(() => {
      onDelete()
      setIsDeleting(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold truncate" title={documentName}>
          {documentName}
        </h3>
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="ghost-1" size="sm" className="h-8 flex gap-2">
          <RiDownload2Fill className="h-4 w-4" /> Download
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="h-8 flex gap-2">
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the document
                "{documentName}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

