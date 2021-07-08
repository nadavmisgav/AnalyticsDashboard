import yahooFinance from 'yahoo-finance2';

export const getStocks = async (name: string, limit: number) => {
    try {
        const results = await yahooFinance.search(name, {quotesCount: limit});
        return results?.quotes;
  } catch(e) {
    throw new Error(e.message)
  }
}