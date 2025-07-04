import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  try {
    const flavors = await storage.getFlavors();
    res.json(flavors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flavors' });
  }
}
