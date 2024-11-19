import { isUndefined, omitBy } from 'lodash';
import { useQueryParams } from './useQueryParams';
import { QueryConfig } from '../pages/Manager_Event/component/Manager_Event';

export function useEventQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
    },
    isUndefined,
  );

  return queryConfig;
}

export function useProjectQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
    },
    isUndefined,
  );

  return queryConfig;
}
