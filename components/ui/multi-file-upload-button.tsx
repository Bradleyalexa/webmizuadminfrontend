import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, FileText, UploadCloud, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiFileUploadButtonProps {
  label?: string
  accept?: string
  maxSizeMB?: number
  onFilesChange: (files: File[]) => void
  disabled?: boolean
  className?: string
}

export function MultiFileUploadButton({
  label = "Upload Images",
  accept = "image/*",
  maxSizeMB = 5,
  onFilesChange,
  disabled = false,
  className
}: MultiFileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      // Filter by size if needed, or just warn
      const validFiles = newFiles.filter(f => f.size <= maxSizeMB * 1024 * 1024)
      
      const updated = [...selectedFiles, ...validFiles]
      setSelectedFiles(updated)
      onFilesChange(updated)
      
      // Reset input so same file can be selected again if cleared
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updated)
    onFilesChange(updated)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Button
          type="button"
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <UploadCloud className="h-4 w-4" />
          {label}
        </Button>
        <Input
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Max {maxSizeMB}MB per file.
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid gap-2">
            {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50 border rounded-md text-sm">
                    <div className="flex items-center gap-2 truncate">
                        <ImageIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[200px] font-medium text-slate-700">{file.name}</span>
                        <span className="text-xs text-slate-400">({(file.size / 1024).toFixed(0)}KB)</span>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => removeFile(i)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}
