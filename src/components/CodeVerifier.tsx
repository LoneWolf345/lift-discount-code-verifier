import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface CodeVerifierProps {
  codes: string[];
}

const CodeVerifier = ({ codes }: CodeVerifierProps) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const formatCode = (input: string) => {
    const cleanCode = input.replace(/-/g, '').toUpperCase();
    
    if (cleanCode.length >= 3) {
      return `${cleanCode.slice(0, 3)}-${cleanCode.slice(3, 6)}`;
    }
    
    return cleanCode;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCode = formatCode(e.target.value);
    if (formattedCode.length <= 7) {
      setCode(formattedCode);
    }
  };

  const verifyCode = async () => {
    console.log('Starting verification for code:', code);
    
    const { data: existingCode, error: fetchError } = await supabase
      .from('discount_codes')
      .select('id, code, use_count, last_used_at')
      .eq('code', code.trim())
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error verifying code:', fetchError);
      toast({
        title: "Error",
        description: "Failed to verify discount code",
        variant: "destructive",
      });
      return;
    }
    
    if (!existingCode) {
      console.log('Code not found:', code);
      toast({
        title: "Invalid Code",
        description: "This discount code was not found",
        variant: "destructive",
      });
      return;
    }

    console.log('Found existing code:', existingCode);
    const newUseCount = (existingCode.use_count || 0) + 1;
    const now = new Date();
    
    console.log('Updating code usage. Current count:', existingCode.use_count, 'New count:', newUseCount);
    const { error: updateError } = await supabase
      .from('discount_codes')
      .update({
        use_count: newUseCount,
        last_used_at: now.toISOString()
      })
      .eq('id', existingCode.id);

    if (updateError) {
      console.error('Error updating code usage:', updateError);
      toast({
        title: "Error",
        description: "Failed to update code usage",
        variant: "destructive",
      });
      return;
    }

    console.log('Successfully updated code usage, fetching updated record');
    const { data: updatedCode, error: refetchError } = await supabase
      .from('discount_codes')
      .select('use_count, last_used_at')
      .eq('id', existingCode.id)
      .maybeSingle();

    if (refetchError || !updatedCode) {
      console.error('Error fetching updated code:', refetchError);
      return;
    }

    console.log('Retrieved updated code data:', updatedCode);
    let description = "This code is valid and has never been used before.";
    
    if (updatedCode.use_count > 1) {
      const lastUsedDate = updatedCode.last_used_at 
        ? format(new Date(updatedCode.last_used_at), "MMM do, yyyy 'at' h:mm a")
        : 'unknown date';
      
      description = `This code is valid but has been used ${updatedCode.use_count} time${updatedCode.use_count === 1 ? '' : 's'}. The last time was on ${lastUsedDate}`;
    }

    console.log('Showing success toast with description:', description);
    toast({
      title: "Valid Code",
      description: description,
      className: "bg-success text-success-foreground",
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
      <Button onClick={verifyCode} className="bg-primary hover:bg-primary/90">
        <Search className="h-4 w-4 mr-2" />
        Verify
      </Button>
    </div>
  );
};

export default CodeVerifier;