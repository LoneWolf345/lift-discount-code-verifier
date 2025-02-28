
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { formatCode } from '@/utils/codeFormatting';
import { verifyDiscountCode } from '@/utils/discountCodeOperations';

interface CodeVerifierProps {
  codes: string[];
}

const CodeVerifier = ({ codes }: CodeVerifierProps) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCode = formatCode(e.target.value);
    if (formattedCode.length <= 7) {
      setCode(formattedCode);
    }
  };

  const handleVerify = async () => {
    const result = await verifyDiscountCode(code);
    
    toast({
      title: result.title || (result.success ? "Valid Code" : "Error"),
      description: result.message,
      variant: result.variant,
      className: result.className,
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter discount code"
        value={code}
        onChange={handleCodeChange}
        className="flex-1"
        maxLength={7}
      />
      <Button onClick={handleVerify} className="bg-primary hover:bg-primary/90">
        <Search className="h-4 w-4 mr-2" />
        Verify
      </Button>
    </div>
  );
};

export default CodeVerifier;
