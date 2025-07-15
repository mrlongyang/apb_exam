import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../utils/db';

export const registerUser = async (req: Request, res: Response) => {
  const { user_id, user_name, user_password } = req.body;
  const hash = await bcrypt.hash(user_password, 10);
  const db = await connectDB();
  await db.execute(
    'INSERT INTO user (user_id, user_name, user_password) VALUES (?, ?, ?)',
    [user_id, user_name, hash]
  );
  res.json({ message: 'Registered' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { user_id, user_password } = req.body;

  try {
    const db = await connectDB();
    const [rows]: any = await db.execute('SELECT * FROM user WHERE user_id = ?', [user_id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};
