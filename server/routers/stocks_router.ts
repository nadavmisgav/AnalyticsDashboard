import express, { Router } from 'express';
import { searchStocks, quoteStock } from '../controllers/stocks_controller';

export const stocks_router: Router = express.Router();

stocks_router.get('/search/:stock_name', searchStocks);
stocks_router.get('/quote/:symbol', quoteStock);