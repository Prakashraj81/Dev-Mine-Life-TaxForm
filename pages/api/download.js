import { createReadStream } from 'fs';
import { join } from 'path';
import { send } from 'micro';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { file } = req.query;
    const filePath = join(process.cwd(), file);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    send(res, 200, createReadStream(filePath));
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}