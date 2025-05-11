
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageDropZoneProps {
  onImageSelect: (file: File) => void;
}

const ImageDropZone = ({ onImageSelect }: ImageDropZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      setError("Please upload a JPEG or PNG image.");
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return false;
    }
    
    return true;
  };

  const processFile = (file: File) => {
    setError(null);
    
    if (validateFile(file)) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Pass file to parent component
      onImageSelect(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragActive 
            ? "border-primary-400 bg-primary-50" 
            : "border-gray-300 hover:border-primary-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-4 w-full max-w-md">
              <img 
                src={preview} 
                alt="Preview" 
                className="rounded-lg max-h-80 mx-auto object-contain"
              />
              <button 
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                onClick={() => {
                  setPreview(null);
                  setError(null);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button 
              variant="outline"
              onClick={handleButtonClick}
              className="mt-2"
            >
              Select a different image
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your facial image here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Or click to browse from your computer
            </p>
            <Button 
              variant="outline" 
              onClick={handleButtonClick}
              className="mt-4"
            >
              Select Image
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: JPEG, PNG (Max size: 5MB)
            </p>
          </div>
        )}
        <input 
          id="file-upload"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mt-4 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
