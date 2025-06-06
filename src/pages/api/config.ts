import type { NextApiRequest, NextApiResponse } from 'next';
import { getConfigValue } from '@/lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const key = Array.isArray(req.query.key) ? req.query.key[0] : req.query.key;
  if (!key) {
    return res.status(400).json({ message: 'Missing key parameter' });
  }

  const value = await getConfigValue(key);
  if (value === null) {
    return res.status(404).json({ message: 'Config not found' });
  }
  res.status(200).json({ value });
}
