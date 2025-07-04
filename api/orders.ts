import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertOrderSchema } from '../shared/schema';
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({ message: "Failed to create order" });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
