import jwt from 'jsonwebtoken';

// - generateToken(userId: number): string
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

// - verifyToken(token: string): { userId: number } | null
export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};