export const formatCode = (input: string) => {
  const cleanCode = input.replace(/-/g, '').toUpperCase();
  
  if (cleanCode.length >= 3) {
    return `${cleanCode.slice(0, 3)}-${cleanCode.slice(3, 6)}`;
  }
  
  return cleanCode;
};