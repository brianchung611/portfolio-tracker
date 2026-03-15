import express, { Router, Request, Response } from 'express';
import pool from '../config/database';
import { validatePassword, hashPassword, validateEmail } from '../utils/password';
import { generateToken } from '../utils/jwt';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    // Step 1: Extract and validate inputs
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    // Step 2: Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    // Step 3: Hash password
    const hashedPassword = await hashPassword(password);
    // Step 4: Create user in database
    const newUser = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email', [email, hashedPassword]);
    const user = newUser.rows[0];
    // Step 5: Generate JWT token
    const token = generateToken(user.id as number);
    // Step 6: Return success response
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
});

export default router;