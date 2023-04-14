export type ResponseData = {
  formula: string;
  result: string;
  units: string[];
  all_units: string[];
  error: string;
};

export type RequestData = {
  formula: string;
  all_units: string[];
};

const BaseURL = 'https://kamono.pythonanywhere.com';

export const fetchResult = async (units: boolean, requestData: RequestData) => {
  const endpoint = units ? BaseURL + '/units' : BaseURL;
  const body = new FormData();
  body.append('formula', requestData.formula);
  body.append('all_units', requestData.all_units.join(','));
  const response = await fetch(endpoint, {
    method: 'POST',
    body: body,
  });
  const responseData = await response.json();
  return responseData;
};
