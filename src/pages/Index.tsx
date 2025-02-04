import { useState } from 'react';
import CsvUploader from '@/components/CsvUploader';
import CodeVerifier from '@/components/CodeVerifier';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

const Index = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sparklight Government Assistance Discount Code Verifier</h1>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify Code</h2>
            <CodeVerifier codes={codes} />
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Codes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Discount Codes</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <CsvUploader 
                  onCodesLoaded={(newCodes) => {
                    setCodes(newCodes);
                    setDialogOpen(false);
                  }} 
                />
                {codes.length > 0 && (
                  <p className="mt-4 text-sm text-gray-600">
                    {codes.length} codes loaded
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Index;