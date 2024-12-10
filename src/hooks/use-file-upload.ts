import { useState, useRef } from 'react'

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  const handleUpload = async (uploadFn: (file: File) => Promise<void>) => {
    if (!fileName || !fileInputRef.current?.files?.[0]) return

    setIsUploading(true)
    try {
      await uploadFn(fileInputRef.current.files[0])
      setFileName(null)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return {
    isUploading,
    fileName,
    fileInputRef,
    handleFileChange,
    handleUpload,
  }
}

