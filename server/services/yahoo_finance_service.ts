import yahooFinance from 'yahoo-finance2';

export const yahooSearchStock = async (name: string, limit: number) => {
  try {
    const results = await yahooFinance.search(name, { quotesCount: limit });
    return results?.quotes;
  } catch (e) {
    throw new Error(e.message)
  }
}

export const yahooQuoteStock = async (symbol: string) => {
  try {
    return await yahooFinance.quote(symbol);
  } catch (e) {
    throw new Error(e.message)
  }
}
