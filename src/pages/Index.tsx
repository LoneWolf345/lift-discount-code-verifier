
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CsvUploader from '@/components/CsvUploader';
import CodeVerifier from '@/components/CodeVerifier';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-6xl font-extrabold bg-gradient-to-tr from-[#0197d9] to-[#52b5d4] bg-clip-text text-transparent tracking-tight">Lift</span>
            <h1 className="text-4xl font-bold text-brand-black mt-2 mb-4">
              Discount Code Verifier
            </h1>
            <p className="text-lg text-brand-black/80 mb-6">
              Verify the customers discount code below.
            </p>
          </div>
          {session && (
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-brand-black mb-6">Verify Code</h2>
            <CodeVerifier codes={codes} />
          </div>

          {session ? (
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
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-brand-purple text-white hover:bg-brand-purple/90 uppercase font-bold"
              onClick={() => navigate('/auth')}
            >
              <Upload className="h-4 w-4" />
              Sign in to Upload Codes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
