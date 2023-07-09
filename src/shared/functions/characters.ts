export const removeSecialCharacters = (value: string) => {
  return value.replace(/\D/g, '');
};
