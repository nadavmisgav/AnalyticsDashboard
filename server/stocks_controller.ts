import express from 'express';
import { getStocks } from "./stocks_data_service";

// XXX: check req.params validity
export const searchStocks = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { stock_name } = req?.params;
    let limit: number = 10  // default

    if ('limit' in req?.query) {
        limit = parseInt(req.query.limit as string);
    }

    try {
        const data = await getStocks(stock_name, limit);
        res.send(data).status(200);
        next();
  } catch(e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
  }
}