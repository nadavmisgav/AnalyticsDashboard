const tipranksApi = require('tipranks-api-v2');


export const tipranksGetTargets = async (name: string) => {
  try {
    return await tipranksApi.getPriceTargets(name);
  } catch (e) {
    throw new Error(e.message)
  }
}
