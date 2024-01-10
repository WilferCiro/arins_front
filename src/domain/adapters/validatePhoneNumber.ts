export const validatePhoneNumber = (phone?: string) => {
  if (!phone) {
    return true;
  }
  const phoneRegex = /^(|\+57)?[0-9]{10,}$/;
  return phoneRegex.test(phone);
};
