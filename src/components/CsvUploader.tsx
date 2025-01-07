import React from 'react';
import { useToast } from '@/hooks/use-toast';
import DropZone from './csv/DropZone';
import { processCsvFile } from '@/utils/csvProcessor';

interface CsvUploaderProps {
  onCodesLoaded: (codes: string[]) => void;
}

const CsvUploader = ({ onCodesLoaded }: CsvUploaderProps) => {
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    try {
      const codes = await processCsvFile(file);
      onCodesLoaded(codes);
      toast({
        title: "Success",
        description: `Loaded ${codes.length} discount codes`,
        className: "bg-success text-success-foreground",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return <DropZone onFileSelect={handleFileSelect} />;
};

export default CsvUploader;