'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FileUp, Download, Upload, Loader2, UploadIcon } from 'lucide-react'
import { useFileUpload } from '../hooks/use-file-upload'

interface FileUploadDialogProps {
  onUpload: (file: File) => Promise<void>
  onDownloadSample?: () => void
  triggerButtonText?: string
  dialogTitle?: string
  allowedFileTypes?: string
}

export function FileUploadDialog({
  onUpload,
  onDownloadSample,
  triggerButtonText = "Upload",
  dialogTitle = "Upload File",
  allowedFileTypes,
}: FileUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const { isUploading, fileName, fileInputRef, handleFileChange, handleUpload } = useFileUpload()

  const handleUploadClick = async () => {
    await handleUpload(onUpload)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isUploading && setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant={'ghost-1'} size='sm' className='gap-2'><UploadIcon className='w-4 h-4' /> {triggerButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => isUploading && e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          {isUploading ? (
            <div className="w-full h-32 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div 
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="text-center">
                  <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">{fileName}</span>
                </div>
              ) : (
                <div className="text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Click to upload a file</span>
                </div>
              )}
            </div>
          )}
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept={allowedFileTypes}
          />
          <div className="flex w-full gap-4">
            {onDownloadSample && (
              <Button variant="outline" onClick={onDownloadSample} className="flex-1" disabled={isUploading}>
                <Download className="mr-2 h-4 w-4" />
                Download Sample
              </Button>
            )}
            <Button onClick={handleUploadClick} disabled={isUploading || !fileName} className="flex-1">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

