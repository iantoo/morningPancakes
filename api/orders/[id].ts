import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const { id } = req.query;
  const orderId = parseInt(id as string, 10);
  if (isNaN(orderId)) {
    res.status(400).json({ message: "Invalid order ID" });
    return;
  }
  try {
    const order = await storage.getOrder(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
}
