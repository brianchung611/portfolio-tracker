import bcrypt from 'bcrypt';

// - hashPassword(password: string): Promise<string>
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// - comparePassword(password: string, hash: string): Promise<boolean>
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// - validatePassword(password: string): boolean
export const validatePassword = (password: string): boolean => {
  // check if password is valid for the following requirements:
  // - at least 8 characters long
  // - at least one uppercase letter
  // - at least one lowercase letter
  // - at least one number
  // - at least one special character
  // - no whitespace
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// - validateEmail(email: string): boolean
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};