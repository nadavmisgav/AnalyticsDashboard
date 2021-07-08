import express, {Router} from 'express';
import { searchStocks } from '../controllers/stocks_controller';

export const stocks_router: Router = express.Router();

stocks_router.get('/search/:stock_name', searchStocks);