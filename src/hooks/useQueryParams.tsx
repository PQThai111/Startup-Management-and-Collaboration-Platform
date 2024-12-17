import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}

export function useQueryParams2() {
  const [searchParams] = useSearchParams();
  const params: { [key: string]: string | string[] } = {};

  searchParams.forEach((value, key) => {
    if (params[key]) {
      // If the key already exists, convert to array if not already
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value);
      } else {
        params[key] = [params[key] as string, value];
      }
    } else {
      params[key] = value;
    }
  });

  return params;
}
