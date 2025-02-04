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
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-left mb-8">
          <span className="text-brand-purple font-bold text-lg">Sparklight</span>
          <h1 className="text-4xl font-bold text-brand-black mt-2 mb-4">
            Discount Code Verifier
          </h1>
          <p className="text-lg text-brand-black/80 mb-6">
            Verify the customers discount code below.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-brand-black mb-6">Verify Code</h2>
            <CodeVerifier codes={codes} />
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-brand-purple text-white hover:bg-brand-purple/90 uppercase font-bold"
              >
                <Upload className="h-4 w-4" />
                Upload Codes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-brand-black">Upload Discount Codes</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <CsvUploader 
                  onCodesLoaded={(newCodes) => {
                    setCodes(newCodes);
                    setDialogOpen(false);
                  }} 
                />
                {codes.length > 0 && (
                  <p className="mt-4 text-sm text-brand-black/60">
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