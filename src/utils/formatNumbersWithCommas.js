export const formatNumbersWithCommas = (value) => {

   // Check if value is not a valid number
   if (!value || value === 0) {
     return '0.00';
   }
 
   // Otherwise, format the number
   return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
 };
 