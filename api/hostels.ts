import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  try {
    const hostels = await storage.getHostels();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hostels' });
  }
}
