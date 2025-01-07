import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';

interface CodeVerifierProps {
  codes: string[];
}

const CodeVerifier = ({ codes }: CodeVerifierProps) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const verifyCode = () => {
    console.log('Verifying code:', code);
    const isValid = codes.includes(code.trim());
    
    if (isValid) {
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