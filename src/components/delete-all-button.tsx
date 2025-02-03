"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"
import api from "@/lib/api"

interface DeleteButtonProps {
  title: string
  deleteUrl: string
  onDeleteSuccess?: () => void
}

export function DeleteButton({ title, deleteUrl, onDeleteSuccess }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async () => {
        return await api
        .post(deleteUrl)
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
    onSuccess: () => {
      queryClient.invalidateQueries() // Invalidate and refetch
      onDeleteSuccess?.()
      setIsOpen(false)
    },
  })

  const handleDelete = async () => {
   await deleteMutation.mutateAsync()
  }



  

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <motion.div whileHover="hover" whileTap="tap">
          <Button variant="destructive" className="group" size="sm">
            <motion.span className="mr-2" >
              <Trash2 className="w-4 h-4" />
            </motion.span>
            {title}
          </Button>
        </motion.div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected item and remove it from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
              <AnimatePresence mode="wait">
                {deleteMutation.isPending ? (
                  <motion.div key="deleting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Deleting...
                  </motion.div>
                ) : (
                  <motion.div key="delete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Delete
                  </motion.div>
                )}
              </AnimatePresence>
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

