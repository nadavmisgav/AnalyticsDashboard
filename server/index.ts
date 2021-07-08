import express, { Express } from 'express';
import cors from 'cors';

import { stocks_router } from './routers/stocks_router';

const app: Express = express();
const PORT: number = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/stocks', stocks_router);

app.get('/', (req, res) => res.send('Server is working 😊'));
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
