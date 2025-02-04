import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface VerificationResult {
  success: boolean;
  message: string;
  variant: "default" | "destructive";
  className?: string;
}

export const verifyDiscountCode = async (code: string): Promise<VerificationResult> => {
  console.log('Starting verification for code:', code);
  
  try {
    // First, fetch the code
    const { data: existingCode, error: fetchError } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.trim())
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error fetching code:', fetchError);
      return {
        success: false,
        message: "Failed to verify discount code",
        variant: "destructive"
      };
    }
    
    if (!existingCode) {
      console.log('Code not found:', code);
      return {
        success: false,
        message: "This discount code was not found",
        variant: "destructive"
      };
    }

    console.log('Found existing code:', existingCode);
    
    // Update the code usage
    const newUseCount = (existingCode.use_count || 0) + 1;
    const now = new Date().toISOString();
    
    console.log(`Attempting to update code: ${code}, Current count: ${existingCode.use_count}, New count: ${newUseCount}`);
    
    const { data: updatedCode, error: updateError } = await supabase
      .from('discount_codes')
      .update({
        use_count: newUseCount,
        last_used_at: now
      })
      .eq('code', code.trim())
      .select()
      .maybeSingle();

    if (updateError) {
      console.error('Error updating code:', updateError);
      return {
        success: false,
        message: "Failed to update code usage",
        variant: "destructive"
      };
    }

    if (!updatedCode) {
      console.error('No code was updated');
      return {
        success: false,
        message: "Failed to update code",
        variant: "destructive"
      };
    }

    console.log('Successfully updated code:', updatedCode);

    let message = "This code is valid and has never been used before.";
    
    if (updatedCode.use_count > 1) {
      const lastUsedDate = updatedCode.last_used_at 
        ? format(new Date(updatedCode.last_used_at), "MMM do, yyyy 'at' h:mm a")
        : 'unknown date';
      
      message = `This code is valid but has been used ${updatedCode.use_count} time${updatedCode.use_count === 1 ? '' : 's'}. The last time was on ${lastUsedDate}`;
    }

    return {
      success: true,
      message,
      variant: "default",
      className: "bg-success text-success-foreground"
    };
  } catch (error) {
    console.error('Unexpected error during verification:', error);
    return {
      success: false,
      message: "An unexpected error occurred",
      variant: "destructive"
    };
  }
};