import { supabase } from '@/integrations/supabase/client';

export const processCsvFile = async (file: File): Promise<string[]> => {
  console.log('Starting CSV file processing');
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        // Split by newline and filter out empty lines and whitespace
        const codes = text
          .split('\n')
          .map(code => code.trim())
          .filter(Boolean);

        console.log(`Found ${codes.length} valid discount codes`);

        if (codes.length === 0) {
          throw new Error('No valid discount codes found in the file');
        }

        // Prepare the data for insertion
        const dataToInsert = codes.map(code => ({ code }));
        console.log('Preparing to insert codes into database');

        const { error } = await supabase
          .from('discount_codes')
          .insert(dataToInsert);

        if (error) {
          console.error('Error storing codes:', error);
          reject(new Error('Failed to store discount codes'));
          return;
        }

        console.log('Successfully stored discount codes in database');
        resolve(codes);
      } catch (error) {
        console.error('Error processing CSV:', error);
        reject(error instanceof Error ? error : new Error('Failed to parse CSV file'));
      }
    };

    reader.onerror = () => {
      console.error('Error reading file');
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};