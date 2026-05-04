import { NextFunction, Request, Response } from "express";
import { ZodAny, ZodType } from "zod";

export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }

    req.validated = result.data;

    next();
  };
};
