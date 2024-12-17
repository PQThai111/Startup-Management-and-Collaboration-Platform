import { isUndefined, omitBy } from 'lodash';
import { useQueryParams, useQueryParams2 } from './useQueryParams';
import { QueryConfig } from '../pages/EventPage/components/EventList';

export function useEventQueryConfig() {
  const queryParams = useQueryParams2();
  console.log(queryParams);
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || ('1' as string),
      PageSize:
        Number(queryParams.PageSize) > 8
          ? '8'
          : queryParams.PageSize || ('8' as string),
      SearchTerm: queryParams.SearchTerm as string,
      EventTypes: Array.isArray(queryParams.EventTypes)
        ? queryParams.EventTypes
        : [queryParams.EventTypes].filter(Boolean),
      IsMandatory: queryParams.IsMandatory as string,
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
