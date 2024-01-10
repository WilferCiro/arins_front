export const validateCopNit = (rut: string) => {
  const rutRegex = /^[0-9]{9}-[0-9]$/;
  return rutRegex.test(rut);
};
