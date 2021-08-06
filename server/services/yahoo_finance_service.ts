import yahooFinance from 'yahoo-finance2';

export const yahooSearchStock = async (name: string, limit: number) => {
  try {
    const results = await yahooFinance.search(name, { quotesCount: limit }, { validateResult: false });
    return results?.quotes;
  } catch (e) {
    throw new Error(e.message)
  }
}

export const yahooQuoteStock = async (symbol: string) => {
  try {
    return await yahooFinance.quote(symbol, {}, { validateResult: false });
  } catch (e) {
    throw new Error(e.message)
  }
}
