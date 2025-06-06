import { NextFunction, Request, RequestHandler, Response } from "express";

const AsyncSync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export default AsyncSync;
