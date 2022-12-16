import { Request, Response } from "express";

const handler = (req: Request, res: Response) => {
  console.log("test from functions");
  res.status(200).json(JSON.stringify(process.env, null, 2));
};

export default handler;
