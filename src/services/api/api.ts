import { API_KEY, API_URL } from '../../constants/api';

export type Params = Record<string, string>;

function getQueryString(params: Params): string {
  let queryString;
  if (params instanceof Object) {
    queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
  return queryString ? `?${queryString}` : '';
}

function getUrl(path: string, params: Params): string {
  return `${path}${getQueryString(params)}`;
}

export function getApiUrl(path: string, params: Params = {}): string {
  return getUrl(
    `${API_URL}${path}`,
    { ...params, api_key: API_KEY }
  );
}
