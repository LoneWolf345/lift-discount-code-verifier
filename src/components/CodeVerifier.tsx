import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CodeVerifierProps {
  codes: string[];
}

const CodeVerifier = ({ codes }: CodeVerifierProps) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const verifyCode = async () => {
    console.log('Verifying code:', code);
    
    const { data, error } = await supabase
      .from('discount_codes')
      .select('code')
      .eq('code', code.trim())
      .maybeSingle();
    
    if (error) {
      console.error('Error verifying code:', error);
      toast({
        title: "Error",
        description: "Failed to verify discount code",
        variant: "destructive",
      });
      return;
    }
    
    if (data) {
      toast({
        title: "Valid Code",
        description: "This discount code is valid!",
        className: "bg-success text-success-foreground",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "This discount code was not found",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter discount code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1"
      />
      <Button onClick={verifyCode} className="bg-primary hover:bg-primary/90">
        <Search className="h-4 w-4 mr-2" />
        Verify
      </Button>
    </div>
  );
};

export default CodeVerifier;