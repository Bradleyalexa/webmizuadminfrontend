import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, FileText } from "lucide-react"

interface FileUploadButtonProps {
  label?: string
  accept?: string
  currentFileUrl?: string | null
  selectedFile?: File | null
  onFileSelect: (file: File | null) => void
  disabled?: boolean
}

export function FileUploadButton({
  label = "Choose File",
  accept = "*",
  currentFileUrl,
  selectedFile,
  onFileSelect,
  disabled = false
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileSelect(file)
  }

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onFileSelect(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          {selectedFile || currentFileUrl ? "Change File" : label}
        </Button>
        <Input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          disabled={disabled}
        />
        
        {/* Selected File Display (New) */}
        {selectedFile && (
           <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-gray-400 hover:text-destructive"
                onClick={handleClear}
              >
                 <X className="h-4 w-4" />
              </Button>
           </div>
        )}

        {/* Existing File Link (Only if no new file selected, or show both?) */}
        {/* Logic: If new file selected, it will replace existing on save. Show new file primarily. */}
        {/* But user might want to see what was there. Let's show both but distinguish. */}
        
        {!selectedFile && currentFileUrl && (
          <div className="flex items-center gap-2 text-sm text-blue-600 px-2 py-1">
             <FileText className="h-4 w-4" />
             <a 
               href={currentFileUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:underline truncate max-w-[200px]"
             >
               View Current File
             </a>
          </div>
        )}
      </div>
    </div>
  )
}
