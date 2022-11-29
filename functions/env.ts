import { Request, Response } from "express";

const handler = (req: Request, res: Response) => {
  res.status(200).json(JSON.stringify(process.env, null, 2));
};

export default handler;
