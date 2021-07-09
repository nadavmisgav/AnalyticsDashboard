import express from 'express';
import { tipranksGetTargets } from '../services/tipranks_service';
import { yahooQuoteStock, yahooSearchStock } from "../services/yahoo_finance_service";

export const searchStocks = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { stock_name } = req?.params;
    let limit: number = 10  // default

    if ('limit' in req?.query) {
        limit = parseInt(req.query.limit as string);
    }

    try {
        const data = await yahooSearchStock(stock_name, limit);
        res.send(data).status(200);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
}

export const quoteStock = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { symbol } = req?.params;
    try {
        const data = await yahooQuoteStock(symbol);
        const target = await tipranksGetTargets(symbol);
        const result = {
            quote: data,
            target: target
        }
        res.send(result).status(200);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
}