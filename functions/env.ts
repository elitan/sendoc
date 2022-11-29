import { Request, Response } from "express";

const handler = (req: Request, res: Response) => {
  res.status(200).send(`env vars: ${JSON.stringify(process.env, null, 2)}`);
};

export default handler;
