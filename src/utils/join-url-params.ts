export const joinUrlParams = (url: string, params: Record<string, any>) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${url}?${paramsStr}`;
};
