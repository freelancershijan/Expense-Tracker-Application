export const formatNumbersWithCommas = (value) => {
   return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}