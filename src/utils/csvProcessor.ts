import { supabase } from '@/integrations/supabase/client';

export const processCsvFile = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const codes = text.split('\n').map(code => code.trim()).filter(Boolean);
        console.log('Processing discount codes:', codes);

        const { error } = await supabase
          .from('discount_codes')
          .insert(codes.map(code => ({ code })));

        if (error) {
          console.error('Error storing codes:', error);
          reject(new Error('Failed to store discount codes'));
          return;
        }

        console.log('Successfully stored discount codes');
        resolve(codes);
      } catch (error) {
        console.error('Error parsing CSV:', error);
        reject(new Error('Failed to parse CSV file'));
      }
    };

    reader.readAsText(file);
  });
};