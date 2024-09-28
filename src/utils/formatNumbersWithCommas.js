export const formatNumbersWithCommas = (value) => {
   return value? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '0.00'
}