import express, { Router, Request, Response } from 'express';
import pool from '../config/database';
import { validatePassword, hashPassword, validateEmail, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
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
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email', [email, hashedPassword]);
    const user = newUser.rows[0];
    const token = generateToken(user.id as number);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValidPassword = await comparePassword(password, user.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user.rows[0].id as number);
    res.status(200).json({ token, user: { id: user.rows[0].id, email: user.rows[0].email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
});

export default router;