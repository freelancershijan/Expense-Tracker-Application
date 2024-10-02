export const formatNumbersWithCommas = (value) => {
   console.log('value', value);
   
   // Check if value is not a valid number
   if (!value?.money || value?.money === 0) {
     return '0.00';
   }
 
   // Otherwise, format the number
   return value?.money?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
 };
 