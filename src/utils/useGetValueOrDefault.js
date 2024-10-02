export const useGetValueOrDefault = (value, defaultValue = 'N/A') => {
  // Directly return the value or default value
  return value ? value : defaultValue;
};
