import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

const DropZone = ({ onFileSelect }: DropZoneProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        id="fileInput"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your CSV file here, or click to select
      </p>
    </div>
  );
};

export default DropZone;